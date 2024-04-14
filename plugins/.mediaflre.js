import axios from 'axios';
import cheerio from 'cheerio';
import { mediafiredl } from '@bochilteam/scraper';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `*[ خطا ]يجب توفير رابط صالح للتنزيل، مثال: ${usedPrefix + command} https://www.mediafire.com/file/r0lrc9ir5j3e2fs/DOOM_v13_UNCLONE*`;
  }
  try {
    const resEX = await mediafiredl(args[0]);
    const captionES = `
*📓 اسم الملف:* ${resEX.filename}
*📁 حجم الملف:* ${resEX.filesizeH}
*📄 نوع الملف:* ${resEX.ext}
*⏳ جاري التحميل. . . *`.trim();
    m.reply(captionES);
    await conn.sendFile(m.chat, resEX.url, resEX.filename, '', m, null, { mimetype: resEX.ext, asDocument: true });
  } catch {
    try {
      const res = await mediafireDl(args[0]); 
      const { name, size, date, mime, link } = res; 
      const caption = `
*📓 اسم الملف:* ${name}
*📁 حجم الملف:* ${size}
*📄 نوع الملف:* ${mime}
*⏳ جاري التحميل. . .*`.trim();
      await m.reply(caption); 
      await conn.sendFile(m.chat, link, name, '', m, null, { mimetype: mime, asDocument: true });
    } catch {
      await m.reply('*[❗𝐈𝐍𝐅𝐎❗] خطأ، يرجى التحقق من رابط التنزيل*\n*- يمكنك تجربة رابط تنزيل مثالي من هنا:*\n*◉ https://www.mediafire.com/file/r0lrc9ir5j3e2fs/DOOM_v13_UNCLONE*');
    }
  }
};

handler.help = ['mediafire'].map((v) => v + ' <الرابط>');
handler.tags = ['downloader'];
handler.command = /^(mediafire|mediafiredl|dlmediafire|ميديا|ميديافاير)$/i;
export default handler;

async function mediafireDl(url) {
  const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/', '').replace(/ /g, '%20')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`);
  const $ = cheerio.load(res.data);
  const link = $('#downloadButton').attr('href');
  const name = $('div.promoDownloadName.notranslate').attr('title').replace(/ /g, '');
  const date = $('div.dl-info > ul > li:nth-child(2) > span').text();
  const size = $('#downloadButton').text().replace('Download', '').trim();
  const rese = await axios.head(link);
  const mime = rese.headers['content-type'];
  return { name, size, date, mime, link };
}
