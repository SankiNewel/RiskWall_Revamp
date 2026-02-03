import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalrService, Alert } from '../../services/signalr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allAlerts: Alert[] = [];
  filteredAlerts: Alert[] = [];
  currentFilter: string = 'All';
  connectionStatus$: Observable<string>;

  constructor(public signalrService: SignalrService) {
    this.connectionStatus$ = this.signalrService.connectionStatus$;
  }

  ngOnInit() {
    this.signalrService.startConnection();
    this.signalrService.alerts$.subscribe(res => {
      this.allAlerts = res;
      this.applyFilter();
    });
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
    this.applyFilter();
  }

  applyFilter() {
    if (this.currentFilter === 'All') {
      this.filteredAlerts = this.allAlerts;
    } else {
      this.filteredAlerts = this.allAlerts.filter(a =>
        a.severity.toLowerCase() === this.currentFilter.toLowerCase()
      );
    }
  }
}
