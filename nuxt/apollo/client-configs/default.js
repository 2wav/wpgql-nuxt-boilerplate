import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
/**
 * fragments.json is generated from the GQL server at runtime
 */
import schema from "./fragments.json";
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
      headers: headersVal
    },
    cache: new InMemoryCache({ fragmentMatcher })
  };
};
