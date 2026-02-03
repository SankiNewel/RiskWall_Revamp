import { useState, useEffect } from 'react';

interface User {
  id?: number;
  empId: string;
  firstName: string;
  lastName: string;
  group: string;
  isAdmin: boolean;
  admin?: string; // For compatibility with legacy mock data if needed
}

interface Permission {
  id: string;
  name: string;
}

export function UsersPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [showGroupName, setShowGroupName] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [activeDirectoryUsers, setActiveDirectoryUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/users')
      .then(res => res.json())
      .then(data => {
        // Map isAdmin to admin string for UI consistency if needed
        const mapped = data.map((u: any) => ({
          ...u,
          admin: u.isAdmin ? 'true' : 'false'
        }));
        setActiveDirectoryUsers(mapped);
      })
      .catch(err => console.error('Failed to fetch users:', err));
  }, []);

  const [permissions] = useState<Permission[]>([
    { id: '1', name: 'CASH_NWAL_MARGIN' },
    { id: '2', name: 'NCDEX_FM_MARGIN' },
    { id: '3', name: 'NCDEX_CM_MARGIN' },
    { id: '4', name: 'NCDEX_FM_GOV_NEAR' },
    { id: '5', name: 'NCDEX_FM_GOV_FAR' },
    { id: '6', name: 'NCDEX_CLIENT_GOV_NEAR' },
    { id: '7', name: 'NCDEX_CLIENT_GOV_FAR' },
    { id: '8', name: 'RM_NWAL_CDX_CM_MARGIN' },
    { id: '9', name: 'RM_NWAL_CDX_FM_MARGIN' },
    { id: '10', name: 'RM_NWAL_CDX_CM_MARGIN' },
    { id: '11', name: 'RM_NWAL_EDX_CM_MARGIN' },
    { id: '12', name: 'RM_NWAL_EDX_FM_MARGIN' },
  ]);

  return (
    <div className="grid grid-cols-[1fr_2fr] gap-6">
      {/* Active Directory Search Panel */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="bg-primary px-4 py-3 border-b border-border">
          <h2 className="font-medium text-white">ACTIVE DIRECTORY SEARCH</h2>
        </div>
        <div className="p-4">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Find Name/Last Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-2 bg-white text-text-primary border border-border rounded-md text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <button className="px-4 py-2 bg-primary text-white hover:opacity-90 rounded-md text-sm font-medium transition-opacity">
              Search
            </button>
            <button className="px-4 py-2 bg-white border border-border text-text-primary hover:bg-background-secondary rounded-md text-sm font-medium transition-colors">
              Add
            </button>
          </div>

          <div className="bg-white border border-border rounded-md overflow-hidden">
            <div className="overflow-y-auto max-h-[500px]">
              <table className="w-full text-sm">
                <thead className="bg-background-secondary sticky top-0 border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-3 font-medium text-text-primary text-xs">Emp Id</th>
                    <th className="text-left py-3 px-3 font-medium text-text-primary text-xs">First Name</th>
                    <th className="text-left py-3 px-3 font-medium text-text-primary text-xs">Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  {activeDirectoryUsers.slice(0, 8).map((user, index) => (
                    <tr key={user.empId} className={`border-b border-border hover:bg-background-secondary transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-background'}`}>
                      <td className="py-2 px-3 text-xs text-text-primary">{user.empId}</td>
                      <td className="py-2 px-3 text-xs text-text-primary">{user.firstName}</td>
                      <td className="py-2 px-3 text-xs text-text-primary">{user.lastName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Riskwall User Search Panel */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="bg-primary px-4 py-3 border-b border-border">
          <h2 className="font-medium text-white">RISKWALL USER SEARCH</h2>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <input
              type="text"
              placeholder="Riskwall"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="px-3 py-2 bg-white text-text-primary border border-border rounded-md text-sm w-40 focus:outline-none focus:border-primary transition-colors"
            />
            <label className="flex items-center gap-2 text-sm text-text-primary">
              <input
                type="checkbox"
                checked={showGroupName}
                onChange={(e) => setShowGroupName(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              Group Name
            </label>
            <button className="px-4 py-2 bg-primary text-white hover:opacity-90 rounded-md text-sm font-medium transition-opacity">
              Submit
            </button>
            <button className="px-4 py-2 bg-destructive text-white hover:opacity-90 rounded-md text-sm font-medium transition-opacity">
              Delete
            </button>
            <label className="flex items-center gap-2 text-sm ml-auto text-text-primary">
              <input
                type="checkbox"
                checked={showDelete}
                onChange={(e) => setShowDelete(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              Delete
            </label>
          </div>

          <div className="grid grid-cols-[2fr_1fr] gap-4">
            {/* User Table */}
            <div className="bg-white border border-border rounded-md overflow-hidden">
              <div className="overflow-y-auto max-h-[500px]">
                <table className="w-full text-sm">
                  <thead className="bg-background-secondary sticky top-0 border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-2 font-medium text-text-primary text-xs">EmpId</th>
                      <th className="text-left py-3 px-2 font-medium text-text-primary text-xs">First Na...</th>
                      <th className="text-left py-3 px-2 font-medium text-text-primary text-xs">Last Na...</th>
                      <th className="text-left py-3 px-2 font-medium text-text-primary text-xs">Group</th>
                      <th className="text-left py-3 px-2 font-medium text-text-primary text-xs">Admi...</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeDirectoryUsers.map((user, index) => (
                      <tr key={user.empId} className={`border-b border-border hover:bg-background-secondary transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-background'}`}>
                        <td className="py-2 px-2 text-xs text-text-primary">{user.empId}</td>
                        <td className="py-2 px-2 text-xs text-text-primary">{user.firstName}</td>
                        <td className="py-2 px-2 text-xs text-text-primary">{user.lastName}</td>
                        <td className="py-2 px-2 text-xs text-text-primary">{user.group}</td>
                        <td className="py-2 px-2 text-xs text-text-primary">{user.admin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Permissions Panel */}
            <div className="bg-white border border-border rounded-md overflow-hidden">
              <div className="bg-background-secondary px-3 py-2 border-b border-border">
                <h3 className="font-medium text-text-primary text-xs">Permission</h3>
              </div>
              <div className="overflow-y-auto max-h-[460px] p-2">
                <div className="space-y-1">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="text-xs py-2 px-2 bg-background hover:bg-background-secondary rounded border border-border transition-colors text-text-primary">
                      {permission.name}
                    </div>
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
