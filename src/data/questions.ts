export interface CompetencyQuestion {
  id: number;
  competencyKey: string;
  competencyLabel: string;
  question: string;
}

export const questions: CompetencyQuestion[] = [
  {
    id: 1,
    competencyKey: '문서이해능력',
    competencyLabel: '문서이해능력',
    question: '나는 강의자료, 공지사항, 과제 안내문 등을 읽고 핵심내용을 정확하게 이해하는 편이다',
  },
  {
    id: 2,
    competencyKey: '문서작성능력',
    competencyLabel: '문서작성능력',
    question: '나는 내가 전달하고자 하는 생각이나 정보를 목적과 상황에 맞는 문서로 작성하는 편이다',
  },
  {
    id: 3,
    competencyKey: '경청능력',
    competencyLabel: '경청능력',
    question: '나는 수업이나 팀활동에서 상대방이 말하고자 하는 핵심 요지를 잘 파악하는 편이다',
  },
  {
    id: 4,
    competencyKey: '의사표현능력',
    competencyLabel: '의사표현능력',
    question: '나는 수업 발표나 토론에서 나의 생각이나 정보를 말로 효과적으로 전달하는 편이다',
  },
  {
    id: 5,
    competencyKey: '기초외국어능력',
    competencyLabel: '기초외국어능력',
    question: '나는 한국어 외에 다른 언어로 쓰인 간단한 글을 이해하거나 기본적인 대화를 할 수 있다',
  },
  {
    id: 6,
    competencyKey: '시간관리능력',
    competencyLabel: '시간관리능력',
    question: '나는 해야 할 일을 고려하여 시간을 계획적으로 사용하는 편이다',
  },
  {
    id: 7,
    competencyKey: '예산관리능력',
    competencyLabel: '예산관리능력',
    question: '나는 사용 가능한 예산과 필요한 지출을 미리 파악하여 계획적으로 돈을 사용하는 편이다',
  },
  {
    id: 8,
    competencyKey: '물적자원관리능력',
    competencyLabel: '물적자원관리능력',
    question: '나는 학습이나 과제 수행에 필요한 자원(교재, 자료, 장비, 시설 등)의 위치와 사용 방법을 파악하여 적절히 활용하는 편이다',
  },
  {
    id: 9,
    competencyKey: '인적자원관리능력',
    competencyLabel: '인적자원관리능력',
    question: '나는 팀 활동에서 각 구성원의 장점을 고려하여 적절히 역할을 나누는 편이다',
  },
  {
    id: 10,
    competencyKey: '사고력',
    competencyLabel: '사고력',
    question: '나는 문제가 발생하면 다양한 해결방법을 생각하고, 이를 논리적이고 비판적으로 검토하는 편이다',
  },
  {
    id: 11,
    competencyKey: '문제처리능력',
    competencyLabel: '문제처리능력',
    question: '나는 발생한 문제의 원인을 파악하고, 그에 맞는 해결책을 찾아 실제로 적용하는 편이다',
  },
  {
    id: 12,
    competencyKey: '컴퓨터활용능력',
    competencyLabel: '컴퓨터활용능력',
    question: '나는 학업에 필요한 컴퓨터 프로그램을 익히고 활용하는 데 큰 어려움이 없는 편이다',
  },
  {
    id: 13,
    competencyKey: '정보처리능력',
    competencyLabel: '정보처리능력',
    question: '나는 과제 수행에 필요한 적절한 정보를 찾아 분석·정리하여 효과적으로 활용하는 편이다',
  },
  {
    id: 14,
    competencyKey: '국제감각',
    competencyLabel: '국제감각',
    question: '나는 다른 나라의 문화나 국제적 이슈에 대해 비교적 잘 알고 있는 편이다',
  },
  {
    id: 15,
    competencyKey: '조직체제이해능력',
    competencyLabel: '조직체제이해능력',
    question: '나는 내가 속한 조직(대학, 학과, 동아리, 소학회 등)의 구조, 문화, 규칙 등을 이해하고 있는 편이다',
  },
  {
    id: 16,
    competencyKey: '경영이해능력',
    competencyLabel: '경영이해능력',
    question: '나는 내가 속한 조직(대학, 학과, 동아리, 소학회 등)의 운영 목표와 의사결정 방식에 대해 이해하고 있는 편이다',
  },
  {
    id: 17,
    competencyKey: '업무이해능력',
    competencyLabel: '업무이해능력',
    question: '나는 내가 속한 조직(대학, 학과, 동아리, 소학회 등)에서 나에게 주어진 역할과 해야 할 일을 비교적 명확히 이해하고 있는 편이다',
  },
  {
    id: 18,
    competencyKey: '기초연산능력',
    competencyLabel: '기초연산능력',
    question: '나는 일상생활에서 금액이나 수량 계산과 같은 기본적인 연산을 정확하게 수행하는 편이다',
  },
  {
    id: 19,
    competencyKey: '기초통계능력',
    competencyLabel: '기초통계능력',
    question: '나는 기초적인 통계기법(평균, 합계, 빈도 등)을 활용하여 자료의 특징을 파악하는 데 큰 어려움이 없는 편이다',
  },
  {
    id: 20,
    competencyKey: '도표분석능력',
    competencyLabel: '도표분석능력',
    question: '나는 학습상황에서 활용되는 표나 그래프에 제시된 정보를 정확하게 이해하고 해석하는 편이다',
  },
  {
    id: 21,
    competencyKey: '도표작성능력',
    competencyLabel: '도표작성능력',
    question: '나는 전달하고자 하는 내용을 표나 그래프로 정리하여 효과적으로 제시하는 편이다',
  },
  {
    id: 22,
    competencyKey: '자아인식능력',
    competencyLabel: '자아인식능력',
    question: '나는 나의 장단점, 흥미, 적성을 바탕으로 나에게 필요한 변화가 무엇인지 비교적 잘 알고 있는 편이다',
  },
  {
    id: 23,
    competencyKey: '자기관리능력',
    competencyLabel: '자기관리능력',
    question: '나는 이루고자 하는 목표를 위해 나의 시간과 행동을 관리하는 편이다',
  },
  {
    id: 24,
    competencyKey: '경력개발능력',
    competencyLabel: '경력개발능력',
    question: '나는 나의 진로와 미래에 필요한 역량을 개발하기 위해 구체적인 계획을 세우는 편이다',
  },
  {
    id: 25,
    competencyKey: '팀워크능력',
    competencyLabel: '팀워크능력',
    question: '나는 팀 활동에서 다른 구성원들과 원만한 관계를 유지하며 맡은 역할을 책임감 있게 수행하는 편이다',
  },
  {
    id: 26,
    competencyKey: '리더십능력',
    competencyLabel: '리더십능력',
    question: '나는 팀 활동에서 의견을 제시하거나 분위기를 이끄는 역할을 하는 편이다',
  },
  {
    id: 27,
    competencyKey: '갈등관리능력',
    competencyLabel: '갈등관리능력',
    question: '나는 대인관계나 팀 활동에서 갈등이 생기면 이를 원만하게 해결하는 편이다',
  },
  {
    id: 28,
    competencyKey: '협상능력',
    competencyLabel: '협상능력',
    question: '나는 의견 차이가 있을 때 서로 다른 의견을 조율하여 합의점을 찾는 편이다',
  },
  {
    id: 29,
    competencyKey: '고객서비스능력',
    competencyLabel: '고객서비스능력',
    question: '나는 대인관계에서 상대방의 필요를 먼저 살피고, 그에 맞는 도움을 주고자 하는 편이다',
  },
  {
    id: 30,
    competencyKey: '기술이해능력',
    competencyLabel: '기술이해능력',
    question: '나는 학업에 필요한 도구나 기술의 기본 원리와 사용 방법을 비교적 잘 이해하고 있는 편이다',
  },
  {
    id: 31,
    competencyKey: '기술선택능력',
    competencyLabel: '기술선택능력',
    question: '나는 과제나 프로젝트 수행 시 목적과 상황에 맞는 기술이나 도구를 적절히 선택하는 편이다',
  },
  {
    id: 32,
    competencyKey: '기술적용능력',
    competencyLabel: '기술적용능력',
    question: '나는 과제나 프로젝트 수행 과정에서 필요한 기술이나 도구를 효과적으로 활용하는 편이다',
  },
  {
    id: 33,
    competencyKey: '근로윤리',
    competencyLabel: '근로윤리',
    question: '나는 맡은 역할이나 활동에 책임감을 가지고 성실하게 임하는 편이다',
  },
  {
    id: 34,
    competencyKey: '공동체윤리',
    competencyLabel: '공동체윤리',
    question: '나는 사회생활이나 대학생활에서 공동의 규칙과 질서를 존중하며 행동하는 편이다',
  },
];
