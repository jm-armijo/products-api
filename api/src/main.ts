import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const fs = require('fs');
	const httpsOptions = {
		key:  fs.readFileSync(process.env.TLS_KEY),
		cert: fs.readFileSync(process.env.TLS_CERT),
	};

	const app = await NestFactory.create(AppModule, {httpsOptions});
	await app.listen(5000);
}
bootstrap();
