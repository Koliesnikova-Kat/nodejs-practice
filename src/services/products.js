import { ProductsCollection } from '../db/models/Product.js';

export const getAllProducts = () => ProductsCollection.find();

export const getProductById = (productId) =>
  ProductsCollection.findById(productId);

export const createProduct = (payload) => ProductsCollection.create(payload);

// export const updateProduct = (productId, payload) =>
//   ProductsCollection.findOneAndUpdate(productId, payload, { new: true });

export const updateProduct = async (productId, payload, options = {}) => {
  const rawResult = await ProductsCollection.findOneAndUpdate(
    { _id: productId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    product: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteProduct = (productId) =>
  ProductsCollection.findOneAndDelete({ _id: productId });
