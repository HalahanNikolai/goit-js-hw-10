import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { CatApiService } from './comon';
import Loader from './loader';

const refs = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info'),
};
const loader = new Loader({
    hidden: false,
});
const catApiServiceInstance = new CatApiService();


loader.show();
//Fetch порід котів + ініціалізація SlimSelect для вибору породи.
catApiServiceInstance
    .fetchBreeds()
    .then(({ data }) => {
        createOptionMarkup(data);
        new SlimSelect({
            select: refs.select,
        });
        loader.hide();
    })
    .catch(data => {
        loader.showErrorLoader();
        Notiflix.Notify.failure(data.message);
    });

//Функція для створення параметрів розміткм із <select>
function createOptionMarkup(data) {
    const optionsMarkup = data
        .map(({ id, name }) => `<option value=${id}>${name}</option>`)
        .join('');

    return refs.select.insertAdjacentHTML('afterbegin', optionsMarkup);
}

refs.select.addEventListener('change', handleCatByBreed);

//Отримуємо кота по породам та рендерим розмітку catInfo.
function handleCatByBreed(event) {
    const selectedBreed = event.target.value;
    refs.catInfo.innerHTML = ' ';
    loader.show();

    catApiServiceInstance
        .fetchCatByBreed(selectedBreed)
        .then(({ data }) => {
            loader.hide();
            // Деструктур-ія об'єкта даних
            const { breeds, url } = data[0];
            const { name, description, temperament } = breeds[0];

            // Відтворення розмітки в div (.cat.info)
            refs.catInfo.innerHTML = createCatCardMarkup(
                url,
                name,
                description,
                temperament
            );
        })
        .catch(data => {
            loader.showErrorLoader();
            Notiflix.Notify.failure(
                'Oops! Something went wrong! Try reloading the page!'
            );
        });
}

// Функція, яка створ. розмітку cat card
function createCatCardMarkup(url, name, description, temperament) {
    return `
    <img class="cat-image" src=${url} alt="${name}"/>
    <h2 class="cat-name">${name}</h2>
    <p class="cat-description"><span class="cat-span">Description: </span>${description}</p>
    <p class="cat-temperament"><span class="cat-span">Temperament: </span> ${temperament}</p>`;
}
