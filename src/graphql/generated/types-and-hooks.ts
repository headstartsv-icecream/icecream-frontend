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

/** 댓글 생성 시 필요한 입력값 */
export type CommentCreationInput = {
  content: Scalars['String']
  userName: Scalars['String']
}

/** 댓글 수정 시 필요한 입력값 */
export type CommentModificationInput = {
  id: Scalars['ID']
  content: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createComment: Scalars['Boolean']
  modifyComment: Scalars['Boolean']
  deleteComment: Scalars['Boolean']
  /** shazamId가 있으면 기존 레코드를 수정하고, shazamId가 없으면 새로 만든다. */
  createOrModifyMusic: Music
}

export type MutationCreateCommentArgs = {
  input: CommentCreationInput
}

export type MutationModifyCommentArgs = {
  input: CommentModificationInput
}

export type MutationDeleteCommentArgs = {
  id: Scalars['ID']
}

export type MutationCreateOrModifyMusicArgs = {
  input: MusicCreationModificationInput
}

/** 음악 정보 생성-수정 시 필요한 입력값 */
export type MusicCreationModificationInput = {
  shazamId: Scalars['ID']
  title?: Maybe<Scalars['String']>
  artists?: Maybe<Array<Scalars['String']>>
  genres?: Maybe<Array<Scalars['String']>>
  lyrics?: Maybe<Array<Scalars['String']>>
  comments?: Maybe<Array<Scalars['String']>>
  youtubeLink?: Maybe<Scalars['String']>
  youtubeImage?: Maybe<Scalars['String']>
  artistImage?: Maybe<Scalars['String']>
  albumImage?: Maybe<Scalars['String']>
  similarMusics?: Maybe<Array<Scalars['ID']>>
  artistOtherMusics?: Maybe<Array<Scalars['ID']>>
  includedPlaylists?: Maybe<Array<Scalars['ID']>>
}

export enum CrawlingSource {
  Youtube = 'YOUTUBE',
  Melon = 'MELON',
}

export type Comment = {
  __typename?: 'Comment'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  crawlingDate: Scalars['DateTime']
  content: Scalars['String']
  userName: Scalars['String']
  source: CrawlingSource
  like?: Maybe<Scalars['Int']>
}

export type Music = {
  __typename?: 'Music'
  id: Scalars['ID']
  title: Scalars['String']
  artists: Array<Scalars['String']>
  searchCount: Scalars['Int']
  albumImage?: Maybe<Scalars['String']>
  artistImage?: Maybe<Scalars['String']>
  genres?: Maybe<Array<Scalars['String']>>
  lyrics?: Maybe<Array<Scalars['String']>>
  melonLink?: Maybe<Scalars['String']>
  shazamId?: Maybe<Scalars['Int']>
  youtubeLink?: Maybe<Scalars['String']>
  youtubeImage?: Maybe<Scalars['String']>
  /** 이 노래를 부른 가수의 다른 노래를 검색 횟수 순으로 반환한다. # 페이지네이션 필요 */
  artistOtherMusics?: Maybe<Array<Music>>
  /** 이 노래에 해당하는 댓글 목록을 반환한다. # 페이지네이션 필요 */
  comments?: Maybe<Array<Scalars['String']>>
  /** 이 노래가 포함된 재생 목록을 반환한다. # 페이지네이션 필요 */
  includedPlaylists?: Maybe<Array<Playlist>>
  /** 이 노래와 비슷한 노래 목록을 반환한다. # 페이지네이션 필요 */
  similarMusics?: Maybe<Array<Music>>
}

export type Playlist = {
  __typename?: 'Playlist'
  id: Scalars['ID']
  name: Scalars['String']
  musics?: Maybe<Array<Music>>
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  creationDate: Scalars['DateTime']
  name: Scalars['String']
  age: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
  comments?: Maybe<Array<Comment>>
  comment?: Maybe<Comment>
  /** 모든 음악 목록을 반환한다. # 페이지네이션 필요 */
  musics?: Maybe<Array<Music>>
  /** 특정 음악 정보를 반환한다. */
  music?: Maybe<Music>
  /** 노래 제목 및 가수 이름으로 음악 검색 */
  musicByTitleArtist?: Maybe<Music>
  /** 사용자 목록을 반환한다. (관리자 전용) */
  users?: Maybe<Array<User>>
  /** 내 정보를 반환한다. 해당 권한이 없으면 오류가 발생한다. */
  me?: Maybe<User>
}

export type QueryCommentArgs = {
  id: Scalars['ID']
}

export type QueryMusicArgs = {
  id: Scalars['ID']
}

export type QueryMusicByTitleArtistArgs = {
  title: Scalars['String']
  artist?: Maybe<Array<Scalars['String']>>
}

export type CreateOrModifyMusicMutationVariables = Exact<{
  input: MusicCreationModificationInput
}>

