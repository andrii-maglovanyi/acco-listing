import { Module } from '@nestjs/common';

import { PropertiesResolver } from './properties.resolver';
import { PropertiesService } from './properties.service';

@Module({
  providers: [PropertiesResolver, PropertiesService],
})
export class PropertiesModule {}
