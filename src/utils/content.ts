/**
 * .mdoc 파일의 내용에서 헤딩을 추출하여 목차를 생성하는 유틸리티
 */

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

/**
 * 마크다운 텍스트에서 헤딩을 추출하여 목차를 생성
 */
export function generateTocFromContent(content: string): TocItem[] {
  const lines = content.split('\n');
  const toc: TocItem[] = [];
  
  lines.forEach(line => {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const title = headingMatch[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      toc.push({ id, title, level });
    }
  });
  
  return toc;
}

/**
 * 카테고리별 기본 목차 섹션을 반환
 */
export function getDefaultSections(category: string, lang: 'ko' | 'en' = 'ko') {
  const sections = {
    dormitory: [
      { id: 'application-period', title: lang === 'ko' ? '신청 기간' : 'Application Period' },
      { id: 'eligibility', title: lang === 'ko' ? '신청 자격' : 'Eligibility' },
      { id: 'dormitory-types', title: lang === 'ko' ? '기숙사 종류' : 'Dormitory Types' },
      { id: 'contact', title: lang === 'ko' ? '문의처' : 'Contact Information' }
    ],
    membership: [
      { id: 'registration-period', title: lang === 'ko' ? '등록 기간' : 'Registration Period' },
      { id: 'benefits', title: lang === 'ko' ? '등록 혜택' : 'Registration Benefits' },
      { id: 'fees', title: lang === 'ko' ? '등록비' : 'Registration Fees' },
      { id: 'contact', title: lang === 'ko' ? '문의처' : 'Contact Information' }
    ],
    announcement: [
      { id: 'semester-schedule', title: lang === 'ko' ? '학기 일정' : 'Semester Schedule' },
      { id: 'preparation', title: lang === 'ko' ? '필수 준비사항' : 'Required Preparations' },
      { id: 'contact', title: lang === 'ko' ? '문의처' : 'Contact Information' }
    ],
    academic: [
      { id: 'course-info', title: lang === 'ko' ? '강의 정보' : 'Course Information' },
      { id: 'schedule', title: lang === 'ko' ? '일정' : 'Schedule' },
      { id: 'contact', title: lang === 'ko' ? '문의처' : 'Contact Information' }
    ],
    events: [
      { id: 'event-details', title: lang === 'ko' ? '행사 상세' : 'Event Details' },
      { id: 'registration', title: lang === 'ko' ? '신청 방법' : 'Registration' },
      { id: 'contact', title: lang === 'ko' ? '문의처' : 'Contact Information' }
    ],
    culture: [
      { id: 'program-details', title: lang === 'ko' ? '프로그램 상세' : 'Program Details' },
      { id: 'participation', title: lang === 'ko' ? '참여 방법' : 'Participation' },
      { id: 'contact', title: lang === 'ko' ? '문의처' : 'Contact Information' }
    ]
  };
  
  return sections[category as keyof typeof sections] || [
    { id: 'contact', title: lang === 'ko' ? '문의처' : 'Contact Information' }
  ];
}

/**
 * 카테고리별 색상 매핑
 */
export const categoryColors = {
  dormitory: "bg-blue-500",
  membership: "bg-green-500", 
  announcement: "bg-red-500",
  academic: "bg-purple-500",
  events: "bg-orange-500",
  culture: "bg-pink-500"
} as const;

/**
 * 카테고리별 이름 매핑
 */
export const categoryNames = {
  dormitory: { ko: "기숙사", en: "Dormitory" },
  membership: { ko: "회원", en: "Membership" },
  announcement: { ko: "공지", en: "Announcement" },
  academic: { ko: "학업", en: "Academic" },
  events: { ko: "행사", en: "Events" },
  culture: { ko: "문화", en: "Culture" }
} as const; 