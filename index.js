const util = require('util');
const ansiHTML = require('ansi-html');

module.exports = (object) => {
  let content = label ? `<p>${label}</p>`:"";
  content += `<pre style="background: black; color: #fff; padding: 5px;">${ansiHTML(util.inspect(object, { colors:true }))}</pre>`;
  return `<script>
(function(){
  const content = document.createElement('div');
  document.body.prepend(content);
  content.innerHTML = ${JSON.stringify(content)}
})();
</script>`;
}