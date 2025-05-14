import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { BotUpdate } from './bot.update';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '8156138198:AAEXkMFwAcUnweuueqDr63NJJx-uQKMet3I'
    }),
  ],
  controllers: [BotController],
  providers: [BotService, BotUpdate],
})
export class BotModule {}
