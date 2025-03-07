import { playSound } from '@/utils/audio';
import React, { useState } from 'react';

interface ButtonProps {
  id?: string;
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  id,
  children,
  onClick,
  className = '',
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const handleClick = () => {
    setIsPressed(true);

    playSound('/assets/click.mp3')
    
    setTimeout(() => {
      setIsPressed(false);
      onClick();
    }, 150);
  };
  
  const customButtonStyles = `
    bg-transparent
    cursor-pointer
    border-4
    border-[#729d39]
    p-[10px]
    text-[1.2rem]
    shadow-[5px_5px_2px_rgba(0,0,0,0.2)]
  `;
  const baseStyles = 'font-medium rounded transition-all duration-150 focus:outline-none';
  const pressedStyles = isPressed ? 'transform scale-95' : '';

  const buttonStyles = `${baseStyles} ${customButtonStyles} ${pressedStyles} ${className}`;
  
  return (
    <button
      id={id}
      className={buttonStyles}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;