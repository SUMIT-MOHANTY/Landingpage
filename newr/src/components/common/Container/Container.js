import React from 'react';
import './Container.css';

/**
 * Responsive container component that adapts to different screen sizes
 * @param {Object} props - Component props
 * @param {string} [props.size='default'] - Container size (narrow, default, wide, fluid)
 * @param {string} [props.padding='default'] - Container padding (none, small, default, large)
 * @param {React.ReactNode} props.children - Container content
 * @param {string} [props.as='div'] - HTML element to render as
 * @param {string} [props.id] - Container ID
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} - Rendered container
 */
const Container = ({
  size = 'default',
  padding = 'default',
  children,
  as = 'div',
  id,
  className = '',
  ...props
}) => {
  const containerClasses = `
    container
    container--${size}
    container--padding-${padding}
    ${className}
  `.trim();

  const Element = as;

  return (
    <Element
      className={containerClasses}
      id={id}
      {...props}
    >
      {children}
    </Element>
  );
};

export default Container;
