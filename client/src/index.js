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
  gql,
} from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache"; 

import './index.css';
import App from './App';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com/'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache
});

client.query({
  query: gql`
    {
      getCollectionsByTitle(title: "hats"){
        id,
        title,
        items {
          id,
          name,
          price,
          imageUrl
        }
      }
    }  
  `
}).then(res => {
  console.log(res);
})

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
