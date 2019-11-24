import urlJoin from 'url-join';

export function buildUrl(...parts: Array<string | number>): string {
  return urlJoin(parts.map(part => `${part}`));
}
