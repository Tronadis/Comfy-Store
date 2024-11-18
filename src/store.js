import { getStorageItem, setStorageItem } from './utils.js';
let store = [];
const setupStore = (products) => {
	store = products.map((product) => {
		const {
			id,
			fields: { company, colors, featured, price, name, image: img },
		} = product;
		const image = img[0].thumbnails.large.url;
		return { id, company, colors, featured, price, name, image };
	});
};
const findProduct = () => {};
export { store, setupStore, findProduct };
