import { getAntalyaNeighborhoods } from '../../antalya-neighborhoods';

export const dynamic = 'force-static';
export function GET() {
  return Response.json({ data: getAntalyaNeighborhoods() }, { headers: {
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    'X-Robots-Tag': 'noindex',
  } });
}
