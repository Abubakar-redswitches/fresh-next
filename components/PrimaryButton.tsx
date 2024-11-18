import React from 'react';

interface ButtonProps {
  bgColor: string;
  textColor: string;
  hoverColor?: string;
  children: React.ReactNode;
}

const PrimaryButton = (props: ButtonProps) => {
  const { bgColor, textColor, children } = props;

  return (
    <button
      className="btn hover-border py-3 px-6 font-medium transition-all duration-300"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: '10px 40px 10px 10px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </button>
  );
};

export default PrimaryButton;
