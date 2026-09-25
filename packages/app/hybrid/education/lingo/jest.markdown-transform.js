const { createHash } = require('node:crypto');

module.exports = {
  process(sourceText) {
    return { code: `module.exports = ${JSON.stringify(sourceText)};` };
  },
  getCacheKey(sourceText, sourcePath) {
    const hash = createHash('md5')
      .update(sourceText)
      .update(sourcePath)
      .digest('hex');

    return `markdown:${hash}`;
  },
};
