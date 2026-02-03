import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface Alert {
  id: string;
  alertType: string;
  exchange: string;
  exchTime: string;
  tmcm: string;
  client: string;
  type: string;
  scripName: string;
  percentage: string;
  dollar: string;
  status: string;
}

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // 1. Fetch historical alerts first
    console.log('Fetching historical alerts from http://127.0.0.1:3000/alerts...');
    fetch('http://127.0.0.1:3000/alerts')
      .then(res => {
        console.log('Fetch response status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Received raw historical alerts:', data);
        const mapped = data.map((item: any) => ({
          id: item.id?.toString(),
          alertType: item.severity || 'INFO',
          exchange: 'N/A',
          exchTime: new Date(item.created_at).toLocaleTimeString(),
          tmcm: 'N/A',
          client: 'N/A',
          type: 'Historical',
          scripName: item.message || '-',
          percentage: '0.00',
          dollar: '',
          status: item.status || 'NEW',
        }));
        console.log('Mapped historical alerts:', mapped);
        setAlerts(mapped);
      })
      .catch(err => console.error('Failed to fetch alerts:', err));

    // 2. Connect to the NestJS alerts namespace for real-time updates
    const socket: Socket = io('http://127.0.0.1:3000/alerts', {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log('Connected to Alerts WebSocket');
    });

    socket.on('ReceiveAlert', (newAlert: any) => {
      console.log('Received Real-time Alert:', newAlert);

      const mappedAlert: Alert = {
        id: newAlert.id?.toString() || Math.random().toString(),
        alertType: newAlert.severity || 'INFO',
        exchange: 'N/A',
        exchTime: new Date(newAlert.created_at || new Date()).toLocaleTimeString(),
        tmcm: 'N/A',
        client: 'N/A',
        type: 'Real-time',
        scripName: newAlert.message || 'No Message',
        percentage: '0.00',
        dollar: '',
        status: newAlert.status || 'NEW',
      };

      setAlerts((prev) => [mappedAlert, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const clearAlerts = () => {
    setAlerts([]);
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-primary px-6 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          <h2 className="font-semibold text-white text-lg tracking-tight">Real-time Risk Alerts</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={clearAlerts}
            className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-md text-sm font-medium transition-all backdrop-blur-sm border border-white/20"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-background-secondary border-b border-border">
              <tr>
                <th className="text-left py-4 px-4 font-semibold text-text-primary uppercase tracking-wider text-[11px]">Severity</th>
                <th className="text-left py-4 px-4 font-semibold text-text-primary uppercase tracking-wider text-[11px]">Source</th>
                <th className="text-left py-4 px-4 font-semibold text-text-primary uppercase tracking-wider text-[11px]">Exch-Time</th>
                <th className="text-left py-4 px-4 font-semibold text-text-primary uppercase tracking-wider text-[11px]">Message</th>
                <th className="text-left py-4 px-4 font-semibold text-text-primary uppercase tracking-wider text-[11px]">Status</th>
                <th className="text-right py-4 px-4 font-semibold text-text-primary uppercase tracking-wider text-[11px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {alerts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3 text-text-secondary">
                      <div className="w-12 h-12 bg-background-secondary rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="italic font-medium">Waiting for real-time alerts...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                alerts.map((alert, index) => (
                  <tr
                    key={alert.id}
                    className="hover:bg-background-secondary/50 transition-colors group animate-in slide-in-from-top-2 duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase ${alert.alertType === 'CRITICAL' ? 'bg-red-500/10 text-red-600 border border-red-500/20' :
                        alert.alertType === 'WARNING' ? 'bg-orange-500/10 text-orange-600 border border-orange-500/20' :
                          'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                        }`}>
                        {alert.alertType}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${alert.type === 'Real-time'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                        }`}>
                        {alert.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-text-primary font-medium">{alert.exchTime}</td>
                    <td className="py-4 px-4 text-text-secondary font-normal truncate max-w-[400px]">{alert.scripName}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        <span className="text-text-primary font-medium text-[11px] uppercase tracking-wide">{alert.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="text-primary hover:text-primary-dark font-medium transition-colors text-xs opacity-0 group-hover:opacity-100">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
