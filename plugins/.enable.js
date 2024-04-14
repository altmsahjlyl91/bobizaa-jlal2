// استيراد db من '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {

const sections = [
   {
  title: `≡ قائمة الخيارات`,
  rows: [
  {title: "🔮 | الترحيب", rowId: `${usedPrefix + command} welcome`},
  {title: "🌎 | عام", rowId: `${usedPrefix + command} public`},
  {title: "🔞 | NSFW", rowId: `${usedPrefix + command} nsfw`},
  {title: "🧬 | اللغة الإنجليزية فقط", rowId: `${usedPrefix + command} onlyenglish`},
  {title: "🔗 | منع الروابط", rowId: `${usedPrefix + command} antilink`},
  {title: "🚫 | منع الحذف", rowId: `${usedPrefix + command} antidelete`},
  {title: "🖼 | الستيكر الآلي", rowId: `${usedPrefix + command} autosticker`},
  {title: "⏏️ | تمكين التسوية التلقائية", rowId: `${usedPrefix + command} autolevelup`},
  {title: "🗣️ | الدردشة الآلية", rowId: `${usedPrefix + command} chatbot`},
  {title: "🔎 | كشف الرسائل", rowId: `${usedPrefix + command} detect`},
  {title: "📑 | الوثيقة", rowId: `${usedPrefix + command} document`},
  {title: "🛡️ | القيود", rowId: `${usedPrefix + command} restrict`},
  {title: "💬 | الرسائل الخاصة فقط", rowId: `${usedPrefix + command} onlydm`},
  {title: "👥 | المجموعة فقط", rowId: `${usedPrefix + command} onlygp`}
  ]
    },
]

const listMessage = {
  text: '\nهنا قائمة بالخيارات التي يمكنك تفعيلها وتعطيلها',
  footer: igfg,
  title: `≡ قائمة الخيارات`,
  buttonText: "انقر هنا",
  sections
}

  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = (args[0] || '').toLowerCase()
  let isAll = false, isUser = false
  switch (type) {
    case 'welcome':
    case 'bv':
    case 'bienvenida':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break

      case 'detect':
      case 'detector':
        if (!m.isGroup) {
         if (!isOwner) {
           global.dfail('group', m, conn)
          throw false
        }
       } else if (!isAdmin) {
         global.dfail('admin', m, conn)
         throw false
       }
       chat.detect = isEnable
     break
      case 'autosticker':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.autosticker = isEnable
      break
    case 'antidelete':
    case 'delete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.delete = !isEnable
      break

    case 'document':
    case 'documento':
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
      }
    chat.useDocument = isEnable
    break
    case 'public':
    case 'publico':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['self'] = !isEnable
      break
    case 'antilink':
    case 'antilinkwa':
    case 'antilinkwha':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLink = isEnable
      break

    case 'soloenglish':
    case 'sololatin':
    case 'onlyenglishs':
    case 'onlyeng':
    case 'onlyenglish':
    case 'soloenglish':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.onlyenglish = isEnable
      break

    case 'nsfw':
    case '+18':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.nsfw = isEnable
      break

    case 'autolevelup':
      isUser = true
      user.autolevelup = isEnable
      break

    case 'chatbot':
    case 'autosimi':
    case 'autosimsimi':
      isUser = true
      user.chatbot = isEnable
      break

    case 'restrict':
    case 'restringir':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.restrict = isEnable
      break

    case 'onlypv':
    case 'onlydm':
    case 'onlymd':
    case 'solopv':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['pconly'] = isEnable
      break

    case 'gponly':
    case 'onlygp':
    case 'grouponly':
    case 'sologp':
    case 'sologrupo':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['gconly'] = isEnable
      break
      
    default:
     if (!/[01]/.test(command)) return m.reply(`
≡ List of options

┌─⊷ *ADMIN*
▢ welcome
▢ antilink
▢ nsfw
▢ onlyenglish
▢ autosticker
▢ detect
▢ antidelete
└───────────── 
┌─⊷ *USERS*
▢ autolevelup
▢ chatbot 
└─────────────
┌─⊷ *OWNER*
▢ public
▢ onlydm
▢ grouponly
└─────────────
*📌 Example :*
*${usedPrefix}on* welcome
*${usedPrefix}off* welcome
`)
      throw false
  }
  /*conn.sendButton(m.chat, `
≡ *OPTIONS*
┌───────────
▢ 🗂️ *Type:* ${type} 
▢ ⚙️ *Condition:* ${isEnable ? 'Active ✅' : 'Deactive 🔴'}
▢ 🏮 *For:* ${isAll ? 'this bot' : isUser ? '' : 'this chat'}
└───────────
`,igfg, null, [[`${isEnable ? '🔴 Deactive' : '✅ Active'}`, `${isEnable ? `${usedPrefix}off ${type}` : `${usedPrefix}on ${type}`}`], ['⦙☰ Menu', `${usedPrefix}help`]],m)
*/

m.reply(`
✅ *${type}* Now *${isEnable ? 'Active' : 'Deactive'}* ${isAll ? 'for this bot' : isUser ? '' : 'for this bot'}
`.trim()) 

}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['nable']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

export default handler