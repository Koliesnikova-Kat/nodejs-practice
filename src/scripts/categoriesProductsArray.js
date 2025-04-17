import { PATH_DB } from '../constants/index.js';
import fs from 'node:fs/promises';

const categoriesProductsArray = async () => {
  const productData = await fs.readFile(PATH_DB, 'utf-8');
  const productList = JSON.parse(productData);

  const categoryMap = productList.reduce((acc, product) => {
    const { category, name } = product;
    
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(name);
    return acc;
  }, {});
  for (const category in categoryMap) {
    categoryMap[category] = categoryMap[category].join(', ');
  }
  console.log(categoryMap);
};

categoriesProductsArray();