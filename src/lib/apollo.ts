import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.hygraph.com/v2/clbzcmxb404yg01uj7cfjeytb/master',
  cache: new InMemoryCache()
})