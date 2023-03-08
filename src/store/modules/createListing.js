import router from '../../router/index.js';
import URL from '../../router/apiRoute.js';
import utils from '../../components/utils.js';

// CREATE LISTING MODULE //
// this module contains methods for creating a new house and editing an existing house
const createListing = {
    namespaced: true,    
    actions: {
        async createHouse(_, requestData) {
            const { form, image } = requestData;
            try {      
                // Create the house         
                const response = await fetch(URL + "houses", {
                    method: "POST",
                    headers: { 'X-Api-Key': 'hIWf6Vu_HYlSmL5wRD4z70vrbn9dy-Op' },
                    body: form,
                });
                const data = await response.json();                
                utils.addToLocalStorage('myListings', data.id);

                // Upload the image
                const imageResponse = await fetch(URL + "houses/" + data.id + "/upload", {
                    method: "POST",
                    headers: { 'X-Api-Key': 'hIWf6Vu_HYlSmL5wRD4z70vrbn9dy-Op' },
                    body: image
                });
                if(response.ok && imageResponse.ok) router.push({ path: 'house/'+ data.id });
            } catch(err) {
                console.log(err)
            }
        },

        async editHouse(_, requestData) {
            const { form, image, id } = requestData;
            try {    
                // Edit the house           
                const response = await fetch(URL + "houses/" + id, {
                    method: "POST",
                    headers: { 'X-Api-Key': 'hIWf6Vu_HYlSmL5wRD4z70vrbn9dy-Op' },
                    body: form,
                });

                // Upload a new image
                const imageResponse = await fetch(URL + "houses/" + id + "/upload", {
                    method: "POST",
                    headers: { 'X-Api-Key': 'hIWf6Vu_HYlSmL5wRD4z70vrbn9dy-Op' },
                    body: image
                });
                console.log(response);
                console.log(imageResponse);

                if(response.ok && imageResponse.ok) router.push({ path: '/house/' + id});
            } catch(err) {
                console.log(err)
            }
        }
    }
}

export default createListing;