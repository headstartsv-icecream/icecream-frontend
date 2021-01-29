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

export async function fetchChartTrack(countryCode: Record<string, string>, startFrom: number) {
  try {
    const code = countryCode.countryCode
    const response = await fetch(
      `https://shazam.p.rapidapi.com/charts/track?locale=${code}&listId=ip-country-chart-${code}&startFrom=${startFrom}`,
      {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_SHAZAM_API_KEY ?? '',
          'x-rapidapi-host': 'shazam.p.rapidapi.com',
        },
      }
    )
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

export async function fetchChartList() {
  try {
    const response = await fetch('https://shazam.p.rapidapi.com/charts/list', {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_SHAZAM_API_KEY ?? '',
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
      },
    })
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}
