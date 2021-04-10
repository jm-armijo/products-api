import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';
import { OptionSchema } from './option.model';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Option', schema: OptionSchema }])],
	controllers: [OptionsController],
	providers: [OptionsService],
})
export class OptionsModule {}
