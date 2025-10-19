'use client';

interface EditModalProps {
  editingField: string | null;
  editValue: string;
  setEditValue: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function EditModal({ editingField, editValue, setEditValue, onSave, onCancel }: EditModalProps) {
  if (!editingField) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-light-bg dark:bg-dark-secondary border border-black p-4 sm:p-6 max-w-md w-full" style={{ boxShadow: '4px 4px 0 0 #000' }}>
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-light-text dark:text-dark-text">
            Edit your {editingField}
          </h3>
          <button
            onClick={onCancel}
            className="w-7 h-7 bg-[#FF9169] border border-black flex items-center justify-center hover:bg-[#ff7b4d] transition-colors"
            style={{ boxShadow: '2px 2px 0 0 #000' }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="black" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2 capitalize">
            {editingField}
          </label>
          <input
            type={editingField === 'password' ? 'password' : editingField === 'email' ? 'email' : 'text'}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-black bg-light-secondary dark:bg-dark-tertiary text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-[#FF9169] text-sm sm:text-base"
            placeholder={`Enter your ${editingField}`}
          />
        </div>

        <button
          onClick={onSave}
          className="w-full py-2 sm:py-3 bg-[#FF9169] border border-black text-light-text dark:text-dark-text font-medium hover:bg-[#ff7b4d] transition-colors text-sm sm:text-base"
          style={{ boxShadow: '2px 2px 0 0 #000' }}
        >
          Confirm {editingField === 'email' ? 'Email' : editingField.charAt(0).toUpperCase() + editingField.slice(1)}
        </button>
      </div>
    </div>
  );
}