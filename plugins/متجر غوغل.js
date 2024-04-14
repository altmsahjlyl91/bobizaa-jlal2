
import fetch from 'node-fetch'
import translate from '@vitalets/google-translate-api'

let handler = async (m, { conn, text, args }) => {
  if (!args[0]) throw 'البحث في بلاي ستور (متجر غوغل)'

  try {
    let enc = encodeURIComponent(text)
    let json = await fetch(`https://latam-api.vercel.app/api/playstore?apikey=brunosobrino&q=${enc}`)
    let gPlay = await json.json()

    let mystic = await translate(gPlay.descripcion, { to: 'ar', autoCorrect: true })

    if (!gPlay.titulo) return m.reply('البحث في متجر غوغل')

    conn.sendMessage(m.chat, {
      image: { url: gPlay.imagen },
      caption: `🔍: ${gPlay.titulo}
🧬 I: ${gPlay.id}
⛓️ Link: ${gPlay.link}
✍️ D: ${gPlay.desarrollador}
📈 P: ${gPlay.puntuacion}`
    }, { quoted: m })
  } catch {
    await m.reply('*حدث خطأ، يرجى التواصل مع صاحب البوت*')
  }
}

handler.help = ['playstore']
handler.tags = ['internet']
handler.command = /^(متجر)$/

export default handler