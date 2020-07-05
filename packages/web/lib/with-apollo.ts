import { withApollo } from "next-apollo";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

const uri = process.env.GRAPHQL_URI || "http://localhost/graphql";

const apolloClient = new ApolloClient({
  link: createHttpLink({ uri }),
  cache: new InMemoryCache(),
});

export default withApollo(apolloClient);
