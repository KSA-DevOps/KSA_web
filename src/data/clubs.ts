export type Club = {
  key: string;
  nameKo: string;
  emoji: string;
  bgColor: string;
  subtitleEn: string;
  president: string;
  link?: string;
  descriptionKo?: string;
  descriptionEn?: string;
};

// 색상 정의 (Tailwind 클래스와 실제 색상값 - 연한 버전)
export const COLORS = {
  green: { class: 'bg-green-100', value: '#dcfce7' },
  blue: { class: 'bg-blue-100', value: '#dbeafe' },
  purple: { class: 'bg-purple-100', value: '#f3e8ff' },
  red: { class: 'bg-red-100', value: '#fee2e2' },
  orange: { class: 'bg-orange-100', value: '#ffedd5' },
  teal: { class: 'bg-teal-100', value: '#ccfbf1' },
  indigo: { class: 'bg-indigo-100', value: '#e0e7ff' },
  yellow: { class: 'bg-yellow-100', value: '#fef3c7' },
  pink: { class: 'bg-pink-100', value: '#fce7f3' },
  cyan: { class: 'bg-cyan-100', value: '#cffafe' }
} as const;

export type ColorKey = keyof typeof COLORS;

// 헬퍼 함수들
export const getColorClass = (colorKey: ColorKey) => COLORS[colorKey].class;
export const getColorValue = (colorKey: ColorKey) => COLORS[colorKey].value;

// 클럽 찾기 헬퍼 함수
export const findClubByKey = (key: string) => clubs.find(club => club.key === key);
export const getClubsByCategory = (category: string) => {
  // 카테고리별로 클럽을 분류하는 로직을 추가할 수 있습니다
  return clubs;
};

