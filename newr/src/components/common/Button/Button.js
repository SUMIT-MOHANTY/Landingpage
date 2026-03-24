import React from 'react';
import './Button.css';
import { handleKeyboardActivation } from '../../../utils/helpers';

/**
 * Accessible and responsive button component
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button variant (primary, secondary, tertiary)
 * @param {string} [props.size='md'] - Button size (sm, md, lg)
 * @param {string} [props.type='button'] - Button type attribute
 * @param {Function} [props.onClick] - Click handler function
 * @param {string} [props.ariaLabel] - Accessible label for screen readers
 * @param {boolean} [props.isFullWidth=false] - Whether button takes full width
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {React.ReactNode} props.children - Button content
 * @returns {React.ReactElement} - Rendered button component
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  type = 'button',
  onClick,
  ariaLabel,
  isFullWidth = false,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const buttonClasses = `
    button
    button--${variant}
    button--${size}
    ${isFullWidth ? 'button--full-width' : ''}
    ${className}
  `.trim();

  // Handle keyboard navigation for div/span button replacements
  const onKeyDown = props.role === 'button' ? handleKeyboardActivation(onClick) : undefined;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
