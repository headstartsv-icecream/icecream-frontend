export function getEmailNameFrom(email: string) {
  return email.substring(0, email.indexOf('@'))
}

export function getBase64EncodingFrom(binaryLargeObject: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve((reader.result as string).split(',')[1])
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(binaryLargeObject)
  })
}

export async function fetchDetectedMusicInfo(body: string) {
  // return { matches: ['asdf'], track: { key: 123123, title: 'Dynamite' } } //
  try {
    const response = await fetch('https://shazam.p.rapidapi.com/songs/detect', {
      method: 'POST',
      headers: {
        'content-type': 'text/plain',
        'x-rapidapi-key': process.env.NEXT_PUBLIC_SHAZAM_API_KEY ?? '',
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
      },
      body,
    })
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

export async function downloadFile(blob: Blob) {
  const blob1 = new Blob([blob ?? ''], { type: 'application/octet-stream' })
  const newObjectURL = window.URL.createObjectURL(blob1)
  window.location.assign(newObjectURL)
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const middleBrightness = (256 + 256 + 256) / 2

export function getBlackOrWhiteTextColorFrom(backgroundColor: string) {
  const r = parseInt(backgroundColor.slice(1, 3), 16)
  const g = parseInt(backgroundColor.slice(3, 5), 16)
  const b = parseInt(backgroundColor.slice(5, 7), 16)
  const backgroundBrightness = r + g + b

  if (backgroundBrightness < middleBrightness) {
    return '#eee'
  } else {
    return '#222'
  }
}

export function formatNumber(n: number) {
  return Intl.NumberFormat('ko-KR').format(n)
}
