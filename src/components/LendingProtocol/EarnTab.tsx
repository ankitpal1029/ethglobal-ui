'use client';

import { useState } from 'react';
import { useUSDCBalance } from '@/hooks/useUSDCBalance';
import { MiniKit } from '@worldcoin/minikit-js';
import { contractsConfig } from '@/contracts';
import { useWaitForTransactionReceipt } from '@worldcoin/minikit-react';
import { client } from '@/contracts/client';
import { usePrivy } from '@privy-io/react-auth';
import { useDeposited } from '@/hooks/useDeposited';
import BigNumber from 'bignumber.js';

const EarnTab = () => {
  const { user } = usePrivy();
  const [depositAmount, setDepositAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: usdcBalance } = useUSDCBalance();
  const [transactionId, setTransactionId] = useState('');
  const { data: deposited } = useDeposited();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    client: client,
    appConfig: {
      app_id: 'app_c9630568fd794f9b33abac9d26cae36f',
    },
    transactionId: transactionId,
  });

  console.log(isConfirming, isConfirmed);

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) return;

    await onClickUsePermit2();
    // setIsLoading(true);
    // // Simulate deposit transaction
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setDepositAmount('');
  };

  const onClickUsePermit2 = async () => {
    // Permit2 is valid for max 1 hour
    const permitTransfer = {
      permitted: {
        token: contractsConfig.USDC.address, // The token I'm sending
        amount: (Number(depositAmount) * 10 ** 18).toString(),
      },
      nonce: Date.now().toString(),
      deadline: Math.floor((Date.now() + 10 * 1000) / 1000).toString(),
    };

    const transferDetails = {
      to: contractsConfig.LendingHook.address,
      requestedAmount: (Number(depositAmount) * 10 ** 18).toString(),
    };
    console.log(Math.floor(Number(depositAmount) * 10 ** 18).toString(), user?.wallet?.address);

    try {
      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: contractsConfig.LendingHook.address,
            abi: contractsConfig.LendingHook.abi,
            functionName: 'earn',
            args: [
              [
                [permitTransfer.permitted.token, permitTransfer.permitted.amount],
                permitTransfer.nonce,
                permitTransfer.deadline,
              ],
              [transferDetails.to, transferDetails.requestedAmount],
              'PERMIT2_SIGNATURE_PLACEHOLDER_0', // Placeholders will automatically be replaced with the correct signature.
              [
                contractsConfig.YGT.address,
                contractsConfig.USDC.address,
                '5000',
                '100',
                contractsConfig.LendingHook.address,
              ],
              // POOL_ID,
              Math.floor(Number(depositAmount) * 10 ** 18).toString(),
              user?.wallet?.address,
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
  };

  return (
    <>
      <div className="bg-[#181c2a]/90 rounded-2xl shadow-xl border border-white/10 p-8 mb-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Earn APY</h2>
            <p className="text-gray-300">Deposit USDC and start earning competitive yields</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-900/60 rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-300">Current APY</span>
                <svg
                  className="w-5 h-5 text-blue-400"
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
              <div className="text-2xl font-bold text-blue-200">8.45%</div>
              <div className="text-sm text-blue-400">+0.12% from yesterday</div>
            </div>

            <div className="bg-green-900/60 rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-300">Total Deposited</span>
                <svg
                  className="w-5 h-5 text-green-400"
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
              <div className="text-2xl font-bold text-green-200">
                {deposited ? BigNumber(deposited).div(1e18).toFixed(2) : '0.00'}
              </div>
            </div>

            <div className="bg-purple-900/60 rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-purple-300">Your Earnings</span>
                <svg
                  className="w-5 h-5 text-purple-400"
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
              <div className="text-2xl font-bold text-purple-200">$0.00</div>
              <div className="text-sm text-purple-400">Start depositing to earn</div>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Form */}
      <div className="bg-[#23243a]/80 rounded-2xl p-8 border border-white/10 mb-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Deposit USDC</h3>
          <p className="text-gray-400">Deposit your tokens to start earning APY</p>
        </div>

        <div className="space-y-6">
          {/* Amount Input */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount to Deposit
              </label>
              <button
                onClick={() => setDepositAmount(usdcBalance?.formattedBalance || '0')}
                className="text-sm text-blue-400 hover:text-blue-300 font-medium"
              >
                Max
              </button>
            </div>
            <div className="flex items-center justify-between w-full px-4 py-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-[#181c2a]/80">
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="0.00"
                className="w-24 text-blue-300 bg-transparent outline-none"
              />
              <div className="">
                <span className="text-sm font-medium text-gray-400">USDC</span>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">
                Available: {usdcBalance?.formattedBalance} USDC
              </span>
            </div>
          </div>

          {/* APY Display */}
          <div className="bg-[#181c2a]/80 rounded-xl p-4 border border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-400">Estimated APY</span>
              <span className="text-lg font-bold text-green-400">8.45%</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm font-medium text-gray-400">Estimated Daily Earnings</span>
              <span className="text-sm font-medium text-blue-200">
                $
                {depositAmount ? ((parseFloat(depositAmount) * 0.0845) / 365).toFixed(4) : '0.0000'}
              </span>
            </div>
          </div>

          {/* Deposit Button */}
          <button
            onClick={handleDeposit}
            disabled={!depositAmount || parseFloat(depositAmount) <= 0 || isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700  transition-all duration-200 shadow-lg"
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
              'Deposit USDC'
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
              When you deposit USDC, it's added to our lending pool. You earn interest based on the
              current APY rate, which compounds automatically. You can withdraw your deposits and
              earned interest at any time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default EarnTab;
