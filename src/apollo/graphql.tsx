import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
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
  name: Scalars["String"];
  iconUrl?: Scalars["String"];
};

export type AddUserDto = {
  name: Scalars["String"];
  email: Scalars["String"];
  iconUrl: Scalars["String"];
};

export type GroupModel = {
  __typename?: "GroupModel";
  id: Scalars["Int"];
  name: Scalars["String"];
  iconUrl: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Mutation = {
  __typename?: "Mutation";
  saveUser: UserModel;
  addGroupByUser: UserModel;
  saveGroup: GroupModel;
};

export type MutationSaveUserArgs = {
  user: AddUserDto;
};

export type MutationAddGroupByUserArgs = {
  affiliation: AddGroupByUserDto;
};

export type MutationSaveGroupArgs = {
  group: AddGroupDto;
};

export type Query = {
  __typename?: "Query";
  user?: Maybe<UserModel>;
  groupsByUser?: Maybe<Array<GroupModel>>;
  usersByGroup?: Maybe<Array<UserModel>>;
  group?: Maybe<GroupModel>;
};

export type QueryUserArgs = {
  id: Scalars["Int"];
};

export type QueryGroupsByUserArgs = {
  id: Scalars["Int"];
};

export type QueryUsersByGroupArgs = {
  id: Scalars["Int"];
};

export type QueryGroupArgs = {
  id: Scalars["Int"];
};

export type UserModel = {
  __typename?: "UserModel";
  id: Scalars["Int"];
  name: Scalars["String"];
  email: Scalars["String"];
  iconUrl: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type AddGroupByUserDto = {
  userId: Scalars["Float"];
  groupId: Scalars["Float"];
};

export type SaveGroupMutationVariables = Exact<{
  group: AddGroupDto;
}>;

export type SaveGroupMutation = { __typename?: "Mutation" } & {
  saveGroup: { __typename?: "GroupModel" } & Pick<
    GroupModel,
    "name" | "iconUrl"
  >;
};

export type GroupsByUserQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type GroupsByUserQuery = { __typename?: "Query" } & {
  groupsByUser?: Maybe<
    Array<
      { __typename?: "GroupModel" } & Pick<
        GroupModel,
        "id" | "name" | "iconUrl" | "createdAt" | "updatedAt"
      >
    >
  >;
};

export const SaveGroupDocument = gql`
  mutation saveGroup($group: AddGroupDto!) {
    saveGroup(group: $group) {
      name
      iconUrl
    }
  }
`;
export type SaveGroupMutationFn = Apollo.MutationFunction<
  SaveGroupMutation,
  SaveGroupMutationVariables
>;

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
 *      group: // value for 'group'
 *   },
 * });
 */
export function useSaveGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SaveGroupMutation,
    SaveGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SaveGroupMutation, SaveGroupMutationVariables>(
    SaveGroupDocument,
    options
  );
}
export type SaveGroupMutationHookResult = ReturnType<
  typeof useSaveGroupMutation
>;
export type SaveGroupMutationResult = Apollo.MutationResult<SaveGroupMutation>;
export type SaveGroupMutationOptions = Apollo.BaseMutationOptions<
  SaveGroupMutation,
  SaveGroupMutationVariables
>;
export const GroupsByUserDocument = gql`
  query groupsByUser($id: Int!) {
    groupsByUser(id: $id) {
      id
      name
      iconUrl
      createdAt
      updatedAt
    }
  }
`;

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
export function useGroupsByUserQuery(
  baseOptions: Apollo.QueryHookOptions<
    GroupsByUserQuery,
    GroupsByUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GroupsByUserQuery, GroupsByUserQueryVariables>(
    GroupsByUserDocument,
    options
  );
}
export function useGroupsByUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GroupsByUserQuery,
    GroupsByUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GroupsByUserQuery, GroupsByUserQueryVariables>(
    GroupsByUserDocument,
    options
  );
}
export type GroupsByUserQueryHookResult = ReturnType<
  typeof useGroupsByUserQuery
>;
export type GroupsByUserLazyQueryHookResult = ReturnType<
  typeof useGroupsByUserLazyQuery
>;
export type GroupsByUserQueryResult = Apollo.QueryResult<
  GroupsByUserQuery,
  GroupsByUserQueryVariables
>;
