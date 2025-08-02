export interface Executive {
  position: string;
  name: string;
  studentId: string;
  program: string;
  year: number;
  email: string;
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
        email: "hkwonab@connect.ust.hk"
      },
      {
        position: "External-Vice President",
        name: "KIM Heeseung",
        studentId: "20790314",
        program: "OM",
        year: 2,
        email: "hkimbh@connect.ust.hk"
      },
      {
        position: "Internal-Vice President",
        name: "KIM Suhyeong",
        studentId: "20744731",
        program: "MGMT",
        year: 2,
        email: "skimbk@connect.ust.hk"
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
        email: "jshinae@connect.ust.hk"
      },
      {
        position: "Internal Manager",
        name: "LEE Haelin",
        studentId: "21103532",
        program: "ACCT",
        year: 1,
        email: "hleebi@connect.ust.hk"
      },
      {
        position: "Internal Operation Manager",
        name: "KWEON Yerin",
        studentId: "21010096",
        program: "DASC",
        year: 2,
        email: "ykweon@connect.ust.hk"
      },
      {
        position: "External Operation Manager",
        name: "CHOI Yoonsuh",
        studentId: "21098268",
        program: "SCIENCE B",
        year: 1,
        email: "ychoiaj@connect.ust.hk"
      },
      {
        position: "Financial Manager",
        name: "KIM Dongeun",
        studentId: "20900347",
        program: "ACCT",
        year: 3,
        email: "dkimav@connect.ust.hk"
      },
      {
        position: "Marketing Manager",
        name: "KIM Jin Sub",
        studentId: "20828070",
        program: "MARK",
        year: 2,
        email: "jskimaa@connect.ust.hk"
      },
      {
        position: "IT Team Leader",
        name: "YANG Jiho",
        studentId: "20673839",
        program: "MATH",
        year: 3,
        email: "jyangca@connect.ust.hk"
      },
      {
        position: "IT Team Manager",
        name: "CHO Sungjun",
        studentId: "20737647",
        program: "ELEC",
        year: 3,
        email: "schoaq@connect.ust.hk"
      },
      {
        position: "IT Team Manager",
        name: "YOON Sungbin",
        studentId: "20745266",
        program: "COMP",
        year: 3,
        email: "syoonac@connect.ust.hk"
      }
    ]
  }
]; 