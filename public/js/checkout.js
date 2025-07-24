const apiPath = '/api/products'
let cart = [];
let data = sessionStorage.getItem('cart');

console.log(data);

async function fetchData(apiPath) {
    try {
        const response = await fetch(apiPath)
        const data = await response.json();
        if (!response.ok) {
            console.log('Something wrong', response.status);
        }
        return data;
    } catch (error) {
        console.log('Something wrong: ', error.message)
    }
}
function getCart() {
    const data = sessionStorage.getItem('cart');
    if (!data) return [];
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error('Hibás cart adat:', e.message);
        return [];
    }
}
async function showProducts(){
    const container = document.createElement('div');
    document.body.appendChild(container);
    container.id = 'container';
    const products = getCart();
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <p><strong>Description:</strong> ${product.description}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> ${product.price} Ft</p>
            <p><strong>Rating:</strong> ${product.rating} ⭐</p>
            <p class="${product.inStock ? 'in-stock' : 'out-of-stock'}">
                ${product.inStock ? 'In-Stock' : 'Not In-Stock'}
            </p>
        `;
        container.appendChild(productDiv);
    });
    console.log(data);
}
document.addEventListener('DOMContentLoaded', async () => {
    await showProducts();
});