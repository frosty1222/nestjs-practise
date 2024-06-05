import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './categories.entity';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){
    }
    @Get()
    findAll(): Promise<Category[]> {
      return this.categoriesService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Category> {
      return this.categoriesService.findOne(id);
    }
  
    @Post()
    create(@Body() item: Category): Promise<void> {
      return this.categoriesService.create(item);
    }
    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
      return this.categoriesService.delete(id);
    }
}
