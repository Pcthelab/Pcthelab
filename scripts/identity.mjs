import { writeFile } from 'node:fs/promises';

const out = new URL('../assets/', import.meta.url);
const ink = '#eeece7', red = '#ff304f', bg = '#08090b';
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');

// Original vector drawing: anonymous mask, dark hood, terminal scan.
function mask(t) {
 const reveal = Math.min(1, .3+t*4);
 const glitch = (t>.70&&t<.72)||(t>.75&&t<.77);
 return `<defs><clipPath id="reveal"><rect x="-104" y="-113" width="208" height="${240*reveal}"/></clipPath><clipPath id="codeReveal"><rect x="-104" y="${-113+240*reveal}" width="208" height="${240*(1-reveal)}"/></clipPath><clipPath id="maskSlice"><rect x="-112" y="-31" width="224" height="15"/><rect x="-112" y="48" width="224" height="8"/></clipPath></defs>
<path d="M-119 117L-111-17Q-102-102 0-139Q102-102 111-17L119 117L71 90L0 135L-71 90Z" fill="#111115" stroke="#30232a"/>
<path d="M-111 115L-97 16Q-90-80 0-119Q90-80 97 16L111 115M-81 96L0 126L81 96" fill="none" stroke="#543039" stroke-width="1"/>
<g clip-path="url(#codeReveal)" fill="${red}" font-family="monospace" font-size="9" text-anchor="middle" opacity=".6">${Array.from({length:19},(_,row)=>{const n=Math.max(2,Math.floor(row<10?24:24-(row-10)*2.5));const glyphs='01:/{}[]';return `<text x="0" y="${-84+row*10}">${Array.from({length:n},(_,col)=>glyphs[(row*3+col+Math.floor(t*40))%glyphs.length]).join('')}</text>`}).join('')}</g>
<g id="face" clip-path="url(#reveal)">
<path d="M0-106C-49-108-82-83-84-34C-89 8-72 46-45 80C-29 101-10 115 0 119C10 115 29 101 45 80C72 46 89 8 84-34C82-83 49-108 0-106Z" fill="${ink}"/>
<path d="M0-106C-49-108-82-83-84-34C-89 8-72 46-45 80C-29 101-10 115 0 119L-13 85L-40 51L-57 9L-61-50L-42-89Z" fill="#aca7a6" opacity=".30"/>
<path d="M0-106C49-108 82-83 84-34C89 8 72 46 45 80C29 101 10 115 0 119L13 85L40 51L57 9L61-50L42-89Z" fill="#b0a5a9" opacity=".16"/>
<path d="M-71-45Q-40-76-13-46Q-37-55-69-37ZM71-45Q40-76 13-46Q37-55 69-37Z" fill="#111115"/>
<path d="M-65-27Q-45-43-19-24Q-39-15-61-22ZM65-27Q45-43 19-24Q39-15 61-22Z" fill="#111115"/>
<path d="M-59-26L-28-26M59-26L28-26" stroke="${red}" stroke-width="1.5" opacity="${.35+.35*Math.sin(t*Math.PI*2)**2}"/>
<path d="M-8-26L-15 17Q-9 25 0 23Q9 25 15 17L8-26M-15 17L-7 14M15 17L7 14" fill="none" stroke="#8f8685" stroke-width="1.5"/>
<path d="M-15 22Q0 31 15 22" fill="none" stroke="#1b181d" stroke-width="2"/>
<path d="M-70 1Q-55 25-32 23M70 1Q55 25 32 23" fill="none" stroke="#b59191" stroke-width="4" opacity=".7"/>
<path d="M-65 32Q-50 65 0 71Q50 65 65 32Q44 54 0 55Q-44 54-65 32Z" fill="#211b21"/>
<path d="M0 38C-17 28-29 50-60 34C-44 64-15 56 0 48C15 56 44 64 60 34C29 50 17 28 0 38Z" fill="#111115"/>
<path d="M-33 67Q0 82 33 67" fill="none" stroke="#988987" stroke-width="1.5"/>
<path d="M-13 80Q0 89 13 80L7 106L0 118L-7 106Z" fill="#171219"/>
<path d="M-75 11L-79 37M75 11L79 37" stroke="#84767b" fill="none"/>
</g>
${glitch?`<use href="#face" transform="translate(${t<.73?5:-5} 0)" clip-path="url(#maskSlice)" opacity=".8"/>`:''}
<path d="M-105 ${-110+(t*2%1)*230}H105" stroke="${red}" stroke-width="1" opacity=".55"/>
<g fill="none" stroke="${red}" stroke-width="1.3"><path d="M-128-102V-124H-106M106-124H128V-102M-128 92V114H-106M106 114H128V92"/></g>`;
}

