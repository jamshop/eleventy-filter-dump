# 11ty Dump Filter

A useful debug filter for 11ty that can dump almost anything. 

Usage: 

```
{{ "something" | dump | safe }}
```

Needs `| safe` because it will output a `<script>` tag. The script renders the formatted contents of the dump to the top of the page.

It uses the Node inspect utility: https://nodejs.org/api/util.html#util_util_inspect_object_options

This means you can dump almost anything including many object in 11ty that cannot be normally stringified:

```
{{ collections | dump | safe }}
```