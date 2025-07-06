import { Abi, Address } from 'viem';
import { YGT } from './abi/YGT.sol/YGT';
import { USDC } from './abi/USDC.sol/USDC';
import { LendingHook } from './abi/LendingHook.sol/LendingHook';
import { SlotView } from './abi/SlotView.sol/SlotView';

export const contractsConfig: Record<
  'YGT' | 'USDC' | 'LendingHook' | 'SlotView',
  { address: Address; abi: Abi }
> = {
  YGT: {
    address: '0x76f14c98d2B3d4D7e09486Ca09e5BE1B4E19182a',
    abi: YGT,
  },
  USDC: {
    address: '0xbF784Ac432D1CA21135B3ee603E11ED990D77EA4',
    abi: USDC,
  },
  LendingHook: {
    address: '0xbEA696425cB0E2D7c4D7ba15e6ED3Eb6968f5040',
    abi: LendingHook,
  },
  SlotView: {
    address: '0x51D394718bc09297262e368c1A481217FdEB71eb',
    abi: SlotView,
  },
};
