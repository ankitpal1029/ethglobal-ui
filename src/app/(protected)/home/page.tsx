import { auth } from '@/auth';
import { LendingProtocol } from '@/components/LendingProtocol';
import { Page } from '@/components/PageLayout';
import { UserInfo } from '@/components/UserInfo';
import WalletConnected from '@/components/WalletConnected';
import { Marble, TopBar } from '@worldcoin/mini-apps-ui-kit-react';

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">DeFi Lending Protocol</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Deposit, borrow, and earn with the most competitive rates in DeFi
          </p>
        </div>
        <WalletConnected />

        <LendingProtocol />
      </div>
    </div>
  );
}
