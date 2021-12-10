const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix }) {
  let user = global.DATABASE._data.users[m.sender]
  if (user.registered === true) throw `You are already registered\nWant to re-register? ${usedPrefix}unreg <SN|SERIAL NUMBER>`
  if (!Reg.test(text)) throw `ᴡʀᴏɴɢ ғᴏʀᴍᴀᴛ\n*${usedPrefix}register age.age*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'ɴᴀᴍᴇs ᴄᴀɴɴᴏᴛ ʙᴇ ᴇᴍᴘᴛʏ (Alphanumeric) '
  if (!age) throw 'ᴀɢᴇ ᴄᴀɴɴᴏᴛ ʙᴇ ʙʟᴀɴᴋ (Numbers)'
  age = parseInt(age)
  if (age > 40) throw 'ᴀɢᴇ ᴛᴏᴏ ᴏʟᴅ 😂 ᴘʟᴇᴀs ᴅᴇᴀᴅ'
  if (age < 5) throw 'ʙᴀʙɪᴇs ᴄᴀɴ ᴛʏᴘᴇ ᴀᴄᴄᴏʀᴅɪɴɢ ᴛʜᴇ ʙᴊɪʀʀ ғᴏʀᴍᴀᴛ._.'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
ᴠᴇʀɪғɪᴄᴀᴛɪᴏɴ sᴜᴄᴄᴇss!!

╭─ *_「 ᴠᴇʀɪғɪᴄᴀᴛɪᴏɴ 」_*
│ *ɴᴀᴍᴇ* : ${name}
│ *ᴀɢᴇ* : ${age} ʏᴇᴀʀ ᴏʟᴅ
│ *sɴ* : ${sn}
╰──────────────
`.trim())
}
handler.help = ['daftar', 'reg', 'register'].map(v => v + ' <name>.<age>')
handler.tags = ['exp']

handler.command = /^(daftar|reg(ister)?)$/i

module.exports = handler

