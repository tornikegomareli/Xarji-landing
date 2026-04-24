import { init, id } from '@instantdb/react';
import { INSTANT_LANDING_APP_ID } from './theme';

/**
 * Single InstantDB client for the landing-page newsletter signups.
 *
 * This app is **not** the per-user Xarji dashboard app — that one is created
 * by each installer during onboarding. This one is owned by Xarji and exists
 * only to collect emails from the landing form.
 *
 * Schema (namespace):
 *   subscriptions { email: string, subscribedAt: number, source: string, locale: string }
 *
 * Permissions must allow `create` only; view/update/delete from the client
 * must be denied so visitors can't enumerate the list.
 */
export const landingDb = init({ appId: INSTANT_LANDING_APP_ID });

export { id };
