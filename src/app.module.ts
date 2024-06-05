import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { Category } from './categories/categories.entity';
import { Product } from './products/products.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
     imports:[ConfigModule],
     useFactory:(configService:ConfigService) =>({
       type:'mysql',
       host:configService.get('DB_HOST'),
       port:+configService.get('DB_PORT'),
       username:configService.get('DB_USERNAME'),
       password:configService.get('DB_PASSWORD'),
       database:configService.get('DB_DATABASE'),
       entities:[Product,Category]
     }),
     inject:[ConfigService]
    }),
    CategoriesModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
