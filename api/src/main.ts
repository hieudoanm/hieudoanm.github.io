import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import { writeFileSync } from 'fs';
import helmet from 'helmet';
import { stringify } from 'yaml';
import { AppModule } from './app.module';
import { PORT } from './common/environments/environments';

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const buildDocument = (app: INestApplication) => {
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
    JSON.stringify(document, null, 2),
  );
};

const setUpSecurity = (app: INestApplication) => {
  app.use(compression());
  app.use(helmet());
  app.enableCors();
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  buildDocument(app);
  setUpSecurity(app);
  await app.listen(PORT);
};

bootstrap();
