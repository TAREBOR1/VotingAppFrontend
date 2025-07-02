import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const CandidateModal = ({ candidate, isOpen, onClose, onVote, canVote }) => {
  if (!candidate) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Candidate Profile: ${candidate.name}`} size="lg">
      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 p-4">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
              src={candidate.image || '/default-avatar.png'}
              alt={`${candidate.name}'s profile`}
              onError={(e) => (e.target.src = '/default-avatar.png')}
            />
            {!canVote && (
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Voted
              </div>
            )}
          </div>
          <h3 className="mt-4 text-xl font-bold text-gray-900">{candidate.name}</h3>
        </div>

        <div className="flex-1 bg-gray-50 rounded-lg p-6">

          {candidate.manifesto && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Manifesto</h4>
              <div className="bg-white p-4 rounded-md border border-gray-200">
                <p className="text-gray-700 whitespace-pre-line">{candidate.manifesto}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {canVote && (
        <div className="mt-6 flex justify-center sm:justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={() => { onVote(); onClose(); }}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Vote for {candidate.name.split(' ')[0]}
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default CandidateModal;