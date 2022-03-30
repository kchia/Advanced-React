import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { endpoint, prodEndpoint } from '../config';
import paginationField from './paginationField';

function createClient({ headers, initialState }) {
  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          );
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      createUploadLink({
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        fetchOptions: {
          credentials: 'include', // send cookies along with the request
        },
        // pass the headers along from this request. This enables SSR with logged in state
        headers, // so server knows whether or not user is logged in to avoid weird flicker
      }),
    ]),
    cache: new InMemoryCache({ // store cache in the browser
      typePolicies: {
        Query: {
          fields: {
            // TODO: We will add this together!
            allProducts: paginationField(),
          },
        },
      },
    }).restore(initialState || {}), // 
  });
}
// getDataFromTree crawl queries and wait for data to be fetched before HTML sent from server to client
export default withApollo(createClient, { getDataFromTree }); 
