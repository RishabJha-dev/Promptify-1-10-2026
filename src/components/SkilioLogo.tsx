import React from 'react';

interface SkilioLogoProps {
  variant?: 'full' | 'compact' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const SkilioLogo: React.FC<SkilioLogoProps> = ({
  variant = 'compact',
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-lg', dot: 4 },
    md: { icon: 36, text: 'text-2xl', dot: 5 },
    lg: { icon: 48, text: 'text-3xl', dot: 6 },
    xl: { icon: 72, text: 'text-5xl', dot: 9 },
  };

  const currentSize = sizeMap[size];

  const LogoIcon = (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
    >
      <defs>
        <linearGradient id="skilio_ribbon_grad" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#00C0FF" />
          <stop offset="35%" stopColor="#2563EB" />
          <stop offset="70%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>

        <linearGradient id="skilio_cap_grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0088FF" />
          <stop offset="60%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>

        <linearGradient id="skilio_fold_grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor="#312E81" />
        </linearGradient>

        <linearGradient id="skilio_tassel_grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>

      {/* Graduation Cap Mortarboard */}
      <polygon points="60,18 102,32 60,46 18,32" fill="url(#skilio_cap_grad)" />
      <polygon points="60,46 102,32 102,36 60,50 18,36 18,32" fill="#1D4ED8" opacity="0.8" />

      {/* Tassel */}
      <path d="M 94 34 Q 98 42 98 52" stroke="url(#skilio_tassel_grad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="95.5" y="50" width="5" height="10" rx="2" fill="url(#skilio_tassel_grad)" />

      {/* Main 3D Ribbon S Shape */}
      <path d="M 36 44 L 64 54 C 76 58 88 64 88 74 C 88 86 74 92 60 98 L 42 86 C 36 82 36 70 46 64 L 64 54 Z" fill="url(#skilio_ribbon_grad)" />
      <path d="M 36 44 L 36 66 C 36 74 44 78 52 82 L 72 90 C 84 94 88 100 80 106 L 60 114 L 36 94 L 36 44 Z" fill="url(#skilio_ribbon_grad)" />
      <path d="M 44 70 L 68 80 C 76 83 82 88 82 94 C 82 98 76 102 68 104 L 56 94 Z" fill="url(#skilio_fold_grad)" opacity="0.6" />
      <path d="M 38 46 L 62 55 C 72 59 84 65 84 73" stroke="#67E8F9" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{LogoIcon}</div>;
  }

  return (
    <div className={`group inline-flex flex-col items-start select-none ${className}`}>
      <div className="flex items-center gap-2.5">
        {LogoIcon}
        <div className="flex flex-col justify-center">
          <div className={`font-black tracking-tight font-sans text-white leading-none ${currentSize.text} flex items-center`}>
            <span>sk</span>
            <span className="relative">
              i
              <span className="absolute top-[3px] left-1/2 -translate-x-1/2 h-[3.5px] w-[3.5px] rounded-full bg-white" />
            </span>
            <span>l</span>
            <span className="relative">
              i
              <span className="absolute top-[2px] left-1/2 -translate-x-1/2 h-[4.5px] w-[4.5px] rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 shadow-sm shadow-cyan-400" />
            </span>
            <span>o</span>
          </div>

          {(showTagline || variant === 'full') && (
            <div className="mt-1 text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.28em] text-slate-400 uppercase flex items-center gap-1.5 whitespace-nowrap">
              <span>LEARN</span>
              <span className="text-cyan-400">·</span>
              <span>GROW</span>
              <span className="text-blue-400">·</span>
              <span>ACHIEVE</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
