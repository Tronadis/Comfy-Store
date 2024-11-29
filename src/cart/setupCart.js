// import
import { getStorageItem, setStorageItem, formatPrice, getElement } from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items
const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart');

export const addToCart = (id) => {
	let item = cart.find((cartItem) => cartItem.id === id);
	if (!item) {
		let product = findProduct(id);
		// add item to the cart:
		product = { ...product, amount: 1 };
		cart = [...cart, product];
		// add item to the DOM:
		addToCartDOM(product);
	} else {
		// alert(`You have already added this to your cart.`);
		// update values
		const amount = increaseAmount(id);
		const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
		const newAmount = items.find((value) => value.dataset.id === id);
		newAmount.textContent = amount;
	}
	displayCartItemCount();
	displayCartTotal();
	setStorageItem('cart', cart);
	openCart();
};
function displayCartItemCount() {
	const amount = cart.reduce((total, cartItem) => {
		return (total += cartItem.amount);
	}, 0);
	cartItemCountDOM.textContent = amount;
}
function displayCartTotal() {
	let total = cart.reduce((total, cartItem) => {
		return (total += cartItem.price * cartItem.amount);
	}, 0);
	cartTotalDOM.textContent = `Total: ${formatPrice(total)}`;
}
function displayCartItemsDOM() {
	cart.forEach((cartItem) => addToCartDOM(cartItem));
}
function removeItem(ID) {
	cart = cart.filter((cartItem) => cartItem.id !== ID);
}
function increaseAmount(id) {
	let newAmount;
	cart = cart.map((cartItem) => {
		if (cartItem.id === id) {
			newAmount = cartItem.amount + 1;
			cartItem = { ...cartItem, amount: newAmount };
		}
		return cartItem;
	});
	return newAmount;
}
function decreaseAmount(id) {
	let newAmount;
	cart = cart.map((cartItem) => {
		if (cartItem.id === id) {
			newAmount = cartItem.amount - 1;
			cartItem = { ...cartItem, amount: newAmount };
		}
		return cartItem;
	});
	return newAmount;
}
function setupCartFunctionality() {
	cartItemsDOM.addEventListener('click', (e) => {
		const element = e.target;
		const parent = e.target.parentElement;
		const ID = e.target.dataset.id;
		const parentID = e.target.parentElement.dataset.id;
		if (element.classList.contains('cart-item-remove-btn')) {
			removeItem(ID);
			parent.parentElement.remove();
		}
		if (parent.classList.contains('cart-item-increase')) {
			const newAmount = increaseAmount(parentID);
			parent.nextElementSibling.textContent = newAmount;
		}
		if (parent.classList.contains('cart-item-decrease')) {
			const newAmount = decreaseAmount(parentID);
			if (newAmount === 0) {
				removeItem(parentID);
				parent.parentElement.parentElement.remove();
			} else {
				parent.previousElementSibling.textContent = newAmount;
			}
		}
		displayCartItemCount();
		displayCartTotal();
		setStorageItem('cart', cart);
	});
}

const init = () => {
	displayCartItemCount();
	displayCartTotal();
	displayCartItemsDOM();
	setupCartFunctionality();
};
init();
