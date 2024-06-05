// src/items/item.entity.ts
import { Category } from 'src/categories/categories.entity';
import { Entity, Column, PrimaryGeneratedColumn,ManyToOne } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  discount_price:string;

  @Column('text')
  actual_price:string;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

}
