import React from 'react';

const JournalList = ({ journals, onEdit, onDelete }) => {
  if (journals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No journal entries found.</p>
        <p className="text-gray-400 text-sm mt-2">Start by adding your first study session!</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {journals.map((journal) => (
          <li key={journal._id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-indigo-600 truncate">
                    {journal.topicName}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {journal.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      Duration: {journal.studyDuration} hours
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(journal.difficultyLevel)}`}>
                      {journal.difficultyLevel}
                    </span>
                    {journal.createdAt && (
                      <span className="text-sm text-gray-500">
                        {formatDate(journal.createdAt)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(journal)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(journal._id)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JournalList;