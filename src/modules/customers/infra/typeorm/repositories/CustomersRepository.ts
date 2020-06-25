import { getRepository, Repository } from 'typeorm';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import Customer from '../entities/Customer';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create({ name, email }: ICreateCustomerDTO): Promise<Customer> {
    const customerCreate = this.ormRepository.create({
      name,
      email,
    });

    await this.ormRepository.save(customerCreate);

    return customerCreate;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customerId = await this.ormRepository.findOne(id);

    return customerId;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customerEmail = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return customerEmail;
  }
}

export default CustomersRepository;
