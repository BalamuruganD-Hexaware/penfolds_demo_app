import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

function swaggerSetup(app: any) {
  const config = new DocumentBuilder()
    .setTitle(process.env.COMPONENT_NAME)
    .setDescription(process.env.COMPONENT_DESCRIPTION)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('API', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerSetup(app);
  await app.listen(3000);
}

bootstrap();
