'use client';

import { useState } from 'react';

const EarnTab = () => {
  const [depositAmount, setDepositAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) return;

    setIsLoading(true);
    // Simulate deposit transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setDepositAmount('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Earn APY</h2>
        <p className="text-gray-600">Deposit Token 1 and start earning competitive yields</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">Current APY</span>
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div className="text-2xl font-bold text-blue-900">8.45%</div>
          <div className="text-sm text-blue-600">+0.12% from yesterday</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-700">Total Deposited</span>
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <div className="text-2xl font-bold text-green-900">$2.4M</div>
          <div className="text-sm text-green-600">+$120K this week</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-700">Your Earnings</span>
            <svg
              className="w-5 h-5 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <div className="text-2xl font-bold text-purple-900">$0.00</div>
          <div className="text-sm text-purple-600">Start depositing to earn</div>
        </div>
      </div>

      {/* Deposit Form */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Deposit Token 1</h3>
          <p className="text-gray-600">Deposit your tokens to start earning APY</p>
        </div>

        <div className="space-y-6">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Deposit
            </label>
            <div className="relative">
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-sm font-medium text-gray-500">Token 1</span>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">Available: 0.00 Token 1</span>
              <button
                onClick={() => setDepositAmount('100')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Max
              </button>
            </div>
          </div>

          {/* APY Display */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Estimated APY</span>
              <span className="text-lg font-bold text-green-600">8.45%</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm font-medium text-gray-600">Estimated Daily Earnings</span>
              <span className="text-sm font-medium text-gray-900">
                $
                {depositAmount ? ((parseFloat(depositAmount) * 0.0845) / 365).toFixed(4) : '0.0000'}
              </span>
            </div>
          </div>

          {/* Deposit Button */}
          <button
            onClick={handleDeposit}
            disabled={!depositAmount || parseFloat(depositAmount) <= 0 || isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </div>
            ) : (
              'Deposit Token 1'
            )}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-blue-600 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">How it works</h4>
            <p className="text-blue-700 text-sm">
              When you deposit Token 1, it's added to our lending pool. You earn interest based on
              the current APY rate, which compounds automatically. You can withdraw your deposits
              and earned interest at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EarnTab;
