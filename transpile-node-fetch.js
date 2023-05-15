const { execSync } = require('child_process');

try {
  execSync('yarn babel ./node_modules/node-fetch/src --out-dir ./node_modules/node-fetch/dist', {
    stdio: 'inherit',
  });
} catch (error) {
  console.error(error);
}

require('./src/server/index.js');
