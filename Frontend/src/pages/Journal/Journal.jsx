import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JournalForm from '../../components/Journal/JournalForm.jsx';
import JournalList from '../../components/Journal/JournalList.jsx';
import SearchFilter from '../../components/Journal/SearchFilter.jsx';

const Journal = () => {
  const [journals, setJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const response = await axios.get('/journal/allJournal');
      setJournals(response.data.journal || []);
      setFilteredJournals(response.data.journal || []);
    } catch (error) {
      console.error('Error fetching journals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJournal = async (journalData) => {
    try {
      const response = await axios.post('/journal/create-journal', journalData);
      if (response.data.success) {
        fetchJournals();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error creating journal:', error);
      throw error;
    }
  };

  const handleUpdateJournal = async (journalId, journalData) => {
    try {
      const response = await axios.put(`/journal/update-journal/${journalId}`, journalData);
      if (response.data.success) {
        fetchJournals();
        setEditingJournal(null);
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error updating journal:', error);
      throw error;
    }
  };

  const handleDeleteJournal = async (journalId) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      try {
        await axios.delete(`/journal/${journalId}`);
        fetchJournals();
      } catch (error) {
        console.error('Error deleting journal:', error);
      }
    }
  };

  const handleSearch = async (searchParams) => {
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await axios.get(`/journal/search?${queryString}`);
      setFilteredJournals(response.data.entries || []);
    } catch (error) {
      console.error('Error searching journals:', error);
    }
  };

  const handleClearSearch = () => {
    setFilteredJournals(journals);
  };

  const handleEdit = (journal) => {
    setEditingJournal(journal);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingJournal(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading journals...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Study Journal</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Add New Entry
          </button>
        </div>

        {/* Search and Filter */}
        <SearchFilter onSearch={handleSearch} onClear={handleClearSearch} />

        {/* Journal Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <JournalForm
                journal={editingJournal}
                onSubmit={editingJournal ? 
                  (data) => handleUpdateJournal(editingJournal._id, data) : 
                  handleCreateJournal
                }
                onCancel={handleCancelForm}
              />
            </div>
          </div>
        )}

        {/* Journal List */}
        <JournalList
          journals={filteredJournals}
          onEdit={handleEdit}
          onDelete={handleDeleteJournal}
        />
      </div>
    </div>
  );
};

export default Journal;