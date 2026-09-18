import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Use only the contribution calendar visible on the public GitHub profile.
// If GitHub changes the markup, fail without overwriting the last good images.
const html = process.argv[2]
  ? await fs.readFile(process.argv[2], 'utf8')
  : await fetch('https://github.com/users/Pcthelab/contributions', {
      headers: { 'User-Agent': 'Pcthelab-profile', 'Accept-Language': 'en-US' },
      signal: AbortSignal.timeout(30000),
    }).then(r => { if (!r.ok) throw new Error(`GitHub returned ${r.status}`); return r.text(); });
const tips = new Map([...html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)]
  .map(m => [m[1].match(/\bfor="([^"]+)"/)?.[1], m[2].replace(/<[^>]*>/g, '').trim()]));
const days = [...html.matchAll(/<td\b[^>]*\bdata-date="[^"]+"[^>]*>/g)].map(m => {
  const date = m[0].match(/\bdata-date="([^"]+)"/)[1];
  const id = m[0].match(/\bid="([^"]+)"/)?.[1];
  const label = tips.get(id);
  const count = label?.match(/^(No|[\d,]+) contributions? on /)?.[1];
  if (!count) throw new Error(`Missing contribution count for ${date}`);
  return { date, count: count === 'No' ? 0 : Number(count.replaceAll(',', '')) };
}).sort((a,b) => a.date.localeCompare(b.date));
if (days.length < 350 || new Set(days.map(d => d.date)).size !== days.length) {
  throw new Error('Incomplete or duplicate contribution calendar');
}
const recent = days.slice(-84);
for (let i=1;i<recent.length;i++) {
  if (Date.parse(recent[i].date)-Date.parse(recent[i-1].date)!==86400000) throw new Error('Calendar has missing dates');
}
const weeks = Array.from({length:12}, (_,i)=>recent.slice(i*7,i*7+7).reduce((sum,d)=>sum+d.count,0));
const total = weeks.reduce((sum,n)=>sum+n,0);
const active = recent.filter(d=>d.count>0).length;
const dateLabel = date => date.slice(8,10)+'/'+date.slice(5,7);
function render(mobile) {
  const w=mobile?420:840, h=mobile?208:180, x=mobile?24:40;
  const chartX=mobile?24:336, chartTop=mobile?106:46, chartHeight=mobile?61:80;
  const step=mobile?31:38, barWidth=mobile?20:26, base=chartTop+chartHeight;
  const max=Math.max(1,...weeks);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">
<title id="title">Atividade pública de Pcthelab</title>
<desc id="desc">${total} contribuições em ${active} dias ativos entre ${recent[0].date} e ${recent.at(-1).date}. Cada barra representa sete dias. Inclui commits e outras contribuições contabilizadas pelo GitHub.</desc>
<rect width="${w}" height="${h}" rx="8" fill="#0d1117"/>
<g font-family="'Courier New',monospace">
<text x="${x}" y="30" font-size="11" fill="#8b949e"><tspan fill="#b0ed8c">&gt;</tspan> activity.log</text>
<text x="${x}" y="${mobile?72:83}" font-size="${mobile?30:36}" fill="#e6edf3">${total}</text>
<text x="${mobile?130:x}" y="${mobile?60:107}" font-size="12" fill="#8b949e">contribuições</text>
<text x="${mobile?130:x}" y="${mobile?80:128}" font-size="11" fill="#6e7681">${active} dias ativos / 12 semanas</text>
${weeks.map((n,i)=> { const bh=n===0?2:Math.max(4,n/max*chartHeight);return `<rect x="${chartX+i*step}" y="${base-bh}" width="${barWidth}" height="${bh}" rx="2" fill="${n===0?'#212a33':i===11?'#b0ed8c':'#648f56'}"><title>${dateLabel(recent[i*7].date)}–${dateLabel(recent[i*7+6].date)}: ${n} contribuições</title></rect>`; }).join('\n')}
<text x="${chartX}" y="${base+23}" font-size="10" fill="#6e7681">${dateLabel(recent[0].date)}</text>
<text x="${chartX+11*step+barWidth}" y="${base+23}" text-anchor="end" font-size="10" fill="#6e7681">${dateLabel(recent.at(-1).date)}</text>
</g></svg>\n`;
}
const output = new URL('../assets/', import.meta.url);
await fs.mkdir(output, { recursive: true });
await fs.writeFile(new URL('activity.svg', output), render(false));
await fs.writeFile(new URL('activity-mobile.svg', output), render(true));
console.log(`${total} contributions across ${active} active days; assets saved to ${fileURLToPath(output)}`);
