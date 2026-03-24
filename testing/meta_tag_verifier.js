/**
 * Meta Tag Verification Script
 * Ensures all required meta tags are present and properly configured
 */

const requiredMetaTags = [
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  { name: 'description', required: true },
  { name: 'robots', recommended: true },
  { charset: 'UTF-8', required: true },
  { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge', recommended: true },
  { name: 'theme-color', recommended: true }
];

function verifyMetaTags(document) {
  const metaTags = document.querySelectorAll('meta');
  const results = {
    missing: [],
    incorrect: [],
    present: []
  };

  // Check for each required meta tag
  requiredMetaTags.forEach(requiredTag => {
    const tagKey = Object.keys(requiredTag)[0];
    const tagValue = requiredTag[tagKey];
    const isRequired = requiredTag.required === true;

    // Find matching meta tag in the document
    let found = false;
    metaTags.forEach(tag => {
      if (tag.getAttribute(tagKey) !== null) {
        found = true;

        // If specific content is required, validate it
        if (tagKey === 'name' && requiredTag.content) {
          const contentAttr = tag.getAttribute('content');
          if (contentAttr !== requiredTag.content) {
            results.incorrect.push({
              element: tag.outerHTML,
              expected: requiredTag.content,
              actual: contentAttr
            });
          } else {
            results.present.push(tag.outerHTML);
          }
        } else {
          results.present.push(tag.outerHTML);
        }
      }
    });

    if (!found && isRequired) {
      results.missing.push(requiredTag);
    }
  });

  return results;
}

// This function would be called with an actual document
// For example in a browser test or with jsdom in Node
function runMetaTagVerification(document) {
  const results = verifyMetaTags(document);

  console.log('Meta Tag Verification Results:');
  console.log('------------------------------');

  console.log('\nPresent and Correct:');
  results.present.forEach(tag => console.log(`  ${tag}`));

  if (results.incorrect.length > 0) {
    console.log('\nIncorrect Content:');
    results.incorrect.forEach(item => {
      console.log(`  ${item.element}`);
      console.log(`   Expected: ${item.expected}`);
      console.log(`   Actual: ${item.actual}`);
    });
  }

  if (results.missing.length > 0) {
    console.log('\nMissing Required Tags:');
    results.missing.forEach(tag => {
      const tagKey = Object.keys(tag)[0];
      console.log(`  <meta ${tagKey}="${tag[tagKey]}"${tag.content ? ` content="${tag.content}"` : ''}>`);
    });
  }

  return results.missing.length === 0 && results.incorrect.length === 0;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { verifyMetaTags, runMetaTagVerification };
}
