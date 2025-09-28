export interface SearchItem {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  url: string;
  urlEn: string;
  category: 'page' | 'event' | 'news' | 'board' | 'club' | 'about';
  keywords: string[];
  keywordsEn: string[];
}

export const searchIndex: SearchItem[] = [
  // Main Pages
  {
    title: "홈",
    titleEn: "Home",
    description: "홍콩과학기술대학교 한인학생회 메인 페이지",
    descriptionEn: "HKUST Korean Students' Association Main Page",
    url: "/ko",
    urlEn: "/en",
    category: "page",
    keywords: ["홈", "메인", "홍콩과기대", "한인학생회", "KSA", "HKUST"],
    keywordsEn: ["home", "main", "HKUST", "Korean Students Association", "KSA"]
  },
  {
    title: "학생회 소개",
    titleEn: "About Us",
    description: "KSA 소개, 미션, 비전 및 역사",
    descriptionEn: "KSA introduction, mission, vision and history",
    url: "/ko/about",
    urlEn: "/en/about",
    category: "about",
    keywords: ["소개", "학생회", "역사", "미션", "비전", "목적"],
    keywordsEn: ["about", "association", "history", "mission", "vision", "purpose"]
  },
  {
    title: "회장단",
    titleEn: "Presidents",
    description: "2025-2026 학생회 회장단 소개",
    descriptionEn: "2025-2026 Executive Committee Presidents",
    url: "/ko/aboutus/presidents",
    urlEn: "/en/aboutus/presidents",
    category: "about",
    keywords: ["회장", "부회장", "회장단", "리더십", "임원"],
    keywordsEn: ["president", "vice president", "leadership", "executive"]
  },
  {
    title: "임원진",
    titleEn: "Executives",
    description: "KSA 임원진 구성원 소개",
    descriptionEn: "KSA Executive Committee Members",
    url: "/ko/aboutus/executives",
    urlEn: "/en/aboutus/executives",
    category: "about",
    keywords: ["임원진", "간부", "서기", "회계", "담당자"],
    keywordsEn: ["executives", "officers", "secretary", "treasurer", "manager"]
  },
  {
    title: "소위원회",
    titleEn: "Subcommittee",
    description: "KSA 소위원회 멤버 소개",
    descriptionEn: "KSA Subcommittee Members",
    url: "/ko/aboutus/subcommittee",
    urlEn: "/en/aboutus/subcommittee",
    category: "about",
    keywords: ["소위원회", "위원회", "멤버", "팀"],
    keywordsEn: ["subcommittee", "committee", "members", "team"]
  },
  {
    title: "학생회칙",
    titleEn: "Constitution",
    description: "KSA 학생회 헌법 및 규정",
    descriptionEn: "KSA Student Association Constitution and Rules",
    url: "/ko/aboutus/constitution",
    urlEn: "/en/aboutus/constitution",
    category: "about",
    keywords: ["회칙", "헌법", "규정", "규칙", "조항"],
    keywordsEn: ["constitution", "rules", "regulations", "articles", "bylaws"]
  },

  // Events
  {
    title: "연례행사",
    titleEn: "Annual Events",
    description: "매년 개최되는 KSA 주요 행사",
    descriptionEn: "Major KSA events held annually",
    url: "/ko/events/annual",
    urlEn: "/en/events/annual",
    category: "event",
    keywords: ["연례행사", "정기행사", "MT", "신입생환영회", "체육대회"],
    keywordsEn: ["annual events", "regular events", "MT", "freshman welcome", "sports day"]
  },
  {
    title: "커리어",
    titleEn: "Career",
    description: "취업 관련 행사 및 Career Talk",
    descriptionEn: "Career-related events and Career Talks",
    url: "/ko/events/career",
    urlEn: "/en/events/career",
    category: "event",
    keywords: ["커리어", "취업", "인턴십", "멘토링", "네트워킹"],
    keywordsEn: ["career", "job", "internship", "mentoring", "networking"]
  },
  {
    title: "소식",
    titleEn: "News",
    description: "KSA 최신 소식 및 공지사항",
    descriptionEn: "KSA latest news and announcements",
    url: "/ko/events/news",
    urlEn: "/en/events/news",
    category: "news",
    keywords: ["소식", "뉴스", "공지", "공지사항", "알림"],
    keywordsEn: ["news", "announcement", "notice", "update", "alert"]
  },

  // Board
  {
    title: "채용정보 게시판",
    titleEn: "Career Board",
    description: "채용 정보 및 인턴십 기회",
    descriptionEn: "Job postings and internship opportunities",
    url: "/ko/board/career",
    urlEn: "/en/board/career",
    category: "board",
    keywords: ["채용", "구인", "구직", "일자리", "인턴"],
    keywordsEn: ["hiring", "job", "recruitment", "employment", "intern"]
  },
  {
    title: "건의사항 게시판",
    titleEn: "Suggestions Board",
    description: "학생회에 대한 건의사항 및 피드백",
    descriptionEn: "Suggestions and feedback for the student association",
    url: "/ko/board/suggestions",
    urlEn: "/en/board/suggestions",
    category: "board",
    keywords: ["건의", "제안", "피드백", "의견", "신문고"],
    keywordsEn: ["suggestion", "proposal", "feedback", "opinion", "suggestion box"]
  },

  // Clubs
  {
    title: "동아리",
    titleEn: "Clubs",
    description: "KSA 산하 동아리 및 소모임",
    descriptionEn: "KSA affiliated clubs and groups",
    url: "/ko/clubs",
    urlEn: "/en/clubs",
    category: "club",
    keywords: ["동아리", "클럽", "소모임", "축구", "농구", "밴드"],
    keywordsEn: ["clubs", "groups", "soccer", "basketball", "band"]
  },

  // Weather
  {
    title: "홍콩 날씨",
    titleEn: "HK Weather",
    description: "실시간 홍콩 날씨 정보",
    descriptionEn: "Real-time Hong Kong weather information",
    url: "/ko/weather",
    urlEn: "/en/weather",
    category: "page",
    keywords: ["날씨", "기온", "강수", "태풍", "일기예보"],
    keywordsEn: ["weather", "temperature", "rain", "typhoon", "forecast"]
  },

  // Contact
  {
    title: "연락처",
    titleEn: "Contact",
    description: "KSA 연락처 및 문의 방법",
    descriptionEn: "KSA contact information and inquiry methods",
    url: "/ko/contact",
    urlEn: "/en/contact",
    category: "page",
    keywords: ["연락처", "이메일", "전화", "문의", "페이스북"],
    keywordsEn: ["contact", "email", "phone", "inquiry", "facebook"]
  },

  // Additional searchable content
  {
    title: "Facebook 페이지",
    titleEn: "Facebook Page",
    description: "KSA 공식 Facebook 페이지",
    descriptionEn: "KSA Official Facebook Page",
    url: "https://www.facebook.com/hkustksa",
    urlEn: "https://www.facebook.com/hkustksa",
    category: "page",
    keywords: ["페이스북", "소셜미디어", "SNS", "팔로우"],
    keywordsEn: ["facebook", "social media", "SNS", "follow"]
  },
  {
    title: "Instagram",
    titleEn: "Instagram",
    description: "KSA 공식 Instagram 계정",
    descriptionEn: "KSA Official Instagram Account",
    url: "https://www.instagram.com/hkustksa",
    urlEn: "https://www.instagram.com/hkustksa",
    category: "page",
    keywords: ["인스타그램", "인스타", "사진", "SNS"],
    keywordsEn: ["instagram", "insta", "photos", "social"]
  },

  // Special events/activities
  {
    title: "신입생 환영회",
    titleEn: "Freshman Welcome Party",
    description: "새로운 학생들을 위한 환영 행사",
    descriptionEn: "Welcome event for new students",
    url: "/ko/events/annual",
    urlEn: "/en/events/annual",
    category: "event",
    keywords: ["신입생", "환영회", "오리엔테이션", "새내기"],
    keywordsEn: ["freshman", "welcome", "orientation", "new students"]
  },
  {
    title: "엠티 (MT)",
    titleEn: "Membership Training (MT)",
    description: "회원 친목 도모 여행",
    descriptionEn: "Member bonding trip",
    url: "/ko/events/annual",
    urlEn: "/en/events/annual",
    category: "event",
    keywords: ["엠티", "MT", "여행", "친목", "캠프"],
    keywordsEn: ["MT", "trip", "bonding", "camp", "retreat"]
  },
  {
    title: "체육대회",
    titleEn: "Sports Day",
    description: "연례 체육 행사",
    descriptionEn: "Annual sports event",
    url: "/ko/events/annual",
    urlEn: "/en/events/annual",
    category: "event",
    keywords: ["체육대회", "운동회", "스포츠", "경기"],
    keywordsEn: ["sports day", "athletics", "sports", "competition"]
  },

  // Sub-clubs
  {
    title: "축구팀",
    titleEn: "Soccer Team",
    description: "KSA 축구 동아리",
    descriptionEn: "KSA Soccer Club",
    url: "/ko/clubs",
    urlEn: "/en/clubs",
    category: "club",
    keywords: ["축구", "풋볼", "운동", "스포츠"],
    keywordsEn: ["soccer", "football", "sports", "team"]
  },
  {
    title: "농구팀",
    titleEn: "Basketball Team",
    description: "KSA 농구 동아리",
    descriptionEn: "KSA Basketball Club",
    url: "/ko/clubs",
    urlEn: "/en/clubs",
    category: "club",
    keywords: ["농구", "농구팀", "운동", "스포츠"],
    keywordsEn: ["basketball", "team", "sports", "club"]
  },
  {
    title: "밴드",
    titleEn: "Band",
    description: "KSA 음악 밴드",
    descriptionEn: "KSA Music Band",
    url: "/ko/clubs",
    urlEn: "/en/clubs",
    category: "club",
    keywords: ["밴드", "음악", "공연", "악기"],
    keywordsEn: ["band", "music", "performance", "instruments"]
  }
];