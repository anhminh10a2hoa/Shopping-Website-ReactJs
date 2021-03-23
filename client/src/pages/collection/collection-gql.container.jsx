import React from 'react';
import { useQuery, gql } from '@apollo/client';
 
import CollectionPage from './collection.component';
import Spinner from '../../components/spinner/spinner.component';

const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!){
    getCollectionsByTitle(title: $title) {
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

const CollectionsGqlContainer = ({ match }) => {
  const { loading, data } = useQuery(GET_COLLECTION_BY_TITLE, {
    variables: { title: match.params.collectionId },
  });
  console.log(data);
  if(loading) return <Spinner />
  return <CollectionPage collection={data.getCollectionsByTitle} />
}

export default CollectionsGqlContainer; 