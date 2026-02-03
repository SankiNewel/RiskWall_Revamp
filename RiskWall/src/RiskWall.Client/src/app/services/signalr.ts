import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Alert {
  id: string;
  message: string;
  severity: string;
  sourceFile: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;
  public alerts$ = new BehaviorSubject<Alert[]>([]);
  public connectionStatus$ = new BehaviorSubject<string>('Disconnected');
  private apiUrl = 'http://localhost:5034/api/alerts';

  constructor(private http: HttpClient) { }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5034/alertHub')
      .withAutomaticReconnect()
      .build();

    this.hubConnection.onreconnecting(() => this.connectionStatus$.next('Reconnecting'));
    this.hubConnection.onreconnected(() => this.connectionStatus$.next('Connected'));
    this.hubConnection.onclose(() => this.connectionStatus$.next('Disconnected'));

    // Register listener BEFORE starting connection
    this.hubConnection.on('ReceiveAlert', (data: any) => {
      console.log('Received Alert via SignalR:', data);
      const alert = this.mapAlert(data);
      const current = this.alerts$.value;
      // Prepend new alert
      this.alerts$.next([alert, ...current]);
    });

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.connectionStatus$.next('Connected');
        this.loadInitialAlerts();
      })
      .catch(err => {
        console.log('Error while starting connection: ' + err);
        this.connectionStatus$.next('Error');
      });
  }

  private loadInitialAlerts() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Loaded initial alerts:', data);
        const mapped = data.map(d => this.mapAlert(d));
        // Sort by createdAt descending
        mapped.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.alerts$.next(mapped);
      },
      error: (err) => console.error('Failed to load history', err)
    });
  }

  private mapAlert(data: any): Alert {
    // Handle both camelCase and PascalCase
    return {
      id: data.id || data.Id,
      message: data.message || data.Message,
      severity: data.severity || data.Severity,
      sourceFile: data.sourceFile || data.SourceFile,
      createdAt: data.createdAt || data.CreatedAt
    };
  }
}
