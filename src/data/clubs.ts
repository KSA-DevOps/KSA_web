export type Club = {
  key: string;
  nameKo: string;
  emoji: string;
  bgColor: string;
  subtitleEn: string;
  president: string;
  link?: string;
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

export const clubs: Club[] = [
  {
    key: "football",
    nameKo: "축구부",
    emoji: "⚽",
    bgColor: "green",
    subtitleEn: "축구 동아리",
    president: "김준영",
    link: "https://www.instagram.com/hkustfootball.ksa/"
  },
  {
    key: "markust",
    nameKo: "마커스트",
    emoji: "💼",
    bgColor: "blue",
    subtitleEn: "마케팅 동아리",
    president: "문강현",
    link: "https://www.instagram.com/markust.ksa/",
  },
  {
    key: "kriss",
    nameKo: "크리스",
    emoji: "💸",
    bgColor: "purple",
    subtitleEn: "금융 & 투자 전략 동아리",
    president: "박재현",
    link: "https://www.instagram.com/kriss_official1/",
  },
  {
    key: "sosu",
    nameKo: "소수",
    emoji: "📚",
    bgColor: "red",
    subtitleEn: "봉사 동아리",
    president: "김민서",
    link: "https://www.instagram.com/sosu_hkust/",
  },
  {
    key: "basketball",
    nameKo: "농구부",
    emoji: "🏀",
    bgColor: "orange",
    subtitleEn: "농구 동아리",
    president: "윤성빈",
    link: "https://www.instagram.com/hkustbasketball.ksa/"
  },
  {
    key: "ustime",
    nameKo: "어스타임",
    emoji: "🌍",
    bgColor: "teal",
    subtitleEn: "콘텐츠 제작 동아리",
    president: "우동균",
    link: "https://www.instagram.com/ustime__/",
  },
  {
    key: "clearwater",
    nameKo: "청수",
    emoji: "💧",
    bgColor: "indigo",
    subtitleEn: "밴드 동아리",
    president: "윤지선",
    link: "https://www.instagram.com/clearwaterband_hkust/",
  },
  {
    key: "hkustband",
    nameKo: "흐쿠스트",
    emoji: "🎵",
    bgColor: "yellow",
    subtitleEn: "밴드 동아리",
    president: "이준엽",
    link: "https://www.instagram.com/hkustband.ksa/",
  },
  {
    key: "sapientia",
    nameKo: "사피엔티아",
    emoji: "🌿",
    bgColor: "pink",
    subtitleEn: "바이오 랩미팅 동아리",
    president: "최경서",
    link: "https://www.instagram.com/sapientia.hkust/",
  },
  {
    key: "muldong",
    nameKo: "멀동멀동",
    emoji: "🏓",
    bgColor: "cyan",
    subtitleEn: "운동 동아리",
    president: "",
    link: "https://www.instagram.com/muldong_hkust/",
  },
];