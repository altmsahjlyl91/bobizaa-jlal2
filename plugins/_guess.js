let handler = m => m

export async function all(m) {
  let user = global.db.data.users[m.sender]
  if (m.chat.endsWith('broadcast')) return

  if (user.premiumTime != 0 && user.premium && new Date() * 1 >= user.premiumTime) {
    user.premiumTime = 0
    user.premium = false

    await m.reply(`*[❗] @${m.sender.split`@`[0]} تم تجديد الاشتراك المميز الخاص بك وانتهى، ولن يكون لديك اشتراك مميز مرة أخرى*`, m.sender, { mentions: [m.sender] })
  }
}
