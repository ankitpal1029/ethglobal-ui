'use client';
import { PrivyProvider } from '@privy-io/react-auth';
import { MiniKitProvider } from '@worldcoin/minikit-js/minikit-provider';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const ErudaProvider = dynamic(
  () => import('@/providers/Eruda').then((c) => c.ErudaProvider),
  { ssr: false },
);

// Define props for ClientProviders
interface ClientProvidersProps {
  children: ReactNode;
  session: Session | null; // Use the appropriate type for session from next-auth
}

/**
 * ClientProvider wraps the app with essential context providers.
 *
 * - ErudaProvider:
 *     - Should be used only in development.
 *     - Enables an in-browser console for logging and debugging.
 *
 * - MiniKitProvider:
 *     - Required for MiniKit functionality.
 *
 * This component ensures both providers are available to all child components.
 */
export default function ClientProviders({
  children,
  session,
}: ClientProvidersProps) {
  return (
    <ErudaProvider>
    <PrivyProvider
    appId="cmcpukbuq018ljo0mgls3uhr2"
    clientId="client-WY6N5PkyFYAYyQgbjfgw7XuNeC46PJPpfZWdPcgVifmqL"
    config={{
      // Create embedded wallets for users who don't have a wallet
      embeddedWallets: {
        ethereum: {
          createOnLogin: 'users-without-wallets'
        }
      }
    }}
    >
      <MiniKitProvider>
        <SessionProvider session={session}>{children}</SessionProvider>
      </MiniKitProvider>

    </PrivyProvider>
    </ErudaProvider>
  );
}
