export function getEmailNameFrom(email: string) {
  return email.substring(0, email.indexOf('@'))
}

export function getBase64EncodingFrom(binaryLargeObject: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(binaryLargeObject)
  })
}
