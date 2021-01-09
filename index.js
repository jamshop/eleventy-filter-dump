const util = require('util');
const ansiHTML = require('ansi-html');

const addScript = (content) => {

  // It's really important that the HTML strings are on one line. 
  // I've seen instances of some 11ty templates converting new lines into paragraphs
  const containerStyles = `background: black; color: #fff; padding: 5px;`;
  const stringifiedContent = JSON.stringify(`<pre style="${containerStyles}">${content}</pre>`);
  return `<script>(function(){const content = document.createElement('div');document.body.prepend(content);content.innerHTML = ${stringifiedContent}})();</script>`;
}

let dumpFilter = (object) => {
  // Let's be sure to escape HTML characters in the util.inspect results
  const safeContent = util.inspect(object, { colors:true })
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  return addScript(ansiHTML(safeContent))

}

dumpFilter.keys = (object) => {
  if (typeof object === 'object' && object !== null) {
    return addScript(JSON.stringify(Object.keys(object)))
  }
  return null;
}

module.exports = dumpFilter;