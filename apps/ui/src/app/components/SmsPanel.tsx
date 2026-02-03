import { useState } from 'react';

interface SmsControlState {
  [key: string]: boolean;
}

interface SmsRecord {
  id: string;
  date: string;
  exchange: string;
  group: string;
  segment: string;
  exchangeTime: string;
  clientId: string;
  utilization: string;
  contactNumber: string;
  smsTime: string;
  smsStatus: string;
}

export function SmsPanel() {
  const [smsControl, setSmsControl] = useState<SmsControlState>({
    nseNwmlCash: false,
    bseNcslComCm: false,
    bseNwml: false,
    bseNcslComTm: false,
    ncdexNcsl: false,
    fnoNcsl: false,
    cdsNcsl: false,
    mcxCom: false,
    nseNcslCom: false,
    mcxNcslCom: false,
  });

  const [smsRecords] = useState<SmsRecord[]>([]);

  const toggleCheckbox = (key: string) => {
    setSmsControl({ ...smsControl, [key]: !smsControl[key] });
  };

  return (
    <div className="space-y-6">
      {/* Sms Control */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="bg-primary px-4 py-3 border-b border-border flex items-center justify-between">
          <h2 className="font-medium text-white text-sm">Sms Control</h2>
          <button className="px-3 py-1.5 bg-white text-primary hover:bg-background-secondary rounded-md text-xs font-medium transition-colors">
            Update
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm mb-3 text-text-secondary">Please select to enable sms.</p>
          <div className="grid grid-cols-3 gap-3">
            <label className="flex items-center gap-2 text-sm cursor-pointer text-text-primary">
              <input
                type="checkbox"
                checked={smsControl.nseNwmlCash}
                onChange={() => toggleCheckbox('nseNwmlCash')}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span>NSE NWML CASH</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={smsControl.bseNcslComCm}
                onChange={() => toggleCheckbox('bseNcslComCm')}
                className="w-4 h-4"
              />
              <span>BSE NCSL COM.CM</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={smsControl.bseNwml}
                onChange={() => toggleCheckbox('bseNwml')}
                className="w-4 h-4"
              />
              <span>BSE NWML</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={smsControl.bseNcslComTm}
                onChange={() => toggleCheckbox('bseNcslComTm')}
                className="w-4 h-4"
              />
              <span>BSE NCSL COM TM</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={smsControl.ncdexNcsl}
                onChange={() => toggleCheckbox('ncdexNcsl')}
                className="w-4 h-4"
              />
              <span>NCDEX NCSL</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={smsControl.fnoNcsl}
                onChange={() => toggleCheckbox('fnoNcsl')}
                className="w-4 h-4"
              />
              <span>FNO NCSL</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={smsControl.cdsNcsl}
                onChange={() => toggleCheckbox('cdsNcsl')}
                className="w-4 h-4"
              />
              <span>CDS NCSL</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={smsControl.mcxCom}
                onChange={() => toggleCheckbox('mcxCom')}
                className="w-4 h-4"
              />
              <span>MCX COM</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={smsControl.nseNcslCom}
                onChange={() => toggleCheckbox('nseNcslCom')}
                className="w-4 h-4"
              />
              <span>NSE NCSL COM</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={smsControl.mcxNcslCom}
                onChange={() => toggleCheckbox('mcxNcslCom')}
                className="w-4 h-4"
              />
              <span>MCX NCSL COM</span>
            </label>
          </div>
        </div>
      </div>

      {/* Sms Records */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="bg-primary px-4 py-3 border-b border-border flex items-center justify-between">
          <h2 className="font-medium text-white text-sm">Sms Records</h2>
          <span className="text-sm text-white">Balance: 0</span>
        </div>
        <div className="p-4">
          <div className="bg-white border border-border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-background-secondary border-b border-border">
                <tr>
                  <th className="text-left py-3 px-3 font-medium text-text-primary">Date</th>
                  <th className="text-left py-3 px-3 font-medium text-text-primary">Exchange</th>
                  <th className="text-left py-3 px-3 font-medium text-text-primary">Group</th>
                  <th className="text-left py-3 px-3 font-medium text-text-primary">Segment</th>
                  <th className="text-left py-3 px-3 font-medium text-text-primary">Exchange Time</th>
                  <th className="text-left py-3 px-3 font-medium text-text-primary">Client Id</th>
                  <th className="text-left py-3 px-3 font-medium text-text-primary">Utilization</th>
                  <th className="text-left py-3 px-3 font-medium text-text-primary">Contact Number</th>
                  <th className="text-left py-3 px-3 font-medium text-text-primary">Sms Time</th>
                  <th className="text-left py-3 px-3 font-medium text-text-primary">Sms Status</th>
                </tr>
              </thead>
              <tbody>
                {smsRecords.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center py-8 text-text-secondary">
                      No records available
                    </td>
                  </tr>
                ) : (
                  smsRecords.map((record, index) => (
                    <tr
                      key={record.id}
                      className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} text-black`}
                    >
                      <td className="py-2 px-3">{record.date}</td>
                      <td className="py-2 px-3">{record.exchange}</td>
                      <td className="py-2 px-3">{record.group}</td>
                      <td className="py-2 px-3">{record.segment}</td>
                      <td className="py-2 px-3">{record.exchangeTime}</td>
                      <td className="py-2 px-3">{record.clientId}</td>
                      <td className="py-2 px-3">{record.utilization}</td>
                      <td className="py-2 px-3">{record.contactNumber}</td>
                      <td className="py-2 px-3">{record.smsTime}</td>
                      <td className="py-2 px-3">{record.smsStatus}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
