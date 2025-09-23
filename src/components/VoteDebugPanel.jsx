import React, { useState, useEffect } from 'react';
import { X, Trash2, Eye, EyeOff } from 'lucide-react';
import voteManager from '../utils/voteManager.js';

const VoteDebugPanel = ({ isOpen, onClose }) => {
  const [voteStats, setVoteStats] = useState({ totalVotes: 0, votedPandals: [] });
  const [showPandalIds, setShowPandalIds] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVoteStats(voteManager.getVoteStats());
    }
  }, [isOpen]);

  const handleClearAllVotes = () => {
    if (window.confirm('Are you sure you want to clear all votes? This cannot be undone.')) {
      voteManager.clearAllVotes();
      setVoteStats({ totalVotes: 0, votedPandals: [] });
    }
  };

  const handleRemoveVote = (pandalId) => {
    if (window.confirm(`Remove vote for pandal: ${pandalId}?`)) {
      voteManager.removeVote(pandalId);
      setVoteStats(voteManager.getVoteStats());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-inter font-bold text-text-primary">Vote Debug Panel</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Statistics */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-inter font-semibold text-text-primary mb-2">Vote Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{voteStats.totalVotes}</div>
                <div className="text-sm text-gray-600">Total Votes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{voteStats.votedPandals.length}</div>
                <div className="text-sm text-gray-600">Unique Pandals</div>
              </div>
            </div>
          </div>

          {/* Voted Pandals List */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-inter font-semibold text-text-primary">Voted Pandals</h3>
              <button
                onClick={() => setShowPandalIds(!showPandalIds)}
                className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {showPandalIds ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                <span className="text-sm">{showPandalIds ? 'Hide' : 'Show'} IDs</span>
              </button>
            </div>
            
            {voteStats.votedPandals.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🗳️</div>
                <p>No votes recorded yet</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {voteStats.votedPandals.map((pandalId, index) => (
                  <div key={pandalId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold mr-3">
                        {index + 1}
                      </span>
                      <div>
                        {showPandalIds ? (
                          <span className="font-mono text-sm text-gray-600">{pandalId}</span>
                        ) : (
                          <span className="text-sm text-gray-800">Pandal #{index + 1}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveVote(pandalId)}
                      className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors"
                      title="Remove this vote"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleClearAllVotes}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-inter font-semibold transition-colors"
            >
              Clear All Votes
            </button>
            <button
              onClick={() => setVoteStats(voteManager.getVoteStats())}
              className="flex-1 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-inter font-semibold transition-colors"
            >
              Refresh Stats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteDebugPanel;
