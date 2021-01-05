import { message } from 'antd'

export function showWarningMessage(msg: string) {
  return message.warning(msg)
}

export function showSuccessMessage(msg: string) {
  return message.success(msg)
}
