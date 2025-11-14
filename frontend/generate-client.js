import { createFromRoot } from 'codama';
import { rootNodeFromAnchor } from '@codama/nodes-from-anchor';
import { renderVisitor } from '@codama/renderers-js';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const idlPath = resolve(__dirname, '../anchor_project/ackee-vault/target/idl/ackee_vault.json');
const outputPath = resolve(__dirname, './anchor-generated');

async function generate() {
  // Read the IDL
  const idl = JSON.parse(readFileSync(idlPath, 'utf-8'));

  // Convert IDL to Codama nodes
  const rootNode = rootNodeFromAnchor(idl);

  // Create codama instance
  const codama = createFromRoot(rootNode);

  // Render JavaScript/TypeScript client
  await codama.accept(renderVisitor(outputPath, {
    dependencyMap: {
      '@solana/kit': 'gill',
    },
  }));

  // Add backward compatibility alias
  const indexPath = resolve(outputPath, 'index.ts');
  let indexContent = readFileSync(indexPath, 'utf-8');

  if (!indexContent.includes('ACKEEVAULT_PROGRAM_ADDRESS')) {
    indexContent += '\n// Alias for backward compatibility\n';
    indexContent += "export { ACKEE_VAULT_PROGRAM_ADDRESS as ACKEEVAULT_PROGRAM_ADDRESS } from './programs';\n";
    writeFileSync(indexPath, indexContent);
  }

  console.log('✅ Generated TypeScript client code at:', outputPath);
}

generate().catch((error) => {
  console.error('Error generating client code:', error);
  process.exit(1);
});
