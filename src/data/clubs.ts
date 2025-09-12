export type Club = {
  key: string;
  nameKo: string;
  nameEn: string;
  emoji: string;
  logo?: string; // Path to logo image (optional)
  bgColor: string;
  category:
    | "Sports"
    | "Business"
    | "Music"
    | "Academic"
    | "Service"
    | "Creative";
  subtitleKo: string;
  subtitleEn: string;
  president: string;
  link?: string;
  descriptionKo?: string;
  descriptionEn?: string;
};

// 색상 정의 (Tailwind 클래스와 실제 색상값 - 연한 버전)
export const COLORS = {
  green: { class: "bg-green-100", value: "#dcfce7" },
  blue: { class: "bg-blue-100", value: "#dbeafe" },
  purple: { class: "bg-purple-100", value: "#f3e8ff" },
  red: { class: "bg-red-100", value: "#fee2e2" },
  orange: { class: "bg-orange-100", value: "#ffedd5" },
  teal: { class: "bg-teal-100", value: "#ccfbf1" },
  indigo: { class: "bg-indigo-100", value: "#e0e7ff" },
  yellow: { class: "bg-yellow-100", value: "#fef3c7" },
  pink: { class: "bg-pink-100", value: "#fce7f3" },
  cyan: { class: "bg-cyan-100", value: "#cffafe" },
} as const;

export type ColorKey = keyof typeof COLORS;

// 헬퍼 함수들
export const getColorClass = (colorKey: ColorKey) => COLORS[colorKey].class;
export const getColorValue = (colorKey: ColorKey) => COLORS[colorKey].value;

// 클럽 찾기 헬퍼 함수
export const findClubByKey = (key: string) =>
  clubs.find((club) => club.key === key);
export const getClubsByCategory = (category: string) => {
  if (category === "all") return clubs;
  return clubs.filter((club) => club.category === category);
};

// 카테고리 목록 가져오기
export const getCategories = () => {
  const allCategories = [...new Set(clubs.map((club) => club.category))];
  // Sports를 맨 앞으로, 나머지는 알파벳 순으로 정렬
  const otherCategories = allCategories
    .filter((cat) => cat !== "Sports")
    .sort();
  return ["Sports", ...otherCategories];
};

