import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { BotUpdate } from './bot.update';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const token = configService.get<string>('TOKEN');
        if (!token) {
          throw new Error('Telegram bot token is not defined in .env');
        }
        return {
          token,
        };
      },
    }),
  ],
  controllers: [BotController],
  providers: [BotService, BotUpdate],
})
export class BotModule {}
