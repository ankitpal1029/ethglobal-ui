import { contractsConfig } from '@/contracts';
import { client } from '@/contracts/client';
import { POOL_ID } from '@/contracts/constants';
import { usePrivy } from '@privy-io/react-auth';
import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';

export const useDeposited = () => {
  const { user } = usePrivy();

  return useQuery({
    queryKey: ['deposited'],
    queryFn: async () => {
      const deposited = (await client.readContract({
        abi: contractsConfig.LendingHook.abi,
        address: contractsConfig.LendingHook.address,
        functionName: 'liquidity',
        args: [POOL_ID, user?.wallet?.address as Address],
      })) as bigint;

      return deposited;
    },
    enabled: !!user?.wallet?.address,
  });
};
