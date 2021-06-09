import { InMemoryCache } from "@apollo/client";

// 少し試して見たけどなしで行けた。今は空。 必要になった時に設定。
export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {},
});
