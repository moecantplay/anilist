import { ApolloClient, InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Page: {
      merge(existing, incoming, { args: { page, perPage } }) {
        const offset = (page - 1) * perPage;
        const { media: incomingMedia } = incoming;

        const merged = existing ? existing.slice(0) : [];

        for (let i = 0; i < incomingMedia.length; ++i) {
          merged[offset + i] = incomingMedia[i];
        }

        return merged;
      },
      read(existing, { args: { page, perPage } }) {
        const offset = (page - 1) * perPage;
        return existing && existing.slice(offset, offset + perPage);
      },
    },
  },
});

export const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache,
});
