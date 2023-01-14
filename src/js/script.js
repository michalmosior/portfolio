'use strict';

const burgerBtn = document.querySelector('.hamburger');
const menuLinks = document.querySelectorAll('.nav__menu-link');
const menuItems = document.querySelectorAll('.nav__menu-item');
const moreInfoButtons = document.querySelectorAll('.card__info-btn');
const aboutTextContainer = document.querySelector('.about__textbox');
const aboutCardsContainer = document.querySelector('.about__cards');
const projectsCards = document.querySelectorAll('.card');
const socialIcons = document.querySelectorAll('.contact__social-icon');
const options = {
	rootMargin: '-25px',
};

const toggleMenu = () => {
	const width = document.body.clientWidth;
	const menu = document.querySelector('.nav__menu');
	burgerBtn.classList.toggle('is-active');
	menu.classList.toggle('nav__menu--active');
	menuLinks.forEach((link) => {
		link.classList.toggle('nav__menu-link--active');
	});
	if (burgerBtn.classList.contains('is-active') && width <= 767) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = 'auto';
	}
};
burgerBtn.addEventListener('click', toggleMenu);
menuLinks.forEach((link) => {
	link.addEventListener('click', toggleMenu);
});

const showHiddenText = (e) => {
	const i = Number(e.target.dataset.index);
	const hiddenTexts = document.querySelectorAll('.card__hidden');
	hiddenTexts[i].classList.toggle('show');
	if (hiddenTexts[i].classList.contains('show')) {
		e.target.textContent = 'Close info';
	} else {
		e.target.textContent = 'More info';
	}
};
const aboutTextAnimation = (entry) => {
	const blurredTexts = document.querySelectorAll('.about__text--span');
	if (entry[0].isIntersecting) {
		blurredTexts.forEach((text) => {
			text.classList.add('unblur');
		});
	} else {
		blurredTexts.forEach((text) => {
			text.classList.remove('unblur');
		});
	}
};
const aboutCardsAnimation = (entry) => {
	const icons = document.querySelectorAll('.about__card');
	if (entry[0].isIntersecting) {
		icons.forEach((icon) => {
			icon.classList.add('big-icon');
		});
	} else {
		icons.forEach((icon) => {
			icon.classList.remove('big-icon');
		});
	}
};
const projectsCardsAnimation = (entries) => {
	for (const entry of entries) {
		if (entry.isIntersecting) {
			entry.target.classList.add('big-project-card');
		}
	}
};
const socialsIconsAnimation = (entries) => {
	for (const entry of entries) {
		if (entry.isIntersecting) {
			entry.target.classList.add('show-social-icon');
		}
	}
};
const aboutTextObserver = new IntersectionObserver(aboutTextAnimation, options);
aboutTextObserver.observe(aboutTextContainer);

const aboutCardsObserver = new IntersectionObserver(
	aboutCardsAnimation,
	options
);
aboutCardsObserver.observe(aboutCardsContainer);

const projectsCardsObserver = new IntersectionObserver(
	projectsCardsAnimation,
	options
);
projectsCards.forEach((card) => {
	projectsCardsObserver.observe(card);
});

const socialsIconsObserver = new IntersectionObserver(
	socialsIconsAnimation,
	options
);
socialIcons.forEach((icon) => {
	socialsIconsObserver.observe(icon);
});

moreInfoButtons.forEach((button) => {
	button.addEventListener('click', showHiddenText);
});
