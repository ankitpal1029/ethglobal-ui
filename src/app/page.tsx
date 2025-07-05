'use client';
import { AuthButton } from '@/components/AuthButton';
import { LendingProtocol } from '@/components/LendingProtocol';
import { Page } from '@/components/PageLayout';
import { usePrivy } from '@privy-io/react-auth';

export default function Home() {
  const { ready, authenticated, user } = usePrivy();
  console.log({ authenticated, ready, user });

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    // return <div>Not authenticated</div>;
    return (
      <Page>
        <Page.Main className="flex flex-col items-center justify-center">
          <AuthButton />
        </Page.Main>
      </Page>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">DeFi Lending Protocol</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Deposit, borrow, and earn with the most competitive rates in DeFi
          </p>
        </div>

        <LendingProtocol />
      </div>
    </div>
  );
}

{
  /* 
  <Page>
<Page.Main className="flex flex-col items-center justify-center">
  <AuthButton />
</Page.Main>
</Page> 
*/
}
