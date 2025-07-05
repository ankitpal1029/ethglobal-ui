'use client';

import { usePrivy } from '@privy-io/react-auth';
import { Marble } from '@worldcoin/mini-apps-ui-kit-react';
import { useSession } from 'next-auth/react';

const WalletConnected = () => {
  return (
    <div className="flex flex-row items-center justify-start gap-4 rounded-xl w-full border-2 border-gray-200 p-4">
      {/* <Marble src={user?.wallet?.address} className="w-14" /> */}
      <div className="flex flex-row items-center justify-center">
        <span className="text-lg font-semibold capitalize">{`0xsldkjfa`}</span>
      </div>
    </div>
  );
};

export default WalletConnected;
