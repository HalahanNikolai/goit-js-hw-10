
//todo **************************
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
    'live_HLWvj6NRFnOyQWTIt65lpSnyxFVzeyiOP9SlVnLQe04eFdDMq3S0SDfCJhyufI1O';

export class CatApiService {

    #BASE_URL = 'https://api.thecatapi.com/v1/';
    #END_POINTS = {
        BREEDS: 'breeds',
        IMAGES_SEARCH: 'images/search',
    };

    // Функція, яка повертає всіх котів (promise)
    fetchBreeds() {
        const url = `${this.#BASE_URL}${this.#END_POINTS.BREEDS}`;
        return axios.get(url);
    }

    // Функція, яка повертає кота (promise) по ID
    fetchCatByBreed(breedId) {
        const url = `${this.#BASE_URL}${this.#END_POINTS.IMAGES_SEARCH
            }?breed_ids=${breedId}`;
        return axios.get(url);
    }
}
//t