export function deleteHtml(string) {
  const regex = /(<([^>]+)>)/gi;
  return string.replace(regex, " ").trim();
}
