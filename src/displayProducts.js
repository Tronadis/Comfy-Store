import { formatPrice } from './utils.js';
import { addToCart } from './cart/setupCart.js';
const display = (products, element, filters) => {
	element.innerHTML = products
		.map((product) => {
			const { id, image, name, price } = product;
			return /*html*/ `
            <article class="product">
				<div class="product-container">
					<img src="${image}" alt="${name}" class="product-img img" />
						<div class="product-icons">
							<a href="product.html?id=${id}" class="product-icon"><i class="fas fa-search"></i></a>
							<button class="product-cart-btn product-icon" data-id="${id}"><i class="fas fa-shopping-cart"></i></button>
						</div>
					</div>
				<footer>
					<p class="product-name">${name}</p>
					<h4 class="product-price">${formatPrice(price)}</h4>
				</footer>
			</article>`;
		})
		.join('');
	if (filters) return;
	element.addEventListener('click', (e) => {
		const parent = e.target.parentElement;
		if (parent.classList.contains('product-cart-btn')) addToCart(parent.dataset.id);
	});
};

export default display;
