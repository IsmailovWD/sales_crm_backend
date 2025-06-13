import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async productCreate(@Body() body: CreateProductDto) {
    return this.productService.productCreate(body);
  }

  @Put('id/:id')
  async productUpdate(@Body() body: CreateProductDto, @Param('id') id: string) {
    return this.productService.productUpdate(body, +id);
  }
  @Get('/:branch/:size/:page')
  @ApiQuery({ name: 'search', type: String, required: false })
  async getAllProducts(
    @Param('size') size: string,
    @Param('page') page: string,
    @Param('branch') branch: string,
    @Query('search') search?: string,
  ) {
    return this.productService.getAllProducts(+branch, +size, +page, search);
  }

  @Get('/with-balance')
  async getAllWithBalance() {
    return this.productService.getAllWithBalance();
  }
}
