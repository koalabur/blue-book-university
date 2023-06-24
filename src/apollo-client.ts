import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const client = new ApolloClient({
  ssrMode: typeof window === "undefined", // set to true for SSR
  link: createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_URL}/api/graphql`,
    credentials: "same-origin",
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
