import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CipherModule } from './modules/cipher.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [CipherModule, TokensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
