import React from 'react';
import { useQuery, gql } from '@apollo/client';
 
import CollectionsOverview from './collections-overview.component';
import Spinner from '../spinner/spinner.component';

const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionsOverviewGqlContainer = () => {
  const { loading, data } = useQuery(GET_COLLECTIONS);
  if(loading) return <Spinner />
  return <CollectionsOverview collections={data.collections} />
}

export default CollectionsOverviewGqlContainer;