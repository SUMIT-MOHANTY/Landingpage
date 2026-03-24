import React, { useState } from 'react';
import Container from '../common/Container/Container';
import Button from '../common/Button/Button';
import './CallToAction.css';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [formStatus, setFormStatus] = useState({
    status: 'idle', // idle, submitting, success, error
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Don't submit if already submitting
    if (formStatus.status === 'submitting') {
      return;
    }

    // Validate all fields on submit
    const isValid = validateForm();
    setTouchedFields({ name: true, email: true });

    if (!isValid) {
      return;
    }

    try {
      setFormStatus({ status: 'submitting', message: '' });

      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Success state
      setFormStatus({
        status: 'success',
        message: 'Thank you for signing up! Check your email for confirmation.'
      });

      // Reset form
      setEmail('');
      setName('');
      setTouchedFields({});

    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({
        status: 'error',
        message: 'Something went wrong. Please try again later.'
      });
    }
  };

  return (
    <Container className="call-to-action">
      <div className="cta-content">
        <h2>Ready to Transform Your Content?</h2>
        <p>Join thousands of content creators using our AI tools</p>

        <form onSubmit={handleSubmit} noValidate className="cta-form" aria-live="polite">
          <div className="form-group">
            <label htmlFor="name" className="visually-hidden">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur('name')}
              aria-invalid={!!(touchedFields.name && errors.name)}
              aria-describedby="name-error"
              disabled={formStatus.status === 'submitting' || formStatus.status === 'success'}
              className={touchedFields.name && errors.name ? 'error' : ''}
            />
            {touchedFields.name && errors.name && (
              <div id="name-error" className="error-message">{errors.name}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="visually-hidden">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              aria-invalid={!!(touchedFields.email && errors.email)}
              aria-describedby="email-error"
              disabled={formStatus.status === 'submitting' || formStatus.status === 'success'}
              className={touchedFields.email && errors.email ? 'error' : ''}
            />
            {touchedFields.email && errors.email && (
              <div id="email-error" className="error-message">{errors.email}</div>
            )}
          </div>

          <Button
            type="submit"
            disabled={formStatus.status === 'submitting' || formStatus.status === 'success'}
            isLoading={formStatus.status === 'submitting'}
            variant="primary"
            size="large"
            ariaLabel={formStatus.status === 'submitting' ? 'Submitting your information' : 'Get Started Now'}
          >
            Get Started Now
          </Button>

          {formStatus.message && (
            <div
              className={`form-message ${formStatus.status === 'error' ? 'error' : 'success'}`}
              role="alert"
            >
              {formStatus.message}
            </div>
          )}
        </form>
      </div>
    </Container>
  );
};

export default CallToAction;
