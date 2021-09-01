import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'this is secret key', //na produkcji się zrobi env
      resave: false,
      saveUninitialized: false,
      cookie: {
        name: 'qid',
        maxAge: 1000 * 60 * 60 * 15,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.setGlobalPrefix('api');
  await app.listen(4000);
}
bootstrap();
