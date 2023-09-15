import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { SwaggerConfig } from './swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(ProductModule);
    // Enable CORS
    app.enableCors();

    // set swagger
    const swagger = new SwaggerConfig(app);
    swagger.setup();
    swagger.serveUI('/api');
    swagger.serveYaml('/api-yaml');

    // set filters & pipes
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    await app.listen(8089);
}
bootstrap();
