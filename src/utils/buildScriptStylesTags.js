const buildScriptTags = (scripts) =>
  scripts.replace(/<script async /g, '<script defer ');

const buildStyleTags = (styles) =>
  styles.replace(
    /<link data-chunk="([^"]+)" rel="stylesheet" href="([^"]+)">/g,
    (match, dataChunk, href) =>
      `<link data-chunk="${dataChunk}" rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="${href}"></noscript>`
  );

export { buildScriptTags, buildStyleTags };
