import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface NotesEditorProps {
  notes: string[];
  onChange: (notes: string[]) => void;
}

const NotesEditor: React.FC<NotesEditorProps> = ({ notes, onChange }) => {
  const addNote = () => {
    onChange([...notes, '']);
  };

  const updateNote = (index: number, value: string) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    onChange(updatedNotes);
  };

  const removeNote = (index: number) => {
    onChange(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">備考</h3>
        <button
          onClick={addNote}
          className="flex items-center px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800"
        >
          <Plus className="h-4 w-4 mr-1" />
          追加
        </button>
      </div>
      <div className="space-y-2">
        {notes.map((note, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={note}
              onChange={(e) => updateNote(index, e.target.value)}
              placeholder="備考を入力..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={() => removeNote(index)}
              className="p-2 text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesEditor;