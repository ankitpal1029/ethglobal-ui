'use client';

import { useState } from 'react';
import Spinner from '../shared/Spinner';
import { useYGTBalance } from '@/hooks/useYGTBalance';
import { useFetchUserPosition } from '@/hooks/useFetchUserNft';
import { contractsConfig } from '@/contracts';
import { usePrivy } from '@privy-io/react-auth';
import { MiniKit } from '@worldcoin/minikit-js';
import { client } from '@/contracts/client';
import { useWaitForTransactionReceipt } from '@worldcoin/minikit-react';
import { NFT_ID } from '@/contracts/constants';
import { usePoolPrice } from '@/hooks/usePoolPrice';
import BigNumber from 'bignumber.js';

const BorrowTab = () => {
  const [supplyAmount, setSupplyAmount] = useState('');
  const [borrowAmount, setBorrowAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: ygtBalance } = useYGTBalance();
  const { data: userPosition } = useFetchUserPosition();
  const { user } = usePrivy();
  const [transactionId, setTransactionId] = useState('');
  const { data: poolPrice } = usePoolPrice();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    client: client,
    appConfig: {
      app_id: 'app_c9630568fd794f9b33abac9d26cae36f',
    },
    transactionId: transactionId,
  });

  const handleSupply = async () => {
    if (!supplyAmount || parseFloat(supplyAmount) <= 0) return;

    setIsLoading(true);
    // Permit2 is valid for max 1 hour
    const permitTransfer = {
      permitted: {
        token: contractsConfig.YGT.address, // The token I'm sending
        amount: (Number(supplyAmount) * 10 ** 18).toString(),
      },
      nonce: Date.now().toString(),
      deadline: Math.floor((Date.now() + 10 * 1000) / 1000).toString(),
    };

    const transferDetails = {
      to: contractsConfig.LendingHook.address,
      requestedAmount: (Number(supplyAmount) * 10 ** 18).toString(),
    };
    console.log(Math.floor(Number(supplyAmount) * 10 ** 18).toString(), user?.wallet?.address);

    try {
      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: contractsConfig.LendingHook.address,
            abi: contractsConfig.LendingHook.abi,
            functionName: 'supply',
            args: [
              [
                [permitTransfer.permitted.token, permitTransfer.permitted.amount],
                permitTransfer.nonce,
                permitTransfer.deadline,
              ],
              [transferDetails.to, transferDetails.requestedAmount],
              'PERMIT2_SIGNATURE_PLACEHOLDER_0', // Placeholders will automatically be replaced with the correct signature.
              NFT_ID, // NFT_ID
              [
                contractsConfig.YGT.address,
                contractsConfig.USDC.address,
                '5000',
                '100',
                contractsConfig.LendingHook.address,
              ],
              Math.floor(Number(supplyAmount) * 10 ** 18).toString(),
            ],
          },
        ],
        permit2: [
          {
            ...permitTransfer,
            spender: contractsConfig.LendingHook.address,
          }, // If you have more than one permit2 you can add more values here.
        ],
      });

      if (finalPayload.status === 'error') {
        console.error('Error sending transaction', finalPayload);
      } else {
        console.log(finalPayload.transaction_id);
        setTransactionId(finalPayload.transaction_id);
      }
    } catch (error) {
      console.error(error);
    }

    // Simulate supply transaction
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setSupplyAmount('');
  };

  const handleBorrow = async () => {
    if (!borrowAmount || parseFloat(borrowAmount) <= 0) return;

    setIsLoading(true);

    try {
      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: contractsConfig.LendingHook.address,
            abi: contractsConfig.LendingHook.abi,
            functionName: 'borrow',
            args: [
              NFT_ID,
              [
                contractsConfig.YGT.address,
                contractsConfig.USDC.address,
                '5000',
                '100',
                contractsConfig.LendingHook.address,
              ],
              Math.floor(Number(borrowAmount) * 10 ** 18).toString(),
            ],
          },
        ],
      });
      if (finalPayload.status === 'error') {
        console.error('Error sending transaction', finalPayload);
      } else {
        console.log(finalPayload.transaction_id);
        setTransactionId(finalPayload.transaction_id);
      }
    } catch (error) {
      console.error(error);
    }

    // Simulate borrow transaction
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setBorrowAmount('');
  };

  // Calculate max borrow based on supply amount
  const maxBorrow = supplyAmount ? parseFloat(supplyAmount) * 0.8 : 0; // 75% collateral ratio

  const collateralRatio = BigNumber(userPosition.borrowedAmt)
    .div(userPosition.collateralAmt)
    .times(poolPrice)
    .times(100)
    .toNumber();

  return (
    <>
      <div className="bg-[#181c2a]/90 rounded-2xl shadow-xl border border-white/10 p-8 mb-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Borrow Assets</h2>
            <p className="text-white">Supply YGT as collateral and borrow USDC</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#23243a]/80 rounded-xl p-6 border border-orange-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-200">Borrow Rate</span>
                <svg
                  className="w-5 h-5 text-orange-400"
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
              <div className="text-2xl font-bold text-orange-300">12.5%</div>
              <div className="text-sm text-gray-400">Variable rate</div>
            </div>

            <div className="bg-[#23243a]/80 rounded-xl p-6 border border-orange-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-200">Debt Info</span>
                <svg
                  className="w-5 h-5 text-orange-400"
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
              <div className="text-2xl font-bold text-orange-300 flex justify-between">
                <p className="">borrowed:</p>
                <p>{BigNumber(userPosition.borrowedAmt).div(1e18).toFixed(2)}</p>
              </div>
              <div className="text-sm text-gray-400 flex justify-between">
                <p className="">collateral:</p>
                <p>{BigNumber(userPosition.collateralAmt).div(1e18).toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-400">Pool Price:</p>
                <p className="text-sm text-gray-400">{poolPrice}</p>
              </div>
            </div>

            <div className="bg-[#23243a]/80 rounded-xl p-6 border border-red-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-200">Collateral Ratio</span>
                <svg
                  className="w-5 h-5 text-red-400"
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
              <div className="text-2xl font-bold text-red-300">{collateralRatio.toFixed(2)}%</div>
            </div>

            <div className="bg-[#23243a]/80 rounded-xl p-6 border border-yellow-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-200">Health Factor</span>
                <svg
                  className="w-5 h-5 text-yellow-400"
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
                  collateralRatio / 100 < 0.75
                    ? 'text-green-300'
                    : collateralRatio / 100 < 0.9
                    ? 'text-yellow-300'
                    : 'text-red-300'
                }`}
              >
                {userPosition.isFullyLiquidated ? 'Fully Liquidated' : 'Not Liquidated'}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Supply Form */}
      <div className="bg-[#23243a]/80 rounded-2xl p-8 border border-white/10 mb-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Supply YGT (Collateral)</h3>
          <p className="text-gray-400">Supply YGT as collateral to enable borrowing</p>
        </div>

        <div className="space-y-6">
          {/* Amount Input */}
          <div>
            <div className="flex justify-between mt-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount to Supply
              </label>
              <button
                onClick={() => setSupplyAmount(ygtBalance?.formattedBalance || '0')}
                className="text-sm text-blue-400 hover:text-blue-300 font-medium"
              >
                Max
              </button>
            </div>
            <div className="flex items-center justify-between w-full px-4 py-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-[#181c2a]/80">
              <input
                type="number"
                value={supplyAmount}
                onChange={(e) => setSupplyAmount(e.target.value)}
                placeholder="0.00"
                className="w-24 text-blue-300 bg-transparent outline-none"
              />
              <div className="">
                <span className="text-sm font-medium text-gray-400">YGT</span>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">
                Available: {ygtBalance?.formattedBalance} YGT
              </span>
            </div>
          </div>

          {/* Supply Button */}
          <button
            onClick={handleSupply}
            disabled={!supplyAmount || parseFloat(supplyAmount) <= 0 || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner />
                Processing...
              </div>
            ) : (
              'Supply YGT'
            )}
          </button>
        </div>
      </div>

      {/* Borrow Form */}
      <div className="bg-[#23243a]/80 rounded-2xl p-8 border border-white/10 mb-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Borrow USDC</h3>
          <p className="text-gray-400">Borrow USDC against your supplied collateral</p>
        </div>

        <div className="space-y-6">
          {/* Amount Input */}
          <div>
            <div className="flex justify-between mt-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount to Borrow
              </label>
              <button
                onClick={() => setBorrowAmount(maxBorrow.toFixed(2))}
                className="text-sm text-blue-400 hover:text-blue-300 font-medium"
              >
                Max
              </button>
            </div>
            <div className="flex items-center justify-between w-full px-4 py-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-[#181c2a]/80">
              <input
                type="number"
                value={borrowAmount}
                onChange={(e) => setBorrowAmount(e.target.value)}
                placeholder="0.00"
                max={maxBorrow}
                className="w-24 text-blue-300 bg-transparent outline-none"
              />
              <div className="">
                <span className="text-sm font-medium text-gray-400">USDC</span>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">Max borrow: {maxBorrow.toFixed(2)} USDC</span>
            </div>
          </div>

          {/* Borrow Rate Display */}
          <div className="bg-[#181c2a]/80 rounded-xl p-4 border border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-300">Borrow Rate</span>
              <span className="text-lg font-bold text-orange-400">12.5%</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm font-medium text-gray-300">
                Estimated Interest (30 days)
              </span>
              <span className="text-sm font-medium text-blue-200">
                ${borrowAmount ? ((parseFloat(borrowAmount) * 0.125) / 12).toFixed(4) : '0.0000'}
              </span>
            </div>
          </div>

          {/* Borrow Button */}
          <button
            onClick={handleBorrow}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner />
                Processing...
              </div>
            ) : (
              'Borrow USDC'
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
              First supply YGT as collateral, then borrow USDC up to 90% of your collateral value
              due to efficient liquidations. Monitor your health factor - if your debt/collateral
              goes above 0.95 you will be liquidated.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default BorrowTab;
