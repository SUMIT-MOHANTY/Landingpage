# Accessibility Testing Checklist

## Manual Testing

### Keyboard Navigation
- [ ] All interactive elements can be reached using Tab key
- [ ] Focus order is logical
- [ ] Focus indicators are clearly visible
- [ ] Skip links work correctly
- [ ] No keyboard traps

### Screen Reader Testing
- [ ] All important content is announced correctly
- [ ] Form labels are properly associated
- [ ] Images have appropriate alt text
- [ ] ARIA roles and attributes are used correctly

### Color and Contrast
- [ ] Text meets minimum contrast requirements
- [ ] Focus indicators are visible
- [ ] Information is not conveyed by color alone
- [ ] UI is usable in high contrast mode

### Forms and User Input
- [ ] All form elements have labels
- [ ] Error messages are clear and accessible
- [ ] Required fields are clearly indicated
- [ ] Form validation errors are announced to screen readers

### Structure and Navigation
- [ ] Proper heading structure
- [ ] Landmarks are used correctly
- [ ] Page title is descriptive
- [ ] Lists are marked up correctly

## Automated Testing Tools

- [ ] Run axe DevTools
- [ ] Check with WAVE browser extension
- [ ] Test with Lighthouse Accessibility audit
- [ ] Validate HTML

## Browser/Device Testing Matrix

| Test | Chrome | Firefox | Safari | Edge | Mobile iOS | Mobile Android |
|------|--------|---------|--------|------|------------|----------------|
| Screen reader | | | | | | |
| Keyboard | | | | | | |
| Zoom to 200% | | | | | | |
| High contrast | | | | | | |
