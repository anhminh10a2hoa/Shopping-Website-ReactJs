import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
} from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache"; 

import './index.css';
import App from './App';
import { resolvers, typeDefs } from './graphql/resolvers';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com/'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers
});

client.writeData({
  data: {
    cartHidden: true,
    cartItems: [],
    itemCount: 0
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
