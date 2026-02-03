import { useState } from 'react';

interface MailControlState {
  [key: string]: boolean;
}

interface AlertOccurrence {
  id: string;
  tmCode: string;
  tmName: string;
  exchange: string;
  occurrence: string;
}

export function MathPanel() {
  const [clientMail, setClientMail] = useState<MailControlState>({
    nseNwmlCash: false,
    bseNcslComCm: false,
    bseNwml: false,
    ncdexNcl: false,
    bseNcslComTm: false,
    fnoNcl: false,
    cdsNcl: false,
    nseNcslCom: false,
    mcxCom: false,
    mcxNcslCom: false,
  });

  const [connectivityMail, setConnectivityMail] = useState<MailControlState>({
    nseNwmlCash: false,
    bseNcslComCm: false,
    bseNwml: false,
    ncdexNcl: false,
    bseNcslComTm: false,
    fnoNcl: false,
    cdsNcl: false,
    nseNcslCom: false,
    mcxCom: false,
    mcxNcslCom: false,
  });

  const [processStartMail, setProcessStartMail] = useState<MailControlState>({
    nseNwmlCash: false,
    bseNcslComCm: false,
    bseNwml: false,
  });

  const [processStopMail, setProcessStopMail] = useState<MailControlState>({
    nseNwmlCash: false,
    bseNcslComCm: false,
    bseNwml: false,
  });

  const [riskwallMail, setRiskwallMail] = useState<MailControlState>({
    riskwallStart: false,
    riskwallStop: false,
  });

  const [eodMail, setEodMail] = useState<MailControlState>({
    riskwallEod: false,
    riskwallPreviousDayEod: false,
  });

  const [alertOccurrences] = useState<AlertOccurrence[]>([]);

  const toggleCheckbox = (
    state: MailControlState,
    setState: React.Dispatch<React.SetStateAction<MailControlState>>,
    key: string
  ) => {
    setState({ ...state, [key]: !state[key] });
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Client Mail Control */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="bg-primary px-4 py-3 border-b border-border flex items-center justify-between">
          <h2 className="font-medium text-white text-sm">Client Mail Control</h2>
          <button className="px-3 py-1.5 bg-white text-primary hover:bg-background-secondary rounded-md text-xs font-medium transition-colors">
            Update
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm mb-3 text-text-secondary">Please select to enable email sending:</p>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer text-text-primary">
              <input
                type="checkbox"
                checked={clientMail.nseNwmlCash}
                onChange={() => toggleCheckbox(clientMail, setClientMail, 'nseNwmlCash')}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span>NSE NWML CASH</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={clientMail.bseNcslComCm}
                onChange={() => toggleCheckbox(clientMail, setClientMail, 'bseNcslComCm')}
                className="w-4 h-4"
              />
              <span>BSE NCSL COM.CM</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={clientMail.bseNwml}
                onChange={() => toggleCheckbox(clientMail, setClientMail, 'bseNwml')}
                className="w-4 h-4"
              />
              <span>BSE NWML</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={clientMail.ncdexNcl}
                onChange={() => toggleCheckbox(clientMail, setClientMail, 'ncdexNcl')}
                className="w-4 h-4"
              />
              <span>NCDEX NCL</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={clientMail.bseNcslComTm}
                onChange={() => toggleCheckbox(clientMail, setClientMail, 'bseNcslComTm')}
                className="w-4 h-4"
              />
              <span>BSE NCSL COM TM</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={clientMail.fnoNcl}
                onChange={() => toggleCheckbox(clientMail, setClientMail, 'fnoNcl')}
                className="w-4 h-4"
              />
              <span>FNO NCL</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={clientMail.cdsNcl}
                onChange={() => toggleCheckbox(clientMail, setClientMail, 'cdsNcl')}
                className="w-4 h-4"
              />
              <span>CDS NCL</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={clientMail.nseNcslCom}
                onChange={() => toggleCheckbox(clientMail, setClientMail, 'nseNcslCom')}
                className="w-4 h-4"
              />
              <span>NSE NCSL COM</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={clientMail.mcxCom}
                onChange={() => toggleCheckbox(clientMail, setClientMail, 'mcxCom')}
                className="w-4 h-4"
              />
              <span>MCX COM</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={clientMail.mcxNcslCom}
                onChange={() => toggleCheckbox(clientMail, setClientMail, 'mcxNcslCom')}
                className="w-4 h-4"
              />
              <span>MCX NCSL COM</span>
            </label>
          </div>
        </div>
      </div>

      {/* Connectivity Mail Control */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="bg-primary px-4 py-3 border-b border-border flex items-center justify-between">
          <h2 className="font-medium text-white text-sm">Connectivity Mail Control</h2>
          <button className="px-3 py-1.5 bg-white text-primary hover:bg-background-secondary rounded-md text-xs font-medium transition-colors">
            Update
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm mb-3 text-text-secondary">Please select to enable email sending:</p>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={connectivityMail.nseNwmlCash}
                onChange={() => toggleCheckbox(connectivityMail, setConnectivityMail, 'nseNwmlCash')}
                className="w-4 h-4"
              />
              <span>NSE NWML CASH</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={connectivityMail.bseNcslComCm}
                onChange={() => toggleCheckbox(connectivityMail, setConnectivityMail, 'bseNcslComCm')}
                className="w-4 h-4"
              />
              <span>BSE NCSL COM.CM</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={connectivityMail.bseNwml}
                onChange={() => toggleCheckbox(connectivityMail, setConnectivityMail, 'bseNwml')}
                className="w-4 h-4"
              />
              <span>BSE NWML</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={connectivityMail.ncdexNcl}
                onChange={() => toggleCheckbox(connectivityMail, setConnectivityMail, 'ncdexNcl')}
                className="w-4 h-4"
              />
              <span>NCDEX NCL</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={connectivityMail.bseNcslComTm}
                onChange={() => toggleCheckbox(connectivityMail, setConnectivityMail, 'bseNcslComTm')}
                className="w-4 h-4"
              />
              <span>BSE NCSL COM TM</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={connectivityMail.fnoNcl}
                onChange={() => toggleCheckbox(connectivityMail, setConnectivityMail, 'fnoNcl')}
                className="w-4 h-4"
              />
              <span>FNO NCL</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={connectivityMail.cdsNcl}
                onChange={() => toggleCheckbox(connectivityMail, setConnectivityMail, 'cdsNcl')}
                className="w-4 h-4"
              />
              <span>CDS NCL</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={connectivityMail.nseNcslCom}
                onChange={() => toggleCheckbox(connectivityMail, setConnectivityMail, 'nseNcslCom')}
                className="w-4 h-4"
              />
              <span>NSE NCSL COM</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={connectivityMail.mcxCom}
                onChange={() => toggleCheckbox(connectivityMail, setConnectivityMail, 'mcxCom')}
                className="w-4 h-4"
              />
              <span>MCX COM</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={connectivityMail.mcxNcslCom}
                onChange={() => toggleCheckbox(connectivityMail, setConnectivityMail, 'mcxNcslCom')}
                className="w-4 h-4"
              />
              <span>MCX NCSL COM</span>
            </label>
          </div>
        </div>
      </div>

      {/* Process Start Mail Control */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="bg-primary px-4 py-3 border-b border-border flex items-center justify-between">
          <h2 className="font-medium text-white text-sm">Process Start Mail Control</h2>
          <button className="px-3 py-1.5 bg-white text-primary hover:bg-background-secondary rounded-md text-xs font-medium transition-colors">
            Update
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm mb-3 text-text-secondary">Please select to enable email sending:</p>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={processStartMail.nseNwmlCash}
                onChange={() => toggleCheckbox(processStartMail, setProcessStartMail, 'nseNwmlCash')}
                className="w-4 h-4"
              />
              <span>NSE NWML CASH</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={processStartMail.bseNcslComCm}
                onChange={() => toggleCheckbox(processStartMail, setProcessStartMail, 'bseNcslComCm')}
                className="w-4 h-4"
              />
              <span>BSE NCSL COM.CM</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={processStartMail.bseNwml}
                onChange={() => toggleCheckbox(processStartMail, setProcessStartMail, 'bseNwml')}
                className="w-4 h-4"
              />
              <span>BSE NWML</span>
            </label>
          </div>
        </div>
      </div>

      {/* Process Stop Mail Control */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="bg-primary px-4 py-3 border-b border-border flex items-center justify-between">
          <h2 className="font-medium text-white text-sm">Process Stop Mail Control</h2>
          <button className="px-3 py-1.5 bg-white text-primary hover:bg-background-secondary rounded-md text-xs font-medium transition-colors">
            Update
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm mb-3 text-text-secondary">Please select to enable email sending:</p>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={processStopMail.nseNwmlCash}
                onChange={() => toggleCheckbox(processStopMail, setProcessStopMail, 'nseNwmlCash')}
                className="w-4 h-4"
              />
              <span>NSE NWML CASH</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={processStopMail.bseNcslComCm}
                onChange={() => toggleCheckbox(processStopMail, setProcessStopMail, 'bseNcslComCm')}
                className="w-4 h-4"
              />
              <span>BSE NCSL COM.CM</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={processStopMail.bseNwml}
                onChange={() => toggleCheckbox(processStopMail, setProcessStopMail, 'bseNwml')}
                className="w-4 h-4"
              />
              <span>BSE NWML</span>
            </label>
          </div>
        </div>
      </div>

      {/* Riskwall Start/Stop Mail Control */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="bg-primary px-4 py-3 border-b border-border flex items-center justify-between">
          <h2 className="font-medium text-white text-sm">Riskwall Start/Stop Mail Control</h2>
          <button className="px-3 py-1.5 bg-white text-primary hover:bg-background-secondary rounded-md text-xs font-medium transition-colors">
            Update
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm mb-3 text-text-secondary">Please select to enable email sending:</p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={riskwallMail.riskwallStart}
                onChange={() => toggleCheckbox(riskwallMail, setRiskwallMail, 'riskwallStart')}
                className="w-4 h-4"
              />
              <span>Riskwall Start</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={riskwallMail.riskwallStop}
                onChange={() => toggleCheckbox(riskwallMail, setRiskwallMail, 'riskwallStop')}
                className="w-4 h-4"
              />
              <span>Riskwall Stop</span>
            </label>
          </div>
        </div>
      </div>

      {/* Eod Mail Control */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="bg-primary px-4 py-3 border-b border-border flex items-center justify-between">
          <h2 className="font-medium text-white text-sm">Eod Mail Control</h2>
          <button className="px-3 py-1.5 bg-white text-primary hover:bg-background-secondary rounded-md text-xs font-medium transition-colors">
            Update
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm mb-3 text-text-secondary">Please select to enable email sending:</p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={eodMail.riskwallEod}
                onChange={() => toggleCheckbox(eodMail, setEodMail, 'riskwallEod')}
                className="w-4 h-4"
              />
              <span>Riskwall Eod</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={eodMail.riskwallPreviousDayEod}
                onChange={() => toggleCheckbox(eodMail, setEodMail, 'riskwallPreviousDayEod')}
                className="w-4 h-4"
              />
              <span>Riskwall Previous day Eod</span>
            </label>
          </div>
        </div>
      </div>

      {/* 90% And 100% Alerts Occurrence */}
      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden col-span-2">
        <div className="bg-primary px-4 py-3 border-b border-border flex items-center justify-between">
          <h2 className="font-medium text-white text-sm">90% And 100% Alerts Occurrence</h2>
          <button className="px-3 py-1.5 bg-primary-foreground text-primary hover:bg-background-secondary rounded-md text-xs font-medium transition-colors">
            Send Mail
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm mb-3 text-text-secondary">Below is the list of clients who crossed 90% notification</p>
          <div className="bg-white border border-border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-background-secondary border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-text-primary">TM Code</th>
                  <th className="text-left py-3 px-4 font-medium text-text-primary">TM Name</th>
                  <th className="text-left py-3 px-4 font-medium text-text-primary">Exchange</th>
                  <th className="text-left py-3 px-4 font-medium text-text-primary">Occurrence</th>
                </tr>
              </thead>
              <tbody>
                {alertOccurrences.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-text-secondary">
                      No data available
                    </td>
                  </tr>
                ) : (
                  alertOccurrences.map((alert, index) => (
                    <tr
                      key={alert.id}
                      className={`border-b border-border hover:bg-background-secondary transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-background'}`}
                    >
                      <td className="py-2 px-4 text-text-primary">{alert.tmCode}</td>
                      <td className="py-2 px-4 text-text-primary">{alert.tmName}</td>
                      <td className="py-2 px-4 text-text-primary">{alert.exchange}</td>
                      <td className="py-2 px-4 text-text-primary">{alert.occurrence}</td>
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
