import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllPosition } from '../../redux/admin/positionSlice';
import { getCandidate } from '../../redux/admin/candidateSlice';
import { getVoteByStudent } from '../../redux/student/voteSlice';

const ELECTION_END_TIME = new Date('2025-07-06T22:01:00');

const StudentDashboard = () => {
  const dispatch = useDispatch();

  const { positionList } = useSelector((state) => state.position);
  const { candidateList } = useSelector((state) => state.candidate);
  const { votingList } = useSelector((state) => state.vote);
  const { user } = useSelector((state) => state.auth);
  const calculateTimeLeft = () => {
    const now = new Date();
    return Math.max(0, Math.floor((ELECTION_END_TIME - now) / 1000));
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [savedUser,setSavedUser]=useState('')

  useEffect(() => {
    dispatch(getAllPosition());
    dispatch(getCandidate());
    if (user?.id) {
      dispatch(getVoteByStudent(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(()=>{
      const User = JSON.parse(sessionStorage.getItem('user')) 
      if(User){
        setSavedUser(User)
      }
  },[])

  

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
      if (newTime <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? `${h}h ` : ''}${m}m ${s}s`;
  };

  const hasVotedForPosition = (positionId) => {
    if (!votingList?.elections) return false;
    const election = votingList.elections.find(e => e.id === positionId);
    return election?.hasVoted || false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg"
      >
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-sm font-medium text-white">
              {timeLeft > 0 ? (
                <span>Election ends in <span className="font-bold">{formatTime(timeLeft)}</span></span>
              ) : (
                <span className="font-bold">Election has ended</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content or Ended Message */}
      {timeLeft > 0 ? (
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Participation Call-to-Action */}
         <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.1 }}
  className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-lg p-6 mb-10 text-white"
>
  <div className="flex flex-col md:flex-row items-center gap-6">
    <div className="flex-shrink-0">
      <div className="bg-white/20 p-4 rounded-full">
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>
    </div>
    <div>
      <h2 className="text-xl font-bold mb-2">Hi, {savedUser.fullName}</h2>
      <p className="opacity-90">
      you can view all available positions and cast your votes. 
      
      </p>
    </div>
  </div>
</motion.div>

          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Open Positions
                  <span className="ml-2 text-indigo-600">
                    ({positionList?.positions?.length || 0})
                  </span>
                </h2>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>
                    {candidateList?.candidates?.length || 0} candidates
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {positionList?.positions?.map((position, index) => {
                const relatedCandidates = candidateList?.candidates?.filter(
                  (c) => c.position?._id === position._id || c.position === position._id
                ) || [];

                const hasVoted = hasVotedForPosition(position._id);

                return (
                  <motion.div
                    key={position._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{position.title}</h3>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            hasVoted ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {hasVoted ? 'Voted ✓' : 'Not Voted'}
                        </span>
                      </div>

                      {position.description && (
                        <p className="text-gray-600 mb-6 line-clamp-2">
                          {position.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-4 mb-6">
                      
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {relatedCandidates.length} candidate{relatedCandidates.length !== 1 ? 's' : ''}
                        </div>
                      </div>

                      <Link
                        to={`/student/positions/${position._id}`}
                        className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold text-white ${
                          hasVoted 
                            ? 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700' 
                            : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700'
                        } transition-all duration-300 shadow-sm hover:shadow-md`}
                      >
                        {hasVoted ? 'View Your Vote' : 'Vote Now'}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </main>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Election Ended</h2>
            <p className="text-gray-600 mb-6">Thank you for participating in the election!</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StudentDashboard;