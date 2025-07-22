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