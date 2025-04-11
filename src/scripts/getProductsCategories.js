import { PATH_DB } from '../constants/index.js';
import fs from 'node:fs/promises';

const getProductsCategories = async () => {
  try {
    const productData = await fs.readFile(PATH_DB, 'utf-8');
    const productList = JSON.parse(productData);
    const productsCategories = productList.map(({ category }) => category);
    const uniqCategories = productsCategories.filter(
      (category, i, array) => array.indexOf(category) === i
    );
    console.log(uniqCategories);
  } catch (error) {
    console.error(error);
  }
};

getProductsCategories();