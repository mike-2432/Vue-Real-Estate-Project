import { createStore } from 'vuex';
import getListings from './modules/getListings';
import getSingleListing from './modules/getSingleListing';
import createListing from './modules/createListing';
import deleteListing from './modules/deleteListing';

export default createStore({
  modules: {
    getListings,
    getSingleListing,
    createListing,
    deleteListing,    
  }  
});