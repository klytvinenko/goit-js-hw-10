import { fetchBreeds, fetchCatByBreed} from './cat-api'; 
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

fetchBreeds().then(data => {
    const option = data.map(({id, name}) => {
        return `<option value="${id}">${name}</option>`
    });

    breedSelect.innerHTML = option;
})
.catch(() => {
    Report.failure('Oops!', 'Something went wrong! Try reloading the page!');
});

breedSelect.addEventListener('change', onSelect);

function onSelect(evt) {
    breedSelect.classList.add('hidden');
     catInfo.classList.add('hidden');
    Loading.standard('Loading data, please wait...');

    evt.preventDefault();
    const selectId = breedSelect.value;

    fetchCatByBreed(selectId).then(cat => {
        Loading.remove();
        breedSelect.classList.remove('hidden');
        catInfo.classList.remove('hidden');
        const markup = `
        <img src="${cat.url}" alt="${cat.id} width="200" height="200">
        <h2>${cat.breeds[0].name}</h2>
        <p>${cat.breeds[0].description}</p>
        <p>${cat.breeds[0].temperament}</p>
        `

        catInfo.innerHTML = markup;

    })
    .catch(() => {
        Report.failure('Oops!', 'Something went wrong! Try reloading the page!');
    });
}




