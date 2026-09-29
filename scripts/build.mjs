import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

const docusaurusCli = fileURLToPath(
  new URL('../node_modules/@docusaurus/core/bin/docusaurus.mjs', import.meta.url),
);
const result = spawnSync(
  process.execPath,
  [docusaurusCli, 'build', ...process.argv.slice(2)],
  {
    env: {
      ...process.env,
      SWC_NATIVE_BINDING_CACHE: join(tmpdir(), 'swc-native-binding-cache'),
    },
    stdio: 'inherit',
  },
);

if (result.error) {
  throw result.error;
}

process.exitCode = result.status ?? 1;