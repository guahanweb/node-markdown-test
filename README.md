# Node Markdown Test

Experiments in custom filters within markdown content. The idea is to create a token that will allow for future flexibility and custom widgets within markdown files.

## Approach

1. Load contents of a markdown file
2. Parse markdown into HTML
3. Run filters to generate any custom widgets

## Module Syntax

Each module (or token) has two parts: the name, which identifies the widget we want injected, and a comma delimited list of attributes, which tell the widget **how** to render.

#### Example
```
{{ youtube: id=1234 }}
```

In this case, we can easily identify this as a youtube widget, and the `id` attribute identifies the video ID that is to be loaded.

It is extremely easy to extend the supported attributes with additional features as needed.

#### Output
**Original Markdown**

```markdown
# Custom Widget Test
Be sure to watch this YouTube video:
{{ youtube: id=1234 }}

Some more content after.
```


**After Markdown-to-HTML Parsing**

```html
<h1>Custom Widget Test</h1>
<p>Be sure to watch this YouTube video
{{ youtube: id=1234 }}</p>
<p>Some more content after.</p>
```

**After Custom Widget Parsing**

```html
<h1>Custom Widget Test</h1>
<p>Be sure to watch this YouTube video
[YouTube generation for ID #1234]</p>
<p>Some more content after.</p>
```

## Usage

There is a general `filter` module that automatically loads in all filters defined within its folder. When this is included, you can simply call `filters.parse(content)` on a string, and all recognized (and well formatted) filters will be applied to your widgets.

```javascript
const markdown = require('markdown');
const filters = require('./filters');

let content = "# Testing \
{{ youtube: id=1234 }}";

content = markdown.toHTML(content);
content = filters.parse(content);

console.log(content);
```