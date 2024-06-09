export function getUrl(path? : string) {
  const base_url = process.env.NEXT_PUBLIC_APP_URL || '';
  const normalized_path = path && !path.startsWith('/') ? `/${path}` : path || ""

  return `${base_url}${normalized_path}`
}