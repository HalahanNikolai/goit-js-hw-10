import { fetchBreeds, fetchCatByBreed } from "./comon";
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

const temp = {
    breedSelect: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};
const { breedSelect, catInfo, loader, error } = temp;

catInfo.classList.add('is-hidden');
loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');

let arrayId = [];
fetchBreeds()
    .then(data => {
        data.forEach(element => {
            arrayId.push({ text: element.name, value: element.id });
        });
        new SlimSelect({
            select: breedSelect,
            data: arrayId
        });
    })
    .catch(fetchErr);

breedSelect.addEventListener('change', selBreed);

function selBreed(event) {
    loader.classList.replace('is-hidden', 'loader');
    breedSelect.classList.add('is-hidden');
    catInfo.classList.add('is-hidden');

    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
        .then(data => {
            loader.classList.replace('loader', 'is-hidden');
            breedSelect.classList.remove('is-hidden');
            const { url, breeds } = data[0];

            catInfo.innerHTML = `<div class="box-img">
            <img src="${url}" 
            alt="${breeds[0].name}"
            width="400"/>
            </div>

            <div class="box">
            <h1>${breeds[0].name}</h1>
            <p>${breeds[0].description}</p>
            <p><b>Temperament:</b> ${breeds[0].temperament}</p>
            </div>`
            catInfo.classList.remove('is-hidden');
        })
        .catch(fetchErr);
};

function fetchErr(error) {
    breedSelect.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 6000,
        width: '350px',
        fontSize: '24px'
    });
};













