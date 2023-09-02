import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: process.env.EXPO_PUBLIC_SANITY_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-08-31',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export default client;
