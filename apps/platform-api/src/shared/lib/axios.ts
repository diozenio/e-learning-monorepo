import axios from 'axios';

import { env } from '@/env';

export const cmsApi = axios.create({
  baseURL: env.CMS_API_URL,
  headers: {
    Authorization: `Bearer ${env.CMS_API_TOKEN}`,
  },
});
