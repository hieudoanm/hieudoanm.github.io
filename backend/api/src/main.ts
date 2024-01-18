import { writeFileSync } from 'fs';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { stringify } from 'yaml';
import { AppModule } from './app.module';
import { PORT } from './common/environments/environments';

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const setUpSwagger = (app: INestApplication) => {
  if (NODE_ENV !== 'development') return;
  const config = new DocumentBuilder()
    .setTitle('hieudoanm')
    .setDescription('Hieu Doan')
    .setVersion('1.0')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  const documentYaml: string = stringify(document);
  writeFileSync('./docs/swagger/swagger.yaml', documentYaml);
  writeFileSync(
    './docs/swagger/swagger.json',
    JSON.stringify(document, null, 2)
  );
};

const setUpMiddlewares = (app: INestApplication) => {
  app.use(compression());
  app.use(cookieParser());
};

const setUpPath = (app: INestApplication) => {
  app.enableVersioning({ defaultVersion: '1', type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe());
};

const setUpSecurity = (app: INestApplication) => {
  if (NODE_ENV === 'development') app.enableCors();
  app.use(helmet());
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  setUpMiddlewares(app);
  setUpPath(app);
  setUpSecurity(app);
  setUpSwagger(app);
  console.info(`🚀 API is listening on port ${PORT}`);
  await app.listen(PORT);
};

bootstrap();
