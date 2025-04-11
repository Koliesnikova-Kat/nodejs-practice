import { PATH_DB } from '../constants/index.js';
import fs from 'node:fs/promises';

const modifyProducts = async () => {
  try {
    const productData = await fs.readFile(PATH_DB, 'utf-8');
    const productList = JSON.parse(productData);
    const modifiedProducts = productList.map(
      ({ description, ...product }) => product
    );
    const modifiedProductList = JSON.stringify(modifiedProducts, null, 2);
    await fs.writeFile(PATH_DB, modifiedProductList);
  } catch (error) {
    console.error(error);
  }
};

modifyProducts();
