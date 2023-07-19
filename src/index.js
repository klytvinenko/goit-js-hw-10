import { fetchBreeds, fetchCatByBreed} from './cat-api'; 

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

fetchBreeds().then(data => {
    const option = data.map(({id, name}) => {
        `<option value="${id}">${name}</option>`
    });

    breedSelect.innerHTML = option;
})
.catch((err) => console.log(error));

breedSelect.addEventListener('change', onSelect);

function onSelect(evt) {
    evt.preventDefault();
    const selectId = breedSelect.value;

    fetchCatByBreed(selectId).then(cat => {
        const markup = `
        <img src="${cat.url}" alt="${cat.id}">
        <h2>${cat.breeds[0].name}</h2>
        <p>${cat.breeds[0].description}</p>
        <p>${cat.breeds[0].temperament}</p>
        `

        catInfo.innerHTML = markup;
    })
    .catch(err => console.log(err));
}




