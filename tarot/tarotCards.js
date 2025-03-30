// 타로 카드 데이터가 담긴 배열

const tarotCards = [
    {
        number: 0,
        name: 'The Fool',
        korean: '바보',
        meaning: '새로운 시작, 순수, 자유',
        comment: '새로운 가능성이 열려 있어요. 원하는 대로 움직여보세요.',
    },
    {
        number: 1,
        name: 'The Magician',
        korean: '마법사',
        meaning: '자신감, 창조력, 기회',
        comment: '오늘은 당신의 능력을 사용할 일이 생길 것 같아요!',
    },
    {
        number: 2,
        name: 'The High Priestess',
        korean: '고위 사제',
        meaning: '직관, 비밀, 잠재력',
        comment: '외면보다 내면을 들여다보세요. 당신의 직감을 따라가봐요.',
    },
    {
        number: 3,
        name: 'The Empress',
        korean: '여왕',
        meaning: '풍요, 창조성, 여성성',
        comment: '오늘은 마음의 여유와 따뜻함을 나눠보면 어떨까요?',
    },
    {
        number: 4,
        name: 'The Emperor',
        korean: '황제',
        meaning: '안정, 권위, 구조',
        comment:
            '흔들리지 않는 태도가 당신을 더 좋은 사람으로 만듭니다. 중심을 잡으세요.',
    },
    {
        number: 5,
        name: 'The Hierophant',
        korean: '교황',
        meaning: '전통, 지혜, 가르침',
        comment:
            '누군가의 조언 속에 해답이 숨어 있을지도 몰라요. 귀를 기울여보세요.',
    },
    {
        number: 6,
        name: 'The Lovers',
        korean: '연인',
        meaning: '사랑, 선택, 조화',
        comment: '마음을 열고 솔직해지면, 더 깊은 관계가 시작됩니다.',
    },
    {
        number: 7,
        name: 'The Chariot',
        korean: '전차',
        meaning: '승리, 의지, 결단력',
        comment: '망설이지 말고 밀고 나가보세요. 주도권은 당신에게 있어요!',
    },
    {
        number: 8,
        name: 'Strength',
        korean: '힘',
        meaning: '용기, 인내, 내면의 힘',
        comment: '부드러운 강인함이 필요한 날이에요. 참을성 있게 다가가세요.',
    },
    {
        number: 9,
        name: 'The Hermit',
        korean: '은둔자',
        meaning: '고독, 내면 탐색, 진리 추구',
        comment:
            '혼자만의 조용한 시간을 통해 스스로를 더 깊이 이해할 수 있어요.',
    },
    {
        number: 10,
        name: 'Wheel of Fortune',
        korean: '행운의 수레바퀴',
        meaning: '운명의 변화, 전환점',
        comment: '예상치 못한 변화가 행운이 될 수 있어요. 흐름을 믿어보세요.',
    },
    {
        number: 11,
        name: 'Justice',
        korean: '정의',
        meaning: '균형, 정의, 책임',
        comment:
            '오늘은 균형과 공정함이 가장 중요한 날이네요. 침착하게 생각해보세요.',
    },
    {
        number: 12,
        name: 'The Hanged Man',
        korean: '매달린 남자',
        meaning: '희생, 관점 변화, 기다림',
        comment: '잠시 멈춰 보는 것도 방법이에요. 시야를 바꿔보세요.',
    },
    {
        number: 13,
        name: 'Death',
        korean: '죽음',
        meaning: '종말, 변화, 재탄생',
        comment: '끝은 새로운 시작을 의미해요. 변화를 두려워하지 마세요.',
    },
    {
        number: 14,
        name: 'Temperance',
        korean: '절제',
        meaning: '조화, 치유, 인내',
        comment: '조화를 이루려는 당신의 노력이 좋은 결과로 이어질 거예요.',
    },
    {
        number: 15,
        name: 'The Devil',
        korean: '악마',
        meaning: '유혹, 집착, 억압',
        comment: '유혹에 흔들리지 마세요. 진짜 원하는 걸 생각해 보세요.',
    },
    {
        number: 16,
        name: 'The Tower',
        korean: '탑',
        meaning: '혼란, 붕괴, 급변',
        comment: '예기치 못한 일이 일어나도, 그 안에 성장의 기회가 있어요.',
    },
    {
        number: 17,
        name: 'The Star',
        korean: '별',
        meaning: '희망, 영감, 회복',
        comment: '희망은 여전히 당신 곁에 있어요. 오늘도 빛날 수 있어요.',
    },
    {
        number: 18,
        name: 'The Moon',
        korean: '달',
        meaning: '불확실성, 감정, 환상',
        comment: '불확실해 보여도 괜찮아요. 스스로의 감정에 귀 기울여보세요.',
    },
    {
        number: 19,
        name: 'The Sun',
        korean: '해',
        meaning: '행복, 성공, 긍정',
        comment:
            '밝은 에너지로 가득 찬 하루예요. 당신의 웃음이 행운을 부를 거예요!',
    },
    {
        number: 20,
        name: 'Judgement',
        korean: '심판',
        meaning: '부활, 결단, 깨달음',
        comment:
            '지금까지의 당신이 행동이 결실을 맺는 날이에요. 후회 없이 행동해보세요.',
    },
    {
        number: 21,
        name: 'The World',
        korean: '세계',
        meaning: '완성, 성취, 통합',
        comment:
            '모든 것이 제자리를 찾아가고 있어요. 당신은 충분히 잘하고 있어요.',
    },
];

module.exports = tarotCards;
