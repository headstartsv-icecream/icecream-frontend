// RecordRTC.StereoAudioRecorder에 있는 함수 복사 및 임시로 타입 지정

type TemporaryWorker = Worker & { workerURL?: string }

export function mergeLeftRightBuffers(config: any, callback: any) {
  function mergeAudioBuffers(config: any, cb: any) {
    const numberOfAudioChannels = config.numberOfAudioChannels

    // todo: "slice(0)" --- is it causes loop? Should be removed?
    let leftBuffers = config.leftBuffers.slice(0)
    let rightBuffers = config.rightBuffers.slice(0)
    let sampleRate = config.sampleRate
    const internalInterleavedLength = config.internalInterleavedLength
    const desiredSampRate = config.desiredSampRate

    if (numberOfAudioChannels === 2) {
      leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength)
      rightBuffers = mergeBuffers(rightBuffers, internalInterleavedLength)

      if (desiredSampRate) {
        leftBuffers = interpolateArray(leftBuffers, desiredSampRate, sampleRate)
        rightBuffers = interpolateArray(rightBuffers, desiredSampRate, sampleRate)
      }
    }

    if (numberOfAudioChannels === 1) {
      leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength)

      if (desiredSampRate) {
        leftBuffers = interpolateArray(leftBuffers, desiredSampRate, sampleRate)
      }
    }

    // set sample rate as desired sample rate
    if (desiredSampRate) {
      sampleRate = desiredSampRate
    }

    // for changing the sampling rate, reference:
    // http://stackoverflow.com/a/28977136/552182
    function interpolateArray(data: any, newSampleRate: any, oldSampleRate: any) {
      const fitCount = Math.round(data.length * (newSampleRate / oldSampleRate))
      const newData = []
      const springFactor = Number((data.length - 1) / (fitCount - 1))
      newData[0] = data[0]
      for (let i = 1; i < fitCount - 1; i++) {
        const tmp = i * springFactor
        const before = Number(Math.floor(tmp)).toFixed()
        const after = Number(Math.ceil(tmp)).toFixed()
        const atPoint = tmp - +before
        newData[i] = linearInterpolate(data[before], data[after], atPoint)
      }
      newData[fitCount - 1] = data[data.length - 1]
      return newData
    }

    function linearInterpolate(before: number, after: number, atPoint: number) {
      return before + (after - before) * atPoint
    }

    function mergeBuffers(channelBuffer: string | any[], rLength: Iterable<number>) {
      const result = new Float64Array(rLength)
      let offset = 0
      const lng = channelBuffer.length

      for (let i = 0; i < lng; i++) {
        const buffer = channelBuffer[i]
        result.set(buffer, offset)
        offset += buffer.length
      }

      return result
    }

    function interleave(leftChannel: string | any[], rightChannel: string | any[]) {
      const length = leftChannel.length + rightChannel.length

      const result = new Float64Array(length)

      let inputIndex = 0

      for (let index = 0; index < length; ) {
        result[index++] = leftChannel[inputIndex]
        result[index++] = rightChannel[inputIndex]
        inputIndex++
      }
      return result
    }

    function writeUTFBytes(view: DataView, offset: number, string: string) {
      const lng = string.length
      for (let i = 0; i < lng; i++) {
        view.setUint8(offset + i, string.charCodeAt(i))
      }
    }

    // interleave both channels together
    let interleaved

    if (numberOfAudioChannels === 2) {
      interleaved = interleave(leftBuffers, rightBuffers)
    }

    if (numberOfAudioChannels === 1) {
      interleaved = leftBuffers
    }

    const interleavedLength = interleaved.length

    // create wav file
    const resultingBufferLength = 44 + interleavedLength * 2

    const buffer = new ArrayBuffer(resultingBufferLength)

    const view = new DataView(buffer)

    // RIFF chunk descriptor/identifier
    writeUTFBytes(view, 0, 'RIFF')

    // RIFF chunk length
    // changed "44" to "36" via #401
    view.setUint32(4, 36 + interleavedLength * 2, true)

    // RIFF type
    writeUTFBytes(view, 8, 'WAVE')

    // format chunk identifier
    // FMT sub-chunk
    writeUTFBytes(view, 12, 'fmt ')

    // format chunk length
    view.setUint32(16, 16, true)

    // sample format (raw)
    view.setUint16(20, 1, true)

    // stereo (2 channels)
    view.setUint16(22, numberOfAudioChannels, true)

    // sample rate
    view.setUint32(24, sampleRate, true)

    // byte rate (sample rate * block align)
    view.setUint32(28, sampleRate * 2, true)

    // block align (channel count * bytes per sample)
    view.setUint16(32, numberOfAudioChannels * 2, true)

    // bits per sample
    view.setUint16(34, 16, true)

    // data sub-chunk
    // data chunk identifier
    writeUTFBytes(view, 36, 'data')

    // data chunk length
    view.setUint32(40, interleavedLength * 2, true)

    // write the PCM samples
    const lng = interleavedLength
    let index = 44
    const volume = 1
    for (let i = 0; i < lng; i++) {
      view.setInt16(index, interleaved[i] * (0x7fff * volume), true)
      index += 2
    }

    if (cb) {
      // eslint-disable-next-line node/no-callback-literal
      return cb({ buffer: buffer, view: view })
    }

    postMessage({ buffer: buffer, view: view }, (undefined as unknown) as string)
  }

  if (config.noWorker) {
    mergeAudioBuffers(config, function (data: { buffer: any; view: any }) {
      callback(data.buffer, data.view)
    })
    return
  }

  const webWorker = processInWebWorker(mergeAudioBuffers)

  webWorker.onmessage = function (event) {
    callback(event.data.buffer, event.data.view)

    // release memory
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    URL.revokeObjectURL(webWorker.workerURL!)

    // kill webworker (or Chrome will kill your page after ~25 calls)
    webWorker.terminate()
  }

  webWorker.postMessage(config)
}

function processInWebWorker(_function: {
  (config: any, cb: any): any
  toString?: any
  name?: any
}) {
  const workerURL = URL.createObjectURL(
    new Blob(
      [
        _function.toString(),
        ';this.onmessage =  function (eee) {' + _function.name + '(eee.data);}',
      ],
      {
        type: 'application/javascript',
      }
    )
  )

  const worker: TemporaryWorker = new Worker(workerURL)
  worker.workerURL = workerURL

  return worker
}
