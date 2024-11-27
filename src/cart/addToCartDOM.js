import { formatPrice, getElement } from '../utils.js';

const cartItemsDOM = getElement('.cart-items');

const addToCartDOM = ({ id, name, price, image, amount }) => {
	const article = document.createElement('article');
	article.classList.add('cart-item');
	article.setAttribute('data-id', id);
	article.innerHTML = /*html*/ `
		<img src="${image}" alt="${name}" class="cart-item-img" />
		<div>
			<h4 class="cart-item-name">${name}</h4>
			<p class="cart-item-price">${formatPrice(price)}</p>
			<button class="cart-item-remove-btn" data-id="${id}">remove</button>
		</div>
		<div>
			<button class="cart-item-increase" data-id="${id}"><i class="fas fa-chevron-up"></i></button>
			<p class="cart-item-amount">${amount}</p>
			<button class="cart-item-decrease" data-id="${id}"><i class="fas fa-chevron-down"></i></button>
		</div>
	`;
	cartItemsDOM.appendChild(article);
};

export default addToCartDOM;
