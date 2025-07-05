import { contractsConfig } from '@/contracts';
import { client } from '@/contracts/client';
import { NFT_ID, POOL_ID, POOL_KEY } from '@/contracts/constants';
import { usePrivy } from '@privy-io/react-auth';
import { useQuery } from '@tanstack/react-query';
import { MiniKit } from '@worldcoin/minikit-js';
import { Address, parseAbiItem, zeroAddress } from 'viem';

interface UserPosition {
  collateralAmt: string;
  borrowedAmt: string;
  isFullyLiquidated: boolean;
}

const getUserPosition = async (address: Address) => {
  const position = (await client.readContract({
    abi: contractsConfig.LendingHook.abi,
    address: contractsConfig.LendingHook.address,
    functionName: 'fetchPosition',
    args: [NFT_ID, POOL_ID],
  })) as UserPosition;

  console.log({ position });

  return position;
};

export const useFetchUserPosition = () => {
  const { user } = usePrivy();

  return useQuery<UserPosition>({
    queryKey: ['user-nft', user?.wallet?.address],
    initialData: {
      collateralAmt: '0',
      borrowedAmt: '0',
      isFullyLiquidated: false,
    },
    queryFn: async () => {
      if (!user?.wallet?.address)
        return {
          collateralAmt: '0',
          borrowedAmt: '0',
          isFullyLiquidated: false,
        };
      return await getUserPosition(user?.wallet?.address as Address);
    },
    enabled: !!user?.wallet?.address,
    refetchInterval: 1000,
  });
};
