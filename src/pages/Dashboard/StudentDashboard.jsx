import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllPosition } from '../../redux/admin/positionSlice';
import { getCandidate } from '../../redux/admin/candidateSlice';
import { getVoteByStudent } from '../../redux/student/voteSlice';

const StudentDashboard = () => {
  const dispatch = useDispatch();

  const { positionList } = useSelector((state) => state.position);
  const { candidateList } = useSelector((state) => state.candidate);
  const { votingList } = useSelector((state) => state.vote);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllPosition());
    dispatch(getCandidate());
    if (user?.id) {
      dispatch(getVoteByStudent(user.id));
    }
  }, [dispatch, user?.id]);

  const hasVotedForPosition = (positionId) => {
    if (!votingList?.elections) return false;
    const election = votingList.elections.find(e => e.id === positionId);
    return election?.hasVoted || false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Marquee */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <svg className="h-6 w-6 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="overflow-hidden whitespace-nowrap">
              <div className="inline-block animate-marquee whitespace-nowrap text-sm font-semibold text-white">
                Election results will be announced today by 6 PM • Election results will be announced today by 6 PM
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Student Dashboard
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Participate in your student elections
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <section className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Open Positions <span className="text-indigo-600">({positionList?.positions?.length || 0})</span>
            </h2>
            <Link 
              to="/past-elections" 
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              View Past Elections
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {positionList?.positions?.map((position) => {
              const relatedCandidates = candidateList?.candidates?.filter(
                (c) => c.position === position._id
              ) || [];
              const hasVoted = hasVotedForPosition(position._id);

              return (
                <div
                  key={position._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{position.title}</h3>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          hasVoted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {hasVoted ? 'Voted ✓' : 'Not Voted'}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-6">
                      {position.description || 'No description provided'}
                    </p>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-500">
                          Ends {new Date(position.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-sm text-gray-500">
                          {relatedCandidates.length} candidate{relatedCandidates.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/student/positions/${position._id}`}
                      className={`w-full flex items-center justify-center px-6 py-3 rounded-lg shadow-sm text-sm font-semibold text-white ${
                        hasVoted 
                          ? 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700' 
                          : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700'
                      } transition-all duration-300`}
                    >
                      {hasVoted ? 'View Your Vote' : 'Vote Now'}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;