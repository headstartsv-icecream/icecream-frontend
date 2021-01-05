/* eslint-disable */
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
}

export type CCreationInput = {
  name: Scalars['String']
  age: Scalars['Int']
}

export type Mutation = {
  __typename?: 'Mutation'
  createC: C
}

export type MutationCreateCArgs = {
  input: CCreationInput
}

export type C = {
  __typename?: 'C'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  name: Scalars['String']
  age: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
  /** 특정 C 정보를 반환한다. */
  cById?: Maybe<C>
}

export type QueryCByIdArgs = {
  cId: Scalars['Int']
}

export type CByIdQueryVariables = Exact<{ [key: string]: never }>

export type CByIdQuery = { __typename?: 'Query' } & {
  cById?: Maybe<{ __typename?: 'C' } & Pick<C, 'id' | 'name' | 'age'>>
}

export const CByIdDocument = gql`
  query CById {
    cById(cId: 1) {
      id
      name
      age
    }
  }
`

/**
 * __useCByIdQuery__
 *
 * To run a query within a React component, call `useCByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCByIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useCByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<CByIdQuery, CByIdQueryVariables>
) {
  return Apollo.useQuery<CByIdQuery, CByIdQueryVariables>(CByIdDocument, baseOptions)
}
export function useCByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CByIdQuery, CByIdQueryVariables>
) {
  return Apollo.useLazyQuery<CByIdQuery, CByIdQueryVariables>(CByIdDocument, baseOptions)
}
export type CByIdQueryHookResult = ReturnType<typeof useCByIdQuery>
export type CByIdLazyQueryHookResult = ReturnType<typeof useCByIdLazyQuery>
export type CByIdQueryResult = Apollo.QueryResult<CByIdQuery, CByIdQueryVariables>

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
}
export default result
