export type Language = 'ko' | 'en';

export interface Translations {
  ko: Record<string, string>;
  en: Record<string, string>;
}

export const translations: Translations = {
  ko: {
    // Navigation
    'nav.home': '홈',
    'nav.about': '학생회',
    'nav.events': '행사',
    'nav.board': '게시판',
    'nav.clubs': '동아리',
    'nav.report': '문의하기',
    'nav.login': 'Login',
    'nav.photos': '갤러리',
    'nav.contact': '연락처',
    'nav.suggestion': '신문고',
    
    // About Us Menu
    'nav.about.constitution': '학생회칙',
    'nav.about.presidents': '회장단',
    'nav.about.executives': '임원진',
    
    // Events Menu
    'nav.events.annual': '연례행사',
    'nav.events.career': '커리어',
    'nav.events.culture': '문화',
    'nav.events.enquiry': '문의',
    
    // Board Menu
    'nav.board.career': '채용게시판',
    
    // Clubs Menu
    'nav.clubs.coming': 'Coming Soon',
    
    // Executive Committee page
    'exco.title': '회장단',
    'exco.subtitle': 'Korean Students\' Association 2024 - 2025 Executive Committee',
    'exco.president': 'President',
    'exco.president.korean': '회장',
    'exco.vice.president': 'Vice President',
    'exco.vice.president.korean': '부회장',
    'exco.secretary': 'Secretary',
    'exco.secretary.korean': '서기',
    'exco.treasurer': 'Treasurer',
    'exco.treasurer.korean': '회계',
    
    // Subcommittee page
    'subcommittee.title': '임원진',
    'subcommittee.subtitle': 'Korean Students\' Association 2024 - 2025 Executives',
    'subcommittee.coming': 'Coming Soon',
    
    // Events sub-pages
    'events.annual.title': '연례행사',
    'events.annual.subtitle': 'Annual Events and Activities',
    'events.career.title': '커리어',
    'events.career.subtitle': 'Career Development Events',
    'events.culture.title': '문화',
    'events.culture.subtitle': 'Cultural Events and Activities',
    'events.enquiry.title': '문의',
    'events.enquiry.subtitle': 'Event Inquiries',
    
    // Board sub-pages
    'board.career.subtitle': 'Career and Internship Opportunities',
    
    // Clubs page
    'clubs.title': '동아리',
    'clubs.subtitle': 'KSA Clubs and Organizations',
    'clubs.coming': 'Coming Soon',
    
    // Login page
    'login.title': 'Login',
    'login.subtitle': 'Member Login',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Login',
    'login.forgot': 'Forgot Password?',
    
    // Home page
    'home.title': 'Korean Students\' Association',
    'home.subtitle': 'The Hong Kong University of Science and Technology Students\' Union',
    'home.mission': '"회원들의 이익을 최우선으로 하고 국제 사회에서 한국 문화를 전파하는 것을 목적으로 합니다."',
    'home.about.button': '소개',
    'home.events.button': '행사',
    'home.quick.links': '빠른 링크',
    'home.about.card': '소개',
    'home.about.desc': '학생회 소개와 임원진을 알아보세요',
    'home.events.card': '행사',
    'home.events.desc': '다가오는 행사와 활동을 확인하세요',
    'home.photos.card': '갤러리',
    'home.photos.desc': '사진 갤러리를 둘러보세요',
    'home.suggestion.card': '신문고',
    'home.suggestion.desc': '건의사항과 피드백을 제출하세요',
    'home.contact.title': '연락하기',
    'home.contact.desc': '질문이나 참여하고 싶으신가요? 언제든 연락해 주세요!',
    'home.contact.button': '연락처',
    'home.submit.button': '건의사항 제출',
    'home.intro.title': '소개 / Introduction',
    'home.intro.korean': '홍콩과학기술대학교 (이하 홍콩과기대) 한인학생회 페이지에 오신 것을 환영합니다.\n\n홍콩과기대 한인학생회는 홍콩과기대 내에서 한국 문화를 전파하고, 회원들에게 한국 문화에 대한 이해를 습득 및 강화하며 한국 전통 문화에 대한 대중적 인식을 높일 기회의 장을 마련하며, 회원들에게 동호 활동 및 이벤트 등을 통해 다양한 교류가 원활하게 이루어질 수 있도록 기회의 장을 마련하며, 회원들의 복지 향상에 힘쓰며 회원들의 목소리를 대변하기 위한 학생단체입니다.\n\n방문해 주신 여러분 모두를 다시 한번 환영합니다.\n\n저희 홍콩과기대 한인학생회와 뜻깊은 교류를 이어나가실 수 있기를 바랍니다.',
    'home.intro.english': 'Welcome to the website of Korean Students\' Association (hereby KSA) of the Hong Kong University of Science and Technology (hereby HKUST) Students\' Union.\n\nKSA has been established under 4 main objectives stated in our constitution:\n\nTo spread and promote Korean culture in HKUST, To provide opportunities for members to know Korean cultures, to enhance their understandings of Korean culture and to raise public awareness of Korean traditional culture, To provide opportunities to members who have similar tastes in Korean culture to know better about each other by attending activities arranged by the society and by sharing experience, and To enhance the welfare and to represent the fundamental interests of the majority of members.\n\nWe again welcome all of you who have visited our website on behalf of KSA, HKUSTSU.\n\nWe sincerely hope you may establish meaningful relationship with our Association.',
    'home.contacts.title': '연락처 / Contacts',
    'home.contacts.facebook.page': 'Official Facebook Page',
    'home.contacts.facebook.group': 'Official Facebook Group',
    'home.contacts.internal.email': 'Internal Email',
    'home.contacts.external.email': 'External Email',
    'home.contacts.mailbox': 'Mailbox',
    'home.contacts.follow.updates': 'Follow to get updates!',
    'home.contacts.member.group': 'Member exclusive group! (KOR)',
    
    // About page
    'about.title': '소개',
    'about.mission': '"회원들의 이익을 최우선으로 하고 국제 사회에서 한국 문화를 전파하는 것을 목적으로 합니다."',
    'about.association': '우리 학생회',
    'about.greeting': '친애하는 홍콩과기대 한인학생 여러분!',
    'about.intro1': '홍콩과기대 한인 학생회가 출범한지 어느덧 7년이 지났습니다. 저희 학생회는 현재 홍콩 과기대에 재학 중인 학부생, 교환학생 및 대학원생들의 학생들간 교류와 홍콩 현지 문화에 적응하는데 도움을 주고자 여러 방면에서 노력하고 있습니다.',
    'about.intro2': '저희 홍콩과기대 한인학생회에는 지금까지 500여 명에 달하는 멤버들이 속해 있으며 그 수가 매년 늘어나고 있는 추세입니다. 이와 같은 현상에 대비해 저희는 학생들의 편의를 위해 신입생환영회, 엠티, Career Talk 등 다양한 이벤트를 단독적으로 기획 및 진행하고 있으며, 근래에는 홍콩 전체에 한인 유학생 수가 증가함에 따라 설립된 홍콩총한인학생회와의 밀접한 교류와 협력을 통해 한인 유학생들에게 최대한 많은 지원을 하려고 노력하고 있습니다.',
    'about.signature': '제 7대 홍콩과기대 한인학생회 회장 김동범 올림',
    'about.executive.title': '임원진',
    'about.constitution.title': '회칙',
    'about.constitution.article1': '제1조: 목적',
    'about.constitution.article1.desc': '홍콩과학기술대학교 한인학생회(KSA)는 한국 문화를 홍보하고, 한국 학생들 간의 네트워킹을 촉진하며, 학업 및 사회 활동을 위한 지원을 제공하는 것을 목적으로 합니다.',
    'about.constitution.article2': '제2조: 회원',
    'about.constitution.article2.desc': '홍콩과학기술대학교에 재학 중인 모든 한국 학생은 자동으로 KSA 회원이 됩니다. 한국 문화에 관심이 있는 비한국 학생들도 가입할 수 있습니다.',
    'about.constitution.article3': '제3조: 임원진',
    'about.constitution.article3.desc': '임원진은 1학년 동안 봉사하는 선출된 회원들로 구성됩니다. 행사 조직, 커뮤니케이션 관리, 협회 대표를 담당합니다.',
    'about.constitution.button': '전체 회칙 보기',
    'about.get.involved.title': '참여하기',
    'about.get.involved.desc': '행사에 참여하거나 임원진이 되고 싶으신가요? 언제든 연락해 주세요!',
    'about.contact.button': '연락처',
    'about.events.button': '행사 보기',
    
    // Constitution page
    'constitution.title': '학생회칙 / Constitution',
    'constitution.subtitle': '교칙상 회칙이 영문 중심으로 작성되어 있는 점 양해 부탁드립니다.',
    'constitution.article1.title': 'Article 1: General',
    'constitution.article1.1': 'The English full name of the society shall be "Korean Students\' Association, HKUSTSU".',
    'constitution.article1.2': 'The Chinese full name of the Society shall be "香港科技大学韩人学生会".',
    'constitution.article1.3': 'The short form of the name of the society shall be "KSA, HKUSTSU" in English and "韩人会" in Chinese.',
    
    // Board page
    'board.title': '게시판',
    'board.career.title': '채용게시판',
    'board.career.desc': '채용 정보와 인턴십 기회를 확인하세요',
    
    // Report page (신문고)
    'report.title': '학생회 신문고',
    'report.subtitle': '건의사항이나 피드백을 제출해 주세요',
    'report.form.email': '학교 이메일',
    'report.form.email.placeholder': 'your.email@connect.ust.hk',
    'report.form.subject': '제목',
    'report.form.subject.placeholder': '건의사항 제목을 입력하세요',
    'report.form.message': '건의사항',
    'report.form.message.placeholder': '상세한 건의사항을 입력해 주세요...',
    'report.form.submit': '제출하기',
    'report.form.success': '건의사항이 성공적으로 제출되었습니다.',
    'report.form.error': '제출 중 오류가 발생했습니다. 다시 시도해 주세요.',
    
    // Photos page
    'photos.title': '사진 갤러리',
    'photos.subtitle': 'KSA 행사와 활동의 추억과 순간들을 담아보세요',
    'photos.share.title': '사진 공유하기',
    'photos.share.desc': '행사 사진이 있으신가요? KSA 커뮤니티와 공유해 보세요!',
    'photos.submit.button': '사진 제출',
    'photos.events.button': '행사 보기',
    'photos.highlights.title': '최근 하이라이트',
    'photos.photos.count': '500+ 사진',
    'photos.photos.desc': '행사와 활동에서 포착한 순간들',
    'photos.events.count': '20+ 행사',
    'photos.events.desc': '학년도 내내 기록된 행사들',
    
    // Contact page
    'contact.title': '연락처',
    'contact.subtitle': 'KSA 임원진과 연락하세요. 언제든 도움을 드릴 준비가 되어 있습니다!',
    'contact.info.title': '연락처 정보',
    'contact.executive.title': '임원진',
    'contact.president.title': '회장',
    'contact.vice.president.title': '부회장',
    'contact.suggestion.title': '질문 및 건의사항',
    'contact.suggestion.desc': '질문 및 건의사항을 아래 링크로 보내주시길 바랍니다. 익명성이 보장되며 1주일 단위로 한인학생회 페이스북 그룹을 통해 답변을 해드리도록 하겠습니다.',
    'contact.suggestion.button': '신문고 제출하기',
    'contact.facebook.button': 'Facebook 그룹',
    'contact.hours.title': '업무 시간',
    'contact.general.title': '일반 문의',
    'contact.general.desc': '보통 24-48시간 내에 답변드립니다',
    'contact.urgent.title': '긴급 사안',
    'contact.urgent.desc': '긴급한 문제는 직접 연락해 주세요',
    'contact.get.involved.title': '참여하기',
    'contact.get.involved.desc': '행사에 참여하거나 임원진이 되고 싶으신가요? 언제든 연락해 주세요!',
    'contact.contact.button': '연락처',
    'contact.suggestion.submit.button': '건의사항 제출',
    
    // Suggestion page
    'suggestion.title': '신문고',
    'suggestion.subtitle': '질문 및 건의사항을 제출해주세요. 익명성이 보장되며 1주일 단위로 한인학생회 페이스북 그룹을 통해 답변을 드리겠습니다.',
    'suggestion.email.label': 'HKUST 이메일 주소 *',
    'suggestion.email.placeholder': 'yourname@connect.ust.hk',
    'suggestion.email.help': 'HKUST 이메일 주소(@connect.ust.hk)만 허용됩니다',
    'suggestion.anonymous.label': '익명으로 제출',
    'suggestion.content.label': '건의사항/질문 *',
    'suggestion.content.placeholder': '건의사항, 질문 또는 피드백을 공유해 주세요...',
    'suggestion.submit.button': '건의사항 제출',
    'suggestion.how.title': '작동 방식',
    'suggestion.how.item1': '• 건의사항은 KSA 임원진이 검토합니다',
    'suggestion.how.item2': '• 답변은 1주일 내에 Facebook 그룹에 게시됩니다',
    'suggestion.how.item3': '• 익명 제출은 완전히 기밀입니다',
    'suggestion.how.item4': '• 모든 종류의 피드백과 건의사항을 환영합니다',
    'suggestion.contact.text': '즉시 도움이 필요하신가요?',
    'suggestion.contact.link': '직접 연락하기',
    
    // Common
    'common.learn.more': '자세히 보기',
    'common.view.more': '더 보기',
    'common.submit': '제출',
    'common.cancel': '취소',
    'common.back': '뒤로',
    'common.next': '다음',
    'common.previous': '이전',
    'common.loading': '로딩 중...',
    'common.error': '오류가 발생했습니다',
    'common.success': '성공적으로 완료되었습니다',
    'common.copyright': '© HKUSTKSA 2024'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.events': 'Events',
    'nav.board': 'Board',
    'nav.clubs': 'Clubs',
    'nav.report': 'Contact',
    'nav.login': 'Login',
    'nav.photos': 'Photos',
    'nav.contact': 'Contact',
    'nav.suggestion': 'Suggestion Box',
    
    // About Us Menu
    'nav.about.constitution': 'Constitution',
    'nav.about.presidents': 'Presidents',
    'nav.about.executives': 'Executives',
    
    // Events Menu
    'nav.events.annual': 'Annual Events',
    'nav.events.career': 'Career',
    'nav.events.culture': 'Culture',
    'nav.events.enquiry': 'Enquiry',
    
    // Board Menu
    'nav.board.career': 'Career Board',
    
    // Clubs Menu
    'nav.clubs.coming': 'Coming Soon',
    
    // Executive Committee page
    'exco.title': 'Executive Committee',
    'exco.subtitle': 'Korean Students\' Association 2024 - 2025 Executive Committee',
    'exco.president': 'President',
    'exco.president.korean': 'President',
    'exco.vice.president': 'Vice President',
    'exco.vice.president.korean': 'Vice President',
    'exco.secretary': 'Secretary',
    'exco.secretary.korean': 'Secretary',
    'exco.treasurer': 'Treasurer',
    'exco.treasurer.korean': 'Treasurer',
    
    // Subcommittee page
    'subcommittee.title': 'Executives',
    'subcommittee.subtitle': 'Korean Students\' Association 2024 - 2025 Executives',
    'subcommittee.coming': 'Coming Soon',
    
    // Events sub-pages
    'events.annual.title': 'Annual Events',
    'events.annual.subtitle': 'Annual Events and Activities',
    'events.career.title': 'Career',
    'events.career.subtitle': 'Career Development Events',
    'events.culture.title': 'Culture',
    'events.culture.subtitle': 'Cultural Events and Activities',
    'events.enquiry.title': 'Enquiry',
    'events.enquiry.subtitle': 'Event Inquiries',
    
    // Board sub-pages
    'board.career.subtitle': 'Career and Internship Opportunities',
    
    // Clubs page
    'clubs.title': 'Clubs',
    'clubs.subtitle': 'KSA Clubs and Organizations',
    'clubs.coming': 'Coming Soon',
    
    // Home page
    'home.title': 'HKUST KSA',
    'home.subtitle': '홍콩과학기술대학교 한인학생회',
    'home.mission': '"To best serve the interests of our members and to spread Korean culture in an international community."',
    'home.about.button': 'About Us',
    'home.events.button': 'Events',
    'home.quick.links': 'Quick Links',
    'home.about.card': 'About Us',
    'home.about.desc': 'Learn about our association and executive committee',
    'home.events.card': 'Events',
    'home.events.desc': 'Check out our upcoming events and activities',
    'home.photos.card': 'Photos',
    'home.photos.desc': 'Browse through our photo gallery',
    'home.suggestion.card': 'Suggestion Box',
    'home.suggestion.desc': 'Submit your suggestions and feedback',
    'home.contact.title': 'Get in Touch',
    'home.contact.desc': 'Have questions or want to get involved? We\'d love to hear from you!',
    'home.contact.button': 'Contact Us',
    'home.submit.button': 'Submit Suggestion',
    'home.intro.title': 'Introduction',
    'home.intro.korean': 'Welcome to the website of Korean Students\' Association (hereby KSA) of the Hong Kong University of Science and Technology (hereby HKUST) Students\' Union.\n\nKSA has been established under 4 main objectives stated in our constitution:\n\nTo spread and promote Korean culture in HKUST, To provide opportunities for members to know Korean cultures, to enhance their understandings of Korean culture and to raise public awareness of Korean traditional culture, To provide opportunities to members who have similar tastes in Korean culture to know better about each other by attending activities arranged by the society and by sharing experience, and To enhance the welfare and to represent the fundamental interests of the majority of members.\n\nWe again welcome all of you who have visited our website on behalf of KSA, HKUSTSU.\n\nWe sincerely hope you may establish meaningful relationship with our Association.',
    'home.intro.english': 'Welcome to the website of Korean Students\' Association (hereby KSA) of the Hong Kong University of Science and Technology (hereby HKUST) Students\' Union.\n\nKSA has been established under 4 main objectives stated in our constitution:\n\nTo spread and promote Korean culture in HKUST, To provide opportunities for members to know Korean cultures, to enhance their understandings of Korean culture and to raise public awareness of Korean traditional culture, To provide opportunities to members who have similar tastes in Korean culture to know better about each other by attending activities arranged by the society and by sharing experience, and To enhance the welfare and to represent the fundamental interests of the majority of members.\n\nWe again welcome all of you who have visited our website on behalf of KSA, HKUSTSU.\n\nWe sincerely hope you may establish meaningful relationship with our Association.',
    'home.contacts.title': 'Contacts',
    'home.contacts.facebook.page': 'Official Facebook Page',
    'home.contacts.facebook.group': 'Official Facebook Group',
    'home.contacts.internal.email': 'Internal Email',
    'home.contacts.external.email': 'External Email',
    'home.contacts.mailbox': 'Mailbox',
    'home.contacts.follow.updates': 'Follow to get updates!',
    'home.contacts.member.group': 'Member exclusive group! (KOR)',
    
    // About page
    'about.title': 'About Us',
    'about.mission': '"To best serve the interests of our members and to spread Korean culture in an international community."',
    'about.association': 'Our Association',
    'about.greeting': 'Dear HKUST Korean students!',
    'about.intro1': 'It has been 7 years since the HKUST Korean Students\' Association was established. Our student association is currently working in various ways to help undergraduate students, exchange students, and graduate students studying at HKUST to interact with each other and adapt to Hong Kong\'s local culture.',
    'about.intro2': 'Our HKUST Korean Students\' Association currently has about 500 members, and the number is increasing every year. In response to this phenomenon, we are planning and conducting various events such as freshman welcome parties, MTs, and Career Talks for the convenience of students, and recently, as the number of Korean international students in Hong Kong has increased, we are working to provide maximum support to Korean international students through close exchange and cooperation with the Hong Kong Korean Students\' Association, which was established.',
    'about.signature': 'Sincerely, DongBum Kim, 7th President of HKUST Korean Students\' Association',
    'about.executive.title': 'Executive Committee',
    'about.constitution.title': 'Constitution',
    'about.constitution.article1': 'Article 1: Purpose',
    'about.constitution.article1.desc': 'The Korean Students\' Association (KSA) at HKUST aims to promote Korean culture, facilitate networking among Korean students, and provide support for academic and social activities.',
    'about.constitution.article2': 'Article 2: Membership',
    'about.constitution.article2.desc': 'All Korean students enrolled at HKUST are automatically members of KSA. Non-Korean students interested in Korean culture are also welcome to join.',
    'about.constitution.article3': 'Article 3: Executive Committee',
    'about.constitution.article3.desc': 'The Executive Committee consists of elected members who serve for one academic year. They are responsible for organizing events, managing communications, and representing the association.',
    'about.constitution.button': 'View Full Constitution',
    'about.get.involved.title': 'Get Involved',
    'about.get.involved.desc': 'Want to join our events or become part of the executive committee? We\'d love to hear from you!',
    'about.contact.button': 'Contact Us',
    'about.events.button': 'View Events',
    
    // Constitution page
    'constitution.title': 'Constitution',
    'constitution.subtitle': 'Hong Kong University of Science and Technology Korean Students\' Association Constitution',
    'constitution.inquiry.title': 'Constitution Inquiries',
    'constitution.inquiry.desc': 'If you have questions about the constitution or suggestions for amendments, please feel free to contact us anytime.',
    'constitution.inquiry.button': 'Contact Us',
    'constitution.amendment.button': 'Amendment Proposal',
    'constitution.navigation.title': 'View Other Pages',
    
    // Board page
    'board.title': 'Board',
    'board.career.title': 'Career Board',
    'board.career.desc': 'Check out our career and internship opportunities',
    
    // Report page (신문고)
    'report.title': 'Report',
    'report.subtitle': 'Submit your suggestions and feedback',
    'report.form.email': 'School Email',
    'report.form.email.placeholder': 'your.email@connect.ust.hk',
    'report.form.subject': 'Subject',
    'report.form.subject.placeholder': 'Enter your subject',
    'report.form.message': 'Message',
    'report.form.message.placeholder': 'Please enter your detailed message...',
    'report.form.submit': 'Submit',
    'report.form.success': 'Your suggestion has been submitted successfully.',
    'report.form.error': 'An error occurred while submitting. Please try again.',
    
    // Photos page
    'photos.title': 'Photo Gallery',
    'photos.subtitle': 'Capture the memories and moments from our KSA events and activities',
    'photos.share.title': 'Share Your Photos',
    'photos.share.desc': 'Have photos from our events? Share them with the KSA community!',
    'photos.submit.button': 'Submit Photos',
    'photos.events.button': 'View Events',
    'photos.highlights.title': 'Recent Highlights',
    'photos.photos.count': '500+ Photos',
    'photos.photos.desc': 'Captured moments from our events and activities',
    'photos.events.count': '20+ Events',
    'photos.events.desc': 'Events documented throughout the academic year',
    
    // Contact page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with the KSA executive committee. We\'re here to help!',
    'contact.info.title': 'Contact Information',
    'contact.executive.title': 'Executive Committee',
    'contact.president.title': 'President',
    'contact.vice.president.title': 'Vice President',
    'contact.suggestion.title': 'Questions & Suggestions',
    'contact.suggestion.desc': 'Please send your questions and suggestions through the link below. Anonymity is guaranteed and responses will be provided through the Korean Students\' Association Facebook group on a weekly basis.',
    'contact.suggestion.button': 'Submit Suggestion',
    'contact.facebook.button': 'Facebook Group',
    'contact.hours.title': 'Office Hours',
    'contact.general.title': 'General Inquiries',
    'contact.general.desc': 'We typically respond within 24-48 hours',
    'contact.urgent.title': 'Urgent Matters',
    'contact.urgent.desc': 'For urgent issues, please contact directly',
    'contact.get.involved.title': 'Get Involved',
    'contact.get.involved.desc': 'Want to join our events or become part of the executive committee? We\'d love to hear from you!',
    'contact.contact.button': 'Contact Us',
    'contact.suggestion.submit.button': 'Submit Suggestion',
    
    // Suggestion page
    'suggestion.title': 'Suggestion Box',
    'suggestion.subtitle': 'Please submit your questions and suggestions. Anonymity is guaranteed and responses will be provided through the Korean Students\' Association Facebook group on a weekly basis.',
    'suggestion.email.label': 'HKUST Email Address *',
    'suggestion.email.placeholder': 'yourname@connect.ust.hk',
    'suggestion.email.help': 'Only HKUST email addresses (@connect.ust.hk) are accepted',
    'suggestion.anonymous.label': 'Submit anonymously',
    'suggestion.content.label': 'Suggestion/Question *',
    'suggestion.content.placeholder': 'Please share your suggestion, question, or feedback...',
    'suggestion.submit.button': 'Submit Suggestion',
    'suggestion.how.title': 'How it works',
    'suggestion.how.item1': '• Your suggestion will be reviewed by the KSA executive committee',
    'suggestion.how.item2': '• Responses will be posted on our Facebook group within a week',
    'suggestion.how.item3': '• Anonymous submissions are completely confidential',
    'suggestion.how.item4': '• We welcome all types of feedback and suggestions',
    'suggestion.contact.text': 'Need immediate assistance?',
    'suggestion.contact.link': 'Contact us directly',
    
    // Common
    'common.learn.more': 'Learn More',
    'common.view.more': 'View More',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Successfully completed',
    'common.copyright': '© HKUSTKSA 2024'
  }
};

export function getTranslation(key: string, lang: Language): string {
  return translations[lang][key] || key;
}

export function getCurrentLanguage(url: URL): Language {
  const pathname = url.pathname;
  if (pathname.startsWith('/en/') || pathname === '/en') return 'en';
  if (pathname.startsWith('/ko/') || pathname === '/ko') return 'ko';
  return 'ko'; // 기본값은 한국어
}

export function getLanguageFromPath(pathname: string): Language {
  if (pathname.startsWith('/en/') || pathname === '/en') return 'en';
  if (pathname.startsWith('/ko/') || pathname === '/ko') return 'ko';
  return 'ko';
}

export function addLanguageToPath(pathname: string, lang: Language): string {
  // 이미 언어 경로가 있는 경우 (예: /ko, /en, /ko/about, /en/about)
  if (pathname.startsWith('/en') || pathname.startsWith('/ko')) {
    return pathname.replace(/^\/(en|ko)/, `/${lang}`);
  }
  // trailingSlash: "never" 설정에 맞게 슬래시 제거
  const cleanPath = pathname === "/" ? "" : pathname;
  return `/${lang}${cleanPath}`;
} 