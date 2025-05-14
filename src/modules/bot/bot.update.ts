import { Update, Start, Ctx, Hears, On, Help } from "nestjs-telegraf";
import { Context } from "telegraf";

@Update()
export class BotUpdate{
    @Start()
    async start(@Ctx() ctx: Context) {
        await ctx.reply('Botga xush kelibsiz');
    }
}
