import type { en } from './en';

/**
 * The shape of a locale's copy, derived from the canonical English values.
 *
 * Adding a new locale: declare `export const ka: Copy = { ... }` and TypeScript
 * will fail the build until every branch is filled in with matching shape.
 */
export type Copy = typeof en;

export { type RichPart } from './en';
