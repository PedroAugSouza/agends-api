import * as http from 'http';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './application/application.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function createApp(): Promise<NestFastifyApplication> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: true,
      rawBody: true,
    },
  );

  const config = new DocumentBuilder()
    .setTitle('Example title')
    .setDescription('Description for api')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  await app.init();
  return app;
}

async function bootstrap() {
  const app = await createApp();

  if (!process.env.VERCEL) {
    await app.listen({
      port: Number(process.env.PORT) || 3001,
      host: '0.0.0.0',
    });
  }
}

if (require.main === module) {
  void bootstrap();
}

let server: http.Server | null = null;

export default async function handler(
  req: http.IncomingMessage,
  res: http.ServerResponse,
) {
  if (!server) {
    const app = await createApp();
    const fastifyInstance = app.getHttpAdapter().getInstance();
    await fastifyInstance.ready();
    server = fastifyInstance.server;
  }

  server!.emit('request', req, res);
}
