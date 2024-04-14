
import axios from 'axios';

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
if (!text) throw 'أعــطيـني رابــــط !';
m.reply('انتظر قليلاً...');

let api_response;
try {
api_response = await axios.get(`https://inrl-web.onrender.com/api/insta?url=${text}`);
} catch (error) {
throw `حـدث خــطأ !: ${error.message}`;
}

if (!api_response.data || !api_response.data.result || api_response.data.result.length === 0) {
throw 'لــم اجـد الـفيديــو !!';
}

let cap = 'الـفيديــو تـفضـل';

conn.sendFile(m.chat, api_response.data.result[0], 'instagram.mp4', cap, m);
}

handler.help = ['instagram']
handler.tags = ['downloader']
handler.command = /^(insta|انستغرام|ig|instagramdl)$/i

export default handler