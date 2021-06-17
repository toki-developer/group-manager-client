declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_GRAPHQL_API_URL: string;
    readonly NEXT_PUBLIC_GRAPHQL_SUBSCRIPTIONS_API_URL: string;
  }
}
