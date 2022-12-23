import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from 'react-router-dom';
import { BurgerMenuProvider } from "./utils/useBurgerMenu";
import { client } from "./lib/apollo";
import { Router } from "./Router";

export function App() {
  return (
    <ApolloProvider client={client}>
      <BurgerMenuProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </BurgerMenuProvider>
    </ApolloProvider>
  )
}
