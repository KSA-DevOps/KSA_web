import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 이미지 최적화 함수
async function optimizeImage(inputPath, outputPath, options = {}) {
    const {
        width = 800,
        quality = 80,
        format = 'webp'
    } = options;

    try {
        const image = sharp(inputPath);

        // 메타데이터 가져오기
        const metadata = await image.metadata();

        // 비율 유지하면서 리사이즈
        const resizedImage = image.resize(width, null, {
            withoutEnlargement: true,
            fit: 'inside'
        });

        // WebP로 변환
        if (format === 'webp') {
            await resizedImage
                .webp({ quality })
                .toFile(outputPath);
        } else if (format === 'jpeg') {
            await resizedImage
                .jpeg({ quality })
                .toFile(outputPath);
        } else if (format === 'png') {
            await resizedImage
                .png({ quality })
                .toFile(outputPath);
        }

        console.log(`✅ Optimized: ${inputPath} -> ${outputPath}`);

        // 원본 파일 크기와 최적화된 파일 크기 비교
        const originalSize = fs.statSync(inputPath).size;
        const optimizedSize = fs.statSync(outputPath).size;
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

        console.log(`📊 Size: ${(originalSize / 1024).toFixed(1)}KB -> ${(optimizedSize / 1024).toFixed(1)}KB (${savings}% smaller)`);

    } catch (error) {
        console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    }
}

// 디렉토리 내 모든 이미지 최적화
async function optimizeDirectory(inputDir, outputDir, options = {}) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs.readdirSync(inputDir);

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const stat = fs.statSync(inputPath);

        if (stat.isDirectory()) {
            // 하위 디렉토리 재귀 처리
            const subOutputDir = path.join(outputDir, file);
            await optimizeDirectory(inputPath, subOutputDir, options);
        } else if (isImageFile(file)) {
            // 이미지 파일 최적화
            const outputPath = path.join(outputDir, getOptimizedFileName(file, options.format));
            await optimizeImage(inputPath, outputPath, options);
        }
    }
}

// 이미지 파일인지 확인
function isImageFile(filename) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];
    const ext = path.extname(filename).toLowerCase();
    return imageExtensions.includes(ext);
}

// 최적화된 파일명 생성
function getOptimizedFileName(filename, format = 'webp') {
    const nameWithoutExt = path.parse(filename).name;
    return `${nameWithoutExt}.${format}`;
}

// 메인 실행 함수
async function main() {
    console.log('🚀 Starting image optimization...\n');

    const imageDirs = [
        'public/images/executives',
        'public/images/gallery',
        'public/images/events'
    ];

    for (const dir of imageDirs) {
        if (fs.existsSync(dir)) {
            console.log(`📁 Processing directory: ${dir}`);
            const outputDir = dir.replace('public/images', 'public/images/optimized');
            await optimizeDirectory(dir, outputDir, {
                width: 800,
                quality: 80,
                format: 'webp'
            });
            console.log('');
        }
    }

    console.log('✅ Image optimization completed!');
}

// 스크립트 실행
main().catch(console.error); 