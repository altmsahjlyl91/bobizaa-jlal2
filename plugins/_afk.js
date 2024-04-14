
export function before(m) {
  const user = global.db.data.users[m.sender];
  if (user.afk > -1) {
    m.reply(`
  *[❗𝐈𝐍𝐅𝐎❗] تم تفعيل الغياب (AFK)${user.afkReason ? ' بسبب: ' + user.afkReason : ''}*

  *—◉ وقت الغياب (AFK): ${(new Date - user.afk).toTimeString()}*
  `.trim());
    user.afk = -1;
    user.afkReason = '';
  }
  const jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
  for (const jid of jids) {
    const user = global.db.data.users[jid];
    if (!user) {
      continue;
    }
    const afkTime = user.afk;
    if (!afkTime || afkTime < 0) {
      continue;
    }
    const reason = user.afkReason || '';
    m.reply(`*[❗] لا تزال المحادثة غير نشطة [❗]*

*—◉ الشخص الذي تحاول الاتصال به مشغول في الوقت الحالي (AFK)*      
*—◉ ${reason ? 'سبب الغياب (AFK): ' + reason : 'سبب الغياب (AFK): _الشخص غير محدد النشاط حاليًا_'}*
*—◉ وقت تفعيل الغياب (AFK): ${(new Date - afkTime).toTimeString()}*
  `.trim());
  }
  return true;
}

const handler = async (m, {text}) => {
  const user = global.db.data.users[m.sender];
  user.afk = + new Date;
  user.afkReason = text;
  m.reply(`*[❗𝐈𝐍𝐅𝐎❗] تم تفعيل الغياب لـ ${conn.getName(m.sender)}, لا يمكنه الرد في الوقت الحالي*\n\n*—◉ سبب الغياب (AFK)${text ? ': ' + text : ''}*
`);
};

handler.help = ['afk [السبب]'];
handler.tags = ['main'];
handler.command = /^afk$/i;

export default handler;