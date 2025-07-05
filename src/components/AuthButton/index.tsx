'use client';
import { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

/**
 * This component is an example of how to authenticate a user
 * We will use Next Auth for this example, but you can use any auth provider
 * Read More: https://docs.world.org/mini-apps/commands/wallet-auth
 */
export const LandingPage = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  return (
    <div
      className={cn(
        'min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden',
        'bg-gradient-to-tr from-[#0a0f1c] via-[#181c2a] to-[#0e0a1a]'
      )}
    >
      {/* Animated SVG mesh background */}
      <svg
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] opacity-30 z-0 animate-pulse"
        viewBox="0 0 700 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="mesh-gradient"
            x1="0"
            y1="0"
            x2="700"
            y2="500"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#a21caf" />
          </linearGradient>
        </defs>
        <polygon points="100,100 600,80 650,400 350,480 80,350" fill="url(#mesh-gradient)" />
      </svg>

      {/* Custom geometric logo */}
      <div className="mt-20 mb-10 z-10">
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized F: two vertical bars and a diagonal cut */}
          <rect x="14" y="14" width="12" height="44" rx="4" fill="#6366f1" />
          <rect x="32" y="14" width="26" height="12" rx="4" fill="#3b82f6" />
          <rect x="32" y="32" width="18" height="12" rx="4" fill="#3b82f6" />
          <polygon points="32,44 50,58 32,58" fill="#6366f1" />
        </svg>
      </div>

      {/* Headline and tagline */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-md px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Unleash Capital. Instantly.
        </h1>
        <h2 className="text-base md:text-xl font-medium text-gray-300 mb-12">
          Next-gen lending. Maximum efficiency. Zero friction.
        </h2>
        <div className="mb-20">
          <Button
            onClick={() => {
              // redirect to home
              router.push('/home');
            }}
            disabled={isPending}
            size="lg"
            variant="default"
            className="rounded-full px-12 py-4 text-lg font-semibold shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 hover:from-purple-600 hover:to-blue-600 transition-transform border-2 border-white/10"
          >
            Launch App
          </Button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
