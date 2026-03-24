import React from 'react';
import './Container.css';

/**
 * Container component with improved responsive behavior
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Container content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.width - Container width (default, narrow, wide, full)
 * @param {string} props.padding - Container padding (default, small, large, none)
 * @param {string} props.background - Container background (none, light, dark, primary)
 */
const Container = ({
  children,
  className = '',
  width = 'default',
  padding = 'default',
  background = 'none',
  testId,
  ...rest
}) => {
  // Compute container classes for different display modes
  const containerClasses = [
    'container',
    `container-width-${width}`,
    `container-padding-${padding}`,
    `container-bg-${background}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      data-testid={testId || 'container'}
      {...rest}
    >
      <div className="container-inner">
        {children}
      </div>
    </div>
  );
};

export default Container;
