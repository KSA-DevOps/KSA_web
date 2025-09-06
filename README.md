# HKUST KSA 웹사이트 개발 가이드

## 프로젝트 개요

- **프로젝트명**: HKUST KSA (Korean Students' Association) 웹사이트
- **기술 스택**: Astro + TypeScript + Tailwind CSS + Preline UI
- **배포 방식**: Static Site Generation (SSG)
- **도메인**: https://ksa.su.hkust.edu.hk/

## 기술 스택 상세

### 핵심 프레임워크

- **Astro 5.12.1**: 정적 사이트 생성기
- **TypeScript 5.8.3**: 타입 안전성
- **Tailwind CSS 4.1.11**: 유틸리티 기반 CSS 프레임워크

### 주요 라이브러리

- **React 19.0.0**: 인터랙티브 컴포넌트
- **Svelte 5.36.12**: 경량 컴포넌트
- **Preline 3.1.0**: UI 컴포넌트 라이브러리
- **astro-seo 0.8.4**: SEO 최적화
- **astro-seo-schema 5.0.0**: 구조화된 데이터
- **astro-font 1.1.0**: 폰트 최적화

### 개발 도구

- **Prettier 3.6.2**: 코드 포맷팅
- **@tailwindcss/forms 0.5.9**: 폼 스타일링
- **@tailwindcss/typography 0.5.15**: 타이포그래피

## 프로젝트 구조

```
src/
├── assets/
│   ├── images/          # 이미지 파일들
│   └── styles/
│       └── global.css   # 전역 스타일 (Tailwind 설정 포함)
├── components/
│   ├── common/          # 공통 컴포넌트
│   ├── sections/        # 페이지 섹션 컴포넌트
│   └── ui/              # UI 컴포넌트 (버튼, 폼 등)
├── content/             # 콘텐츠 컬렉션
│   ├── articles/        # 기사 (Markdoc)
│   ├── news/           # 뉴스 (Markdoc)
│   └── reference/      # 참고 자료 (Markdoc)
├── data/               # 정적 데이터
│   ├── executives.ts   # 임원진 정보
│   ├── spreadsheets/   # 스프레드시트 데이터
│   └── whitepapers/    # 백서 데이터
├── layout/
│   └── BaseLayout.astro # 기본 레이아웃
├── pages/              # 페이지 파일들
│   ├── [lang]/         # 다국어 라우팅
│   ├── api/            # API 엔드포인트
│   └── ...
└── utils/              # 유틸리티 함수들
    ├── navigation.ts   # 네비게이션 설정
    ├── megaMenu/       # 메가메뉴 설정
    └── ...
```

## 주요 설정 파일

### Astro 설정 (`astro.config.mjs`)

- **출력 모드**: Static Site Generation
- **사이트 URL**: https://your-school-domain.com (배포 시 변경 필요)
- **통합 기능**: React, Markdoc, Svelte, Tailwind CSS
- **실험적 기능**: clientPrerender 활성화

### TypeScript 설정 (`tsconfig.json`)

- **경로 별칭**: `@/*`, `@common/*`, `@ui/*` 등 설정됨
- **JSX 설정**: React JSX 사용
- **엄격 모드**: Astro strict 설정 상속

### Tailwind CSS 설정 (`src/assets/styles/global.css`)

- **커스텀 색상**: Teal 팔레트 (RGB 163, 29, 29 기반)
- **폰트**: DM Sans, Work Sans
- **커스텀 유틸리티**: card 클래스 정의
- **반응형**: 헤더 높이 80px 고정

## 콘텐츠 관리

### 콘텐츠 컬렉션 (`src/content.config.ts`)

- **articles**: 기사 (title, description, date)
- **reference**: 참고 자료 (title, description, date)
- **news**: 뉴스 (title, description, date, category, icon)
- **spreadsheets**: 스프레드시트 데이터 (title, description, url)
- **whitepapers**: 백서 (title, description, readLink, btnTitle, btnLink)

### 정적 데이터

- **임원진 정보**: `src/data/executives.ts`에서 관리
- **네비게이션**: `src/utils/navigation.ts`에서 관리
- **메가메뉴**: `src/utils/megaMenu/` 디렉토리에서 관리

## 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 이미지 최적화
npm run optimize-images
```

## 배포 정보

### 환경 변수

- **사이트 URL**: `astro.config.mjs`에서 설정
- **SEO 메타데이터**: `BaseLayout.astro`에서 관리

### SEO 설정

- **기본 제목**: "HKUST KSA - Korean Students' Association"
- **기본 설명**: "Hong Kong University of Science and Technology Korean Students' Association..."
- **Open Graph**: 소셜 미디어 공유 최적화
- **구조화된 데이터**: Organization 스키마 적용

## 다국어 지원

- **기본 언어**: 한국어 (ko)
- **지원 언어**: 한국어, 영어
- **라우팅**: `[lang]` 디렉토리 기반

## 이미지 최적화

- **WebP 포맷**: 최적화된 이미지 사용
- **최적화 스크립트**: `scripts/optimize-images.js`
- **이미지 구조**:
  - `public/images/`: 원본 이미지
  - `public/images/optimized/`: 최적화된 이미지

## 커스터마이징 가이드

### 색상 변경

`src/assets/styles/global.css`에서 Teal 팔레트 수정:

```css
--color-teal-700: oklch(0.42 0.129 21.3); /* 메인 색상 */
```

### 네비게이션 수정

`src/utils/navigation.ts`에서 링크 추가/수정:

```typescript
export const navigationLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
```

### 메가메뉴 수정

`src/utils/megaMenu/` 디렉토리의 각 파일에서 메뉴 구조 수정

### 임원진 정보 수정

`src/data/executives.ts`에서 임원진 정보 업데이트

## 성능 최적화

- **정적 생성**: 모든 페이지가 빌드 시 생성
- **이미지 최적화**: WebP 포맷 사용
- **폰트 최적화**: astro-font로 폰트 로딩 최적화
- **SEO 최적화**: 메타데이터 및 구조화된 데이터 적용

## 브라우저 지원

- **모던 브라우저**: Chrome, Firefox, Safari, Edge 최신 버전
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **접근성**: WCAG 가이드라인 준수

## 개발 팁

1. **컴포넌트 재사용**: `src/components/common/`에서 공통 컴포넌트 활용
2. **타입 안전성**: TypeScript 인터페이스 활용
3. **스타일링**: Tailwind 유틸리티 클래스 우선 사용
4. **콘텐츠 관리**: Markdoc 파일로 콘텐츠 작성
5. **SEO**: 각 페이지에서 적절한 메타데이터 설정

## 문제 해결

### 빌드 오류

- TypeScript 타입 체크: `npm run build`로 확인
- 의존성 문제: `npm install` 재실행

### 스타일 문제

- Tailwind 클래스 확인
- `global.css`에서 커스텀 스타일 점검

### 콘텐츠 문제

- Markdoc 문법 확인
- 콘텐츠 스키마 검증
