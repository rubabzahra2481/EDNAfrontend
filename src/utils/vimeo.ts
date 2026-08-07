/**
 * Vimeo URL → embeddable player src (hash-aware).
 *
 * Ported from the iOS app's VideoURLParser: supports unlisted links where the
 * privacy hash rides in the path (vimeo.com/123456789/abcdef1234) or as a
 * query param (?h=abcdef1234). Unlisted videos will NOT play without the hash.
 */

export interface VimeoEmbed {
  src: string;
  videoId: string;
}

export function toVimeoEmbed(url: string | null | undefined): VimeoEmbed | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  let parsed: URL;
  try {
    parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
  } catch {
    return null;
  }
  if (!/(^|\.)vimeo\.com$/.test(parsed.hostname)) return null;

  const segments = parsed.pathname.split('/').filter(Boolean);

  // player.vimeo.com/video/{id}
  if (parsed.hostname === 'player.vimeo.com') {
    const idIndex = segments.indexOf('video') + 1;
    const videoId = segments[idIndex];
    if (!videoId || !/^\d+$/.test(videoId)) return null;
    const hash = parsed.searchParams.get('h');
    return {
      videoId,
      src: `https://player.vimeo.com/video/${videoId}${hash ? `?h=${hash}` : ''}`,
    };
  }

  // vimeo.com/{id} or vimeo.com/{id}/{hash}
  const videoId = segments.find((s) => /^\d+$/.test(s));
  if (!videoId) return null;
  const idIndex = segments.indexOf(videoId);
  const pathHash = segments[idIndex + 1];
  const hash = parsed.searchParams.get('h') || (pathHash && /^[0-9a-f]+$/i.test(pathHash) ? pathHash : null);

  return {
    videoId,
    src: `https://player.vimeo.com/video/${videoId}${hash ? `?h=${hash}` : ''}`,
  };
}
