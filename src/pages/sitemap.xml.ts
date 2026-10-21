import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { absoluteUrl } from '../lib/urls';
export const GET: APIRoute = ({ site }) => {
  const paths = ['/', ...projects.map(project => `/projects/${project.slug}/`)];
  const urls = paths.map(path => `<url><loc>${absoluteUrl(path, site!.href, import.meta.env.BASE_URL).replace(/&/g, '&amp;')}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
