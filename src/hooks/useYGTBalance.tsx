import { contractsConfig } from '@/contracts';
import { client } from '@/contracts/client';
import { usePrivy } from '@privy-io/react-auth';
import { useQuery } from '@tanstack/react-query';
import { Address, formatUnits } from 'viem';

const getYGTBalance = async (address: Address) => {
  // make the read Contract call
  const balance = await client.readContract({
    address: contractsConfig.YGT.address,
    abi: contractsConfig.YGT.abi,
    functionName: 'balanceOf',
    args: [address],
  });

  const formattedBalance = formatUnits(balance as bigint, 18);
  return { balance, formattedBalance };
};

export const useYGTBalance = () => {
  const { user } = usePrivy();

  return useQuery({
    queryKey: ['ygt-balance', user?.wallet?.address],
    queryFn: async () => {
      if (!user?.wallet?.address) return { balance: 0, formattedBalance: '0' };
      return await getYGTBalance(user?.wallet?.address as Address);
    },
    enabled: !!user?.wallet?.address,
  });
};
