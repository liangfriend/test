/**
 * 将 acoustic_grand_piano.json 中的 data:audio/mp3;base64 音色
 * 预解码为 midi:audioBuffer 格式（PCM + 元数据，运行时可直接 createBuffer）
 *
 * 用法（在 scripts 目录）:
 *   npm install
 *   node convert-piano-to-audiobuffers.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import decode from 'audio-decode'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const INPUT = path.join(ROOT, 'resources/others/acoustic_grand_piano.json')
const OUTPUT = path.join(ROOT, 'resources/others/acoustic_grand_piano_audio_buffers.json')
const LOADER = path.join(ROOT, 'resources/others/loadAudioBufferFromMidi.js')

function dataUrlToBuffer(dataUrl) {
  const m = /^data:([^;]+);base64,(.+)$/s.exec(dataUrl)
  if (!m) throw new Error('无效的 data URL')
  return Buffer.from(m[2], 'base64')
}

function audioBufferToEntry(buf) {
  const channelData = []
  for (let i = 0; i < buf.numberOfChannels; i++) {
    const f32 = buf.getChannelData(i)
    channelData.push(Buffer.from(f32.buffer, f32.byteOffset, f32.byteLength).toString('base64'))
  }
  return {
    sampleRate: buf.sampleRate,
    length: buf.length,
    numberOfChannels: buf.numberOfChannels,
    channelData,
  }
}

async function main() {
  console.log('读取', INPUT)
  const raw = JSON.parse(fs.readFileSync(INPUT, 'utf8'))
  const noteKeys = Object.keys(raw).filter((k) => /^\d+$/.test(k))
  console.log('音符数量', noteKeys.length)

  const samples = {}
  let done = 0

  for (const note of noteKeys) {
    const dataUrl = raw[note]
    const mp3 = dataUrlToBuffer(dataUrl)
    const buf = await decode(mp3)
    samples[note] = audioBufferToEntry(buf)
    done++
    if (done % 10 === 0 || done === noteKeys.length) {
      console.log(`解码 ${done}/${noteKeys.length}  note=${note}  len=${buf.length} sr=${buf.sampleRate}`)
    }
  }

  const out = {
    _format: 'midi:audioBuffer',
    _version: 1,
    _source: 'acoustic_grand_piano.json',
    samples,
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(out))
  const mb = (fs.statSync(OUTPUT).size / 1024 / 1024).toFixed(2)
  console.log('已写入', OUTPUT, `(${mb} MB)`)

  const loaderSource = `/**
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
`
  fs.writeFileSync(LOADER, loaderSource)
  console.log('已写入加载器', LOADER)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
