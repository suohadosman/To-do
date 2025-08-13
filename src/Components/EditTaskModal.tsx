import React, { useState, useEffect } from "react";
import { X, Save, Pencil } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  taskText: string;
  onSave: (newText: string) => void;
}

const EditTaskModal: React.FC<Props> = ({ isOpen, onClose, taskText, onSave }) => {
  const [text, setText] = useState(taskText);

  useEffect(() => {
    setText(taskText);
  }, [taskText]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Pencil className="text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">Edit Task</h3>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          rows={4}
          placeholder="Edit your task..."
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
          >
            <X size={18} />
            Cancel
          </button>
          <button
            onClick={() => {
              if (text.trim()) {
                onSave(text.trim());
                onClose();
              }
            }}
            className="flex items-center gap-1 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            <Save size={18} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
