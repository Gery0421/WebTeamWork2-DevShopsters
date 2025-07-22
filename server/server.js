import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routes/routes.js';

const PORT = 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/products', productsRouter);



app.listen(PORT, () => {
    console.log(`Your server is running on: http://localhost:${PORT}`);
});
