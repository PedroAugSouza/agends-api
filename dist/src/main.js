"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const application_module_1 = require("./application/application.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(application_module_1.AppModule, {
        cors: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Example title')
        .setDescription('Description for api')
        .setVersion('1.0')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
//# sourceMappingURL=main.js.map