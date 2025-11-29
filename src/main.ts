import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './application/application.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
    {
      cors: {
        methods: '*',
      },
      rawBody: true,
    },
  );

  const config = new DocumentBuilder()
    .setTitle('Example title')
    .setDescription('Description for api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.getHttpAdapter().get('doc', (req, res) => {
    res.type('yaml');
    res.send(yaml.dump(document));
  });

  // SwaggerModule.setup('api', app, documentFactory);

  await app.listen({ port: Number(process.env.PORT) ?? 3001, host: '0.0.0.0' });

  app.getHttpAdapter().getInstance();
}
bootstrap();
