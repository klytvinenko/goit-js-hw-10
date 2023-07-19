import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_3xEREoWZwwEMPM0zSNZvmOaYC6Oo8dh4gyRpUant3EX1Ukrpm2O7uOD4pMjkdcp0";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

function fetchBreeds() {
    return axios
    .get(`breeds/`)
    .then(response => {
       return response.data;
    })
    .catch(() => {
        Report.failure('Oops!', 'Something went wrong! Try reloading the page!');
    });
}

function fetchCatByBreed(breedId) {
    return axios 
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => { 
        return response.data[0];
    })
    .catch(() => {
        Report.failure('Oops!', 'Something went wrong! Try reloading the page!');
    });
}


export { fetchBreeds, fetchCatByBreed};



