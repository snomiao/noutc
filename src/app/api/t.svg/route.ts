import { NextRequest, NextResponse } from 'next/server';
import { format, parse, formatDistanceToNow } from 'date-fns';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const timeParam = searchParams.get('t');
    const formatParam = searchParams.get('f') || 'yyyy-MM-dd HH:mm:ss zzz';
    const relativeParam = searchParams.get('relative') === 'true';
    const tzParam = searchParams.get('tz') || 'auto';

    // Parse the input time (use current time if no parameter provided)
    const inputDate = timeParam ? new Date(timeParam) : new Date();

    // Check if date is valid
    if (isNaN(inputDate.getTime())) {
      return new NextResponse('Invalid time format', { status: 400 });
    }

    // Determine timezone
    let timezone: string;

    if (tzParam === 'auto') {
      // Auto-detect timezone from Vercel geolocation headers
      // Reference: https://vercel.com/docs/edge-network/headers#request-headers
      const vercelTimezone = request.headers.get('x-vercel-ip-timezone');

      // Fallback to other timezone headers if Vercel header not available
      const timezoneHeader = vercelTimezone ||
                            request.headers.get('x-timezone') ||
                            request.headers.get('timezone') ||
                            request.headers.get('cf-timezone'); // Cloudflare header

      // Default to UTC if no timezone found
      timezone = timezoneHeader || 'UTC';
    } else {
      // Use the specified timezone parameter
      timezone = tzParam;
    }

    // Format the date according to the user's timezone and format string
    let formattedDate: string;

    if (relativeParam) {
      // Use relative time format
      formattedDate = formatDistanceToNow(inputDate, { addSuffix: true });
    } else {
      try {
        // Replace format string patterns to match date-fns format
        // YYYY -> yyyy, DD -> dd, hh -> HH (for 24-hour), mm -> mm, ss -> ss, TZ -> zzz
        const dateFnsFormat = formatParam
          .replace(/YYYY/g, 'yyyy')
          .replace(/DD/g, 'dd')
          .replace(/hh/g, 'HH')
          .replace(/mm/g, 'mm')
          .replace(/sss/g, 'ss')
          .replace(/TZ/g, 'zzz');

        formattedDate = formatInTimeZone(inputDate, timezone, dateFnsFormat);
      } catch (error) {
        formattedDate = formatInTimeZone(inputDate, timezone, 'yyyy-MM-dd HH:mm:ss zzz');
      }
    }

    // Generate SVG
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${formattedDate.length * 8 + 20}" height="30" viewBox="0 0 ${formattedDate.length * 8 + 20} 30">
  <rect width="100%" height="100%" fill="#f5f5f5"/>
  <text x="10" y="20" font-family="monospace" font-size="14" fill="#333">${formattedDate}</text>
</svg>`;

    // Return SVG response
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating SVG:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
