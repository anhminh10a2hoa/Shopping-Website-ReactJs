import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionsFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {

  componentDidMount(){
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }
  
  render(){
    const { match, isFetching, isloaded } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isFetching} {...props}/>} />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isloaded} {...props}/>} />
      </div>
    )
  }
}
  
const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsCollectionsFetching,
  isloaded: selectIsCollectionsLoaded
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);