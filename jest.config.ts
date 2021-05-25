// jest.config.ts
import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
export default config;
