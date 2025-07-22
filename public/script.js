const apiPath = '/api/products'

async function fetchData(apiPath) {
    try {
        const response = await fetch(apiPath)
        const data = await response.json();
        if (!response.ok) {
            console.log('Something wrong', response.status);
        }
        console.log(data);
        return data;
    } catch (error) {
        console.log('Something wrong: ', error.message)
    }
}

function renderProducts(products) {
    const productList = document.getElementById('product-list');

    products.forEach(product => {
        const article = document.createElement("article");
        
        const name = document.createElement("h2");
        name.textContent = product.name;
        
        const description = document.createElement("p");
        description.textContent = product.description;
        
        const price = document.createElement("p");
        price.textContent = `Price: ${product.price} HUF`;
        
        const category = document.createElement("p");
        category.textContent = `Category: ${product.category}`;
        
        const rating = document.createElement("p");
        rating.textContent = `Rating: ${product.rating}`;
        
        const available = document.createElement("p");
        available.textContent = product.inStock ? '✅ Available' : '❌ Not available';
        
        const button = document.createElement('button');
        button.innerText = 'Add to cart';

        article.append(name, description, price, category, rating, available, button);
        productList.appendChild(article);
    });
}

async function main() {
const products = await fetchData(apiPath)

renderProducts(products);
    
}

window.addEventListener("load", main)