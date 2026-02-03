import { useState, useEffect } from 'react';

interface ProcessItem {
  id: string;
  name: string;
  status: 'ON' | 'OFF';
  isRunning: boolean;
}

export function FlatfileProcessPanel() {
  const [processes, setProcesses] = useState<ProcessItem[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/settings/processes')
      .then(res => res.json())
      .then(data => setProcesses(data))
      .catch(err => console.error('Failed to fetch processes:', err));
  }, []);

  const toggleStatus = (id: string) => {
    setProcesses(processes.map(p =>
      p.id === id ? { ...p, status: p.status === 'ON' ? 'OFF' : 'ON' } : p
    ));
  };

  const handleAction = (id: string, action: 'start' | 'stop') => {
    setProcesses(processes.map(p =>
      p.id === id ? { ...p, isRunning: action === 'start' } : p
    ));
  };

  return (
    <div className="bg-white border border-border rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-text-primary">Flatfile Process</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-destructive text-white hover:opacity-90 rounded-md text-sm font-medium transition-opacity">
            All
          </button>
          <button className="px-3 py-1.5 bg-primary text-white hover:opacity-90 rounded-md text-sm font-medium transition-opacity">
            Start
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {processes.map((process) => (
          <div key={process.id} className="flex items-center gap-2 p-2 hover:bg-background rounded-md transition-colors">
            <div className="flex-1 text-sm text-text-primary">{process.name}</div>
            <button
              onClick={() => toggleStatus(process.id)}
              className={`px-3 py-1 rounded-md text-xs font-medium min-w-[45px] transition-opacity ${process.status === 'ON'
                ? 'bg-success text-white hover:opacity-90'
                : 'bg-destructive text-white hover:opacity-90'
                }`}
            >
              {process.status}
            </button>
            <button
              onClick={() => handleAction(process.id, 'start')}
              className="px-3 py-1 bg-primary text-white hover:opacity-90 rounded-md text-xs font-medium transition-opacity"
            >
              Start
            </button>
            <button
              onClick={() => handleAction(process.id, 'stop')}
              className="px-3 py-1 bg-white border border-border text-text-primary hover:bg-background-secondary rounded-md text-xs font-medium transition-colors"
            >
              Stop
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
