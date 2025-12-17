import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client/errors";
import { ErrorLink } from "@apollo/client/link/error";
import { HttpLink } from "@apollo/client/link/http";
import { ApolloProvider } from "@apollo/client/react";
import ReactDOM from "react-dom/client";
import { GET_USER_QUERY } from "./queries/Queries";
import AppRouter from "./routes/AppRouter";

const errorLink = new ErrorLink(({ error }) => {
    if (CombinedGraphQLErrors.is(error)) {
      error.errors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
      });
    } else if (CombinedProtocolErrors.is(error)) {
      error.errors.forEach(({ message, extensions }) => {
        console.log(
          `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
            extensions,
          )}`,
        );
      });
    } else {
      console.error(`[Network error]: ${error}`);
    }
  });

const httpLink = new HttpLink({
  uri: "/graphql",
  credentials: "same-origin",
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

const rootEl = document.getElementById("app");
if (!rootEl) {
  throw new Error("Cannot find root element");
}

const root = ReactDOM.createRoot(rootEl);

root.render(
  <ApolloProvider client={client}>
    <AppRouter />
  </ApolloProvider>,
);

client
  .query({
    query: GET_USER_QUERY,
  })
  .catch(() => {
    // Best-effort prefetch; app should still render if unauthenticated.
  });
