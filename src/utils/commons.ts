export function getEmailNameFrom(email: string) {
  return email.substring(0, email.indexOf('@'))
}
