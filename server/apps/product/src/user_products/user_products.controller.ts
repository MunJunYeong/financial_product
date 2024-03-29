// vendor
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

// cus
import { UserProductsService } from './user_products.service';
import { ProductDTO } from './dto/common.dto';
import { Product } from '@app/database/models/product';

// swagger에 tag를 생성해줌
@ApiResponse({
    status: 500,
    description: 'Internal server error',
})
@Controller('/user-prod')
export class UserProductsController {
    constructor(private readonly service: UserProductsService) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // save user's product
    @ApiTags('User product')
    @ApiOperation({ summary: "save user's product" })
    @ApiOkResponse({
        description: '사용자 적금 저장',
        schema: {
            example: { success: true },
        },
    })
    @Post('/:user_idx')
    async saveProduct(@Param('user_idx', ParseIntPipe) userIdx: number, @Body() productDTO: ProductDTO) {
        return await this.service.SaveUserProduct(userIdx, productDTO);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // save user's product
    @ApiTags('User product')
    @ApiOperation({ summary: "get user's all product" })
    @ApiOkResponse({
        description: '사용자 저장 전체 상품 가져오기',
        type: Product,
        isArray: true,
    })
    @Get('/:user_idx')
    async getProducts(@Param('user_idx', ParseIntPipe) userIdx: number) {
        return await this.service.GetUserProducts(userIdx);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // save user's product
    @ApiTags('User product')
    @ApiOperation({ summary: "get user's product" })
    @ApiOkResponse({
        description: '사용자 저장 상품 가져오기',
        type: Product,
        isArray: false,
    })
    @Get('/:user_idx/prod/:product_idx')
    async getProduct(
        @Param('user_idx', ParseIntPipe) userIdx: number,
        @Param('product_idx', ParseIntPipe) productIdx: number,
    ) {
        return await this.service.GetUserProduct(userIdx, productIdx);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // update user's product
    @ApiTags('User product')
    @ApiOperation({ summary: "update user's product" })
    @ApiOkResponse({
        description: '사용자 저장 상품 업데이트',
        type: Boolean,
    })
    @Put('/:user_idx/prod/:product_idx')
    async UpdateProduct(
        @Param('user_idx', ParseIntPipe) userIdx: number,
        @Param('product_idx', ParseIntPipe) productIdx: number,
        @Body() product: Product
    ) {
        return await this.service.UpdateUserProduct(userIdx, productIdx, product);
    }
}
