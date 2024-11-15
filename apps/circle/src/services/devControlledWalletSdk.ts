import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';

import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });


const circleApiBaseUrl =
  process.env.CIRCLE_API_BASE_URL ?? 'https://api.circle.com';

export const circleDevSdk = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.API_KEY ?? '',
  baseUrl: circleApiBaseUrl,
  userAgent: 'Prophesy',
  entitySecret: process.env.ENTITY_SECRET ?? ''
});