export function hero(mobile, t=.42) {
 const w=mobile?480:1000,h=mobile?408:354,x=mobile?25:40;
 const titleY=mobile?120:157,size=mobile?70:103;
 const glitch=(t>.70&&t<.72)||(t>.75&&t<.77);
 const phase=t<.45?0:t<.82?1:2;
 const commands=['./init --profile pcthelab','java --stack spring-boot','ready to build.'];
 const local=phase===0?t/.45:phase===1?(t-.45)/.37:(t-.82)/.18;
 const command=commands[phase].slice(0,Math.floor(Math.min(1,local*1.8)*commands[phase].length));
 const cx=mobile?365:816,cy=mobile?236:185,scale=mobile?.62:.89;
 const terminalY=mobile?156:199;
 const title=`<text x="${x-3}" y="${titleY}" font-family="Arial,Helvetica,sans-serif" font-size="${size}" font-weight="900" letter-spacing="${mobile?-4:-6}">PCTHELAB</text>`;
 const chars=['0','1','/','{','}','_',';','$'];
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">
<title id="title">PCTHELAB — Juan Delgado</title><desc id="desc">Identidade de terminal: máscara anônima, scan vermelho e glitch. Java e Spring Boot.</desc>
<defs><pattern id="scanlines" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 0H4" stroke="#ffffff" stroke-opacity=".025"/></pattern><clipPath id="titleSlice"><rect x="0" y="${titleY-50}" width="${w}" height="13"/><rect x="0" y="${titleY-14}" width="${w}" height="5"/></clipPath></defs>
<rect width="${w}" height="${h}" rx="8" fill="${bg}"/><rect x=".5" y=".5" width="${w-1}" height="${h-1}" rx="8" stroke="#382128" fill="url(#scanlines)"/>
<path d="M1 46H${w-1}" stroke="#382128"/>
<g font-family="'Courier New',monospace" font-size="11"><text x="${x}" y="28" fill="#a39b9e">pcthelab@localhost:~</text><text x="${w-x}" y="28" text-anchor="end" fill="${red}">/bin/bash</text></g>
${Array.from({length:9},(_,col)=>`<g fill="#bd2940" opacity=".17" font-family="monospace" font-size="9">${Array.from({length:7},(_,row)=>`<text x="${cx-105+col*26*scale}" y="${cy-100*scale+((row*27+t*45+col*11)%(195*scale))}">${chars[(row+col*3)%chars.length]}</text>`).join('')}</g>`).join('')}
<g transform="translate(${cx} ${cy}) scale(${scale})">${mask(t)}</g>
<g fill="${red}">${title}</g>${glitch?`<g fill="${ink}" clip-path="url(#titleSlice)" transform="translate(${t<.73?5:-4} 0)">${title}</g>`:''}
<g font-family="'Courier New',monospace">
<text x="${x}" y="${terminalY}" font-size="${mobile?13:15}" fill="#a7a0a3"><tspan fill="${red}">$</tspan> whoami</text>
<text x="${x}" y="${terminalY+27}" font-size="${mobile?13:16}" fill="${ink}">Juan Delgado</text>
<text x="${x}" y="${terminalY+51}" font-size="${mobile?12:14}" fill="#a7a0a3">backend developer</text>
${mobile?`<text x="${x}" y="${terminalY+91}" font-size="12" fill="#db7483">Java / Spring Boot</text>`:''}
<path d="M${x} ${h-56}H${w-x}" stroke="#382128"/><path d="M${x} ${h-56}H${w-x}" stroke="${red}" stroke-dasharray="35 965" stroke-dashoffset="${1000-t*2000}" opacity=".7"/>
<text x="${x}" y="${h-27}" font-size="${mobile?12:14}" fill="#d6cfd0"><tspan fill="${red}">&gt;</tspan> ${esc(command)}<tspan opacity="${Math.floor(t*16)%2?0:1}">_</tspan></text>
${mobile?'':`<text x="${w-x}" y="${h-27}" text-anchor="end" fill="#8b777e" font-size="10" letter-spacing="1.5">CODE SPEAKS.</text>`}
</g></svg>\n`;
}
function button(label,index,mobile=false) {
 const w=mobile?160:320,h=56;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><rect x=".5" y=".5" width="${w-1}" height="55" rx="4" fill="#0c0b0e" stroke="#39232b"/><path d="M1 14V42" stroke="${red}" stroke-width="2"/><g font-family="'Courier New',monospace">${mobile?'':`<text x="18" y="33" font-size="11" fill="#98666f">0${index}</text>`}<text x="${mobile?12:53}" y="33" font-size="${mobile?15:14}" letter-spacing="${mobile?0:1.7}" fill="#e2d9db">${label}</text></g><path d="M${w-25} 32L${w-17} 24M${w-25} 24H${w-17}V32" stroke="${red}" stroke-width="1.5" fill="none"/></svg>\n`;
}
function stack(mobile) {
 const w=mobile?480:1000,h=mobile?147:100;
 const labels=['Java','Spring Boot','PostgreSQL','Docker','React','TypeScript','JUnit','Git'];
 const positions=mobile?[24,135,246,357]:[24,145,266,387,508,629,750,871];
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Stack: ${labels.join(', ')}"><g font-family="'Courier New',monospace"><text x="24" y="23" fill="#a18288" font-size="11" letter-spacing="1">$ cat stack.conf</text>${labels.map((label,i)=>`<g transform="translate(${positions[mobile?i%4:i]} ${mobile&&i>=4?94:40})"><rect width="${mobile?99:106}" height="36" rx="3" fill="#0c0b0e" stroke="${i<2?'#903244':'#342830'}"/><text x="${mobile?49.5:53}" y="22" text-anchor="middle" fill="${i<2?'#f1a2ae':'#beb5b8'}" font-size="12">${label}</text></g>`).join('')}</g></svg>\n`;
}
await writeFile(new URL('hero-mask.svg',out),hero(false));
await writeFile(new URL('hero-mask-mobile.svg',out),hero(true));
await writeFile(new URL('stack.svg',out),stack(false));
await writeFile(new URL('stack-mobile.svg',out),stack(true));
for(const [i,label] of ['PORTFÓLIO','LINKEDIN','CONTATO'].entries()) {
 await writeFile(new URL(`link-${i+1}.svg`,out),button(label,i+1));
 await writeFile(new URL(`link-${i+1}-mobile.svg`,out),button(label,i+1,true));
}
