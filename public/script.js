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
        available.classList.add("available");
        available.textContent = product.inStock ? '✅ Available' : '❌ Not available';

        article.append(name, description, price, category, rating, available);
        productList.appendChild(article);
    });
}

function addCartButtons(products) {
    const articles = document.querySelectorAll('#product-list article');
  
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      cart = JSON.parse(storedCart);
    }
  
    articles.forEach((article, index) => {
      const product = products[index];
  
      const button = document.createElement('button');
      button.textContent = 'Add to cart';
  
      button.addEventListener('click', (event) => {
        const availability = article.querySelector('.available');
  
        if (availability && availability.textContent.includes('Available')) {
          cart.push(product);
          sessionStorage.setItem('cart', JSON.stringify(cart));
          updateCartDisplay();
        } else {
          alert('This product is not available.');
        }
      });
  
      article.appendChild(button);
    });
  }  

function updateCartDisplay() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';
    let cartSum = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} – ${item.price} HUF`;
        cartList.appendChild(li);
        cartSum += item.price;
    });

    document.getElementById('cart-sum').textContent = cartSum;
}

function removeFromCart(){
    const button = document.getElementById('clear-btn');
    button.addEventListener('click', () => {
        cart = [];
        updateCartDisplay();
        sessionStorage.clear();
        sessionStorage.setItem('cart', JSON.stringify(cart));
    });
}

async function main() {
const products = await fetchData(apiPath);

renderProducts(products);
addCartButtons(products);
updateCartDisplay();
removeFromCart();

}

window.addEventListener("load", main);
