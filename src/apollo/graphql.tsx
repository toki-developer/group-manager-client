import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AddGroupDto = {
  name: Scalars['String'];
  iconUrl: Scalars['String'];
};

export type AddUserDto = {
  id: Scalars['String'];
  name: Scalars['String'];
  iconUrl: Scalars['String'];
};


export type GroupModel = {
  __typename?: 'GroupModel';
  id: Scalars['Int'];
  searchId: Scalars['String'];
  name: Scalars['String'];
  iconUrl: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MembershipModel = {
  __typename?: 'MembershipModel';
  stateFlg: Scalars['Float'];
  user: UserModel;
  group: GroupModel;
};

export type Mutation = {
  __typename?: 'Mutation';
  saveUser: UserModel;
  addGroupByUser: UserModel;
  joinGroup?: Maybe<GroupModel>;
  withdrawalGroup?: Maybe<GroupModel>;
  saveGroup: GroupModel;
  updateGroup: GroupModel;
};


export type MutationSaveUserArgs = {
  user: AddUserDto;
};


export type MutationAddGroupByUserArgs = {
  affiliation: AddGroupByUserDto;
};


export type MutationJoinGroupArgs = {
  searchId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationWithdrawalGroupArgs = {
  groupId: Scalars['Int'];
  userId: Scalars['String'];
};


export type MutationSaveGroupArgs = {
  group: AddGroupDto;
  userId: Scalars['String'];
};


export type MutationUpdateGroupArgs = {
  group: UpdateGroupDto;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<UserModel>;
  groupsByUser?: Maybe<Array<MembershipModel>>;
  findGroup: GroupModel;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryGroupsByUserArgs = {
  id: Scalars['String'];
};


export type QueryFindGroupArgs = {
  searchId: Scalars['String'];
};

export type UpdateGroupDto = {
  id: Scalars['Float'];
  name: Scalars['String'];
  iconUrl: Scalars['String'];
};

export type UserModel = {
  __typename?: 'UserModel';
  id: Scalars['String'];
  name: Scalars['String'];
  iconUrl: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AddGroupByUserDto = {
  userId: Scalars['String'];
  groupId: Scalars['Float'];
  stateFlg: Scalars['Float'];
};

export type SaveUserMutationVariables = Exact<{
  user: AddUserDto;
}>;


export type SaveUserMutation = (
  { __typename?: 'Mutation' }
  & { saveUser: (
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'id' | 'name' | 'iconUrl'>
  ) }
);

export type SaveGroupMutationVariables = Exact<{
  userId: Scalars['String'];
  group: AddGroupDto;
}>;


export type SaveGroupMutation = (
  { __typename?: 'Mutation' }
  & { saveGroup: (
    { __typename?: 'GroupModel' }
    & Pick<GroupModel, 'id' | 'searchId' | 'name' | 'iconUrl'>
  ) }
);

export type FindGroupQueryVariables = Exact<{
  searchId: Scalars['String'];
}>;


export type FindGroupQuery = (
  { __typename?: 'Query' }
  & { findGroup: (
    { __typename?: 'GroupModel' }
    & Pick<GroupModel, 'id' | 'name' | 'iconUrl'>
  ) }
);

export type JoinGroupMutationVariables = Exact<{
  userId: Scalars['String'];
  searchId: Scalars['String'];
}>;


export type JoinGroupMutation = (
  { __typename?: 'Mutation' }
  & { joinGroup?: Maybe<(
    { __typename?: 'GroupModel' }
    & Pick<GroupModel, 'id' | 'searchId'>
  )> }
);

export type UpdateGroupMutationVariables = Exact<{
  group: UpdateGroupDto;
}>;


export type UpdateGroupMutation = (
  { __typename?: 'Mutation' }
  & { updateGroup: (
    { __typename?: 'GroupModel' }
    & Pick<GroupModel, 'id' | 'name' | 'iconUrl'>
  ) }
);

export type GroupsByUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GroupsByUserQuery = (
  { __typename?: 'Query' }
  & { groupsByUser?: Maybe<Array<(
    { __typename?: 'MembershipModel' }
    & MembershipGroupFragment
  )>> }
);

export type GroupFragment = (
  { __typename?: 'GroupModel' }
  & Pick<GroupModel, 'id' | 'searchId' | 'name' | 'iconUrl'>
);

export type MembershipGroupFragment = (
  { __typename?: 'MembershipModel' }
  & Pick<MembershipModel, 'stateFlg'>
  & { group: (
    { __typename?: 'GroupModel' }
    & GroupFragment
  ) }
);

export type WithdrawalGroupMutationVariables = Exact<{
  userId: Scalars['String'];
  groupId: Scalars['Int'];
}>;


export type WithdrawalGroupMutation = (
  { __typename?: 'Mutation' }
  & { withdrawalGroup?: Maybe<(
    { __typename?: 'GroupModel' }
    & Pick<GroupModel, 'id'>
  )> }
);

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'id' | 'name' | 'iconUrl'>
  )> }
);

export const GroupFragmentDoc = gql`
    fragment Group on GroupModel {
  id
  searchId
  name
  iconUrl
}
    `;
export const MembershipGroupFragmentDoc = gql`
    fragment MembershipGroup on MembershipModel {
  stateFlg
  group {
    ...Group
  }
}
    ${GroupFragmentDoc}`;
export const SaveUserDocument = gql`
    mutation saveUser($user: AddUserDto!) {
  saveUser(user: $user) {
    id
    name
    iconUrl
  }
}
    `;
export type SaveUserMutationFn = Apollo.MutationFunction<SaveUserMutation, SaveUserMutationVariables>;

/**
 * __useSaveUserMutation__
 *
 * To run a mutation, you first call `useSaveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveUserMutation, { data, loading, error }] = useSaveUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useSaveUserMutation(baseOptions?: Apollo.MutationHookOptions<SaveUserMutation, SaveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveUserMutation, SaveUserMutationVariables>(SaveUserDocument, options);
      }
export type SaveUserMutationHookResult = ReturnType<typeof useSaveUserMutation>;
export type SaveUserMutationResult = Apollo.MutationResult<SaveUserMutation>;
export type SaveUserMutationOptions = Apollo.BaseMutationOptions<SaveUserMutation, SaveUserMutationVariables>;
export const SaveGroupDocument = gql`
    mutation saveGroup($userId: String!, $group: AddGroupDto!) {
  saveGroup(userId: $userId, group: $group) {
    id
    searchId
    name
    iconUrl
  }
}
    `;
export type SaveGroupMutationFn = Apollo.MutationFunction<SaveGroupMutation, SaveGroupMutationVariables>;

/**
 * __useSaveGroupMutation__
 *
 * To run a mutation, you first call `useSaveGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveGroupMutation, { data, loading, error }] = useSaveGroupMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      group: // value for 'group'
 *   },
 * });
 */
export function useSaveGroupMutation(baseOptions?: Apollo.MutationHookOptions<SaveGroupMutation, SaveGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveGroupMutation, SaveGroupMutationVariables>(SaveGroupDocument, options);
      }
export type SaveGroupMutationHookResult = ReturnType<typeof useSaveGroupMutation>;
export type SaveGroupMutationResult = Apollo.MutationResult<SaveGroupMutation>;
export type SaveGroupMutationOptions = Apollo.BaseMutationOptions<SaveGroupMutation, SaveGroupMutationVariables>;
export const FindGroupDocument = gql`
    query findGroup($searchId: String!) {
  findGroup(searchId: $searchId) {
    id
    name
    iconUrl
  }
}
    `;

/**
 * __useFindGroupQuery__
 *
 * To run a query within a React component, call `useFindGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindGroupQuery({
 *   variables: {
 *      searchId: // value for 'searchId'
 *   },
 * });
 */
export function useFindGroupQuery(baseOptions: Apollo.QueryHookOptions<FindGroupQuery, FindGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindGroupQuery, FindGroupQueryVariables>(FindGroupDocument, options);
      }
export function useFindGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindGroupQuery, FindGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindGroupQuery, FindGroupQueryVariables>(FindGroupDocument, options);
        }