export const clubs: Club[] = [
  {
    key: "football",
    nameKo: "축구부",
    emoji: "⚽",
    bgColor: "green",
    subtitleEn: "축구 동아리",
    president: "김준영",
    link: "https://www.instagram.com/hkustfootball.ksa/",
    descriptionKo: "HKUST KSA 축구부는 축구를 사랑하는 학생들이 모여 정기적으로 훈련하고 경기를 하는 동아리입니다. 실력 향상은 물론 멤버들 간의 친목을 도모하며, 다양한 대회 참가를 통해 팀워크를 기르고 있습니다.",
    descriptionEn: "HKUST KSA Football Club brings together students who love football for regular training and matches. We focus on improving skills while building friendships among members, and develop teamwork through participation in various competitions."
  },
  {
    key: "markust",
    nameKo: "마커스트",
    emoji: "💼",
    bgColor: "blue",
    subtitleEn: "마케팅 동아리",
    president: "문강현",
    link: "https://www.instagram.com/markust.ksa/",
    descriptionKo: "마커스트는 마케팅에 관심이 있는 학생들이 모여 실무 경험을 쌓고 마케팅 전략을 학습하는 동아리입니다. 실제 프로젝트를 통해 브랜딩, 광고, 디지털 마케팅 등 다양한 분야의 경험을 제공합니다.",
    descriptionEn: "Markust is a club where students interested in marketing gather to gain practical experience and learn marketing strategies. Through real projects, we provide experience in various fields including branding, advertising, and digital marketing."
  },
  {
    key: "kriss",
    nameKo: "크리스",
    emoji: "💸",
    bgColor: "purple",
    subtitleEn: "금융 & 투자 전략 동아리",
    president: "박재현",
    link: "https://www.instagram.com/kriss_official1/",
    descriptionKo: "크리스는 금융과 투자에 관심이 있는 학생들이 모여 투자 전략을 연구하고 금융 지식을 공유하는 동아리입니다. 모의 투자 대회, 금융 세미나, 업계 전문가 초청 강연 등을 통해 실무 능력을 기릅니다.",
    descriptionEn: "KRISS is a club where students interested in finance and investment gather to research investment strategies and share financial knowledge. We develop practical skills through mock investment competitions, financial seminars, and expert guest lectures."
  },
  {
    key: "sosu",
    nameKo: "소수",
    emoji: "📚",
    bgColor: "red",
    subtitleEn: "봉사 동아리",
    president: "김민서",
    link: "https://www.instagram.com/sosu_hkust/",
    descriptionKo: "소수는 지역사회에 기여하고 소외계층을 돕는 봉사활동을 하는 동아리입니다. 정기적인 봉사활동을 통해 사회적 책임감을 기르고, 멤버들 간의 따뜻한 유대감을 형성합니다.",
    descriptionEn: "Sosu is a volunteer club that contributes to the local community and helps underprivileged groups. Through regular volunteer activities, we develop social responsibility and create warm bonds among members."
  },
  {
    key: "basketball",
    nameKo: "농구부",
    emoji: "🏀",
    bgColor: "orange",
    subtitleEn: "농구 동아리",
    president: "윤성빈",
    link: "https://www.instagram.com/hkustbasketball.ksa/",
    descriptionKo: "HKUST KSA 농구부는 농구를 사랑하는 학생들이 함께 실력을 향상시키고 경기를 즐기는 동아리입니다. 정기 연습과 친선 경기를 통해 농구 실력은 물론 팀워크와 스포츠맨십을 기릅니다.",
    descriptionEn: "HKUST KSA Basketball Club is where students who love basketball come together to improve their skills and enjoy games. Through regular practice and friendly matches, we develop basketball skills as well as teamwork and sportsmanship."
  },
  {
    key: "ustime",
    nameKo: "어스타임",
    emoji: "🌍",
    bgColor: "teal",
    subtitleEn: "콘텐츠 제작 동아리",
    president: "우동균",
    link: "https://www.instagram.com/ustime__/",
    descriptionKo: "어스타임은 다양한 콘텐츠를 기획하고 제작하는 창작 동아리입니다. 영상, 사진, 글 등 다양한 미디어를 활용하여 창의적인 작품을 만들고, 멤버들의 창작 능력을 향상시키는 것을 목표로 합니다.",
    descriptionEn: "USTime is a creative club that plans and produces various types of content. We create creative works using various media such as videos, photos, and writing, with the goal of improving members' creative abilities."
  },
  {
    key: "clearwater",
    nameKo: "청수",
    emoji: "💧",
    bgColor: "indigo",
    subtitleEn: "밴드 동아리",
    president: "윤지선",
    link: "https://www.instagram.com/clearwaterband_hkust/",
    descriptionKo: "청수는 음악을 사랑하는 학생들이 모여 밴드 활동을 하는 동아리입니다. 다양한 장르의 음악을 연주하며, 정기 공연과 행사 참여를 통해 실력을 향상시키고 음악적 교류를 나눕니다.",
    descriptionEn: "Clearwater is a band club where students who love music come together for band activities. We play music of various genres and improve our skills through regular performances and event participation while sharing musical exchanges."
  },
  {
    key: "hkustband",
    nameKo: "흐쿠스트",
    emoji: "🎵",
    bgColor: "yellow",
    subtitleEn: "밴드 동아리",
    president: "이준엽",
    link: "https://www.instagram.com/hkustband.ksa/",
    descriptionKo: "흐쿠스트는 HKUST의 대표 밴드 동아리로, 다양한 악기와 장르를 아우르는 음악 활동을 합니다. 정기 공연, 학교 행사 참여, 외부 공연 등을 통해 음악적 성장과 무대 경험을 쌓아갑니다.",
    descriptionEn: "HKUST Band is the representative band club of HKUST, engaging in musical activities that span various instruments and genres. We build musical growth and stage experience through regular performances, school event participation, and external shows."
  },
  {
    key: "sapientia",
    nameKo: "사피엔티아",
    emoji: "🌿",
    bgColor: "pink",
    subtitleEn: "바이오 랩미팅 동아리",
    president: "최경서",
    link: "https://www.instagram.com/sapientia.hkust/",
    descriptionKo: "사피엔티아는 생명과학과 바이오테크놀로지에 관심이 있는 학생들이 모여 학술적 토론과 연구 활동을 하는 동아리입니다. 랩미팅을 통해 최신 연구 동향을 공유하고, 실험 기법과 과학적 사고를 기릅니다.",
    descriptionEn: "Sapientia is a club where students interested in life sciences and biotechnology gather for academic discussions and research activities. Through lab meetings, we share the latest research trends and develop experimental techniques and scientific thinking."
  },
  {
    key: "muldong",
    nameKo: "멀동멀동",
    emoji: "🏓",
    bgColor: "cyan",
    subtitleEn: "운동 동아리",
    president: "",
    link: "https://www.instagram.com/muldong_hkust/",
    descriptionKo: "멀동멀동은 다양한 운동을 즐기는 복합 스포츠 동아리입니다. 탁구, 배드민턴, 테니스 등 다양한 종목을 통해 건강한 대학 생활을 만들어가고, 스포츠를 통한 친목 도모를 목표로 합니다.",
    descriptionEn: "Muldong Muldong is a multi-sport club that enjoys various physical activities. Through various sports such as table tennis, badminton, and tennis, we create a healthy university life and aim to build friendships through sports."
  },
];