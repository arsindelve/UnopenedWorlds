import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const collectionConfig = readFileSync('app/collection.ts', 'utf8');
const localAssetPaths = [...collectionConfig.matchAll(/['"](\/collection\/(?:thumbnails\/)?[^'"]+)['"]/g)]
  .map((match) => match[1]);
const uniquePaths = [...new Set(localAssetPaths)];
const missing = uniquePaths.filter((path) => !existsSync(resolve('public', `.${path}`)));

const sourcePhotographs = uniquePaths.filter((path) => /^\/collection\/(?!thumbnails\/|exhibits\/).+\.(?:jpe?g|png)$/i.test(path));
const missingExhibitDerivatives = sourcePhotographs
  .map((path) => path.replace('/collection/', '/collection/exhibits/').replace(/\.(?:jpe?g|png)$/i, '.webp'))
  .filter((path) => !existsSync(resolve('public', `.${path}`)));

if (missing.length || missingExhibitDerivatives.length) {
  if (missing.length) console.error(`Missing collection assets:\n${missing.join('\n')}`);
  if (missingExhibitDerivatives.length) console.error(`Missing exhibit derivatives:\n${missingExhibitDerivatives.join('\n')}`);
  process.exit(1);
}

console.log(`Collection asset check passed: ${uniquePaths.length} configured files and ${sourcePhotographs.length} exhibit derivatives.`);