export type FindGroupQueryHookResult = ReturnType<typeof useFindGroupQuery>;
export type FindGroupLazyQueryHookResult = ReturnType<typeof useFindGroupLazyQuery>;
export type FindGroupQueryResult = Apollo.QueryResult<FindGroupQuery, FindGroupQueryVariables>;
export const JoinGroupDocument = gql`
    mutation joinGroup($userId: String!, $searchId: String!) {
  joinGroup(userId: $userId, searchId: $searchId) {
    id
    searchId
  }
}
    `;
export type JoinGroupMutationFn = Apollo.MutationFunction<JoinGroupMutation, JoinGroupMutationVariables>;

/**
 * __useJoinGroupMutation__
 *
 * To run a mutation, you first call `useJoinGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinGroupMutation, { data, loading, error }] = useJoinGroupMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      searchId: // value for 'searchId'
 *   },
 * });
 */
export function useJoinGroupMutation(baseOptions?: Apollo.MutationHookOptions<JoinGroupMutation, JoinGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinGroupMutation, JoinGroupMutationVariables>(JoinGroupDocument, options);
      }
export type JoinGroupMutationHookResult = ReturnType<typeof useJoinGroupMutation>;
export type JoinGroupMutationResult = Apollo.MutationResult<JoinGroupMutation>;
export type JoinGroupMutationOptions = Apollo.BaseMutationOptions<JoinGroupMutation, JoinGroupMutationVariables>;
export const UpdateGroupDocument = gql`
    mutation updateGroup($group: UpdateGroupDto!) {
  updateGroup(group: $group) {
    id
    name
    iconUrl
  }
}
    `;
