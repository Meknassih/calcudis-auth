function strip(string) {
  return string.replace(/^\s+|\s+$/g, '');
}

module.exports = { strip };