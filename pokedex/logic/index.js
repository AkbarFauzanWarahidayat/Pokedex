import navMenuLogic from "./navMenuLogic.js";
import { getData } from "./fetchingData.js";

document.addEventListener('DOMContentLoaded', () =>{
    navMenuLogic();
    getData();

    // logika logo dipencet
    const logoPokemon = document.querySelector('.logoPokemon');
    logoPokemon.addEventListener('click', () =>{
        window.location.href = 'home.html';
    });
    // logika logo dipencet
});