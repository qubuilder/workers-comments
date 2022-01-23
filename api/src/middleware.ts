import { Context, MiddlewareNextFunction } from 'sunder';
import { config } from './config';

/**
 * Example middleware that adds a custom header
 */
export async function corsHeaders(ctx: Context, next: MiddlewareNextFunction) {
  ctx.response.set('Access-Control-Allow-Origin', config.cors.origin);
  ctx.response.set('Access-Control-Allow-Methods', config.cors.methods);
  ctx.response.set('Access-Control-Max-Age', config.cors.maxAge);
  await next();
}
