'use client';

import { useState } from 'react';
import EarnTab from './EarnTab';
import BorrowTab from './BorrowTab';
import { CreditCard, DollarSign } from 'lucide-react';
import { cn } from '../../../lib/utils';

const LendingProtocol = () => {
  const [activeTab, setActiveTab] = useState<'earn' | 'borrow'>('earn');

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex rounded-2xl p-2 mb-8">
        <button
          onClick={() => setActiveTab('earn')}
          className={cn(
            'w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 text-black',
            activeTab == 'earn' ? 'bg-blue-500 ' : 'bg-white'
          )}
        >
          <DollarSign />
          Earn
        </button>
        <button
          onClick={() => setActiveTab('borrow')}
          className={cn(
            'w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 text-black',
            activeTab == 'borrow' ? 'bg-blue-500 ' : 'bg-white'
          )}
        >
          <CreditCard />
          Borrow
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        {activeTab === 'earn' ? <EarnTab /> : <BorrowTab />}
      </div>
    </div>
  );
};

export default LendingProtocol;
