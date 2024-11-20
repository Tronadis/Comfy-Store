import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupSearch = (store) => {
	const form = getElement('.input-form');
	const nameInput = getElement('.search-input');
	form.addEventListener('keyup', () => {
		const value = nameInput.value;
		if (value) {
			const matchingByName = store.filter((product) => {
				let { name } = product;
				name = name.toLowerCase();
				if (name.startsWith(value)) return product;
			});
			display(matchingByName, getElement('.products-container'));
			if (matchingByName.length < 1) {
				const products = getElement('.products-container');
				products.innerHTML = /*html*/ `
                    <h3>Sorry, we do not have this right now.</h3>`;
			}
		}
		if (!value) display(store, getElement('.products-container'));
	});
};

export default setupSearch;
