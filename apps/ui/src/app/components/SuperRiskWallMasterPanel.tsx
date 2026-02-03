import { useState, useEffect } from 'react';

interface TmItem {
  id: string;
  name: string;
}

interface Permission {
  id: string;
  name: string;
  checked: boolean;
}

export function SuperRiskWallMasterPanel() {
  const [selectedTm, setSelectedTm] = useState<string | null>(null);
  const [tmItems, setTmItems] = useState<TmItem[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/settings/tm')
      .then(res => res.json())
      .then(data => setTmItems(data))
      .catch(err => console.error('Failed to fetch TM items:', err));
  }, []);

  const [permissions, setPermissions] = useState<Permission[]>([
    { id: '1', name: 'CASH_NWML_MARGIN', checked: true },
    { id: '2', name: 'NCDEX_TM_MARGIN', checked: true },
    { id: '3', name: 'NCDEX_CM_MARGIN', checked: true },
    { id: '4', name: 'NCDEX_TM_QIV_FAR', checked: true },
    { id: '5', name: 'NCDEX_TM_QIV_NEAR', checked: true },
    { id: '6', name: 'NCDEX_CLIENT_QIV_PAR', checked: true },
    { id: '7', name: 'NCDEX_CLIENT_QIV_NEAR', checked: true },
    { id: '8', name: 'BSE_NWIL_CDX_CM_MARGIN', checked: true },
    { id: '9', name: 'BSE_NWIL_CDX_TM_MARGIN', checked: true },
    { id: '10', name: 'BSE_NWIL_CDX_TM_QIV', checked: true },
    { id: '11', name: 'BSE_NWIL_EDX_CM_MARGIN', checked: true },
    { id: '12', name: 'BSE_NWIL_EDX_TM_MARGIN', checked: false },
    { id: '13', name: 'BSE_NWIL_EDX_TM_QIV', checked: false },
    { id: '14', name: 'MCX_NWIL_CM_MARGIN', checked: false },
    { id: '15', name: 'MCX_NWIL_TM_MARGIN', checked: false },
  ]);

  const togglePermission = (id: string) => {
    setPermissions(permissions.map(p =>
      p.id === id ? { ...p, checked: !p.checked } : p
    ));
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
      <div className="bg-primary px-4 py-3 border-b border-border flex items-center justify-between">
        <h2 className="font-medium text-white">SuperRiskWall Master</h2>
        <button className="px-6 py-1.5 bg-white text-primary hover:bg-background-secondary rounded-md text-sm font-medium transition-colors">
          Save
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-8">
          {/* Tm List */}
          <div>
            <div className="bg-background-secondary px-3 py-2 border border-border border-b-0 rounded-t-md">
              <h3 className="font-medium text-sm text-text-primary">Tm</h3>
            </div>
            <div className="bg-white border border-border rounded-b-md overflow-hidden">
              <div className="overflow-y-auto h-[450px]">
                {tmItems.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedTm(item.id)}
                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors border-b border-border last:border-b-0 ${selectedTm === item.id
                      ? 'bg-primary text-white'
                      : `text-text-primary hover:bg-background-secondary ${index % 2 === 0 ? 'bg-white' : 'bg-background'}`
                      }`}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Permission List */}
          <div>
            <div className="bg-background-secondary px-3 py-2 border border-border border-b-0 rounded-t-md">
              <h3 className="font-medium text-sm text-text-primary">Permission</h3>
            </div>
            <div className="bg-white border border-border rounded-b-md overflow-hidden">
              <div className="overflow-y-auto h-[450px] p-2">
                <div className="grid gap-1">
                  {permissions.map((permission, index) => (
                    <label
                      key={permission.id}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-background'
                        } hover:bg-background-secondary text-text-primary`}
                    >
                      <input
                        type="checkbox"
                        checked={permission.checked}
                        onChange={() => togglePermission(permission.id)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm font-medium">{permission.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
