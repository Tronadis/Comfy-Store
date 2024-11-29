// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

//  filter imports
import setupSearch from '../filters/search.js';
import setupCompanies from '../filters/companies.js';
import setupPrice from '../filters/price.js';

// specific imports
import fetchProducts from '../fetchProducts.js';
import { setupStore, store } from '../store.js';
import display from '../displayProducts.js';
import { getElement } from '../utils.js';

const init = async () => {
	const loading = getElement('.page-loading');

	if (store.length < 1) {
		const products = await fetchProducts();
		setupStore(products);
	}

	const nameInput = getElement('.search-input');
	nameInput.value = ''; // fixes Firefox
	display(store, getElement('.products-container'));
	setupSearch(store);
	setupCompanies(store);
	setupPrice(store);
	loading.style.display = 'none';
};

init();
