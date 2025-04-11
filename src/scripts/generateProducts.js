import { PATH_DB } from '../constants/index.js';
import fs from 'node:fs/promises';
import { createFakeProduct } from '../utils/createFakeProduct.js';

const generateProducts = async (number) => {
  try {
    const productData = await fs.readFile(PATH_DB, 'utf-8');
    const productList = JSON.parse(productData);
    const newProductList = Array(number).fill(0).map(createFakeProduct);
    const mergedProductList = [...productList, ...newProductList];
    await fs.writeFile(PATH_DB, JSON.stringify(mergedProductList, null, 2));
  } catch (error) {
    console.error(error);
  }
};

generateProducts(5);
