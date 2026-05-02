const AccidentalEnum = {
  Sharp:'Sharp',
  Flat: 'Flat',
  None: 'None',
  Nature: 'Nature'
}
// 目前getYinFuValue只实现这几种调号的解析
 const DiaoHaoEnum = {
  "C":"C",
  "#C":"C",
  "#F":"#F",
  "B":"B",
  "E":"E",
  "A":"A",
  "D":"D",
  "G":"G",
  "F":"F",
  "bB":"bB",
  "bE":"bE",
  "bA":"bA",
  "bD":"bD",
  "bG":"bG",
  "bC":"bC"
}
const PuHaoEnum = {
  Treble:'Treble',
  Bass :'bass'
}

// 获取音符位置， region = 0 是第一间， region = 1 是第二线, 所以midi = 60的时候region = -1下加一线.midi = 61的时候region = -0.5下加一间
// 完全按照C调的位置来，不对的音后续靠加变音符号解决
// 高音谱号下：每高一个半音 region +0.5；midi 60(C4)=下加一线=-1，midi 62(D4)=第一间=0，midi 64(E4)=第二线=1
function getRegion(midi, puhao) {
  if (puhao === PuHaoEnum.Treble) {
    return (midi - 62) / 2  // 60→-1, 61→-0.5, 62→0, 64→1 ...
  }
  if (puhao === PuHaoEnum.Bass) {
    // 低音谱号：中央C(60)在上加一线，往下每半音 -0.5。常见记法：下加一线=G2(43)，一线=B2(47)... 这里统一 60→某值，往下递减
    return (midi - 60) / 2 - 2   // 60→-2(上加一线附近)，58→-3，43→-9.5 等
  }
  return 0
}
// 调号对应的升降：每个调在 C 调基础上哪些音是升/降
const DiaoHaoAlter = {
  'C': { sharp: [], flat: [] },
  '#C': { sharp: [], flat: [] },
  '#F': { sharp: ['F','C','G','D','A','E','B'], flat: [] },
  'B': { sharp: ['F','C','G','D','A'], flat: [] },
  'E': { sharp: ['F','C','G','D'], flat: [] },
  'A': { sharp: ['F','C','G'], flat: [] },
  'D': { sharp: ['F','C'], flat: [] },
  'G': { sharp: ['F'], flat: [] },
  'F': { sharp: [], flat: ['B'] },
  'bB': { sharp: [], flat: ['B','E'] },
  'bE': { sharp: [], flat: ['B','E','A'] },
  'bA': { sharp: [], flat: ['B','E','A','D'] },
  'bD': { sharp: [], flat: ['B','E','A','D','G'] },
  'bG': { sharp: [], flat: ['B','E','A','D','G','C'] },
  'bC': { sharp: [], flat: ['B','E','A','D','G','C','F'] }
}

// 音名(CDEFGAB) 与 实际升降：0=自然 1=升 -1=降
const LetterByPc = ['C','C','D','D','E','F','F','G','G','A','A','B']  // pitch class 0~11
const AlterByPc = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0]  // 1=升(黑键用升记)，0=自然；降记法暂不单独处理

// 按照上边的逻辑判断是否应该有变音符号（完全按 C 调位置，再根据调号决定写升/降/还原/无）
function getBianYin(midi, puhao, diaohao) {
  const alter = DiaoHaoAlter[diaohao]
  if (!alter) return AccidentalEnum.None

  const pc = ((midi % 12) + 12) % 12
  const letter = LetterByPc[pc]
  const actual = AlterByPc[pc] ? 1 : 0   // 当前音：0 自然，1 升（黑键统一用升记）

  const keySharp = alter.sharp.includes(letter)
  const keyFlat = alter.flat.includes(letter)

  if (keySharp) {
    if (actual === 1) return AccidentalEnum.None   // 调号已升，本音也是升，不写
    if (actual === 0) return AccidentalEnum.Nature // 调号升，本音还原，写还原
    return AccidentalEnum.Flat
  }
  if (keyFlat) {
    if (actual === -1) return AccidentalEnum.None
    if (actual === 0) return AccidentalEnum.Nature
    return AccidentalEnum.Sharp
  }
  if (actual === 0) return AccidentalEnum.None
  if (actual === 1) return AccidentalEnum.Sharp
  return AccidentalEnum.Flat
}




const region = getRegion(60,PuHaoEnum.Treble)
console.log(region)
const bianYin = getBianYin(60,PuHaoEnum.Treble,'E')
console.log(bianYin)