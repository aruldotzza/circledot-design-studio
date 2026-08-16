const fs = require('fs');

const files = [
  'src/pages/HomePage.tsx',
  'src/pages/AboutPage.tsx',
  'src/pages/HowWeWorkPage.tsx',
  'src/pages/ServiceDetailPage.tsx',
  'src/pages/ServicesPage.tsx',
  'src/pages/WorkPage.tsx',
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');

  // Replace bg-[#0C0C0C] -> bg-white dark:bg-[#0C0C0C]
  content = content.replace(/(?<!dark:)bg-\[#0C0C0C\](?!\/)/g, 'bg-white dark:bg-[#0C0C0C]');
  
  // Replace bg-[#141414] -> bg-gray-50 dark:bg-[#141414]
  content = content.replace(/(?<!dark:)bg-\[#141414\](?!\/)/g, 'bg-gray-50 dark:bg-[#141414]');
  
  // Replace text-[#F3F4EF] -> text-gray-900 dark:text-[#F3F4EF]
  content = content.replace(/(?<!dark:)text-\[#F3F4EF\](?!\/)/g, 'text-gray-900 dark:text-[#F3F4EF]');
  
  // Replace text-[#A5A8A1] -> text-gray-600 dark:text-[#A5A8A1]
  content = content.replace(/(?<!dark:)text-\[#A5A8A1\](?!\/)/g, 'text-gray-600 dark:text-[#A5A8A1]');
  
  // Replace border-[#222222] -> border-gray-200 dark:border-[#222222]
  content = content.replace(/(?<!dark:)border-\[#222222\](?!\/)/g, 'border-gray-200 dark:border-[#222222]');

  // Replace text-[#D7E2EA] -> text-gray-700 dark:text-[#D7E2EA]
  content = content.replace(/(?<!dark:)text-\[#D7E2EA\](?!\/)/g, 'text-gray-700 dark:text-[#D7E2EA]');
  
  // Replace from-[#141414] -> from-white dark:from-[#141414]
  content = content.replace(/(?<!dark:)from-\[#141414\](?!\/)/g, 'from-white dark:from-[#141414]');

  fs.writeFileSync(file, content);
});
console.log('Replacements done!');
