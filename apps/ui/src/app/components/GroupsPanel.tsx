import { useState, useEffect } from 'react';

interface Group {
  id: string;
  name: string;
  groupAdmin: string;
}

export function GroupsPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/groups')
      .then(res => res.json())
      .then(data => setGroups(data))
      .catch(err => console.error('Failed to fetch groups:', err));
  }, []);

  return (
    <div className="grid grid-cols-[1fr_2fr] gap-6">
      {/* Group Search Panel */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="bg-primary px-4 py-3 border-b border-border">
          <h2 className="font-medium text-white">GROUP SEARCH</h2>
        </div>
        <div className="p-4">
          <div className="mb-3">
            <label className="block text-sm mb-2 text-text-dark font-medium">Name</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-white text-text-primary border border-border rounded-md text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-white hover:opacity-90 rounded-md text-sm font-medium transition-opacity">
              Search
            </button>
            <button className="px-4 py-2 bg-white border border-border text-text-primary hover:bg-background-secondary rounded-md text-sm font-medium transition-colors">
              Add
            </button>
          </div>

          <div className="mt-4 bg-background border border-border rounded-md p-4 min-h-[300px]">
            <p className="text-text-secondary text-sm">No results found</p>
          </div>
        </div>
      </div>

      {/* Riskwall Groups Panel */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="bg-primary px-4 py-3 border-b border-border">
          <h2 className="font-medium text-white">RISKWALL GROUPS</h2>
        </div>
        <div className="p-4">
          <div className="bg-white border border-border rounded-md overflow-hidden">
            <div className="overflow-y-auto max-h-[500px]">
              <table className="w-full text-sm">
                <thead className="bg-background-secondary sticky top-0 border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-text-primary">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-text-primary">Group Admin</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((group, index) => (
                    <tr
                      key={group.id}
                      className={`border-b border-border hover:bg-background-secondary transition-colors cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-background'}`}
                    >
                      <td className="py-3 px-4 text-text-primary">{group.name}</td>
                      <td className="py-3 px-4 text-text-secondary">{group.groupAdmin || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
