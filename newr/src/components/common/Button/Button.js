import React, { forwardRef } from 'react';
import './Button.css';

/**
 * Button component with accessibility enhancements and cross-browser support
 *
 * @param {Object} props - Component props
 * @param {string} props.children - Button text/content
 * @param {string} props.variant - Button style variant (primary, secondary, tertiary)
 * @param {string} props.size - Button size (small, medium, large)
 * @param {function} props.onClick - Click handler function
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {string} props.className - Additional CSS classes
 * @param {Object} ref - Forwarded ref
 */
const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  isLoading = false,
  type = 'button',
  className = '',
  ariaLabel,
  ...rest
}, ref) => {
  // Compute button classes
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    disabled ? 'btn-disabled' : '',
    isLoading ? 'btn-loading' : '',
    className
  ].filter(Boolean).join(' ');

  // Handle click with improved error handling
  const handleClick = (e) => {
    if (disabled || isLoading) {
      e.preventDefault();
      return;
    }

    if (onClick) {
      try {
        onClick(e);
      } catch (error) {
        console.error('Error in button click handler:', error);
      }
    }
  };

  // For screen readers, add context when button is loading or disabled
  const getAriaLabel = () => {
    if (ariaLabel) return ariaLabel;
    if (typeof children === 'string') {
      if (isLoading) return `${children}, loading`;
      if (disabled) return `${children}, disabled`;
      return children;
    }
    return undefined;
  };

  return (
    <button
      ref={ref}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || isLoading}
      type={type}
      aria-label={getAriaLabel()}
      aria-busy={isLoading}
      aria-disabled={disabled}
      {...rest}
    >
      {isLoading && (
        <span className="btn-spinner" aria-hidden="true"></span>
      )}
      <span className={isLoading ? 'btn-text-with-spinner' : ''}>
        {children}
      </span>
    </button>
  );
});

// Add display name for better debugging
Button.displayName = 'Button';

export default Button;
