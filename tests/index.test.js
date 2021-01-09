const test = require("ava");
const dumpFilter = require("../");
const eleventyConfig = require("@11ty/eleventy/src/EleventyConfig");
const TemplateRender = require("@11ty/eleventy/src/TemplateRender");
const EleventyExtensionMap = require("@11ty/eleventy/src/EleventyExtensionMap");


function getNewTemplateRender(name, inputDir) {
  let tr = new TemplateRender(name, inputDir);
  tr.extensionMap = new EleventyExtensionMap();
  return tr;
}

test("does not thow", (t) => {
  t.notThrows(function () {
    eleventyConfig.addFilter("dump", dumpFilter);
  });
});

test("Test dump filter", async (t) => {
  let tr = getNewTemplateRender("njk");
  let engine = tr.engine;
  engine.addFilters({
    dump: dumpFilter,
  });
  let fn = await tr.getCompiledTemplate(
    `{% set test = "hi" | dump %}{{ test }}`
  );
  t.snapshot(await fn());
});