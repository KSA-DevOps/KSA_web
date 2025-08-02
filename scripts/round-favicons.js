import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 이미지를 둥글게 만드는 함수
async function roundImage(inputPath, outputPath, size) {
    try {
        // 원형 마스크를 포함한 SVG 생성
        const svgBuffer = Buffer.from(`
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="circle">
            <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" />
          </clipPath>
        </defs>
        <image 
          width="${size}" 
          height="${size}" 
          href="data:image/png;base64,${fs.readFileSync(inputPath).toString('base64')}" 
          clip-path="url(#circle)" 
        />
      </svg>
    `);

        await sharp(svgBuffer)
            .png()
            .toFile(outputPath);

        console.log(`✅ ${path.basename(inputPath)} -> ${path.basename(outputPath)} (${size}x${size})`);
    } catch (error) {
        console.error(`❌ Error processing ${inputPath}:`, error.message);
    }
}

// 메인 함수
async function main() {
    const publicDir = path.join(__dirname, '../public');
    const faviconFiles = [
        { input: 'favicon-16x16.png', output: 'favicon-16x16-round.png', size: 16 },
        { input: 'favicon-32x32.png', output: 'favicon-32x32-round.png', size: 32 },
        { input: 'apple-touch-icon.png', output: 'apple-touch-icon-round.png', size: 180 },
        { input: 'android-chrome-192x192.png', output: 'android-chrome-192x192-round.png', size: 192 },
        { input: 'android-chrome-512x512.png', output: 'android-chrome-512x512-round.png', size: 512 }
    ];

    console.log('🔄 Creating rounded favicons...\n');

    for (const file of faviconFiles) {
        const inputPath = path.join(publicDir, file.input);
        const outputPath = path.join(publicDir, file.output);

        if (fs.existsSync(inputPath)) {
            await roundImage(inputPath, outputPath, file.size);
        } else {
            console.log(`⚠️  ${file.input} not found, skipping...`);
        }
    }

    console.log('\n🎉 Rounded favicons created successfully!');
    console.log('📝 Update BaseLayout.astro to use the rounded versions.');
}

main().catch(console.error); 