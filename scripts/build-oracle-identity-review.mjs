import fs from 'node:fs';

const window={};
globalThis.window=window;
for(const file of ['garden-oracle-data.js','garden-oracle-profiles.js','garden-oracle-identities.js']){
  await import(new URL('../'+file,import.meta.url));
}

const familyOrder=['Hành Trình','Nắng','Sương','Gió','Đất'];
const familyIntro={
  'Hành Trình':'22 nguyên mẫu lớn đánh dấu những chặng có khả năng đổi hướng đời sống.',
  'Nắng':'Ý chí, sức sống, sáng tạo và điều thôi thúc ta hành động.',
  'Sương':'Cảm xúc, ký ức, tiếp nhận, kết nối và khả năng chữa lành.',
  'Gió':'Tư tưởng, sự thật, lựa chọn, chiến lược và những vùng va chạm.',
  'Đất':'Thân thể, kỹ năng, công việc, nguồn lực và thành quả có thể bén rễ.'
};

const lines=[
  '# Dandelion Oracle — bản đọc duyệt 78 danh tính',
  '',
  '> File này được sinh từ dữ liệu runtime để Ali đọc và có thể biên tập trực tiếp. Trước khi sinh lại, phải đồng bộ mọi chỉnh sửa của Ali về nguồn `garden-oracle-identities.js` để không mất chữ.',
  '',
  '**Cấu trúc mỗi lá:** tên thật cố định → keyword cốt lõi → linh hồn của lá → trạng thái Nở → trạng thái Khép.',
  '',
  '**Ngôn ngữ năm họ:** Hành Trình · Nắng · Sương · Gió · Đất.',
  '',
  '---',
  ''
];

for(const familyName of familyOrder){
  const cards=window.GARDEN_ORACLE_IDENTITIES.filter(card=>card.family.publicName===familyName);
  lines.push(`# ${familyName==='Hành Trình'?'22 Hạt Hành Trình':'14 Hạt của '+familyName}`,'',familyIntro[familyName],'');
  for(const card of cards){
    const number=String(card.id).padStart(2,'0');
    lines.push(
      `## ${number} · ${card.cardName}`,
      '',
      `**Từ khóa cốt lõi:** ${card.keywords.core.join(' · ')}`,
      '',
      '**Linh hồn của lá**',
      '',
      card.essence,
      '',
      `### Hạt Nở — ${card.states.open.title}`,
      '',
      `**Từ khóa:** ${card.keywords.open.join(' · ')}`,
      '',
      card.states.open.meaning,
      '',
      `**Lời mời:** ${card.states.open.invitation}`,
      '',
      `### Hạt Khép — ${card.states.closed.title}`,
      '',
      `**Từ khóa:** ${card.keywords.closed.join(' · ')}`,
      '',
      card.states.closed.meaning,
      '',
      `**Lời mời:** ${card.states.closed.invitation}`,
      '',
      '---',
      ''
    );
  }
}

const output=new URL('../ORACLE-IDENTITY-REVIEW.md',import.meta.url);
if(fs.existsSync(output)&&!process.argv.includes('--force')){
  throw new Error('ORACLE-IDENTITY-REVIEW.md already exists and may contain Ali edits. Merge those edits first; use --force only after confirming the review file is synchronized.');
}
fs.writeFileSync(output,lines.join('\n'),'utf8');
console.log(`Wrote ${window.GARDEN_ORACLE_IDENTITIES.length} cards to ${output.pathname}`);
