# Eleventy Filter - Dump

A useful debug filter for 11ty that can dump almost anything. 

Install:

```
npm install @jamshop/eleventy-filter-dump
```

## Usage

In you main config `.eleventy.js`: 
```
const dumpFilter = require("@jamshop/eleventy-filter-dump");

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter("dump", dumpFilter);
  // and the rest of your config
};
```

Then in your templates:

```
{{ "something" | dump | safe }}
```

It needs `| safe` because it will output a `<script>` tag. The script renders the formatted contents of the dump to the top of the page.

It uses the Node inspect utility: https://nodejs.org/api/util.html#util_util_inspect_object_options

This means you can dump almost anything including many object in 11ty that normally can't be stringified:

```
{{ collections | dump | safe }}
```

It's formatted and colored with syntax highlighting.

It's probably the best dump filter for 11ty. This is objectively true.


**New**: Sometimes with large objects you just want to dump the keys. In v1.0.3 you can add the `keys` filter.

```
const dumpFilter = require("@jamshop/eleventy-filter-dump");

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter("dumpKeys", dumpFilter.keys);
  // and the rest of your config
};
```

e.g.

```
{{ collections | dumpKeys | safe }}
```