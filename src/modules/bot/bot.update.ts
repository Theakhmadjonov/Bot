import { Update, Start, Ctx, Hears, On, Help, Command } from 'nestjs-telegraf';
import { join } from 'path';
import { Context } from 'telegraf';
import { Contact } from 'telegraf/typings/core/types/typegram';
import wiki from 'wikijs';

@Update()
export class BotUpdate {
  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply('Botga xush kelibsiz', {
      reply_markup: {
        keyboard: [
          [
            { text: 'Location', request_location: true },
            { text: 'contact', request_contact: true },
          ],
        ],
        resize_keyboard: true,
      },
    });
    await ctx.sendPoll(
      'Sizga qaysi dasturlash tili yoqadi?',
      ['JavaScript', 'Python', 'C', 'Php'],
      {
        is_anonymous: false,
        allows_multiple_answers: true,
      },
    );
  }

  @Command('help')
  async help(@Ctx() ctx: Context) {
    await ctx.reply('Qanday yordam kerak?');
  }

  @On('text')
  async handle_text(@Ctx() ctx: Context) {
    const text = ctx.message!['text'];
    try {
      const result = await wiki().page(text);
      const info = await result.summary();
      const images = await result.images();
      const imageUrl = images.filter(
        (e) => e.endsWith('.jpg') || e.endsWith('.png'),
      );
      await ctx.replyWithPhoto({ url: imageUrl[0] });
      await ctx.reply(info);
    } catch (error) {
      await ctx.reply(`Ma'lumot topilmadi`);
    }
  }

  @On('contact')
  async handle_contact(@Ctx() ctx: Context) {
    const contact: Contact = ctx['message']!['contact'];
    await ctx.reply(`Contact qabul qilindi`);
  }
}
