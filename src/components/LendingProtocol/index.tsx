'use client';

import { useState } from 'react';
import EarnTab from './EarnTab';
import BorrowTab from './BorrowTab';
import { usePrivy } from '@privy-io/react-auth';

export const LendingProtocol = () => {
  const [activeTab, setActiveTab] = useState<'earn' | 'borrow'>('earn');
  const { user } = usePrivy();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex bg-white rounded-2xl shadow-lg p-2 mb-8">
        <button
          onClick={() => setActiveTab('earn')}
          className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
            activeTab === 'earn'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
            Earn
          </div>
        </button>
        <button
          onClick={() => setActiveTab('borrow')}
          className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
            activeTab === 'borrow'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            Borrow
          </div>
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {activeTab === 'earn' ? <EarnTab /> : <BorrowTab />}
      </div>
    </div>
  );
};
