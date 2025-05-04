import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('Sales Crm API')
        .setDescription('API documentation with Accept-Language header')
        .setVersion('1.0')
        .addBearerAuth()
        .addServer('http://localhost:3000')
        .addGlobalParameters({
            name: 'Accept-Language',
            in: 'header',
            required: true,
            description: 'The language of the response (default: uz)',
            schema: {
                type: 'string',
                default: 'uz',
                enum: ['uz', 'ru', 'en', 'uzk']
            }
        })
        .build()

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api/docs', app, document);
}
