import { contractsConfig } from '@/contracts';
import { client } from '@/contracts/client';
import { POOL_ID } from '@/contracts/constants';
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';

const getPoolPrice = async () => {
  const [sqrtPriceX96, tick, protocolFee, lpFee] = (await client.readContract({
    abi: contractsConfig.SlotView.abi,
    address: contractsConfig.SlotView.address,
    functionName: 'getSlot0',
    args: [POOL_ID],
  })) as [bigint, number, number, number];

  const poolPrice = BigNumber(sqrtPriceX96).div(BigNumber(2).pow(96)).pow(2).toNumber();
  console.log(poolPrice);

  return poolPrice;
};

export const usePoolPrice = () => {
  return useQuery({
    queryKey: ['pool-price'],
    queryFn: async () => {
      return await getPoolPrice();
    },
    initialData: 0,
    refetchInterval: 1000,
  });
};
