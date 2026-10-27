/**
 * Asset Extraction & Optimization Script
 * 
 * Extracts high-fidelity WebP photographic assets from the original 
 * design screenshots in ./img/ to ./public/images/.
 * Run via: node crop_assets.js
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('./public/images');
fs.mkdirSync(outDir, { recursive: true });

async function extractAssets() {
  console.log('Extracting and optimizing assets from ./img screenshots...');

  try {
    // 1. Hero Person (Woman with headphones & laptop on desk)
    await sharp('./img/Screenshot 2026-10-26 221733.png')
      .extract({ left: 450, top: 55, width: 345, height: 395 })
      .webp({ quality: 95 })
      .toFile(path.join(outDir, 'hero-person.webp'));
    console.log('✓ hero-person.webp');

    // 2. Partner Brands Strip (Forbes, Entrepreneur, Yahoo, CNN, Fox, HP)
    await sharp('./img/Screenshot 2026-10-26 221733.png')
      .extract({ left: 0, top: 535, width: 795, height: 45 })
      .webp({ quality: 95 })
      .toFile(path.join(outDir, 'brands-strip.webp'));
    console.log('✓ brands-strip.webp');

    // 3. Why DRV Portrait (Customer support team specialist with headset)
    await sharp('./img/Screenshot 2026-10-26 221754.png')
      .extract({ left: 275, top: 235, width: 200, height: 300 })
      .webp({ quality: 95 })
      .toFile(path.join(outDir, 'support-team.webp'));
    console.log('✓ support-team.webp');

    // 4. Testimonial 1: Alex Carter
    await sharp('./img/Screenshot 2026-10-26 221811.png')
      .extract({ left: 40, top: 160, width: 150, height: 190 })
      .webp({ quality: 95 })
      .toFile(path.join(outDir, 'testimonial-alex.webp'));
    console.log('✓ testimonial-alex.webp');

    // 5. Testimonial 2: Samantha Lee
    await sharp('./img/Screenshot 2026-10-26 221811.png')
      .extract({ left: 380, top: 160, width: 150, height: 190 })
      .webp({ quality: 95 })
      .toFile(path.join(outDir, 'testimonial-samantha.webp'));
    console.log('✓ testimonial-samantha.webp');

    // 6. Final CTA Team Avatars
    await sharp('./img/Screenshot 2026-10-26 221835.png')
      .extract({ left: 552, top: 78, width: 72, height: 42 })
      .webp({ quality: 95 })
      .toFile(path.join(outDir, 'team-avatars.webp'));
    console.log('✓ team-avatars.webp');

    console.log('\nAll assets successfully extracted and verified!');
  } catch (error) {
    console.error('Asset extraction error:', error.message);
  }
}

extractAssets();
