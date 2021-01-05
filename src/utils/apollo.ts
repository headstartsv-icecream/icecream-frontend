import { ApolloError } from '@apollo/client'
import { showWarningMessage } from './ant-design'

export function handleApolloError(error: ApolloError) {
  showWarningMessage(error.message)
}
