import type { APIRoute } from 'astro';
import { absoluteUrl } from '../lib/urls';
export const GET: APIRoute = ({ site }) => new Response(`User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml', site!.href, import.meta.env.BASE_URL)}\n`, { headers: { 'Content-Type': 'text/plain' } });
