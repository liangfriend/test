/**
 * 将 midi:audioBuffer 条目还原为 Web Audio AudioBuffer（无需 decodeAudioData）
 * @param {AudioContext} ctx
 * @param {{ sampleRate: number, length: number, numberOfChannels: number, channelData: string[] }} entry
 */
export function entryToAudioBuffer(ctx, entry) {
  const buffer = ctx.createBuffer(
    entry.numberOfChannels,
    entry.length,
    entry.sampleRate
  )
  for (let ch = 0; ch < entry.numberOfChannels; ch++) {
    const bin = atob(entry.channelData[ch])
    const bytes = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
    buffer.getChannelData(ch).set(new Float32Array(bytes.buffer, bytes.byteOffset, entry.length))
  }
  return buffer
}

/** 加载整包：返回 Map<noteNumber, AudioBuffer> */
export async function loadMidiAudioBufferPack(ctx, url) {
  const pack = await (await fetch(url)).json()
  const map = new Map()
  for (const [note, entry] of Object.entries(pack.samples)) {
    map.set(Number(note), entryToAudioBuffer(ctx, entry))
  }
  return map
}
