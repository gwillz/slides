
# Markdown Slides

Available [here](//slides.gwillz.com/).

I found myself presenting a class on programming recently. The slides were prepared
by a third-party group who also provided the exam and certificate. Unfortunately, the
material was often grossly incorrect and the code samples were images that couldn't edit.

I had to quickly turn around new slides as I went through the material. I hate having
bulky powerpoint software on my computers and I really wanted something that would
colour highlight my code nicely without me having to think about it.


## Key features

- Dark mode!
- Create slides with horizontal rules `---`
- Save work to browser storage
- Export/download files
- Print mode - includes notes written as comments `[//]: # ()`
- URL fetching with `?url=...` - must be CORS compliant
- Keyboard shortcuts galore


## Prior art

This is largly inspired by
[hacker-slides](https://github.com/jacksingleton/hacker-slides). 
I found my requirements weren't the same and it was a good opportunity to test a few new things.

Key differences; client-side only, file management, _limited_ automatic rendering.


## Techy things

- Typescript
- React
- Redux
- Showdown
- highlight.js
- Draft.js
- PostCSS/Webpack

I think there's a fair bit of cool stuff in here and plenty of opportunity to
extend the functionality.

Ta!
