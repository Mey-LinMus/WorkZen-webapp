import React, { useState } from "react";

const SaveCombinationModal = ({ show, handleClose, handleSave }) => {
  const [name, setName] = useState("");

  if (!show) return null;

  const onSave = () => {
    handleSave(name);
    setName("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleClose}
      ></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-medium">Save Combination</h3>
          <button
            className="text-gray-400 hover:text-gray-500"
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="combinationName"
          >
            Combination Name
          </label>
          <input
            type="text"
            id="combinationName"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
            onClick={onSave}
            disabled={!name}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveCombinationModal;
