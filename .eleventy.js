const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt = "", sizes = "100vw") {
  let metadata = await Image(src, {
    widths: [300, 600, "auto"],
    formats: ["webp", "jpeg"],
    outputDir: "./dist/img/",
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
  // Watch CSS files for changes
  eleventyConfig.setBrowserSyncConfig({
    files: './dist/css/**/*.css'
  });

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }
};
