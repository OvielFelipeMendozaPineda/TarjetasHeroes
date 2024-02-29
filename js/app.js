let heroes = {}
let main = document.querySelector('.main')
let marvelIcon = document.querySelector('.marvel')
let dcIcon = document.querySelector('.dc')
let links = document.querySelector('.links')
let body = document.querySelector('body')
document.addEventListener("DOMContentLoaded", async (e) => {
    await getData();
    toHTML(heroes)
    metodoMain(heroes)
    filterHero(heroes)
    marvelIcon.addEventListener('click', (e) => {
        let cardsDc = document.querySelectorAll('.dc')
        cardsDc.forEach(card => {
            card.style.display = 'none';
            card.style.animation = "fadeIn 0.5s ease-in-out";
        })
        links.style.background = "linear-gradient(to right, black, rgb(153, 4, 4),  rgb(168, 0, 0))"
    })
    dcIcon.addEventListener('click', (e) => {
        let cardsMarvel = document.querySelectorAll('.marvel');
        cardsMarvel.forEach(card => {
            card.style.display = 'none';
            card.style.animation = "fadeIn 0.5s ease-in-out";
            links.style.background = "linear-gradient(to right, black, rgb(0, 43, 88),  rgb(0, 79, 197))"
        })
    })
});


function reload() {
    location.reload()
}

/**
 * 
 * @param {Array} heroes 
 */
const metodoMain = (heroes) => {
    for (let i in heroes) {
        showPreview(heroes[i], i );
    }
};
async function getData() {
    const filename = "storage/json/data.json"
    return fetch(filename)
        .then(response => response.json())
        .then(data => { heroes = data })
}
/**
 * 
 * @param {String} picture 
 * @param {String} name 
 * @returns Return a card of the superhero with image, name and a button for more info.
 */
function cardsCreator(picture, name, franquicia) {
    let card = document.createElement("div");

    card.setAttribute('class', 'card ' + franquicia);
    card.setAttribute('id', name)
    let img = document.createElement("img");
    let title = document.createElement("h2");
    let button = document.createElement("button");
    card.style.animation = "fadeIn 0.5s ease-in-out";
    img.src = picture;
    img.alt = 'Superhero no available.'
    title.innerText = name;
    button.innerText = 'Ver'
    if (franquicia == 'dc') {
        card.style.background = "linear-gradient( #3375c5 0%, #3375c5 100%)";
        button.style.background = " #1d9aed";

    }
    button.setAttribute("id", name)
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(button);

    return card
}
/**
 * 
 * @param {String} name 
 * @param {String} about 
 * @param {String} year 
 * @param {String} picture 
 * @returns Returns a preview of the superhero.
 */
function previewCreator(name, about, picture, franquicia) {
    let blur = document.createElement("section")
    blur.classList.add("blur");
    let preview = document.createElement("div")
    preview.classList.add("preview", franquicia);
    let img = document.createElement("img");
    let title = document.createElement("h2");
    let description = document.createElement("h3");
    let button = document.createElement("button")
    img.src = picture;
    img.alt = 'Superhero no available.'
    title.innerText = name;
    description.innerText = about;
    button.innerText = 'Atrás';
    button.setAttribute("id", "preview")
    preview.appendChild(img);
    preview.appendChild(title);
    preview.appendChild(description);
    preview.appendChild(button);
    blur.appendChild(preview)
    return blur

}
/**
 * Takes an array of heroes an assing each HTMl element.
 * @param {Array} heroes 
 * @returns cards of HTML elements
 */
function toHTML(heroes) {
    for (let i in heroes) {
        console.log(i);
        heroes[i].forEach(hero => {
            let card = cardsCreator(hero.picture, hero.name, i)
            main.appendChild(card)
        });
    }
}
/**
 * 
 * @param {Array} heroes 
 * @returns Shows the preview of the hero with image, name, desciption and year of invention.
 */
const showPreview = (heroes, i) => {
    let botones = document.querySelectorAll('button')
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            let botonId = boton.id;
            let ind = heroes.findIndex(hero => hero.name === botonId);
            let existingPreview = main.querySelector(".preview");
            let blur = previewCreator(heroes[ind].name, heroes[ind].about, heroes[ind].picture, i);
            main.appendChild(blur);
            closePreview(existingPreview)
        })
    })
};
const closePreview = (existingPreview) => {
    let close = document.querySelectorAll('.preview')

    close.forEach(boton => {
        boton.addEventListener('click', () => {
            let blur = document.querySelector('.blur')
            if (!existingPreview) {
                main.removeChild(blur)
            }
        })
    })
};
/**
*  Search for the hero card. 
* @param {Array} heroes 
*/
function search(heroes) {
    const searchInput = document.querySelector('#search');
    const filter = searchInput.value.toLowerCase();
    const card = document.querySelectorAll('.card')
    card.forEach(card => {
        if (card.id.toLowerCase().includes(filter)) {
            card.style.display = ''
        }
        else {
            card.style.display = 'none';
        }
    })
}
/**
* Calls the EventListener for the search input
* @param {Array} heroes 
*/
const filterHero = (heroes) => {
    const inputSearch = document.querySelector('#search');
    inputSearch.addEventListener('input', () => search(heroes));
}




