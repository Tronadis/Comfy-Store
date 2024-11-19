import { getStorageItem, setStorageItem } from './utils.js';
import fetchProducts from './fetchProducts.js';

let store = getStorageItem('store');
const setupStore = (products) => {
	if (!products) products = fetchProducts();
	store = products.map((product) => {
		const {
			id,
			fields: { company, colors, featured, price, name, image: img },
		} = product;
		const image = img[0].thumbnails.large.url;
		return { id, company, colors, featured, price, name, image };
	});
	setStorageItem('store', store);
};

const findProduct = () => {};
export { store, setupStore, findProduct };
