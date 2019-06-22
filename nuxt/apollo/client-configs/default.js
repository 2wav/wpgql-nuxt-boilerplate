import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
/*
 ** This file is just a manual export from GQL for now
 ** @todo Import the schema programatically.
 */
import schema from "./schema.json";
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: schema
});

export default ({ req, app }) => {
  const headersVal = {
    "Accept-Language": "en-us"
  };
  return {
    httpEndpoint: process.env.WP_GQL_URL,
    httpLinkOptions: {
      credentials: "include",
      headers: headersVal
    },
    cache: new InMemoryCache({ fragmentMatcher })
  };
};
