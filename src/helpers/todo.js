export function isValidListName(name) {
  return name && !/(\.ico|\.txt|\.js|\.css)$/.test(name.toLowerCase());
}
