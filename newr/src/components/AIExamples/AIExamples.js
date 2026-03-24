import React, { useState, useEffect, useRef } from 'react';
import Container from '../common/Container/Container';
import './AIExamples.css';

const AIExamples = () => {
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Sample examples in case API fails
  const fallbackExamples = [
    {
      id: 1,
      title: 'Content Generation',
      description: 'Generate blog posts, product descriptions, and marketing copy in seconds.',
      image: '/assets/images/content-generation.webp',
      fallbackImage: '/assets/images/content-generation.jpg'
    },
    {
      id: 2,
      title: 'Automated Research',
      description: 'Compile research reports and summarize findings with AI assistance.',
      image: '/assets/images/research.webp',
      fallbackImage: '/assets/images/research.jpg'
    },
    {
      id: 3,
      title: 'Data Analysis',
      description: 'Extract insights from your data with AI-powered analysis tools.',
      image: '/assets/images/data-analysis.webp',
      fallbackImage: '/assets/images/data-analysis.jpg'
    }
  ];

  useEffect(() => {
    const fetchExamples = async () => {
      try {
        setLoading(true);

        // Attempt to fetch from API
        const response = await fetch('/api/content');

        // Check if response is ok
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        // Validate data structure
        if (Array.isArray(data) && data.length > 0) {
          setExamples(data);
        } else {
          console.warn('API returned empty or invalid data, using fallback examples');
          setExamples(fallbackExamples);
        }
      } catch (err) {
        console.error('Error fetching examples:', err);
        setError('Failed to load examples. Using sample data instead.');
        setExamples(fallbackExamples);
      } finally {
        setLoading(false);
      }
    };

    fetchExamples();

    // Setup touch event listeners for mobile swipe
    const carousel = carouselRef.current;

    if (carousel) {
      const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
      };

      const handleTouchEnd = (e) => {
        if (!touchStartX.current) return;

        touchEndX.current = e.changedTouches[0].clientX;
        handleSwipe();
      };

      carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
      carousel.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        carousel.removeEventListener('touchstart', handleTouchStart);
        carousel.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, []);

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;

    // Detect swipe with a threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left - next slide
        handleNext();
      } else {
        // Swipe right - previous slide
        handlePrev();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? examples.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === examples.length - 1 ? 0 : prev + 1));
  };

  const handleImageError = (e) => {
    // Fallback to JPG if WebP is not supported
    const target = e.target;
    if (target.dataset.fallback) {
      target.src = target.dataset.fallback;
    }
  };

  return (
    <Container className="ai-examples">
      <h2 className="examples-title">AI Use Cases</h2>
      {loading ? (
        <div className="examples-loading" aria-live="polite">
          <div className="examples-spinner" aria-hidden="true"></div>
          <p>Loading examples...</p>
        </div>
      ) : error ? (
        <div className="examples-error" aria-live="assertive">
          <p>{error}</p>
        </div>
      ) : (
        <div className="examples-carousel-container">
          <div
            className="examples-carousel"
            ref={carouselRef}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            aria-roledescription="carousel"
            aria-label="AI use case examples"
          >
            {examples.map((example, index) => (
              <div
                key={example.id}
                className="example-item"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${examples.length}: ${example.title}`}
                aria-hidden={currentSlide !== index}
              >
                <div className="example-content">
                  <h3>{example.title}</h3>
                  <p>{example.description}</p>
                </div>
                <div className="example-image">
                  <img
                    src={example.image}
                    alt={`${example.title} example`}
                    data-fallback={example.fallbackImage}
                    onError={handleImageError}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button
              onClick={handlePrev}
              aria-label="Previous example"
              className="carousel-control prev"
            >
              <span aria-hidden="true"><-</span>
            </button>

            <div className="carousel-indicators">
              {examples.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to example ${index + 1}`}
                  aria-current={currentSlide === index}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next example"
              className="carousel-control next"
            >
              <span aria-hidden="true">-></span>
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default AIExamples;
