const MENU = document.querySelector('.menu__list');
const NAV = document.querySelector('.menu');
const TABS = document.querySelector('.links');
const BUTTON = document.getElementById('send');
const CLOSE_BUTTON = document.getElementById('close-btn');
const IMAGE = document.querySelector('.portfolio__box');
const nodelist = document.querySelectorAll('.portfolio__box img');
const nodelistToArray = Array.apply(null, nodelist);
const phoneBg = document.querySelector('.description');
const BURGER = document.querySelector('.burger');
const LOGO = document.querySelector('.logo')
// MENU.addEventListener('click', (event) => {
//     MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
//     event.target.classList.add('active');
// });

TABS.addEventListener('click', (event) => {
    TABS.querySelectorAll('a').forEach(el => el.classList.remove('active_link'));
    event.target.classList.add('active_link');
    nodelistToArray.reverse();
    console.log(nodelistToArray);
});

BUTTON.addEventListener('click', (evt) => {
    const subject = document.getElementById('subject').value.toString();
    const descr = document.getElementById('descr').value.toString();

	evt.preventDefault();

    if (subject == "" || subject === undefined) {
        document.getElementById('result').innerText = "Without subject";
    } else {
        document.getElementById('result').innerText = `Subject: ${subject}`; 
    }

    if (descr == "" || descr === undefined) {
        document.getElementById('resultsec').innerText = "Without description";  
    } else {
        document.getElementById('resultsec').innerText = `Description: ${descr}`;    
    }
    document.getElementById('modal').classList.remove('hidden');
});

CLOSE_BUTTON.addEventListener('click', () => {
    document.getElementById('subject').innerText = "";
    document.getElementById('descr').innerText = "";
    document.getElementById("get-quote").reset();
    document.getElementById('modal').classList.add('hidden');
});

IMAGE.addEventListener('click', (event) => {
    IMAGE.querySelectorAll('img').forEach(el => el.classList.remove('border-img'));
    event.target.classList.add('border-img');
    IMAGE.classList.remove('border-img');
});


document.addEventListener('scroll', onScroll);

function onScroll(event) {
    const curPos = window.scrollY;
    const sect = document.querySelectorAll('.wrapper > section');
    const links = document.querySelectorAll('.menu__list a');

    sect.forEach((el) => {
        if (el.offsetTop - 150 <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {
           links.forEach((a) => {
            a.classList.remove('active');
            if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                a.classList.add('active');
            }
           }) 
        }
    });

}

//phone black BG
phoneBg.addEventListener('click', (event) => {
    let phoneBlack = document.querySelector('.black');
    let phoneBlack2 = document.querySelector('.black2');
	let phoneBlack3 = document.querySelector('.black3');
	
    if (event.target.className == "project-image phone") {
        phoneBlack.classList.toggle('db');
    } else if (event.target.className == "project-image phone2") {
        phoneBlack2.classList.toggle('db');
    } else if (event.target.className == "project-image") {
        phoneBlack3.classList.toggle('db');
    }
});


//slider
let items = document.querySelectorAll('.slider .slide');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('show', direction);
        document.querySelector('.home').classList.remove('blue');
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('show');
        isEnabled = true;
        document.querySelector('.home').classList.add('blue');
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.control.left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.control.right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});

const swipedetect = (el) => {
  
	let surface = el;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;
	let startTime = 0;
	let elapsedTime = 0;

	let threshold = 150;
	let restraint = 100;
	let allowedTime = 300;

	surface.addEventListener('mousedown', function(e){
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	}, false);

	surface.addEventListener('mouseup', function(e){
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime){
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				if ((distX > 0)) {
					if (isEnabled) {
						previousItem(currentItem);
					}
				} else {
					if (isEnabled) {
						nextItem(currentItem);
					}
				}
			}
		}
		e.preventDefault();
	}, false);

	surface.addEventListener('touchstart', function(e){
		if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
			if (e.target.classList.contains('left')) {
				if (isEnabled) {
					previousItem(currentItem);
				}
			} else {
				if (isEnabled) {
					nextItem(currentItem);
				}
			}
		}
			var touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime();
			e.preventDefault();
	}, false);

	surface.addEventListener('touchmove', function(e){
			e.preventDefault();
	}, false);

	surface.addEventListener('touchend', function(e){
			var touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX;
			distY = touchobj.pageY - startY;
			elapsedTime = new Date().getTime() - startTime;
			if (elapsedTime <= allowedTime){
					if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
							if ((distX > 0)) {
								if (isEnabled) {
									previousItem(currentItem);
								}
							} else {
								if (isEnabled) {
									nextItem(currentItem);
								}
							}
					}
			}
			e.preventDefault();
	}, false);
}

var el = document.querySelector('.slider');
swipedetect(el);


// burger

BURGER.addEventListener('click', function() {
	BURGER.classList.toggle('active-burger');
	NAV.classList.toggle('active-burger');
	MENU.classList.toggle('active-burger');
	LOGO.classList.toggle('active-burger');
});