import { GRAPHQL_API_URL } from '@/consts';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: GRAPHQL_API_URL,
});

/**
 * basic apollo client setup as per https://www.apollographql.com/docs/react/get-started#step-3-initialize-apolloclient
 */
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  ssrMode: true
});

export default apolloClient;
