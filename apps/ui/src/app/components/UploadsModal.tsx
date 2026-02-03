interface UploadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadsModal({ isOpen, onClose }: UploadsModalProps) {
  if (!isOpen) return null;

  const uploadOptions = [
    'Nse Fno Futures Upload',
    'Nse Fno Overall Upload',
    'Bse Edx Futures Upload',
    'Bse Edx Overall Upload',
    'Voice Call Upload',
    'Email Upload',
  ];

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 z-50 transition-all"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-[500px] border border-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-primary px-4 py-3 border-b border-border flex items-center justify-between">
          <h2 className="text-white font-medium">Uploads</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 bg-background">
          <div className="grid grid-cols-2 gap-4">
            {uploadOptions.map((option) => (
              <button
                key={option}
                className="px-4 py-3 bg-white text-text-primary hover:bg-background-secondary rounded-md border border-border text-sm font-medium transition-all hover:border-primary/50 shadow-sm"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-background border-t border-border flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-2 bg-white text-text-primary hover:bg-background-secondary rounded-md border border-border text-sm font-medium transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
