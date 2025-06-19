const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');

function isKeep(file) {
  if (file === 'index.html') return true;
  if (file === 'js' || file === 'css') return true;
  return false;
}

fs.readdirSync(distPath).forEach(file => {
  if (!isKeep(file)) {
    const filePath = path.join(distPath, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      fs.rmSync(filePath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(filePath);
    }
  }
});

// Внутри js и css оставляем только .js и .css файлы
['js', 'css'].forEach(dir => {
  const dirPath = path.join(distPath, dir);
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(file => {
      if (!file.endsWith('.js') && !file.endsWith('.css')) {
        fs.unlinkSync(path.join(dirPath, file));
      }
    });
  }
}); 