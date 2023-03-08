import URL from '../../router/apiRoute.js';

// GET ALL LISTINGS MODULE //
const getListings = {
    namespaced: true,

    state: () => ({
        isLoaded: false,
        houseList: [],
        sortOption: 'price',
        reverseOption: false,
        searchFilter: '',

        // The currentHouse is for the recommendationlist.
        // The recommendationlist is based on the closest values to the price of the current listing
        currentHouse: {} 
    }),

    mutations: {
        setHouseList(state, houseList) {
            // Check local storage to see if this listing is created by the user
            houseList.forEach((house) => {
                if(localStorage.getItem('myListings') === null) return;
                const myListings = JSON.parse(localStorage.getItem('myListings'))                
                for(let listing of myListings) {
                    if(listing === house.id) house.madeByMe = true;
                }
            });
            state.houseList = houseList;
            state.isLoaded = true;
        },
        setSortOption(state, sort) {
            state.sortOption = sort;
        },
        setReverseOption(state, param) {
            if(param === 'switch') state.reverseOption = !state.reverseOption;
            if(param === 'false') state.reverseOption = false;
        },
        setSearchFilter(state, filter) {
            state.searchFilter = filter;
        },
        setCurrentHouse(state, data) {
            state.currentHouse = data;
        }
    },

    actions: {
        async fetchHouses(context) {
            try {
                const response = await fetch(URL + "houses", {
                    headers: { 'X-Api-Key': 'hIWf6Vu_HYlSmL5wRD4z70vrbn9dy-Op' }
                });                
                const data = await response.json();
                context.commit("setHouseList", data);
            } catch(err) {
                console.log(err);
            }
        },
    },

    getters: {
        getSortedList(state) {
            const searchFilter = state.searchFilter.toLowerCase().split(' ');
            // Filter the houses //
            const filtered = [...state.houseList].filter((house) => {
                return searchFilter.every(i => house.location.street.toLowerCase().includes(i) || house.location.city.toLowerCase().includes(i)) 
            });
            // Sort the houses //
            const sorted = filtered.sort((a, b) => {
                if(a[state.sortOption] > b[state.sortOption]) { return 1 }
                if(a[state.sortOption] < b[state.sortOption]) { return -1 }
                return 0;
            });
            if(state.reverseOption) sorted.reverse();      
            return sorted;
        },
        
        // List of recommendations that is based on the price closest the the current houseprice
        getRecommendedList(state) {
            const currentPrice = state.currentHouse.price;
            const currentId = state.currentHouse.id;
            const recommendedList = [...state.houseList]
            .filter((house) => house.id !== currentId && !house.madeByMe)
            .sort((a, b) => { 
                return Math.abs(a.price - currentPrice) - Math.abs(b.price - currentPrice)
            })            
            .slice(0, 4);            
            return recommendedList;
        },

        // Recent History List showing the 4 last viewed houses
        getHistoryList(state) {
            if(localStorage.getItem('history') === null) return;
            const history = JSON.parse(localStorage.getItem('history'));
            const historyList = [...state.houseList].filter((house) => {
                return history.some((id) => id === house.id );
            })
            return historyList;
        }
    }
}

export default getListings;