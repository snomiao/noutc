# No UTC - Time Conversion Service

Convert UTC timestamps to local time as SVG images.

## Usage

Access the API endpoint:

```
/api/t.svg?t=<timestamp>&f=<format>
```

### Example

```
https://noutc.vercel.app/api/t.svg?t=2025-10-31T00:00:00Z&f=YYYYMMDD-hhmmsss%20TZ
```

### Parameters

- **t** (required): ISO 8601 timestamp
- **f** (optional): Date format string (default: yyyy-MM-dd HH:mm:ss zzz)

### Format Patterns

- `YYYY` - 4-digit year
- `MM` - 2-digit month
- `DD` - 2-digit day
- `hh` - 2-digit hour (24-hour)
- `mm` - 2-digit minute
- `sss` - 2-digit second
- `TZ` - timezone abbreviation

## Features

- Automatically detects user's timezone from HTTP request headers
- Converts UTC timestamps to local time
- Returns formatted time as SVG image
- Supports custom date format strings
- Built with Next.js and date-fns

## Development

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build
```

## Deployment

Deploy to Vercel:

```bash
vercel
```

The service will automatically detect user timezones from the following headers:
- `x-timezone`
- `timezone`
- `cf-timezone` (Cloudflare)

If no timezone header is found, defaults to UTC.
