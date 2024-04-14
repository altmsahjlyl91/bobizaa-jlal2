let handler = async (m, { conn, text, participants, isAdmin, isOwner }) => {
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    m.reply(`*الموضوع:*\n${text ? `${text}\n` : ''}\n⛊──⛾「 تمت الاشارة للجميع 」⛾\n` + users.map(v => '│♪ @' + v.replace(/@.+/, '')).join`\n` + '\n⛊──⛾「 Tag All 」⛾──⛊', null, {
        mentions: users
    })
}

handler.help = ['tag']
handler.tags = ['group']
handler.command = ['tag']
handler.admin = true
handler.group = true

export default handler
