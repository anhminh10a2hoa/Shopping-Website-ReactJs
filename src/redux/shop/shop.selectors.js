import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollection = collectionUrlParam =>
  createSelector([selectShopCollections], collections => {
    return collections.find(collection => {
      return collection.routeName === collectionUrlParam
    })
  });