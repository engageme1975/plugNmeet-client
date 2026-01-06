import React, { useState, useEffect } from 'react';
import { store } from '../../store';

const InviteButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [copied, setCopied] = useState(false);
  const [includeAdminParams, setIncludeAdminParams] = useState(false);

  useEffect(() => {
    const session = store.getState().session;
    const room = session.currentRoom.roomId;
    const currentUser = session.currentUser;
    // Check if user is admin based on metadata or explicit flag
    const admin = !!currentUser?.metadata?.isAdmin;

    setRoomId(room);
    setIsAdmin(admin);
  }, []);

  if (!roomId) return null;

  const generateLink = () => {
    const baseUrl = window.location.origin + '/login.html';
    let link = `${baseUrl}?room_id=${encodeURIComponent(roomId)}`;
    if (includeAdminParams) {
      link += '&joinasadmin';
    }
    return link;
  };

  const copyToClipboard = () => {
    const link = generateLink();
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="ml-2 flex items-center justify-center gap-1 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-white px-3 py-1.5 text-xs font-semibold hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
        title="Invite Participants"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
        <span>Invite</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white dark:bg-dark-secondary rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animation-fade-in-up">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Invite Participants
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
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
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Share this link to invite users to:{' '}
                <span className="font-semibold text-primary-600">{roomId}</span>
              </p>

              <div className="relative mb-5">
                <input
                  type="text"
                  readOnly
                  value={generateLink()}
                  className="w-full bg-gray-50 dark:bg-dark-primary border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-3 pr-24 font-mono"
                />
                <button
                  onClick={copyToClipboard}
                  className={`absolute right-1 top-1 bottom-1 px-4 rounded-md text-xs font-semibold text-white transition-all duration-200 ${
                    copied
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-primary-500 hover:bg-primary-600'
                  }`}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {isAdmin && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
                  <input
                    type="checkbox"
                    id="admin-link-toggle"
                    checked={includeAdminParams}
                    onChange={(e) => setIncludeAdminParams(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="admin-link-toggle"
                    className="text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer select-none"
                  >
                    Include Admin Access Request
                    <span className="block text-xs text-gray-500 dark:text-gray-400 font-normal mt-0.5">
                      Recipients will be prompted to login as admin
                    </span>
                  </label>
                </div>
              )}
            </div>

            <div className="bg-gray-50 dark:bg-dark-primary/50 px-6 py-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-white dark:bg-dark-secondary text-gray-700 dark:text-gray-200 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InviteButton;
