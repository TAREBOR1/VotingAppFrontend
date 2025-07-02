import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const VoteConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const candidate = state?.candidate || {
    _id: 'dummyCandidateId',
    name: 'Alex Johnson',
    positionTitle: 'President',
    positionId: 'dummyPositionId',
    image: '/avatars/alex.jpg',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="bg-green-100 rounded-full p-4 inline-flex items-center justify-center mb-6 shadow-lg"
        >
          <svg
            className="h-16 w-16 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-gray-900 mb-3"
        >
          Vote Submitted Successfully!
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600"
        >
          Thank you for participating in the election
        </motion.p>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden mb-10 border border-gray-100"
      >
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-4 text-center">
          <h2 className="text-xl font-bold text-white">Your Vote Summary</h2>
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <img
                className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
                src={candidate.image}
                alt={candidate.name}
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Voted
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-gray-900">{candidate.name}</h3>
              <p className="text-lg text-gray-600 mb-2">{candidate.positionTitle}</p>
              <div className="bg-blue-50 rounded-lg px-4 py-2 inline-block">
                <p className="text-blue-700 font-medium">
                  You voted for {candidate.name} as {candidate.positionTitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row justify-center gap-4"
      >
        <Button
          onClick={() => navigate('/student')}
          variant="secondary"
          className="w-full sm:w-auto px-8 py-3 text-lg"
        >
          Back to Election
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default VoteConfirmation;