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

const MY_GQL_URL = "Probably MY_WP_URL/graphql";
const WP_GQL_URL =
  process.env.NODE_ENV === "production"
    ? MY_GQL_URL
    : "http://localhost:8080/graphql";

export default ({ req, app }) => {
  const headersVal = {
    "Accept-Language": "en-us"
  };
  return {
    httpEndpoint: WP_GQL_URL,
    httpLinkOptions: {
      headers: headersVal
    },
    cache: new InMemoryCache({ fragmentMatcher })
  };
};
