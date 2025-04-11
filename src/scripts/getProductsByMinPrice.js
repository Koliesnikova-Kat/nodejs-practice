import { PATH_DB } from '../constants/index.js';
import fs from 'node:fs/promises';

const getProductsByMinPrice = async (price) => {
  try {
    const productData = await fs.readFile(PATH_DB, 'utf-8');
    const productList = JSON.parse(productData);
    const filteredProducts = productList.filter(product => product.price >= price);
    console.table(filteredProducts);
  } catch (error) {
    console.error(error);
  }
};

getProductsByMinPrice(300);