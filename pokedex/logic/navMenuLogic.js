const navMenuLogic = () =>{
    // logika hamburger
    const main = document.querySelector('main');
    const hamburger = document.querySelector('.hamburger');
    const menuPhone = document.querySelector('.container-menu-untuk-phone');

    let menuOpen = false;

    hamburger.addEventListener('click', (event) =>{
        menuPhone.classList.toggle('open');
        
        menuOpen = !menuOpen;
        
        if (!menuOpen) {
            // Jika menuPhone ditutup, tambahkan kembali atribut 'hidden'
            menuPhone.setAttribute('hidden', true);
        } else {
            // Jika menuPhone dibuka, hapus atribut 'hidden'
            menuPhone.removeAttribute('hidden');
        }

        event.stopPropagation();
    });

    // main.addEventListener('click', (event) =>{
    //     menuPhone.classList.remove('open');
    //     menuOpen = !menuOpen;
        
    //     if (!menuOpen) {
    //         // Jika menuPhone ditutup, tambahkan kembali atribut 'hidden'
    //         menuPhone.setAttribute('hidden', true);
    //     } else {
    //         // Jika menuPhone dibuka, hapus atribut 'hidden'
    //         menuPhone.removeAttribute('hidden');
    //     }
    //     event.stopPropagation();
    // });
    // logika hamburger end
};

export default navMenuLogic;