// public/js/index.js - supports admin.html
async function fetchProducts() {
  try {
  const response = await fetch('/api/products');
 
  if (!response.ok) {
  throw new Error(`HTTP error. Status: ${response.status}`);
  }
  
  const products = await response.json();
  renderProducts(products)
  } catch (error) {
    console.log('Error');
    const div = document.getElementById('product-list');
    div.innerHTML = '<p style="color: red;">Failed to load product list. Please try again later.</p>';
    
  }
}

function renderProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  products.forEach(product => {
    const productEntryDiv = document.createElement('div');
    productEntryDiv.classList.add('product-entry');

    const productTextSpan = document.createElement('span');
    productTextSpan.textContent = `${product.name}`;
    productTextSpan.classList.add('product-details');

    // BUTTONS: Edit and Delete buttons
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('product-edit-button');
    // TODO: here should be the Edit button eventlistener! - completed
    editButton.addEventListener('click', async () => {
      console.log(`Edit button is clicked for editing: '${product.name}' (ID: ${product.id})`);
      showEditModal(product);
    })

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('product-delete-btn');
    // TODO: here should be the Delete buttons eventlistener! - completed
    deleteButton.addEventListener('click', () => {
      console.log(`Delete button is clicked for editing: '${product.name}' (ID: ${product.id})`);
      showDeleteModal(product);
    })

    productEntryDiv.appendChild(productTextSpan);
    productEntryDiv.appendChild(editButton);
    productEntryDiv.appendChild(deleteButton);

    productList.appendChild(productEntryDiv)
  });
}

// edit button modularis form 
function createEditModal() {
  const modal = document.createElement('div');
  modal.id = 'edit-modal';
  modal.style.display = 'none';
  modal.style.position = 'fixed';
  modal.style.top = 0;
  modal.style.left = 0;
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';

  modal.innerHTML = `
    <div style="background-color: white; padding: 20px; border-radius: 8px; width: 300px;">
      <h3>Edit Product</h3>
      <form id="edit-form">
        <input type="hidden" id="edit-id">
        <label>Name:</label><br>
        <input type="text" id="edit-name"><br><br>
        <label>Price:</label><br>
        <input type="number" id="edit-price"><br><br>
        <button type="submit">Save</button>
        <button type="button" id="edit-cancel">Cancel</button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);
}

function showEditModal(product) {
  document.getElementById('edit-id').value = product.id;
  document.getElementById('edit-name').value = product.name;
  document.getElementById('edit-price').value = product.price;
  document.getElementById('edit-modal').style.display = 'flex';
}

function hideEditModal() {
  document.getElementById('edit-modal').style.display = 'none';
}

async function handleEditSubmit(event) {
  event.preventDefault();

  const updatedProduct = {
    id: document.getElementById('edit-id').value,
    name: document.getElementById('edit-name').value,
    price: parseFloat(document.getElementById('edit-price').value)
  };
  console.log(updatedProduct);
  

  try {
    const response = await fetch(`/api/products/${updatedProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    });

    if (!response.ok) {
      throw new Error('Update failed');
    }

    await fetchProducts();
    hideEditModal();

  } catch (err) {
    console.error('Update error:', err);
  }
}

function initEditModal() {
  createEditModal();

  document.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'edit-form') {
      handleEditSubmit(e);
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'edit-cancel') {
      hideEditModal();
    }
  });
}
// delete button modular form
function createDeleteModal() {
  const modal = document.createElement('div');
  modal.id = 'delete-modal';
  modal.style.display = 'none';
  modal.style.position = 'fixed';
  modal.style.top = 0;
  modal.style.left = 0;
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';

  modal.innerHTML = `
    <div style="background-color: white; padding: 20px; border-radius: 8px; width: 300px;">
      <h3>Confirm Delete</h3>
      <p id="delete-message"></p>
      <div style="display: flex; justify-content: space-between;">
        <button id="delete-confirm">Delete</button>
        <button id="delete-cancel">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

function showDeleteModal(product) {
  const message = document.getElementById('delete-message');
  message.textContent = `Are you sure you want to delete "${product.name}" (ID: ${product.id})?`;
  document.getElementById('delete-modal').dataset.productId = product.id;
  document.getElementById('delete-modal').style.display = 'flex';
}

function hideDeleteModal() {
  document.getElementById('delete-modal').style.display = 'none';
}

async function handleDeleteProduct(productId) {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Delete failed');
    }

    await fetchProducts();
    hideDeleteModal();

  } catch (error) {
    console.error('Delete error:', error);
  }
}

function initDeleteModal() {
  createDeleteModal();

  document.addEventListener('click', function (e) {
    if (e.target.id === 'delete-cancel') {
      hideDeleteModal();
    }

    if (e.target.id === 'delete-confirm') {
      const modal = document.getElementById('delete-modal');
      const productId = modal.dataset.productId;
      handleDeleteProduct(productId);
    }
  });
}
// add button modular form
function createAddModal() {
  const modal = document.createElement('div');
  modal.id = 'add-modal';
  modal.style.display = 'none';
  modal.style.position = 'fixed';
  modal.style.top = 0;
  modal.style.left = 0;
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';

  modal.innerHTML = `
    <div style="background-color: white; padding: 20px; border-radius: 8px; width: 320px; max-height: 90vh; overflow-y: auto;">
      <h3>Add New Product</h3>
      <form id="add-form">
        <label>Name:</label><br>
        <input type="text" id="add-name" required><br><br>

        <label>Description:</label><br>
        <textarea id="add-description" rows="3" required></textarea><br><br>

        <label>Price:</label><br>
        <input type="number" id="add-price" min="0" step="0.01" required><br><br>

        <label>Category:</label><br>
        <input type="text" id="add-category" required><br><br>

        <label>Stock:</label><br>
        <input type="number" id="add-stock" min="0" required><br><br>

        <label>Image URL:</label><br>
        <input type="text" id="add-image" required><br><br>

        <label>Active:</label>
        <input type="checkbox" id="add-active" checked><br><br>

        <button type="submit">Add</button>
        <button type="button" id="add-cancel">Cancel</button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);
}

async function handleAddSubmit(event) {
  event.preventDefault();

  const newProduct = {
    name: document.getElementById('add-name').value.trim(),
    description: document.getElementById('add-description').value.trim(),
    price: parseFloat(document.getElementById('add-price').value),
    category: document.getElementById('add-category').value.trim(),
    stock: parseInt(document.getElementById('add-stock').value),
    image: document.getElementById('add-image').value.trim(),
    active: document.getElementById('add-active').checked
  };
  console.log('Küldött termék:', newProduct);
  try {
    console.log('Küldött termék:', newProduct);
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });

    if (!response.ok) {
      throw new Error('Add failed');
    }

    await fetchProducts();
    hideAddModal();

  } catch (error) {
    console.error('Add product error:', error);
  }
}
function initAddModal() {
  createAddModal();

  document.getElementById('add-button').addEventListener('click', () => {
    document.getElementById('add-modal').style.display = 'flex';
  });

  document.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'add-form') {
      handleAddSubmit(e);
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'add-cancel') {
      hideAddModal();
    }
  });
}

function hideAddModal() {
  document.getElementById('add-modal').style.display = 'none';
}


document.addEventListener('DOMContentLoaded', async () => {
  initEditModal();  
  initDeleteModal()
  initAddModal();
  await fetchProducts()
})