export type CreateOrModifyMusicMutation = { __typename?: 'Mutation' } & {
  createOrModifyMusic: { __typename?: 'Music' } & Pick<Music, 'id' | 'title'>
}

export type MusicQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type MusicQuery = { __typename?: 'Query' } & {
  music?: Maybe<{ __typename?: 'Music' } & Pick<Music, 'id'>>
}

export type MusicByTitleArtistQueryVariables = Exact<{
  title: Scalars['String']
  artist?: Maybe<Array<Scalars['String']> | Scalars['String']>
}>

export type MusicByTitleArtistQuery = { __typename?: 'Query' } & {
  musicByTitleArtist?: Maybe<{ __typename?: 'Music' } & Pick<Music, 'id'>>
}

export const CreateOrModifyMusicDocument = gql`
  mutation CreateOrModifyMusic($input: MusicCreationModificationInput!) {
    createOrModifyMusic(input: $input) {
      id
      title
    }
  }
`
export type CreateOrModifyMusicMutationFn = Apollo.MutationFunction<
  CreateOrModifyMusicMutation,
  CreateOrModifyMusicMutationVariables
>

/**
 * __useCreateOrModifyMusicMutation__
 *
 * To run a mutation, you first call `useCreateOrModifyMusicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrModifyMusicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrModifyMusicMutation, { data, loading, error }] = useCreateOrModifyMusicMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrModifyMusicMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOrModifyMusicMutation,
    CreateOrModifyMusicMutationVariables
  >
) {
  return Apollo.useMutation<CreateOrModifyMusicMutation, CreateOrModifyMusicMutationVariables>(
    CreateOrModifyMusicDocument,
    baseOptions
  )
}
export type CreateOrModifyMusicMutationHookResult = ReturnType<
  typeof useCreateOrModifyMusicMutation
>
export type CreateOrModifyMusicMutationResult = Apollo.MutationResult<CreateOrModifyMusicMutation>
export type CreateOrModifyMusicMutationOptions = Apollo.BaseMutationOptions<
  CreateOrModifyMusicMutation,
  CreateOrModifyMusicMutationVariables
>
export const MusicDocument = gql`
  query Music($id: ID!) {
    music(id: $id) {
      id
    }
  }
`

/**
 * __useMusicQuery__
 *
 * To run a query within a React component, call `useMusicQuery` and pass it any options that fit your needs.
 * When your component renders, `useMusicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMusicQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMusicQuery(
  baseOptions: Apollo.QueryHookOptions<MusicQuery, MusicQueryVariables>
) {
  return Apollo.useQuery<MusicQuery, MusicQueryVariables>(MusicDocument, baseOptions)
}
export function useMusicLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MusicQuery, MusicQueryVariables>
) {
  return Apollo.useLazyQuery<MusicQuery, MusicQueryVariables>(MusicDocument, baseOptions)
}
export type MusicQueryHookResult = ReturnType<typeof useMusicQuery>
export type MusicLazyQueryHookResult = ReturnType<typeof useMusicLazyQuery>
export type MusicQueryResult = Apollo.QueryResult<MusicQuery, MusicQueryVariables>
export const MusicByTitleArtistDocument = gql`
  query MusicByTitleArtist($title: String!, $artist: [String!]) {
    musicByTitleArtist(title: $title, artist: $artist) {
      id
    }
  }
`

/**
 * __useMusicByTitleArtistQuery__
 *
 * To run a query within a React component, call `useMusicByTitleArtistQuery` and pass it any options that fit your needs.
 * When your component renders, `useMusicByTitleArtistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMusicByTitleArtistQuery({
 *   variables: {
 *      title: // value for 'title'
 *      artist: // value for 'artist'
 *   },
 * });
 */
export function useMusicByTitleArtistQuery(
  baseOptions: Apollo.QueryHookOptions<MusicByTitleArtistQuery, MusicByTitleArtistQueryVariables>
) {
  return Apollo.useQuery<MusicByTitleArtistQuery, MusicByTitleArtistQueryVariables>(
    MusicByTitleArtistDocument,
    baseOptions
  )
}
export function useMusicByTitleArtistLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MusicByTitleArtistQuery,
    MusicByTitleArtistQueryVariables
  >
) {
  return Apollo.useLazyQuery<MusicByTitleArtistQuery, MusicByTitleArtistQueryVariables>(
    MusicByTitleArtistDocument,
    baseOptions
  )
}
export type MusicByTitleArtistQueryHookResult = ReturnType<typeof useMusicByTitleArtistQuery>
export type MusicByTitleArtistLazyQueryHookResult = ReturnType<
  typeof useMusicByTitleArtistLazyQuery
>
export type MusicByTitleArtistQueryResult = Apollo.QueryResult<
  MusicByTitleArtistQuery,
  MusicByTitleArtistQueryVariables
>

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
}
export default result
