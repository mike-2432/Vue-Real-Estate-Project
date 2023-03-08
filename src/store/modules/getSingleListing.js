import URL from '../../router/apiRoute.js';
import utils from '../../components/utils.js';

// GET SINGLE LISTING MODULE //
const getSingleListing =  {
    namespaced: true,
    state: () => ({
        // isLoaded has three states: notLoaded, notFound and loaded
        isLoaded: 'notLoaded',
        singleHouse: "",
    }),

    mutations: {
        setSingleHouse(state, data) {
            state.singleHouse = data;

            // History, stored in local storage, containing the 4 last seen items
            if(localStorage.getItem('history') === null) {
                utils.addToLocalStorage('history', data.id);
            } else {
                const history = JSON.parse(localStorage.getItem('history'));
                if(history.length > 3 && history.every(id => id !== data.id)) {
                    utils.removeFirstFromLocalStorage('history');
                } 
                utils.addToLocalStorage('history', data.id);
            }         
        },
        setIsLoaded(state, param) {
            state.isLoaded = param;
        }
    },

    actions: {
        async fetchHouse(context, param) {
            context.commit('setIsLoaded', 'notLoaded');
            try {
                const response = await fetch(URL + "/houses", {
                    headers: { 'X-Api-Key': 'hIWf6Vu_HYlSmL5wRD4z70vrbn9dy-Op' }
                });
                const data = await response.json();
                const house = data.find(item => item.id === parseInt(param.id));
                context.commit('setSingleHouse', house);
                context.commit('setIsLoaded', 'loaded');
            } catch(err) {
                context.commit('setIsLoaded', 'notFound');
            }
        }
    }
}

export default getSingleListing;