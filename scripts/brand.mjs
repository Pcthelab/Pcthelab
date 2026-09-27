import { writeFile } from 'node:fs/promises';

const out = new URL('../assets/', import.meta.url);
const css = `
@keyframes orbit {to {transform:rotate(360deg)}}
@keyframes reverse {to {transform:rotate(-360deg)}}
@keyframes breathe {0%,100%{opacity:.35}50%{opacity:.9}}
@keyframes glitch {0%,88%,94%,100%{transform:translate(0);opacity:0}89%,92%{transform:translate(5px,-2px);opacity:.75}90%,93%{transform:translate(-4px,1px);opacity:.55}}
@keyframes type {0%,8%{width:0}48%,90%{width:410px}100%{width:0}}
@keyframes cursor {0%,49%{opacity:1}50%,100%{opacity:0}}
@keyframes packet {0%{stroke-dashoffset:600;opacity:0}10%,80%{opacity:.9}100%{stroke-dashoffset:0;opacity:0}}
.orbit{animation:orbit 18s linear infinite}.reverse{animation:reverse 12s linear infinite}
.pulse{animation:breathe 4s ease-in-out infinite}.glitch{animation:glitch 7s linear infinite}
.typing{animation:type 9s steps(31,end) infinite}.cursor{animation:cursor 1.1s step-end infinite}
.packet{stroke-dasharray:45 555;animation:packet 5s linear infinite}
@media(prefers-reduced-motion:reduce){*{animation:none!important}.glitch{opacity:0}.typing{width:410px}}
`;
function orb(cx,cy,r) {
 return `<g transform="translate(${cx} ${cy})">
<circle r="${r*1.27}" fill="url(#halo)"/>
<g fill="none" stroke="#4fe5ff" stroke-width=".8" opacity=".38">
<circle r="${r}"/><ellipse rx="${r}" ry="${r*.32}"/><ellipse rx="${r}" ry="${r*.7}"/>
<ellipse rx="${r*.32}" ry="${r}"/><ellipse rx="${r*.7}" ry="${r}"/>
<path d="M-${r},0H${r}M0,-${r}V${r}"/></g>
<g class="orbit" fill="none"><ellipse rx="${r*1.18}" ry="${r*.45}" transform="rotate(-35)" stroke="#a78bfa" stroke-width="1.7"/>
<circle cx="${r*.968}" cy="-${r*.677}" r="4" fill="#ddd6fe" filter="url(#glow)"/></g>
<g class="reverse" fill="none"><circle r="${r*1.11}" stroke="#67e8f9" stroke-width="1.5" stroke-dasharray="24 160 4 70"/>
<circle cy="-${r*1.11}" r="3" fill="#67e8f9" filter="url(#glow)"/></g>
<circle r="${r*.13}" fill="#b4f4ff" opacity=".7" filter="url(#glow)" class="pulse"/>
<path d="M-12,-4L-4,0L-12,4M2,6H11" stroke="#e2fbff" stroke-width="2" fill="none"/>
</g>`;
}
function hero(mobile) {
 const w=mobile?480:1000,h=mobile?350:330,x=mobile?25:44;
 const titleY=mobile?122:155, titleSize=mobile?69:106;
 const title=`<text x="${x-3}" y="${titleY}" font-family="Arial,Helvetica,sans-serif" font-size="${titleSize}" font-weight="900" letter-spacing="${mobile?-4:-7}">PCTHELAB</text>`;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">
<title id="title">PCTHELAB — Juan Delgado, backend developer</title>
<desc id="desc">Terminal animado com assinatura, glitch sutil, esfera orbital e pulsos de dados. Java e Spring Boot.</desc>
<defs><radialGradient id="halo"><stop stop-color="#223268" stop-opacity=".48"/><stop offset="1" stop-color="#070a10" stop-opacity="0"/></radialGradient>
<linearGradient id="ink"><stop stop-color="#f0f5ff"/><stop offset=".64" stop-color="#c4b5fd"/><stop offset="1" stop-color="#67e8f9"/></linearGradient>
<pattern id="grid" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M26 0H0V26" fill="none" stroke="#7787be" stroke-opacity=".065"/></pattern>
<filter id="glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4"/></filter>
<clipPath id="slice"><rect x="0" y="${titleY-50}" width="${w}" height="12"/><rect x="0" y="${titleY-16}" width="${w}" height="5"/></clipPath>
<clipPath id="type"><rect class="typing" x="${x}" y="${h-51}" width="410" height="24"/></clipPath></defs>
<style>${css}</style>
<rect width="${w}" height="${h}" rx="12" fill="#070a10"/>
<rect x=".5" y=".5" width="${w-1}" height="${h-1}" rx="12" fill="url(#grid)" stroke="#242239"/>
<path d="M${x} 56H${w-x}" stroke="#242239"/>
<g font-family="'Courier New',monospace" font-size="11" letter-spacing="1.5"><text x="${x}" y="34" fill="#8b82b1">~/PCTHELAB</text>
<circle cx="${w-x-111}" cy="30" r="3" fill="#67e8f9" class="pulse"/><text x="${w-x}" y="34" text-anchor="end" fill="#91a4b9">SOURCE / 01</text></g>
${mobile?'':orb(815,164,83)}
<g fill="url(#ink)">${title}</g><g fill="#67e8f9" clip-path="url(#slice)" class="glitch">${title}</g>
<g font-family="'Courier New',monospace">
<text x="${x}" y="${mobile?157:192}" fill="#a8b2c7" font-size="${mobile?13:16}" letter-spacing="1.2">JUAN DELGADO <tspan fill="#605878">/</tspan>${mobile?'':' BACKEND DEVELOPER'}</text>
${mobile?`<text x="${x}" y="181" fill="#a8b2c7" font-size="12" letter-spacing="1.2">BACKEND DEVELOPER</text>${orb(376,229,49)}`:''}
<text x="${x}" y="${mobile?221:226}" font-size="${mobile?12:13}" fill="#a78bfa">JAVA <tspan fill="#4b536b">/</tspan> SPRING BOOT</text>
<path d="M${x} ${h-73}H${w-x}" stroke="#242239"/>
<path d="M${x} ${h-73}H${w-x}" stroke="#a78bfa" stroke-width="1.5" class="packet"/>
<g clip-path="url(#type)"><text x="${x}" y="${h-33}" fill="#67e8f9" font-size="${mobile?12:13}">&gt; turning ideas into code<tspan class="cursor">_</tspan></text></g>
${mobile?'':`<text x="${w-x}" y="${h-33}" text-anchor="end" fill="#6d7591" font-size="10" letter-spacing="2">BUILD. BREAK. LEARN.</text>`}
</g></svg>\n`;
}
function button(label,index,mobile=false) {
 if(mobile) return `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="56" viewBox="0 0 160 56" role="img" aria-label="${label}"><rect x=".5" y=".5" width="159" height="55" rx="7" fill="#0c0e17" stroke="#383149"/><text x="12" y="33" font-family="'Courier New',monospace" font-size="15" fill="#d4d9e8">${label}</text><path d="M137 32L145 24M137 24H145V32" stroke="#a78bfa" stroke-width="1.5" fill="none"/></svg>\n`;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="58" viewBox="0 0 320 58" role="img" aria-label="${label}">
<rect x=".5" y=".5" width="319" height="57" rx="8" fill="#0c0e17" stroke="#28263c"/>
<text x="20" y="34" font-family="'Courier New',monospace" font-size="11" fill="#817395">0${index}</text>
<text x="55" y="35" font-family="'Courier New',monospace" font-size="14" letter-spacing="2" fill="#d4d9e8">${label}</text>
<path d="M280 35L291 24M280 24H291V35" stroke="#a78bfa" stroke-width="1.5" fill="none"/></svg>\n`;
}
function stack(mobile) {
 const w=mobile?480:1000,h=mobile?147:100;
 const labels=['Java','Spring Boot','PostgreSQL','Docker','React','TypeScript','JUnit','Git'];
 const positions=mobile?[24,135,246,357]:[24,145,266,387,508,629,750,871];
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Stack: ${labels.join(', ')}">
<g font-family="'Courier New',monospace"><text x="24" y="23" fill="#8c829f" font-size="11" letter-spacing="2">STACK /</text>
${labels.map((label,i)=>`<g transform="translate(${positions[mobile?i%4:i]} ${mobile&&i>=4?94:40})"><rect width="${mobile?99:106}" height="36" rx="5" fill="#0c0e17" stroke="${i<2?'#655086':'#272736'}"/><text x="${mobile?49.5:53}" y="22" text-anchor="middle" fill="${i<2?'#d5c5fc':'#b2bdd0'}" font-size="12">${label}</text></g>`).join('')}</g></svg>\n`;
}
await writeFile(new URL('hero.svg',out),hero(false));
await writeFile(new URL('hero-mobile.svg',out),hero(true));
await writeFile(new URL('stack.svg',out),stack(false));
await writeFile(new URL('stack-mobile.svg',out),stack(true));
for (const [i,label] of ['PORTFÓLIO','LINKEDIN','CONTATO'].entries()) {
 await writeFile(new URL(`link-${i+1}.svg`,out),button(label,i+1));
 await writeFile(new URL(`link-${i+1}-mobile.svg`,out),button(label,i+1,true));
}
