import { contractsConfig } from '@/contracts';
import { client } from '@/contracts/client';
import { usePrivy } from '@privy-io/react-auth';
import { useQuery } from '@tanstack/react-query';
import { Address, parseAbiItem, zeroAddress } from 'viem';

const getUserPosition = async (address: Address) => {
  // parse through all events emitted by the address
  const filter = await client.createEventFilter({
    address: contractsConfig.LendingHook.address,
    event: parseAbiItem('event Transfer(address indexed, address indexed, uint256 indexed)'),
  });

  const events = await client.getFilterLogs({
    filter,
  });

  const nftsOwned = events.filter(
    (event) => event.topics[1] === zeroAddress && event.topics[2] === address
  );

  return nftsOwned[nftsOwned.length - 1].topics[3];
};

export const useFetchUserPosition = () => {
  const { user } = usePrivy();

  return useQuery({
    queryKey: ['user-nft', user?.wallet?.address],
    queryFn: async () => {
      if (!user?.wallet?.address) return [];
      return await getUserPosition(user?.wallet?.address as Address);
    },
    enabled: !!user?.wallet?.address,
  });
};
