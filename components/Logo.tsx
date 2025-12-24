
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg 
      width="200" 
      height="200" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M128.5 130.5C113.5 145.5 90.5 152 68.5 148.5C41.5 144 20.5 120.5 20.5 92.5C20.5 64.5 41.5 41 68.5 36.5C89.5 33 113.5 39.5 128.5 54.5L163.5 19.5C138.5 -5.5 101.5 -13.5 65.5 -7.5C23.5 -0.5 -7.5 35.5 -7.5 78.5C-7.5 121.5 23.5 157.5 65.5 164.5C101.5 170.5 138.5 162.5 163.5 137.5L128.5 130.5Z" 
        fill="#1D232A" 
        transform="translate(20, 20)"
      />
      <path 
        d="M102 65.5C102 61.3579 105.358 58 109.5 58H187.5C191.642 58 195 61.3579 195 65.5V177.5C195 181.642 191.642 185 187.5 185H149.5C145.358 185 142 181.642 142 177.5V131.5H109.5C105.358 131.5 102 128.142 102 124V65.5Z" 
        fill="#F14A41"
      />
    </svg>
  );
};
