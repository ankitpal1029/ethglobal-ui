import { Abi, Address } from 'viem';
import { YGT } from './abi/YGT.sol/YGT';
import { USDC } from './abi/USDC.sol/USDC';
import { LendingHook } from './abi/LendingHook.sol/LendingHook';

export const contractsConfig: Record<
  'YGT' | 'USDC' | 'LendingHook',
  { address: Address; abi: Abi }
> = {
  YGT: {
    address: '0xbF784Ac432D1CA21135B3ee603E11ED990D77EA4',
    abi: YGT,
  },
  USDC: {
    address: '0x76f14c98d2B3d4D7e09486Ca09e5BE1B4E19182a',
    abi: USDC,
  },
  LendingHook: {
    address: '0x235877899ECd2287B073d312C02D21e7F8d09040',
    abi: LendingHook,
  },
};
