import { Module} from '@nestjs/common';
import { HttpModule } from '@nestjs/common/http';
import { AcrylController } from './acryl.controller';
import { AcrylService } from './services/acryl.service';
import { ConfigModule } from './services/config.module';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [AcrylController],
  providers: [AcrylService],
})
export class AppModule {}
