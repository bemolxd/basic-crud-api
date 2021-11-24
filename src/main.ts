import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: 'http://localhost:3005', credentials: true },
  });

  app.use(
    session({
      name: 'quid',
      secret: 'this is secret key', //na produkcji się zrobi env
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 15,
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('basic-crud-api')
    .setDescription('Basic REST API built with NestJS')
    .setVersion('0.1.0')
    .build();
  const docs = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, docs);

  app.use(passport.initialize());
  app.use(passport.session());

  app.setGlobalPrefix('api');
  await app.listen(4000);
}
bootstrap();
