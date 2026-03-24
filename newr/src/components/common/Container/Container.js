import React from 'react';
import PropTypes from 'prop-types';
import './Container.css';

/**
 * Container - Layout container component
 * Provides consistent width, padding and layout for content sections
 *
 * @param {string} className - Additional CSS classes
 * @param {node} children - Container content
 * @param {boolean} fluid - Whether container should be full width
 * @param {string} as - HTML element to render (div, section, etc)
 */
const Container = ({
  className = '',
  children,
  fluid = false,
  as: Component = 'div',
  ...props
}) => {
  const containerClasses = [
    'container',
    fluid ? 'container-fluid' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={containerClasses} {...props}>
      {children}
    </Component>
  );
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  fluid: PropTypes.bool,
  as: PropTypes.elementType,
};

export default Container;