export const clubs: Club[] = [
  {
    key: "ustime",
    nameKo: "어스타임",
    nameEn: "USTime",
    emoji: "🌍",
    logo: "/images/club-logos/ustime-logo.svg",
    bgColor: "teal",
    category: "Creative",
    subtitleKo: "콘텐츠 제작 동아리",
    subtitleEn: "Content Creation Club",
    president: "우동균",
    link: "https://www.instagram.com/ustime__/",
    descriptionKo:
      "과기대생활의 추억을 다채롭게 담아내는 한인회 원앤온리 유튜브 컨텐츠 제작 동아리 어스타임입니다",
    descriptionEn:
      "It's USTime, a YouTube content producing club that contains various memories of the university life",
  },
  {
    key: "sosu",
    nameKo: "소수",
    nameEn: "SOSU",
    emoji: "📚",
    logo: "/images/club-logos/sosu-logo.svg",
    bgColor: "red",
    category: "Service",
    subtitleKo: "봉사 동아리",
    subtitleEn: "Volunteer Club",
    president: "김민서",
    link: "https://www.instagram.com/sosu_hkust/",
    descriptionKo:
      "안녕하세요, 봉사동아리 SOSU 입니다! 저희 SOSU는 다양한 봉사 활동을 통해 지역 사회에 기여하고, 함께 성장하는 경험을 만들어가고자 합니다. 봉사를 통해 단순한 나눔을 넘어, 새로운 사람들과의 소중한 인연을 맺고, 따뜻한 추억을 쌓아 나중에 값진 기억으로 남을 선행을 같이 만들어갑시다. 앞으로도 더 다양한 활동과 프로그램을 준비 중이니 많은 기대 부탁드려요! 여러분과 함께하는 모든 순간이 특별하고 의미 있는 시간으로 남길 바랍니다. 궁금한 점이 있으시면 언제든지 저희 인스타그램 @sosu_hkust 로 문의해 주세요.",
    descriptionEn:
      "Hello, we are SOSU, a volunteer club! We, SOSU, would like to contribute to the local community and create an experience of growing together through various volunteer activities. Let's go beyond just sharing, build precious relationships with new people, build warm memories, and make good deeds that will become valuable memories in the future. We are preparing more diverse activities and programs in the future, so please look forward to it! I hope every moment we spend with you will be a special and meaningful time. If you have any questions, please feel free to contact us on Instagram @sosu_hkust.",
  },
  {
    key: "kriss",
    nameKo: "크리스",
    nameEn: "KRISS",
    emoji: "💸",
    logo: "/images/club-logos/kriss-logo.svg",
    bgColor: "purple",
    category: "Business",
    subtitleKo: "금융 & 투자 전략 동아리",
    subtitleEn: "Finance & Investment Strategy Club",
    president: "박재현",
    link: "https://www.instagram.com/kriss_official1/",
    descriptionKo:
      "홍콩에서 ‘금융’은 전체 GDP의 25% 가까이를 차지하는 대규모 산업입니다. KRISS는 홍콩에서 금융업계 진출을 희망하는 학우들에게 필요한 교육, 멘토링, 커리어 세션 등을 제공하는데 목적을 두고 있는 금융학회입니다. Quant, Macroeconomic, Equity, Strategy consulting 등 여러 팀으로 나누어져 공대생부터 경영대생까지 다양한 전공을 가지고 있는 학회원들이 함께 프로젝트를 진행하며, Goldman Sachs, PwC, HSBC 등 현업에 계신 다양한 선배님들과의 멘토링 및 네트워킹, 채용 공고와 취업 준비 자료 등 다양한 혜택을 누릴 수 있습니다. \n*홍콩 금융계 취업을 희망하신다면 빠르게 시작하실 수록 유리합니다 :)",
    descriptionEn:
      'In Hong Kong, "finance" is a large industry that accounts for nearly 25% of total GDP. KRISS is a financial association that aims to provide necessary education, mentoring, and career sessions for students who wish to enter the financial industry in Hong Kong. It is divided into several teams, including Quant, Macroeconomic, Equity, and Strategy consulting, and academic members with various majors from engineering to business students will work together on the project, and you can enjoy various benefits such as mentoring and networking with various seniors in the field such as Goldman Sachs, PwC, and HSBC, job postings and job preparation materials. \n*If you want to get a job in Hong Kong finance, the sooner you start, the more advantageous it is :)',
  },
  {
    key: "markust",
    nameKo: "마커스트",
    nameEn: "MARKUST",
    emoji: "💼",
    logo: "/images/club-logos/markust-logo.svg",
    bgColor: "blue",
    category: "Business",
    subtitleKo: "마케팅 동아리",
    subtitleEn: "Marketing Club",
    president: "문강현",
    link: "https://www.instagram.com/markust.ksa/",
    descriptionKo:
      "마커스트는 마케팅에 관심이 있는 학생들이 모여 실무 경험을 쌓고 마케팅 전략을 학습하는 동아리입니다. 실제 프로젝트를 통해 브랜딩, 광고, 디지털 마케팅 등 다양한 분야의 경험을 제공합니다.",
    descriptionEn:
      "Markust is a club where students interested in marketing gather to gain practical experience and learn marketing strategies. Through real projects, we provide experience in various fields including branding, advertising, and digital marketing.",
  },
  {
    key: "basketball",
    nameKo: "농구부",
    nameEn: "Basketball Club",
    emoji: "🏀",
    logo: "/images/club-logos/basketball-logo.svg",
    bgColor: "orange",
    category: "Sports",
    subtitleKo: "농구 동아리",
    subtitleEn: "Basketball Club",
    president: "윤성빈",
    link: "https://www.instagram.com/hkustbasketball.ksa/",
    descriptionKo:
      "HKUST KSA 농구부는 농구를 사랑하는 학생들이 함께 실력을 향상시키고 경기를 즐기는 동아리입니다. 홍콩 내에 있는 Sketch Basketball League 를 통해 타 대학 한인회 농구부와 경쟁 합니다. 정기 연습과 친선 경기를 통해 농구 실력은 물론 팀워크와 스포츠맨십을 기릅니다.",
    descriptionEn:
      "The HKUST KSA Basketball Club is a club where basketball-loving students improve their skills and enjoy playing together. It competes with the Korean Basketball Club of other universities through the Sketch Basketball League in Hong Kong. Through regular practice and friendly matches, students develop teamwork and sportsmanship as well as their basketball skills",
  },
  {
    key: "football",
    nameKo: "축구부",
    nameEn: "Football Club",
    emoji: "⚽",
    logo: "/images/club-logos/football-logo.svg",
    bgColor: "green",
    category: "Sports",
    subtitleKo: "축구 동아리",
    subtitleEn: "Football Club",
    president: "김준영",
    link: "https://www.instagram.com/hkustfootball.ksa/",
    descriptionKo:
      "HKUST KSA 축구부는 축구를 사랑하는 학생들이 모여 정기적으로 훈련하고 경기를 하는 동아리입니다. 실력 향상은 물론 멤버들 간의 친목을 도모하며, 다양한 대회 참가를 통해 팀워크를 기르고 있습니다.",
    descriptionEn:
      "HKUST KSA Football Club brings together students who love football for regular training and matches. We focus on improving skills while building friendships among members, and develop teamwork through participation in various competitions.",
  },
  {
    key: "clearwater",
    nameKo: "청수",
    nameEn: "Clearwater",
    emoji: "💧",
    logo: "/images/club-logos/clearwater-logo.svg",
    bgColor: "indigo",
    category: "Music",
    subtitleKo: "밴드 동아리",
    subtitleEn: "Band Club",
    president: "윤지선",
    link: "https://www.instagram.com/clearwaterband_hkust/",
    descriptionKo:
      "청수밴드는 변치 않는 열정을 가지고 장르와 국가에 국한되지 않는 다양한 음악들을 합주하고 공연하는 홍콩과기대의 한인밴드입니다!",
    descriptionEn:
      "Clearwater is a  Korean band from the Hong Kong University of Science and Technology that collaborates and performs a variety of music that is not limited to genres and countries with unchanging passion!",
  },
  {
    key: "hkustband",
    nameKo: "흐쿠스트",
    nameEn: "H.KUSTBand",
    emoji: "🎵",
    logo: "/images/club-logos/h-kust-logo.svg",
    bgColor: "yellow",
    category: "Music",
    subtitleKo: "밴드 동아리",
    subtitleEn: "Band Club",
    president: "이준엽",
    link: "https://www.instagram.com/hkustband.ksa/",
    descriptionKo: "안녕하세요, 전통이 깊은 밴드 흐쿠스트입니다!",
    descriptionEn: "Hello, we're a band with a deep tradition, 흐쿠스트!",
  },
  {
    key: "sapientia",
    nameKo: "사피엔티아",
    nameEn: "SAPIENTIA",
    emoji: "🌿",
    logo: "/images/club-logos/sapienta-logo.svg",
    bgColor: "pink",
    category: "Academic",
    subtitleKo: "바이오 랩미팅 동아리",
    subtitleEn: "Bio Lab Meeting Club",
    president: "최경서",
    link: "https://www.instagram.com/sapientia.hkust/",
    descriptionKo:
      "사피엔티아는 생물 관련 다양한 분야를 탐구하는 학술 동아리입니다. 바이오 학생이라면 필수인 랩 테크닉을 팀원들과 함께 연구하고, 흥미로운 바이오 주제에 대한 논문 분석 및 발표, 인스타 피드 게시 등 다양한 활동을 진행합니다.",
    descriptionEn:
      "Sapientia is an academic club that explores various fields related to living things. Bio students work with their team members on essential lab techniques, analyze and present papers on interesting bio topics, and post Instagram feeds.",
  },
];
