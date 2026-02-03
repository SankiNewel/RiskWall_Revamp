import { useState } from 'react';

interface EmailSetting {
  id: string;
  label: string;
  ed: number;
  threeH: number;
  twoD: number;
  fiveM: number;
  fivePa: number;
  enabled: boolean;
}

export function FileUploadEmailSettingsPanel() {
  const [settings, setSettings] = useState<EmailSetting[]>([
    { id: '1', label: 'NCDEX', ed: 60, threeH: 9, twoD: 10, fiveM: 21, fivePa: 0, enabled: true },
    { id: '2', label: 'NCDEX NCSL', ed: 60, threeH: 9, twoD: 10, fiveM: 21, fivePa: 0, enabled: false },
    { id: '3', label: 'NCDEX NWAL', ed: 60, threeH: 9, twoD: 15, fiveM: 15, fivePa: 30, enabled: false },
    { id: '4', label: 'BSE NWSL', ed: 30, threeH: 9, twoD: 15, fiveM: 15, fivePa: 30, enabled: false },
    { id: '5', label: 'FNO NCSL', ed: 30, threeH: 9, twoD: 15, fiveM: 15, fivePa: 30, enabled: false },
    { id: '6', label: 'CDS NCSL', ed: 30, threeH: 9, twoD: 10, fiveM: 19, fivePa: 30, enabled: false },
  ]);

  const toggleEnabled = (id: string) => {
    setSettings(settings.map(s =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const updateValue = (id: string, field: keyof EmailSetting, value: number) => {
    setSettings(settings.map(s =>
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  return (
    <div className="bg-white border border-border rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-medium text-text-primary mb-2">File Upload Email Settings</h2>
      <p className="text-xs text-text-secondary mb-4">
        If email not sent/receive with in Ed, 3H, 2d, 5m, 5Pa Time Miss/Match alerts send with corresponding time
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background-secondary">
              <th className="text-left py-2 px-2 font-medium text-text-primary">LABEL</th>
              <th className="text-center py-2 px-2 font-medium text-text-primary">ED</th>
              <th className="text-center py-2 px-2 font-medium text-text-primary">3H</th>
              <th className="text-center py-2 px-2 font-medium text-text-primary">2d</th>
              <th className="text-center py-2 px-2 font-medium text-text-primary">5m</th>
              <th className="text-center py-2 px-2 font-medium text-text-primary">5Pa</th>
              <th className="text-center py-2 px-2 font-medium text-text-primary"></th>
            </tr>
          </thead>
          <tbody>
            {settings.map((setting, index) => (
              <tr key={setting.id} className={`border-b border-border ${index % 2 === 0 ? 'bg-white' : 'bg-background'}`}>
                <td className="py-2 px-2 text-text-primary">{setting.label}</td>
                <td className="py-2 px-2">
                  <input
                    type="number"
                    value={setting.ed}
                    onChange={(e) => updateValue(setting.id, 'ed', parseInt(e.target.value) || 0)}
                    className="w-12 bg-white border border-border text-text-primary text-center rounded-md px-1 py-1 focus:outline-none focus:border-primary"
                  />
                </td>
                <td className="py-2 px-2">
                  <input
                    type="number"
                    value={setting.threeH}
                    onChange={(e) => updateValue(setting.id, 'threeH', parseInt(e.target.value) || 0)}
                    className="w-12 bg-white border border-border text-text-primary text-center rounded-md px-1 py-1 focus:outline-none focus:border-primary"
                  />
                </td>
                <td className="py-2 px-2">
                  <input
                    type="number"
                    value={setting.twoD}
                    onChange={(e) => updateValue(setting.id, 'twoD', parseInt(e.target.value) || 0)}
                    className="w-12 bg-white border border-border text-text-primary text-center rounded-md px-1 py-1 focus:outline-none focus:border-primary"
                  />
                </td>
                <td className="py-2 px-2">
                  <input
                    type="number"
                    value={setting.fiveM}
                    onChange={(e) => updateValue(setting.id, 'fiveM', parseInt(e.target.value) || 0)}
                    className="w-12 bg-white border border-border text-text-primary text-center rounded-md px-1 py-1 focus:outline-none focus:border-primary"
                  />
                </td>
                <td className="py-2 px-2">
                  <input
                    type="number"
                    value={setting.fivePa}
                    onChange={(e) => updateValue(setting.id, 'fivePa', parseInt(e.target.value) || 0)}
                    className="w-12 bg-white border border-border text-text-primary text-center rounded-md px-1 py-1 focus:outline-none focus:border-primary"
                  />
                </td>
                <td className="py-2 px-2 text-center">
                  <button
                    onClick={() => toggleEnabled(setting.id)}
                    className={`px-4 py-1 rounded-md text-xs font-medium min-w-[70px] transition-opacity ${setting.enabled
                        ? 'bg-success text-white hover:opacity-90'
                        : 'bg-destructive text-white hover:opacity-90'
                      }`}
                  >
                    {setting.enabled ? 'Enable' : 'Disable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="px-4 py-2 bg-primary text-white hover:opacity-90 rounded-md text-sm font-medium transition-opacity">
          Update
        </button>
      </div>
    </div>
  );
}
