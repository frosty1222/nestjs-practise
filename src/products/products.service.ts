import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dto/ProductDto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ){

    }
    findAll(): Promise<Product[]> {
        return this.productRepository.find({ relations: ['products'] });
      }
    
    async findOne(id: number): Promise<Product> {
        const category = await this.productRepository.findOne({ where: { id }, relations: ['products'] });
        if (!category) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return category;
    }
    
      async create(Category: Product): Promise<void> {
        await this.productRepository.save(Category);
      }
      async update(id: number, updateProductDto: ProductDto): Promise<ProductDto> {
        const category = await this.productRepository.findOne({ where: { id } });
        if (!category) {
          throw new NotFoundException('Product not found');
        }
    
        Object.assign(category, updateProductDto);
        return this.productRepository.save(category);
      }
      
      async delete(id: number): Promise<void> {
        await this.productRepository.delete(id);
      }
}
