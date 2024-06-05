import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CategoryDto } from './dtos/CategoryDto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ){

    }
    findAll(): Promise<Category[]> {
        return this.categoriesRepository.find({ relations: ['categories'] });
      }
    
    async findOne(id: number): Promise<Category> {
        const category = await this.categoriesRepository.findOne({ where: { id }, relations: ['categories'] });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }
    
      async create(Category: Category): Promise<void> {
        await this.categoriesRepository.save(Category);
      }
      async update(id: number, updateCategoryDto: CategoryDto): Promise<Category> {
        const category = await this.categoriesRepository.findOne({ where: { id } });
        if (!category) {
          throw new NotFoundException('Category not found');
        }
    
        Object.assign(category, updateCategoryDto);
        return this.categoriesRepository.save(category);
      }
      
      async delete(id: number): Promise<void> {
        await this.categoriesRepository.delete(id);
      }
}
