import { useState } from 'react';

interface AlertItem {
  id: string;
  name: string;
}

export function DeleteAlertsPanel() {
  const [alerts, setAlerts] = useState<AlertItem[]>([
    { id: '1', name: 'NSE CASH NWAL' },
    { id: '2', name: 'FNO EX NCSL' },
    { id: '3', name: 'BSE NWSL' },
    { id: '4', name: 'FNO NCSL' },
    { id: '5', name: 'CDS NCSL' },
    { id: '6', name: 'NSE NCSL.COM' },
    { id: '7', name: 'FPXDH' },
    { id: '8', name: 'BSE NCSL.COM TH' },
    { id: '9', name: 'MCX.COM' },
    { id: '10', name: 'MCX NCSL.COM' },
  ]);

  const handleDelete = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="bg-white border border-border rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-medium text-text-primary mb-4">Delete Alerts</h2>

      <div className="space-y-2">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-center gap-2 p-2 hover:bg-background rounded-md transition-colors">
            <div className="flex-1 text-sm text-text-primary">{alert.name}</div>
            <button
              onClick={() => handleDelete(alert.id)}
              className="px-4 py-1 bg-destructive text-white hover:opacity-90 rounded-md text-xs font-medium transition-opacity"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
