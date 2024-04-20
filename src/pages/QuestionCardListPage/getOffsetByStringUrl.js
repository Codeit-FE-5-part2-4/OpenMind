export function getOffsetByStringUrl(urlString) {
  if (!urlString) return null;
  const newUrl = new URL(urlString);
  const params = new URLSearchParams(newUrl.search);
  const offset = params.get("offset");
  return offset;
}
