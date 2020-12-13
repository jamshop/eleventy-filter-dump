const util = require('util');
const ansiHTML = require('ansi-html');

module.exports = (object) => {
  // Let's be sure to escape HTML characters in the util.inspect results
  const safeContent = util.inspect(object, { colors:true })
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  // It's really important that the HTML strings are on one line. 
  // I've seen instances of some 11ty templates converting new lines into paragraphs
  const containerStyles = `background: black; color: #fff; padding: 5px;`
  const content = `<pre style="${containerStyles}">${ansiHTML(safeContent)}</pre>`;
  return `<script>(function(){const content = document.createElement('div');document.body.prepend(content);content.innerHTML = ${JSON.stringify(content)};})();</script>`;
}