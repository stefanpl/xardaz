import urlJoin from 'url-join';

export function buildUrl(...parts: Array<string>): string {
  return urlJoin(parts);
}
