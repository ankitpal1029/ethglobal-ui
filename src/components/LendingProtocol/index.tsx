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
      <div className="flex bg-[#181c2a]/80 rounded-full shadow-lg p-2 mb-8 w-full max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('earn')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 px-0 rounded-full font-semibold text-lg transition-all duration-200',
            activeTab === 'earn'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
              : 'bg-transparent border border-white/20 text-gray-200 hover:bg-white/5 hover:text-white'
          )}
        >
          <DollarSign className={cn(activeTab === 'earn' ? 'text-white' : 'text-gray-400')} />
          Earn
        </button>
        <button
          onClick={() => setActiveTab('borrow')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 px-0 rounded-full font-semibold text-lg transition-all duration-200 ml-2',
            activeTab === 'borrow'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
              : 'bg-transparent border border-white/20 text-gray-200 hover:bg-white/5 hover:text-white'
          )}
        >
          <CreditCard className={cn(activeTab === 'borrow' ? 'text-white' : 'text-gray-400')} />
          Borrow
        </button>
      </div>

      {activeTab === 'earn' ? <EarnTab /> : <BorrowTab />}
    </div>
  );
};

export default LendingProtocol;
