# No-fuss presentations!
## With Markdown!

---

So this is just Markdown, but with a few tweaks.

1. Horizontal rules (`---`) will create a new slide.
2. Comments `[//]: # (...)` turn into presenter notes.
3. Images can be positioned with the alt text `![small left](url)`.
4. Anchor links `[text](url)` will always open in a new tab.
5. We have tables!
6. Fenced code blocks with syntax highlighting.

---

## Table of contents

1. Markdown Crash Course
2. Images
3. Presenter Notes
4. File Management
5. Shortcuts and Tricks

---

# 1. Markdown Crash Course

---

# Header 1
## Header 2
### Header 3

*italics*

**bold**

~~strikethrough~~

> multi-line
> block quote

---


1. Ordered
2. List of items

+ Un-ordered
+ List of items

A link to [gwillz.com](gwillz.com).

---


Some `inline` code.

```python
code.block("with syntax").highlighting()
# Also a 'copy' button on mouse hover
```

| Table | of      | items  |
|-------|---------|--------|
| items | in      | table  |
| more  | `stuff` | *here* |

---

## 2. Images

`![position](url)`

Images will by default be no larger than 35% of the screen and centered wherever you write them.



the `![...]` parameter is typically the 'title' or 'alternate text'. Here we
abuse this and instead use it to control the image position.

---

## 2. Images: Floating

| Modifier   | Action |
|------------|--------|
| `![left]`  | float left  | 
| `![right]` | float right |


![left](example.jpg)
This will float the image left or right. Any text should wrap neatly around it.

---

## 2. Images: Sizes

| Modifier    | Action |
|-------------|--------|
| `![big]`    | force 100%  |
| `![medium]` | force 60%   |
| `![small]`  | force 40%   |
| `![tiny]`   | force 20%   |

These should be relatively straight-forward.

![big](example.jpg)

---

## 3. Images: `hard` Position

We can combine modifiers to control size _and_ position.

With `hard` we can also position `top` and `bottom`. 
Although note, you must combine with a `left` or a `right`.

`![hard tiny top left](example.jpg)`

![hard tiny top left](example.jpg)
![hard tiny top right](example.jpg)
![hard tiny bottom left](example.jpg)
![hard tiny bottom right](example.jpg)

---

## 3. Presenter Notes

Comments looks like this `[//]: # (...)`. 
It may be clunky, but it standard (mostly).

[//]: # (Look ma, no rendering!)

Comments will not render in Markdown. 
But we extract these and create a set of bullet-point notes.

Currently, these are only visible in printing mode.

[//]: # (These can be anywhere within the slide.)
[//]: # (They can also contain `inline` **markdown**)

---

## 4. File Management

You can save a presentation to your browser using the file dialog.

Give it a name and it'll be auto-saved as you work on it. You can find it
later in the 'file dialog', but only on that browser on that computer.
If you want to move it around to different computers, download it with the 
'download/export' button.

If you can host your file online (like Dropbox or Google Drive), you can load
it with `https://gwillz.github.io/slides/?url=...`.

**Tip:**: for Dropbox, the given public link will not work. Your URL should look
like this: `https://dl.dropboxusercontent.com/s/.../filename.md?raw=1`.

[//]: # (The host must be CORS (cross-origin) compliant.)

---

## 5. Shortcut and Tricks

| Keys       | Action                 |
|------------|------------------------|
| Ctrl+O     | Open file dialog       |
| Ctrl+F1    | Start presentation     |
| Ctrl+Home  | Scroll both views up   |
| Ctrl+End   | Scroll both views down |
| Ctrl+1     | Focus editor           |
| Ctrl+2     | Focus preview          |
