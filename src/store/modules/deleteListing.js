import router from '../../router/index.js';
import URL from '../../router/apiRoute.js';
import Router from '../../router/index.js';
import utils from '../../components/utils.js';

// DELETE LISTING MODULE //
const deleteListing = {
    namespaced: true,
    state: () => ({
        showDeleteWarning: false,
        deleteId: '',
    }),
    mutations: {
        setShowDeleteWarning(state, id) {
            state.showDeleteWarning = !state.showDeleteWarning;
            if(state.showDeleteWarning) state.deleteId = id;
            else state.deleteId = '';
        },
    },
    actions: {
        async deleteHouse({ commit, state }) {
            try {               
                const response = await fetch(URL + "houses/" + state.deleteId, {
                    method: "DELETE",
                    headers: { 'X-Api-Key': 'hIWf6Vu_HYlSmL5wRD4z70vrbn9dy-Op' }               
                });
                if(response.ok) {
                    utils.removeFromLocalStorage('myListings', state.deleteId);
                    commit("setShowDeleteWarning", state.deleteId);
                    // Refresh the page if the current path is '/', otherwise change the page to '/'
                    if(Router.currentRoute._rawValue.fullPath === '/') {
                        router.go(0)
                    } else {
                        router.push({ name: 'houses' })
                    }
                } 
            } catch(err) {
                console.log(err)
            }
            
        }
    }
}

export default deleteListing;