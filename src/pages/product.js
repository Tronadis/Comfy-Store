// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';

// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
// const imgDOM = getElement('.single-product-img');
// const titleDOM = getElement('.single-product-title');
// const companyDOM = getElement('.single-product-company');
// const priceDOM = getElement('.single-product-price');
// const colorsDOM = getElement('.single-product-colors');
// const descDOM = getElement('.single-product-desc');
// const cartBtn = getElement('.addToCartBtn');

// cart product
let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded', async () => {
	const urlID = window.location.search; // `window.` isn't needed, it's implicit anyway.
	try {
		const response = await fetch(`${singleProductUrl}${urlID}`);
		if (response.status >= 200 && response.status <= 299) {
			const product = await response.json();
			const { id } = product;
			productID = id;
			const { image, name, company, price, colors, description } = product.fields;
			const { url: imageURL } = image[0].thumbnails.large;

			document.title = `${name.toUpperCase()} | Comfy`;
			pageTitleDOM.innerText = `Home / ${name}`;

			const colorsSpan = colors.map((item) => {
				return /*html*/ `<span class="product-color" style="background: ${item}"></span>`;
			}).join(`
                                `);
			centerDOM.innerHTML = /*html*/ `
                        <img src="${imageURL}" alt="${name}" class="single-product-img img" />
                        <article class="single-product-info">
                            <div>
                                <h2 class="single-product-title">${name}</h2>
                                <p class="single-product-company text-slanted">by ${company}</p>
                                <p class="single-product-price">${formatPrice(price)}</p>
                                <div class="single-product-colors">
                                    ${colorsSpan}
                                </div>
                                <p class="single-product-desc">
                                    ${description}.
                                </p>
                                <button class="addToCartBtn btn" data-id="${productID}">add to cart</button>
                            </div>
                        </article>     
            `;
			const cartBtn = getElement('.addToCartBtn');
			cartBtn.addEventListener('click', function () {
				addToCart(productID);
			});
		} else {
			console.log(response.status, response.statusText);
			centerDOM.innerHTML = /*html*/ `
                <div>
                    <h3>Sorry, something went wrong.</h3>
                    <a href="index.html" class="btn">back home</a>
                </div>`;
		}
	} catch (error) {
		console.log(error);
	}

	loading.style.display = 'none';
});
