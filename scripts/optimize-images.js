const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('Optimizing images...');

  const files = await imagemin(['assets/images/*.{jpg,png}'], {
    destination: 'dist/images',
    plugins: [
      imageminMozjpeg({ quality: 75 }),
      imageminPngquant({ quality: [0.6, 0.8] })
    ]
  });

  console.log('Images optimized:', files.length);
})();
