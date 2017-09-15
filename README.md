#jaysQueries

jaysQueries is a lightweight DOM manipulation library inspired by jQuery

##Functions

`.html(string)` sets the argument, if provided, to become the `innerHTML` of each of the nodes. If an argument is not provided, it will return the `innerHTML` of the first node

`empty()` removes the `innerHTML` of each node

`append(argument)` adds the argument as a child to each node

`children` returns a `DOMNodeCollection` of every child of every node

`parent` returns a `DOMNodeCollection`of each nodes' parents

`find(argument)` returns a `DOMNodeCollection` of all child nodes matching the argument

`remove()` removes each element from the DOM
