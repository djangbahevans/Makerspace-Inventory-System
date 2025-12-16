import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client/errors";
import { ErrorLink } from "@apollo/client/link/error";
import { ApolloProvider } from "@apollo/client/react";
import ReactDOM from "react-dom/client";
import { GET_USER_QUERY } from "./queries/Queries";
import AppRouter from "./routes/AppRouter";

// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from './theme/theme';

const client = new ApolloClient({
  link: new ErrorLink(({ error }) => {
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
  }),
  cache: new InMemoryCache(),
});

const rootEl = document.getElementById("app");
if (!rootEl) {
  throw new Error("Cannot find root element");
}

const root = ReactDOM.createRoot(rootEl);

client
  .query({
    query: GET_USER_QUERY,
  })
  .then(() =>
    root.render(
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>,
    ),
  );
