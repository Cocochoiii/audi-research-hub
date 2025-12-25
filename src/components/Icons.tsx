import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const AudiRings: React.FC<IconProps> = ({ className = '' }) => (
  <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="35" cy="30" r="18" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <circle cx="65" cy="30" r="18" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <circle cx="95" cy="30" r="18" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <circle cx="125" cy="30" r="18" stroke="currentColor" strokeWidth="2.5" fill="none" />
  </svg>
);

export const TrendRadarIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
    <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
    <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
    <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
  </svg>
);

export const StudyIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path d="M7 8h10M7 12h6M7 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="18" cy="16" r="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const InsightIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path d="M9 21h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 18v3M14 18v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 6v4M10 8h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ChartIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path 
      d="M7 14l4-4 3 3 6-6" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="7" cy="14" r="1.5" fill="currentColor" />
    <circle cx="11" cy="10" r="1.5" fill="currentColor" />
    <circle cx="14" cy="13" r="1.5" fill="currentColor" />
    <circle cx="20" cy="7" r="1.5" fill="currentColor" />
  </svg>
);

export const LoadingSpinner: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`animate-spin ${className}`}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
    <path 
      d="M12 2C6.48 2 2 6.48 2 12" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

export const EmptyStateIcon: React.FC<IconProps> = ({ className = '', size = 120 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 120 120" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="2" strokeOpacity="0.1" />
    <circle cx="60" cy="60" r="35" stroke="currentColor" strokeWidth="2" strokeOpacity="0.15" />
    <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
    <path 
      d="M50 55h20M50 65h12" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
      strokeOpacity="0.4"
    />
    <circle cx="60" cy="40" r="5" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

export const DocumentIcon: React.FC<IconProps & { type?: string }> = ({ className = '', size = 24, type = 'pdf' }) => {
  const colors: Record<string, string> = {
    pdf: '#E01E41',
    pptx: '#FF9500',
    xlsx: '#34C759',
    docx: '#007AFF',
    video: '#AF52DE',
    image: '#FF2D55',
  };

  const color = colors[type] || '#8E8E93';

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" 
        stroke={color}
        strokeWidth="1.5"
      />
      <path 
        d="M14 2v6h6" 
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text 
        x="12" 
        y="16" 
        textAnchor="middle" 
        fontSize="5" 
        fontWeight="600" 
        fill={color}
      >
        {type.toUpperCase()}
      </text>
    </svg>
  );
};
