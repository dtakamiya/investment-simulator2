const fs = require('fs');
const path = require('path');

// distディレクトリ内のすべてのHTMLファイルを取得
const distDir = path.join(__dirname, 'dist');
const htmlFiles = getAllFiles(distDir).filter(file => file.endsWith('.html'));

// 各HTMLファイルを処理
htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // _nextへのパスを絶対パスに変更
  content = content.replace(/"\/_next\//g, '"/investment-simulator2/_next/');
  
  // 修正した内容を書き戻す
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Fixed paths in ${file}`);
});

// ディレクトリ内のすべてのファイルを再帰的に取得する関数
function getAllFiles(dir) {
  const files = [];
  
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      files.push(...getAllFiles(filePath));
    } else {
      files.push(filePath);
    }
  });
  
  return files;
} 