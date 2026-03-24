# Performance Benchmarks

## Baseline Metrics
Capture these metrics before making refinements to track improvements.

| Metric | Target | Desktop Result | Mobile Result |
|--------|--------|---------------|--------------|
| First Contentful Paint | < 1.8s | | |
| Largest Contentful Paint | < 2.5s | | |
| Time to Interactive | < 3.8s | | |
| Cumulative Layout Shift | < 0.1 | | |
| Total Page Size | < 1MB | | |
| HTTP Requests | < 20 | | |
| Lighthouse Performance | > 90 | | |

## Performance Budget

| Resource Type | Budget |
|--------------|--------|
| Total | 1000 KB |
| JS | 300 KB |
| CSS | 100 KB |
| Images | 500 KB |
| Fonts | 100 KB |

## Optimization Checklist
- [ ] Images compressed and properly sized
- [ ] CSS minified and critical CSS inlined
- [ ] JavaScript minified and split into chunks
- [ ] Proper caching headers implemented
- [ ] Unused code removed
- [ ] Third-party scripts loaded efficiently
- [ ] Web fonts optimized
- [ ] Server response time optimized
