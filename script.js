const MENU = document.querySelector('.menu__list');
const TABS = document.querySelector('.links');
const BUTTON = document.getElementById('send');
const CLOSE_BUTTON = document.getElementById('close-btn');
const IMAGE = document.querySelector('.portfolio__box');


MENU.addEventListener('click', (event) => {
    MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
});

TABS.addEventListener('click', (event) => {
    TABS.querySelectorAll('a').forEach(el => el.classList.remove('active_link'));
    event.target.classList.add('active_link');
});

BUTTON.addEventListener('click', () => {
    const subject = document.getElementById('subject').value.toString();
    const descr = document.getElementById('descr').value.toString();

    if (subject == "Singolo" || subject == "singolo") {
    document.getElementById('result').innerText = `Subject: ${subject}`;
    } else {
    document.getElementById('result').innerText = "Without subject";  
    }

    if (descr == "Portfolio project" || descr == "portfolio project") {
        document.getElementById('resultsec').innerText = `Description: ${descr}`;    
    } else {
        document.getElementById('resultsec').innerText = "Without description";    
    }
    document.getElementById('modal').classList.remove('hidden');
});

CLOSE_BUTTON.addEventListener('click', () => {
    document.getElementById('result').innerText = '';
    document.getElementById('modal').classList.add('hidden');
});

IMAGE.addEventListener('click', (event) => {
    IMAGE.querySelectorAll('img').forEach(el => el.classList.remove('border-img'));
    event.target.classList.add('border-img');
});