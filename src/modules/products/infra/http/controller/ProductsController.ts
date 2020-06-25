import { Request, Response } from 'express';

import CreateProductService from '@modules/products/services/CreateProductService';

import { container } from 'tsyringe';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const newProduct = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.json(newProduct);
  }
}
