'use client';

import { useState } from 'react';

const BorrowTab = () => {
  const [supplyAmount, setSupplyAmount] = useState('');
  const [borrowAmount, setBorrowAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSupply = async () => {
    if (!supplyAmount || parseFloat(supplyAmount) <= 0) return;

    setIsLoading(true);
    // Simulate supply transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setSupplyAmount('');
  };

  const handleBorrow = async () => {
    if (!borrowAmount || parseFloat(borrowAmount) <= 0) return;

    setIsLoading(true);
    // Simulate borrow transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setBorrowAmount('');
  };

  // Calculate max borrow based on supply amount
  const maxBorrow = supplyAmount ? parseFloat(supplyAmount) * 0.75 : 0; // 75% collateral ratio
  const healthFactor =
    supplyAmount && borrowAmount ? (parseFloat(supplyAmount) * 0.75) / parseFloat(borrowAmount) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Borrow Assets</h2>
        <p className="text-gray-600">Supply Token 0 as collateral and borrow Token 1</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-orange-700">Borrow Rate</span>
            <svg
              className="w-5 h-5 text-orange-600"
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
          <div className="text-2xl font-bold text-orange-900">12.5%</div>
          <div className="text-sm text-orange-600">Variable rate</div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-red-700">Collateral Ratio</span>
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-2xl font-bold text-red-900">75%</div>
          <div className="text-sm text-red-600">Minimum required</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-yellow-700">Health Factor</span>
            <svg
              className="w-5 h-5 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div
            className={`text-2xl font-bold ${
              healthFactor > 1.5
                ? 'text-green-600'
                : healthFactor > 1
                ? 'text-yellow-600'
                : 'text-red-600'
            }`}
          >
            {healthFactor.toFixed(2)}
          </div>
          <div className="text-sm text-yellow-600">
            {healthFactor > 1.5 ? 'Safe' : healthFactor > 1 ? 'Warning' : 'Danger'}
          </div>
        </div>
      </div>

      {/* Supply Form */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Supply Token 0 (Collateral)</h3>
          <p className="text-gray-600">Supply Token 0 as collateral to enable borrowing</p>
        </div>

        <div className="space-y-6">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Supply</label>
            <div className="relative">
              <input
                type="number"
                value={supplyAmount}
                onChange={(e) => setSupplyAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-sm font-medium text-gray-500">Token 0</span>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">Available: 0.00 Token 0</span>
              <button
                onClick={() => setSupplyAmount('100')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Max
              </button>
            </div>
          </div>

          {/* Supply Button */}
          <button
            onClick={handleSupply}
            disabled={!supplyAmount || parseFloat(supplyAmount) <= 0 || isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
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
              'Supply Token 0'
            )}
          </button>
        </div>
      </div>

      {/* Borrow Form */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Borrow Token 1</h3>
          <p className="text-gray-600">Borrow Token 1 against your supplied collateral</p>
        </div>

        <div className="space-y-6">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Borrow</label>
            <div className="relative">
              <input
                type="number"
                value={borrowAmount}
                onChange={(e) => setBorrowAmount(e.target.value)}
                placeholder="0.00"
                max={maxBorrow}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-sm font-medium text-gray-500">Token 1</span>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">
                Max borrow: {maxBorrow.toFixed(2)} Token 1
              </span>
              <button
                onClick={() => setBorrowAmount(maxBorrow.toFixed(2))}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Max
              </button>
            </div>
          </div>

          {/* Borrow Rate Display */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Borrow Rate</span>
              <span className="text-lg font-bold text-orange-600">12.5%</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm font-medium text-gray-600">
                Estimated Interest (30 days)
              </span>
              <span className="text-sm font-medium text-gray-900">
                ${borrowAmount ? ((parseFloat(borrowAmount) * 0.125) / 12).toFixed(4) : '0.0000'}
              </span>
            </div>
          </div>

          {/* Borrow Button */}
          <button
            onClick={handleBorrow}
            disabled={
              !borrowAmount ||
              parseFloat(borrowAmount) <= 0 ||
              parseFloat(borrowAmount) > maxBorrow ||
              isLoading
            }
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
              'Borrow Token 1'
            )}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-orange-600 mt-0.5"
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
            <h4 className="font-semibold text-orange-900 mb-1">How borrowing works</h4>
            <p className="text-orange-700 text-sm">
              First supply Token 0 as collateral, then borrow Token 1 up to 75% of your collateral
              value. Monitor your health factor - if it drops below 1.0, your position may be
              liquidated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BorrowTab;
