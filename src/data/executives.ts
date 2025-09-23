export interface Executive {
  position: string;
  name: string;
  studentId: string;
  program: string;
  year: number;
  email: string;
  image?: string;
}

export interface ExecutiveGroup {
  title: string;
  executives: Executive[];
}

export const executiveData: ExecutiveGroup[] = [
  {
    title: "회장단 / Presidents",
    executives: [
      {
        position: "President",
        name: "KWON Hyekin",
        studentId: "20812409",
        program: "MARK",
        year: 2,
        email: "hkwonab@connect.ust.hk",
        image: "/images/profile_img/KWON Hyekin.jpg"
      },
      {
        position: "External-Vice President",
        name: "KIM Heeseung",
        studentId: "20790314",
        program: "OM",
        year: 2,
        email: "hkimbh@connect.ust.hk",
        image: "/images/profile_img/KIM Heeseung.jpg"
      },
      {
        position: "Internal-Vice President",
        name: "KIM Suhyeong",
        studentId: "20744731",
        program: "MGMT",
        year: 2,
        email: "skimbk@connect.ust.hk",
        image: "/images/profile_img/KIM Suhyeong.jpg"
      }
    ]
  },
  {
    title: "임원진 / Executives",
    executives: [
      {
        position: "External Manager",
        name: "SHIN Jun hyeong",
        studentId: "20815542",
        program: "MGMT",
        year: 2,
        email: "jshinae@connect.ust.hk",
        image: "/images/profile_img/SHIN Jun hyeong.jpg"
      },
      {
        position: "Internal Manager",
        name: "LEE Haelin",
        studentId: "21103532",
        program: "ACCT",
        year: 1,
        email: "hleebi@connect.ust.hk",
        image: "/images/profile_img/LEE Haelin.jpg"
      },
      {
        position: "Internal Operation Manager",
        name: "KWEON Yerin",
        studentId: "21010096",
        program: "DASC",
        year: 2,
        email: "ykweon@connect.ust.hk",
        image: "/images/profile_img/KWEON Yerin.jpg"
      },
      {
        position: "External Operation Manager",
        name: "CHOI Yoonsuh",
        studentId: "21098268",
        program: "SCIENCE B",
        year: 1,
        email: "ychoiaj@connect.ust.hk",
        image: "/images/profile_img/CHOI Yoonsuh.jpg"
      },
      {
        position: "Financial Manager",
        name: "KIM Dongeun",
        studentId: "20900347",
        program: "ACCT",
        year: 3,
        email: "dkimav@connect.ust.hk",
        image: "/images/profile_img/KIM Dongeun.jpg"
      },
      {
        position: "Marketing Manager",
        name: "KIM Jin Sub",
        studentId: "20828070",
        program: "MARK",
        year: 2,
        email: "jskimaa@connect.ust.hk",
        image: "/images/profile_img/KIM Jin Sub.jpg"
      },
      {
        position: "IT Team Leader",
        name: "YANG Jiho",
        studentId: "20673839",
        program: "MATH",
        year: 3,
        email: "jyangca@connect.ust.hk",
        image: "/images/profile_img/YANG Jiho.jpg"
      },
      {
        position: "IT Team Manager",
        name: "CHO Sungjun",
        studentId: "20737647",
        program: "ELEC",
        year: 3,
        email: "schoaq@connect.ust.hk",
        image: "/images/profile_img/CHO Sungjun.jpg"
      },
      {
        position: "IT Team Manager",
        name: "YOON Sungbin",
        studentId: "20745266",
        program: "COMP",
        year: 3,
        email: "syoonac@connect.ust.hk",
        image: "/images/profile_img/YOON Sungbin.jpg"
      }
    ]
  },
  {
    title: "소위원회 / Subcommittee",
    executives: [
      {
        position: "Subcommittee",
        name: "HONG Jungwoo",
        studentId: "",
        program: "SBM",
        year: 0,
        email: "",
        image: "/images/profile_img/HONG Jungwoo.jpg"
      },
      {
        position: "Subcommittee",
        name: "LIM Gyumin",
        studentId: "",
        program: "EVMT",
        year: 0,
        email: "",
        image: "/images/profile_img/LIM Gyumin.jpg"
      },
      {
        position: "Subcommittee",
        name: "KO Gyeongmin",
        studentId: "",
        program: "MARK",
        year: 0,
        email: "",
        image: "/images/profile_img/KO Gyeongmin.jpg"
      },
      {
        position: "Subcommittee",
        name: "KIM Taekyung",
        studentId: "",
        program: "MATH",
        year: 0,
        email: "",
        image: "/images/profile_img/KIM Taekyung.jpg"
      },
      {
        position: "Subcommittee",
        name: "SHIN Hyunsung",
        studentId: "",
        program: "COMP",
        year: 0,
        email: "",
        image: "/images/profile_img/SHIN Hyunsung.jpg"
      },
      {
        position: "Subcommittee",
        name: "EO Seoyeon",
        studentId: "",
        program: "CIVL",
        year: 0,
        email: "",
        image: "/images/profile_img/EO Seoyeon.jpg"
      },
      {
        position: "Subcommittee",
        name: "KANG Jimin",
        studentId: "",
        program: "MARK",
        year: 0,
        email: "",
        image: "/images/profile_img/KANG Jimin.jpg"
      }
    ]
  }
]; 