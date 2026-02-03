import { useState } from 'react';
import { FlatfileProcessPanel } from '@/app/components/FlatfileProcessPanel';
import { DeleteAlertsPanel } from '@/app/components/DeleteAlertsPanel';
import { FileUploadEmailSettingsPanel } from '@/app/components/FileUploadEmailSettingsPanel';
import { UsersPanel } from '@/app/components/UsersPanel';
import { GroupsPanel } from '@/app/components/GroupsPanel';
import { SuperRiskWallMasterPanel } from '@/app/components/SuperRiskWallMasterPanel';
import { UploadsModal } from '@/app/components/UploadsModal';
import { ViewUploadsModal } from '@/app/components/ViewUploadsModal';
import { AlertsPanel } from '@/app/components/AlertsPanel';
import { MathPanel } from '@/app/components/MathPanel';
import { VoiceCallPanel } from '@/app/components/VoiceCallPanel';
import { SmsPanel } from '@/app/components/SmsPanel';

export default function App() {
  const [activeTab, setActiveTab] = useState('Prices');
  const [isUploadsModalOpen, setIsUploadsModalOpen] = useState(false);
  const [isViewUploadsModalOpen, setIsViewUploadsModalOpen] = useState(false);

  const tabs = ['Alerts', 'Users', 'Groups', 'Math', 'Prices', 'Voice Call', 'Sms', 'SuperRiskWall Master'];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-border shadow-sm">
        <h1 className="font-medium text-xl text-primary">Riskwall</h1>
        <div className="flex items-center gap-4">
          <span className="text-text-secondary text-sm">Vishnu Bhagat | Riskwall</span>
          <button
            onClick={() => setIsUploadsModalOpen(true)}
            className="px-4 py-2 bg-white border border-border text-text-primary rounded-md text-sm font-medium hover:bg-background-secondary transition-colors"
          >
            Uploads
          </button>
          <button
            onClick={() => setIsViewUploadsModalOpen(true)}
            className="px-4 py-2 bg-white border border-border text-text-primary rounded-md text-sm font-medium hover:bg-background-secondary transition-colors"
          >
            View Uploads
          </button>
          <button className="px-4 py-2 bg-white border border-border text-text-primary rounded-md text-sm font-medium hover:bg-background-secondary transition-colors">
            Cancel
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white px-6 border-b border-border shadow-sm">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium transition-all relative ${activeTab === tab
                  ? 'text-primary'
                  : 'text-text-secondary hover:text-text-primary'
                }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'Users' ? (
          <UsersPanel />
        ) : activeTab === 'Groups' ? (
          <GroupsPanel />
        ) : activeTab === 'SuperRiskWall Master' ? (
          <SuperRiskWallMasterPanel />
        ) : activeTab === 'Alerts' ? (
          <AlertsPanel />
        ) : activeTab === 'Math' ? (
          <MathPanel />
        ) : activeTab === 'Voice Call' ? (
          <VoiceCallPanel />
        ) : activeTab === 'Sms' ? (
          <SmsPanel />
        ) : (
          <div className="grid grid-cols-3 gap-6">
            <FlatfileProcessPanel />
            <DeleteAlertsPanel />
            <FileUploadEmailSettingsPanel />
          </div>
        )}
      </div>

      <UploadsModal
        isOpen={isUploadsModalOpen}
        onClose={() => setIsUploadsModalOpen(false)}
      />
      <ViewUploadsModal
        isOpen={isViewUploadsModalOpen}
        onClose={() => setIsViewUploadsModalOpen(false)}
      />
    </div>
  );
}