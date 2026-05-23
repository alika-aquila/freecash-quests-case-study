const basePath = process.env.NODE_ENV === 'production' ? '/freecash-quests-case-study' : '';

export function assetPath(src: string): string {
  return `${basePath}${src}`;
}
