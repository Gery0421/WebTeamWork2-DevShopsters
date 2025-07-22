import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '..', 'data', 'products.json');

export async function getAllProducts(req, res) {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        const products = JSON.parse(data);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Something wrong...' });
    }
}

export async function addNewProduct(req, res) {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        const products = await JSON.parse(data);

        const newId = products[products.length-1].id + 1;
        const newProduct = { id: newId, ...req.body };

        if (!newProduct.name || !newProduct.price || !newProduct.inStock) {
            return res.status(400).json({ error: 'Name, Price and inStock are required!'});
        }


        products.push(newProduct);


        await fs.writeFile(dataPath, JSON.stringify(products, null, 2));

        res.status(201).json(newProduct);

    } catch (error) {
        res.status(500).json({ error: 'Failed to add product...' });
    }
}

export async function deleteProduct(req, res) {
    try {
    const index = req.params.id;
    const data = await fs.readFile(dataPath, 'utf-8');
    const products = await JSON.parse(data);
    const productId = products.findIndex(product => product.id === index);

    if (productId + 1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const deleted = products.splice(productId, 1)[0];

    await fs.writeFile(dataPath, JSON.stringify(products, null, 2));

    res.status(200).json({
        message: 'Product deleted',
        deleteProduct: deleted,
    });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
}

export async function editProduct(req, res) {
    try {
    const id = req.params.id;

    const data = await fs.readFile(dataPath, 'utf-8');
    const products = await JSON.parse(data);
    const productId = products.findIndex(product => product.id === id);
    const updatedProduct = {...products[productId + 1], ...req.body};

    console.log(products[productId + 1]);

    products[productId + 1] = updatedProduct;

    await fs.writeFile(dataPath, JSON.stringify(products, null, 2));

    res.status(200).json({
        message: 'Product updated',
        updatedProduct
    });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product!'})
    }
}