import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/**
 * Button - Reusable button component
 * Configurable for different appearances and behaviors
 *
 * @param {string} variant - Visual style: 'primary', 'secondary', 'outline', 'text'
 * @param {string} size - Size variant: 'small', 'medium', 'large'
 * @param {function} onClick - Click handler function
 * @param {boolean} isFullWidth - Whether button should take full container width
 * @param {boolean} disabled - Disabled state
 * @param {node} children - Button content
 * @param {string} className - Additional CSS classes
 */
const Button = ({
  variant = 'primary',
  size = 'medium',
  onClick,
  isFullWidth = false,
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    isFullWidth ? 'btn-full-width' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  isFullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
