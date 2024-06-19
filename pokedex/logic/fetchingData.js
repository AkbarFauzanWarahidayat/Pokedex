const showResponseMessage = (message = 'Internet terputus') => {
    alert(message);
};


const getData = () => {
    fetch('https://pokeapi.co/api/v2/pokemon/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            }
        })
        .then(response =>{
            return response.json();
        })
        .then(responseJson => {
            renderPokemon(responseJson);
            logikaPagination(responseJson);
        })
        .catch(error => {
            console.error(`There was an error fetching data: ${error}`);
            showResponseMessage(error);
        });
};

const renderPokemon = (pokemon) => {
    const { results } = pokemon;

    const divContainerGridPokemon = document.querySelector('.container-grid-pokemon');
    divContainerGridPokemon.innerHTML = '';

    results.forEach(pokemon => {
        const divContainerItemListPokemon = document.createElement('div');
        divContainerItemListPokemon.setAttribute('class', 'container-item-list-pokemon');

        divContainerItemListPokemon.innerHTML = `
            <div class="gambar-pokedex">
                <img src="./images/pngwing.com.png" alt="">
            </div>
            <div class="nama-pokemon">
                <h4>${pokemon.name}</h4>
                <button class="buttonPilih" id="${pokemon.url}">I choose you!</button>
            </div>
        `;

        divContainerGridPokemon.appendChild(divContainerItemListPokemon);
    });

    const buttonPilih = document.querySelectorAll('.buttonPilih');
    buttonPilih.forEach(buttonPilih => {
        buttonPilih.addEventListener('click', (event) =>{
            const buttonId = event.target.id;
            console.log(`${buttonId} dipilih`);

            getDetailPokemon(buttonId);
        });
    });
};

const getDetailPokemon = (buttonId)  =>{
    fetch(buttonId)
    .then(response =>{
        return response.json();
    })
    .then(responseJson =>{
        console.log(responseJson);
        renderDetailPokemon(responseJson);
    })
    .catch(error => {
        console.error(`There was an error fetching data: ${error}`);
        showResponseMessage(error);
    });
};

const renderDetailPokemon = (pokemonDetail) =>{

    // api shortcut
    const namaPokemonDetail = pokemonDetail.name;
    const gambarPokemonDetail = pokemonDetail.sprites.other.dream_world.front_default
    // api shortcut end

    // background gradiasi
    const body = document.querySelector('body');
    body.style.fontFamily = '"Open Sans", sans-serif';
    body.style.backgroundColor = '#4158D0';
    body.style.backgroundImage = 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)';
    body.style.height = '100vh';
    // background gradiasi end
    
    // setup hapus biar clear 
    const sectionlistpokemon = document.querySelector('.section-list-pokemon');
    const sectionheropokemon = document.querySelector('.section-hero-pokemon');
    sectionheropokemon.style.display = 'none';
    sectionlistpokemon.style.display = 'none';
    // setup hapus end

    const sectionDetailPokemon = document.querySelector('.section-detail-pokemon');
    sectionDetailPokemon.innerHTML = `
        <div class="container-detail-pokemon">
            <div class="container-nama">               
                <h1>${namaPokemonDetail}</h1>
                <h3>maintance</h3>
            </div>

            <div class="grid-detail-pokemon">
                <div class="gambar-detail-pokemon">
                    <img src="${gambarPokemonDetail}" id="gambarDetail"></img>
                </div>
                
                <div class="desc-detail-pokemon">
                    <p>maintance</p>
                </div>
            </div>
        </div>
    `;
    


     // logika loading
     const header = document.querySelector('header');
     const main = document.querySelector('main');
     const footer = document.querySelector('footer');
     const pokemonLoader = document.querySelector('.pokemon-loader');
 
     header.style.display = 'none';
     main.style.display = 'none';
     footer.style.display = 'none';
     pokemonLoader.removeAttribute('hidden');
 
     setTimeout(() =>{
         header.style.display = 'inline';
         main.style.display = 'block';
         footer.style.display = 'block';
         pokemonLoader.style.display = 'none';
     }, 500);

     window.scrollTo({
        top: 0,
        behavior: 'smooth', // untuk animasi smooth scroll
      });
     // logika loading end

};


const logikaPagination = (pokemon) => {
    const { next, previous } = pokemon;

    const nextPagination = document.querySelector('.next-pagination');
    const previousPagination = document.querySelector('.previous-pagination');

    // Clear previous event listeners
    const newNextPagination = nextPagination.cloneNode(true);
    const newPreviousPagination = previousPagination.cloneNode(true);

    nextPagination.parentNode.replaceChild(newNextPagination, nextPagination);
    previousPagination.parentNode.replaceChild(newPreviousPagination, previousPagination);

    if (next) {
        newNextPagination.addEventListener('click', () => {
            fetch(next)
                .then(response =>{
                    return response.json();
                })
                .then(responseJson => {
                    renderPokemon(responseJson);
                    logikaPagination(responseJson);
                    console.log(responseJson);
                })
                .catch(error => {
                    console.error(`There was an error fetching next page: ${error}`);
                    showResponseMessage(error);
                });
        });
    }

    if (previous) {
        newPreviousPagination.addEventListener('click', () => {
            fetch(previous)
                .then(response =>{
                    return response.json();
                })
                .then(responseJson => {
                    renderPokemon(responseJson);
                    logikaPagination(responseJson);
                })
                .catch(error => {
                    console.error(`There was an error fetching previous page: ${error}`);
                    showResponseMessage(error);
                });
        });
    }
};

export {getData, getDetailPokemon};
