import LendingProtocol from '@/components/LendingProtocol';

const ViewPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-tr from-[#0a0f1c] via-[#181c2a] to-[#0e0a1a]">
      {/* Subtle SVG mesh background */}
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
      <div className="mt-16 mb-8 z-10">
        <svg
          width="64"
          height="64"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="14" y="14" width="12" height="44" rx="4" fill="#6366f1" />
          <rect x="32" y="14" width="26" height="12" rx="4" fill="#3b82f6" />
          <rect x="32" y="32" width="18" height="12" rx="4" fill="#3b82f6" />
          <polygon points="32,44 50,58 32,58" fill="#6366f1" />
        </svg>
      </div>

      {/* Headline and tagline */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-md px-4 mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Unleash Capital. Instantly.
        </h1>
        <h2 className="text-base md:text-xl font-medium text-gray-300 mb-8">
          Next-gen lending. Maximum efficiency. Zero friction.
        </h2>
      </div>

      {/* LendingProtocol card */}
      <div className="relative z-10 w-full max-w-2xl bg-[#181c2a]/80 rounded-3xl shadow-2xl p-8 md:p-12 mb-16">
        <LendingProtocol />
      </div>
    </div>
  );
};

export default ViewPage;
