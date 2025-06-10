import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://localhost:7777/query",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
