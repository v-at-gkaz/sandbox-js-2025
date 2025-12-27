import * as migration_20251227_165121 from './20251227_165121';
import * as migration_20251227_172111 from './20251227_172111';

export const migrations = [
  {
    up: migration_20251227_165121.up,
    down: migration_20251227_165121.down,
    name: '20251227_165121',
  },
  {
    up: migration_20251227_172111.up,
    down: migration_20251227_172111.down,
    name: '20251227_172111'
  },
];
