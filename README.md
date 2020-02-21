
# Markdown Slides

Available [here](//gwillz.github.io/slides/).

I found myself presenting a class on programming recently. The slides were
prepared by a third-party group who also provided the exam and certificate.
Unfortunately, the material was often grossly incorrect and the code samples 
were all images instead of text.

I had to quickly turn around new slides as I went through the material. I hate
having bulky powerpoint software on my computers and I really wanted something 
that would do syntax highlighting without me having to think about it.


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
I found my requirements weren't the same and it was a good opportunity to
test a few new things.

Key differences; client-side only, file management, _limited_ automatic rendering.


## Browser support

Tested with:
- Firefox (latest/64+)
- Chromium (latest/71+)

Perhaps?:
- Edge (latest/17+)
- Safari (latest/11+)

Definitely not:
- Internet Explorer

IE could technically work, but I wasn't bothered enough to include all the required polyfills.  If someone really wants it, I'll throw them in :)

Also let me know if Safari and Edge work. That'd be cool.


## Build/dev

```sh
# clone stuff
git clone git@github.com:gwillz/slides
cd slides/

# install and build stuff
npm install
npm run webpack

# dev environment (in separate terminals)
npm run webpack -- -w
npm start

# deploy stuff
npm run clean
NODE_ENV=production npm run webpack
npm run pages # this pushes to origin/gh-pages
```

Feel welcome to create PRs if you please. I'm kinda picky about things but I
couldn't tell you what until I've seen it. I guess we'll find out!


## Techy things

- Typescript
- React
- Redux
- Showdown
- highlight.js
- Draft.js
- PostCSS
- Webpack

I think there's a fair bit of cool stuff in here and plenty of opportunity to
extend the functionality.

Ta!


## TODOs

- Remove draft.js
- Use cachebuster file names
- Make the divider draggable
- Mobile view? top/bottom instead of left/right
- Refactor files names
