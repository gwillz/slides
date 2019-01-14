
# Markdown Slides

This is largly inspired by
[hacker-slides](https://github.com/jacksingleton/hacker-slides).

This is purely a client-side app, so rendering and file management all
happens locally with no server/backend getting involved.


## Key features
- Dark mode!
- Create slides with horizontal rules `---`
- Save work to browser storage
- Export/download files
- Print mode - includes notes written as comments `[//]: # ()`
- URL fetching with `?url=...` - must be CORS compliant.


## Tech things

It's all React and Redux. Showdown does the Markdown rendering with a 
highlight.js plugin for code syntaxes. Draft.js is the text editor, but
I haven't loaded it with plugins (yet) - so it's fairly boring.

There's a fair bit of cool stuff in here and plenty of opportunity to
extend functionality.


## TODO
- print view
    - page numbers
    - remove all borders (except .slides)
- rename 'clear/clean' to 'new file'
    - ask confirmation for creating new files
- add param for loading saved local files
- image position (`alt='left|right|top-left|etc'`)
    - like a 9 position grid thing
- write some examples in the placeholder
