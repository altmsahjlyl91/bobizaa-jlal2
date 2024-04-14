
import TicTacToe from '../lib/tictactoe.js'
let handler = async (m, { conn, usedPrefix, command, text }) => {
  conn.game = conn.game ? conn.game : {}
  if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) throw '*[❗] لا يمكنك إنشاء أكثر من غرفة واحدة في اللعبة*'
  if (!text) throw '*[❗] يجب عليك إدخال اسم الغرفة التي ترغب في الانضمام إليها*\n\n*—◉ الأمر*\n*◉ ${usedPrefix + command} اسم الغرفة*'
  
  let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
  if (room) {
    await m.reply('*[🕹️] هناك لعبة جارية، يرجى الانضمام إلى لاعب آخر*')
    room.o = m.chat
    room.game.playerO = m.sender
    room.state = 'PLAYING'
    
    let arr = room.game.render().map(v => {
      return {
        X: '❎',
        O: '⭕',
        1: '1️⃣',
        2: '2️⃣',
        3: '3️⃣',
        4: '4️⃣',
        5: '5️⃣',
        6: '6️⃣',
        7: '7️⃣',
        8: '8️⃣',
        9: '9️⃣',
      }[v]
    })
    
    let str = `🎮 لعبة تيك تاك تو 🎮\n\n❎ = @${room.game.playerX.split('@')[0]}\n⭕ = @${room.game.playerO.split('@')[0]}\n${arr.slice(0, 3).join('')}\n${arr.slice(3, 6).join('')}\n${arr.slice(6).join('')}\n\nتحرك الآن: @${room.game.currentTurn.split('@')[0]}`.trim()
    
    if (room.x !== room.o) await conn.sendMessage(room.x, { text: str, mentions: this.parseMention(str)}, { quoted: m })
    await conn.sendMessage(room.o, { text: str, mentions: conn.parseMention(str)}, { quoted: m })
  } else {
    room = {
      id: 'tictactoe-' + (+new Date),
      x: m.chat,
      o: '',
      game: new TicTacToe(m.sender, 'o'),
      state: 'WAITING'
    }
    
    if (text) room.name = text
    
    let imgplay = 'https://cope-cdnmed.agilecontent.com/resources/jpg/8/9/1590140413198.jpg'
    
    conn.sendButton(m.chat, `🕹 لعبة تيك تاك تو 🎮\n\n◉ اضغط هنا لإنشاء جديدة\n◉ اضغط هنا للانضمام إلى الجارة ${usedPrefix}delttt`, imgplay, [['إنشاء جديدة', `${usedPrefix + command} ${text}`]], m, { mentions: conn.parseMention(text) })
    
    conn.game[room.id] = room
  }
}

handler.command = /^(لعبه|لعبة|ttt|xo)$/i

export default handler