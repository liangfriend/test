function getNoteTop(measureHeight, clef, keySignature, musicalAlphabet) {
    // 每一间的高度
    const lineSpacing = measureHeight / 4;

    // 音高基准表：高音谱号以 G4 为基准，位置为五线谱第二线
    const clefBaseNote = {
        g: 'G4', // 高音谱号
        alto: 'C4', // 中音谱号
        bass: 'F3', // 低音谱号
    };

    // 检查谱号有效性
    if (!clefBaseNote[clef]) {
        throw new Error(`Invalid clef: ${clef}`);
    }

    // 获取谱号基准音符
    const baseNote = clefBaseNote[clef];

    // 将音名（如 C4、D#4）转化为音程位置（基于 C4）
    function getNotePosition(note) {
        const noteOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        const octave = parseInt(note.slice(-1), 10); // 提取八度
        const pitch = note.slice(0, -1); // 提取音名
        const baseIndex = noteOrder.indexOf('C'); // C 为基准点
        const noteIndex = noteOrder.indexOf(pitch[0]); // 提取音名的索引

        if (noteIndex === -1) {
            throw new Error(`Invalid note: ${note}`);
        }

        // 计算相对于 C4 的位置，1 个音程为 1
        let position = (octave - 4) * 7 + (noteIndex - baseIndex);

        // 考虑升降号
        if (pitch.includes('#')) {
            position += 0.5; // 升半音
        } else if (pitch.includes('b')) {
            position -= 0.5; // 降半音
        }

        return position;
    }

    // 计算音符相对于谱号基准音符的相对位置
    const basePosition = getNotePosition(baseNote);
    const notePosition = getNotePosition(musicalAlphabet);
    const relativePosition = notePosition - basePosition;

    // 转换为像素位置
    const noteTop = measureHeight / 2 - relativePosition * (lineSpacing / 2);

    return noteTop;
}
console.log(getNoteTop(80, 'g', 'c', 'C4'));
