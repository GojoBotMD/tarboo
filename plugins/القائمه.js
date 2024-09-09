import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import { canLevelUp, xpRange } from '../lib/levelling.js';
import fetch from 'node-fetch';
import fs from 'fs';
import moment from 'moment-timezone';
import { promises } from 'fs';
import { join } from 'path';
const time = moment.tz('Africa/Egypt').format('HH');
let wib = moment.tz('Africa/Egypt').format('HH:mm:ss');
// import db from '../lib/database.js';

let handler = async (m, { conn, usedPrefix, command }) => {
    let d = new Date(new Date() + 3600000);
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    if (!(who in global.db.data.users)) throw `✳️ لم يتم العثور على المستخدم في قاعدة البيانات`;

    let user = global.db.data.users[who];
    let { money, joincount } = global.db.data.users[m.sender];
    let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = global.db.data.users[who];
    let { min, xp, max } = xpRange(user.level, global.multiplier);
    let username = conn.getName(who);
    let rtotal = Object.entries(global.db.data.users).length || '0';
    let math = max - xp;
    let prem = global.prems.includes(who.split`@`[0]);
    let sn = createHash('md5').update(who).digest('hex');
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
    let more = String.fromCharCode(8206);
    let readMore = more.repeat(850);
    let taguser = conn.getName(m.sender); // تعديل هنا للحصول على الاسم بدلاً من الرقم
    global.fcontact = { key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}};

    // إرسال تفاعل React
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    // الانتظار لمدة ثانيتين
    await new Promise(resolve => setTimeout(resolve, 300));

    await conn.sendMessage(m.chat, { text: '*جاري تحضير قائمة الاوامر*' }, { quoted: global.fcontact });
    await new Promise(resolve => setTimeout(resolve, 1000));
    const img = './Menu.png';
    const str = `
> *✧────[ 𝑾𝑬𝑳𝑪𝑶𝑴𝑬 ]────╮*
> *┤ *مرحبا يا ${taguser}*
> *┤ 🤴🏻 المطور: MOHAMMED ADEL*
> *┤ #️⃣ الرقم: wa.me/249111230420*
> *┤ ✅ الاصدار: 1.2.0*
> *┤ 🎳 البادئة: •*
> *┤ 🧜🏽‍♂️ المستخدمين: ${rtotalreg}*  
> *┤────────────···*
> *✧────[معـلـومـات الـمسـتـخـدم]────╮*
> *┤ 🎩 *الاسـم: ${name}*
> *┤ 🔃 المستوي: ${level}*
> *┤────────────···* 
> *✧────[ الـوقـت والـتـاريـخ ]────╮*
> *┤ 📆 التاريخ: ${date}*
> *┤ 📅 اليوم: ${week}*
> *┤ 🚀 وقت النشاط: ${uptime}*
> *┤────────────···*

⟣┈┈┈┈⟢〘❄〙⟣┈┈┈┈⟢
      *༺ قــســم الـجـروب ༻*
⟣┈┈┈┈⟢〘❄〙⟣┈┈┈┈⟢
│✯ ❯ .انذار                         
│✯ ❯ .الغاءالانذار.               
│✯ ❯ .الانذارات.                 
│✯ ❯ .دعوه.                      
│✯ ❯ .منشن.                     
│✯ ❯ .مخفي.  
│✯ ❯ .ضيف 〘 لا تستخدم هذا الامر كثيرا حتي لا يحظر رقم البوت〙                  
│✯ ❯ .المشرفين.                
│✯ ❯ .جروب.                    
│✯ ❯ .طرد.   
│✯ ❯ .الارقام + رمز الدوله
>  〘 يعطيك قائمة الارقام البادئه برمز الدوله 〙    
│✯ ❯ .طرد_الارقام.
> 〘 يطردلك كل الارقام برمز الدوله 〙                
│✯ ❯ .رستر.                      
│✯ ❯ .حذف.                    
│✯ ❯ .واتس.                     
│✯ ❯ .لينك.                      
│✯ ❯ .تغيرالترحيب.           
│✯ ❯ .تغيرالوداع. 
│✯ ❯ .رفع. 
│✯ ❯ .خفض. 
│✯ ❯ .تغير-الاسم. 
│✯ ❯ .تغيرالوصف. 
│✯ ❯ .تغيرالصوره. 
⟣┈┈┈┈⟢𓆩〘❄〙𓆪⟣┈┈┈┈┈⟢
   *༺ شــرح الــالــقــاب ༻*
༺⟣┈┈┈┈⟢𓆩〘❄〙𓆪⟣┈┈┈┈⟢༻
│✯ ❯ .تسجيل. 
> 『 تضع القب بعد الامر لحفظه للادمن فقط 』
│✯ ❯ .لقبي. 
> 『 لمعرفة لقبك المسجل 』
│✯ ❯ .لقبه. 
> 『 لمعرفة لقب شخص للادمن فقط 』
│✯ ❯ .الالقاب. 
> 『 لمعرفة الالقاب المسجله 』
│✯ ❯ .حذف_لقب. 
> 『 لحذف لقب من الالقاب المسجله 』

༺⟣┈┈┈┈⟢𓆩〘۞〙𓆪⟣┈┈┈┈⟢༻
          *༺ قـــســم الــديــن ۞ ༻*
༺⟣┈┈┈┈⟢𓆩〘۞〙𓆪⟣┈┈┈┈⟢༻
│۞ ❯ .الله
│۞ ❯ .قران
│۞ ❯ .اذكار
│۞ ❯ .ايات
│۞ ❯ .ايه-الكرسي
│۞ ❯ .سوره

⟣┈┈┈┈⟢〘۞〙⟣┈┈┈┈⟢
         *༺ قــســم الــتـــحـويــلات ༻*
⟣┈┈┈┈⟢〘❄〙⟣┈┈┈┈⟢

│✯ ❯ .ملصق
│✯ ❯ .ميم
│✯ ❯ .كود
│✯ ❯ .فضح
│✯ ❯ .سرقه
│✯ ❯ .لصوره
│✯ ❯ .لانمي
│✯ ❯ .لكرتون
│✯ ❯ .لفيديو
│✯ ❯ .لصوت
│✯ ❯ .تليجراف
│✯ ❯ .دمج
│✯ ❯ .نرد
│✯ ❯ .مطلوب

⟣┈┈┈┈⟢〘❄〙⟣┈┈┈┈⟢
           *༺ قــسـم الــعــاب ༻*
⟣┈┈┈┈⟢〘❄〙⟣┈┈┈┈⟢
│✯ ❯ .رياضه. 
│✯ ❯ .اكس او. 
│✯ ❯ .رياضيات. 
│✯ ❯ .رهان. 
│✯ ❯ .شخصية. 
│✯ ❯ .احزر. 
│✯ ❯ .عين. 
│✯ ❯ .ايموجي. 
│✯ ❯ .سؤال. 
│✯ ❯ .كت. 
│✯ ❯ .خمن. 
│✯ ❯ .فكك. 
│✯ ❯ .رتب. 
│✯ ❯ .اجابه. 
│✯ ❯ .دين. 
│✯ ❯ .لغز. 
│✯ ❯ .لعبه. 

⟣┈┈┈┈⟢〘❄〙⟣┈┈┈┈┈⟢
           *༺ قــســم الــتــرفــيــه ༻*
⟣┈┈┈┈⟢〘❄〙⟣┈┈┈┈⟢
│✯ ❯ .هل
│✯ ❯ .لو
│✯ ❯ .نصيحه
│✯ ❯ .صراحه
│✯ ❯ .تاج
│✯ ❯ .زواج   ⃟❄محذوف بناء علي طلب المتابعين
│✯ ❯ .طلاق   ⃟❄نفس الشئ
│✯ ❯ .صداقه
│✯ ❯ .تحداني
│✯ ❯ .توب
│✯ ❯ .مقولات
│✯ ❯ .الحب
│✯ ❯ .شخصيه
│✯ ❯ .ذكاء
│✯ ❯ .غباء
│✯ ❯ .بوست
│✯ ❯ .اقتباس
│✯ ❯ .رجوله
│✯ ❯ .انوثه
│✯ ❯ .شاذ
│✯ ❯ .يحبني
│✯ ❯ .يكرهني

⟣┈┈┈┈┈⟢〘❄〙⟣┈┈┈┈⟢
         *༺ قــســم الـأداوات ༻*
⟣┈┈┈┈⟢〘❄〙⟣┈┈┈┈⟢
│✯ ❯ .كومنت. 
│✯ ❯ .جوده. 
│✯ ❯ .زخرف. 
│✯ ❯ .كود. 
│✯ ❯ .ترجمه. 
│✯ ❯ .فيك. 
│✯ ❯ .دحيح.   〘 ذكاء اصطناعي يقرا الصور ايضا 〙
│✯ ❯ . شوف.  〘 نفس الشئ 〙
│✯ ❯ .انطق. 

⟣┈┈┈┈┈⟢〘❄〙⟣┈┈┈┈⟢
        *༺ قـسـم الـتـنزيـلات ༻*
⟣┈┈┈┈┈⟢〘❄〙⟣┈┈┈┈┈⟢
│✯ ❯ .اغنيه
│✯ ❯ .فيديو
│✯ ❯ .يوتيوب
│✯ ❯ .انستا
│✯ ❯ .فيس
│✯ ❯ .مود
│✯ ❯ .تطبيق
│✯ ❯ .صوره
│✯ ❯ .خلفيات
│✯ ❯ .تيك
│✯ ❯ .شغل
⟣┈┈┈┈┈⟢〘❄〙⟣┈┈┈┈⟢
         *༺ قــســم الـــصـور ༻*
⟣┈┈┈┈┈┈⟢〘❄〙⟣┈┈┈┈⟢
│✯ ❯ .ايديت
│✯ ❯ .خلفيات
│✯ ❯ .تطقيم
│✯ ❯ .تطقيم-اولاد
│✯ ❯ .كريستيانو
│✯ ❯ .ميسي
│✯ ❯ .جبل
│✯ ❯ .ببجي
│✯ ❯ .هكر
          
⟣┈┈┈┈⟢𓆩〘❄〙𓆪⟣┈┈┈┈┈┈⟢
    *༺ قــــســم الـصــوتــيــات ༻*
⟣┈┈┈┈⟢𓆩〘❄〙𓆪⟣┈┈┈┈┈⟢
│✯ ❯ .عميق
│✯ ❯ .رفيع
│✯ ❯ .سنجاب
│✯ ❯ .عميق2
│✯ ❯ .روبوت
│✯ ❯ .بطئ
│✯ ❯ .ناعم
│✯ ❯ .تخين
│✯ ❯ .صاخب

⟣┈┈┈┈┈⟢〘❄〙⟣┈┈┈┈⟢
         *༺  قــســم الاعـضـاء ༻*
⟣┈┈┈┈⟢〘❄〙⟣┈┈┈┈⟢
│✯ ❯ .المطور
│✯ ❯ .تسجيل
│✯ ❯ .اقتباس
│✯ ❯ .بروفايل
│✯ ❯ .الدعم
│✯ ❯ .بنج
│✯ ❯ .بوت
│✯ ❯ .ابلاغ
 ✪┋𝐁𝐘┋❥ MIDO☞𝐁𝐎𝐓 ┋✪

⟣┈┈┈┈⟢〘❄〙⟣┈┈┈┈⟢
 ✪┋𝐁𝐘┋❥ MIDO☞𝐁𝐎𝐓 ┋✪`;

    await conn.sendMessage(m.chat, { image: { url: img }, caption: str, mentions: [m.sender] }, { quoted: global.fcontact });
};

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor((ms % 3600000) / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = /^(10)$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;

export default handler;
