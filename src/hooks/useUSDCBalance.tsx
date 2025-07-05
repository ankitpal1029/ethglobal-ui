import { contractsConfig } from '@/contracts';
import { client } from '@/contracts/client';
import { usePrivy } from '@privy-io/react-auth';
import { useQuery } from '@tanstack/react-query';
import { Address, formatUnits } from 'viem';

const getUSDCBalance = async (address: Address) => {
  // make the read Contract call
  const balance = await client.readContract({
    address: contractsConfig.USDC.address,
    abi: contractsConfig.USDC.abi,
    functionName: 'balanceOf',
    args: [address],
  });

  const formattedBalance = formatUnits(balance as bigint, 18);
  return { balance, formattedBalance };
};

export const useUSDCBalance = () => {
  const { user } = usePrivy();

  return useQuery({
    queryKey: ['usdc-balance', user?.wallet?.address],
    queryFn: async () => {
      if (!user?.wallet?.address) return { balance: 0, formattedBalance: '0' };
      return await getUSDCBalance(user?.wallet?.address as Address);
    },
    enabled: !!user?.wallet?.address,
    refetchInterval: 1000,
  });
};
