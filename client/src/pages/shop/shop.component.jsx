import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverviewGqlContainer from "../../components/collections-overview/collections-overview-gql.container";
import CollectionsGqlContainer from "../collection/collection-gql.container";

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

const ShopPage = ({fetchCollectionsStart, match}) => {

  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);
  
  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewGqlContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionsGqlContainer}
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);