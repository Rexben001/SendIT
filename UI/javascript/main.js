document.getElementById("toggle").addEventListener('click', () => {
    let menu = document.getElementById("active");
    if(menu.style.display == 'block'){
        menu.style.display = 'none';
    }else{
        menu.style.display = 'block';
    }
});
