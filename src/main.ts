import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  })
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('CareConnect API Service')
    .setVersion('1.0')
    .addTag('CareConnect API')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
void bootstrap()
