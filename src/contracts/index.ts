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
    address: '0x230a2509362d281EE9f8464a7d1DE09980e24d57',
    abi: YGT,
  },
  USDC: {
    address: '0x509D073aec51cd88ac997eF88e18CFb03fBf9B22',
    abi: USDC,
  },
  LendingHook: {
    address: '0x8B40fC36F78d24D0949BdbB4A4b3f0D45b75D040',
    abi: LendingHook,
  },
  SlotView: {
    address: '0x51D394718bc09297262e368c1A481217FdEB71eb',
    abi: SlotView,
  },
};
