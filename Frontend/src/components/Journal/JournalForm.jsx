import React, { useState, useEffect } from 'react';

const JournalForm = ({ journal, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    topicName: '',
    description: '',
    studyDuration: '',
    difficultyLevel: 'Easy'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (journal) {
      setFormData({
        topicName: journal.topicName || '',
        description: journal.description || '',
        studyDuration: journal.studyDuration || '',
        difficultyLevel: journal.difficultyLevel || 'Easy'
      });
    }
  }, [journal]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit(formData);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save journal entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {journal ? 'Edit Journal Entry' : 'Add New Journal Entry'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topic Name
          </label>
          <input
            type="text"
            name="topicName"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter topic name"
            value={formData.topicName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            required
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Describe what you studied"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Study Duration (hours)
          </label>
          <input
            type="number"
            name="studyDuration"
            required
            min="0.5"
            step="0.5"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter hours studied"
            value={formData.studyDuration}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty Level
          </label>
          <select
            name="difficultyLevel"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.difficultyLevel}
            onChange={handleChange}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (journal ? 'Update' : 'Save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JournalForm;