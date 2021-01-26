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

export async function fetchChartList() {
  try {
    const response = await fetch(
      'https://shazam.p.rapidapi.com/charts/track?locale=KR&listId=ip-country-chart-KR',
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
  // const myHeaders = new Headers()
  // myHeaders.append('x-rapidapi-key', '136c4c4903msh0d6cd1cb5f43977p1a9bdajsnb51f51d6e7cc')

  // const requestOptions = {
  //   method: 'GET',
  //   headers: myHeaders,
  //   redirect: 'follow',
  // }

  // fetch('https://shazam.p.rapidapi.com/charts/track?locale=KR&listId=ip-country-chart-KR', {
  //   method: 'GET',
  //   headers: {
  //     'x-rapidapi-key': process.env.NEXT_PUBLIC_SHAZAM_API_KEY ?? '',
  //     'x-rapidapi-host': 'shazam.p.rapidapi.com',
  //   },
  //   redirect: 'follow',
  // })
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log('error', error))
}
