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

