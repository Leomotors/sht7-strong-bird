import type { PageLoad } from './$types';
import { assertSlug } from '$lib/slug';

export const load = (({ params }) => {
  return assertSlug(params.id, 'AB');
}) satisfies PageLoad;