export type UpdateGroupMutationFn = Apollo.MutationFunction<UpdateGroupMutation, UpdateGroupMutationVariables>;

/**
 * __useUpdateGroupMutation__
 *
 * To run a mutation, you first call `useUpdateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupMutation, { data, loading, error }] = useUpdateGroupMutation({
 *   variables: {
 *      group: // value for 'group'
 *   },
 * });
 */
export function useUpdateGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupMutation, UpdateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(UpdateGroupDocument, options);
      }
export type UpdateGroupMutationHookResult = ReturnType<typeof useUpdateGroupMutation>;
export type UpdateGroupMutationResult = Apollo.MutationResult<UpdateGroupMutation>;
export type UpdateGroupMutationOptions = Apollo.BaseMutationOptions<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const GroupsByUserDocument = gql`
    query groupsByUser($id: String!) {
  groupsByUser(id: $id) {
    ...MembershipGroup
  }
}
    ${MembershipGroupFragmentDoc}`;

/**
 * __useGroupsByUserQuery__
 *
 * To run a query within a React component, call `useGroupsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupsByUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGroupsByUserQuery(baseOptions: Apollo.QueryHookOptions<GroupsByUserQuery, GroupsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupsByUserQuery, GroupsByUserQueryVariables>(GroupsByUserDocument, options);
      }
export function useGroupsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupsByUserQuery, GroupsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupsByUserQuery, GroupsByUserQueryVariables>(GroupsByUserDocument, options);
        }
export type GroupsByUserQueryHookResult = ReturnType<typeof useGroupsByUserQuery>;
export type GroupsByUserLazyQueryHookResult = ReturnType<typeof useGroupsByUserLazyQuery>;
export type GroupsByUserQueryResult = Apollo.QueryResult<GroupsByUserQuery, GroupsByUserQueryVariables>;
export const WithdrawalGroupDocument = gql`
    mutation withdrawalGroup($userId: String!, $groupId: Int!) {
  withdrawalGroup(userId: $userId, groupId: $groupId) {
    id
  }
}
    `;
export type WithdrawalGroupMutationFn = Apollo.MutationFunction<WithdrawalGroupMutation, WithdrawalGroupMutationVariables>;

/**
 * __useWithdrawalGroupMutation__
 *
 * To run a mutation, you first call `useWithdrawalGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWithdrawalGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [withdrawalGroupMutation, { data, loading, error }] = useWithdrawalGroupMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useWithdrawalGroupMutation(baseOptions?: Apollo.MutationHookOptions<WithdrawalGroupMutation, WithdrawalGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<WithdrawalGroupMutation, WithdrawalGroupMutationVariables>(WithdrawalGroupDocument, options);
      }
export type WithdrawalGroupMutationHookResult = ReturnType<typeof useWithdrawalGroupMutation>;
export type WithdrawalGroupMutationResult = Apollo.MutationResult<WithdrawalGroupMutation>;
export type WithdrawalGroupMutationOptions = Apollo.BaseMutationOptions<WithdrawalGroupMutation, WithdrawalGroupMutationVariables>;
export const UserDocument = gql`
    query user($id: String!) {
  user(id: $id) {
    id
    name
    iconUrl
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;