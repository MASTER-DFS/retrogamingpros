# Retro Gaming Pros

The website for [retrogamingpros.com](https://retrogamingpros.com): retro gaming guides, console history and hardware explainers, plus NES and Atari repairs.

GitHub Pages builds the site with Jekyll every time `main` changes. The site is usually live a minute or two after a change.

## Writing a blog post

1. Open the [`_posts`](_posts) folder on GitHub and click **Add file → Create new file**.
2. Name the file with today's date and a short title, all lowercase with dashes:
   `2026-10-12-my-post-title.md`
3. Paste this at the top, then write the post below it:

   ```markdown
   ---
   title: "Your post title"
   description: "One or two sentences shown on the blog list and in search results."
   icon: cart
   ---

   Your first paragraph goes here.

   ## A section heading

   More text. **Bold**, *italic*, [a link](https://example.com), and lists all work.
   ```

4. Click **Commit changes**. The post appears on the blog and the homepage automatically.

**Icons:** `nes`, `snes`, `n64`, `gc`, `genesis`, `ps1`, `gb`, `cart`, `pad`, `disc`, `handheld`, `hdmi`, `power`.

**Images:** upload them to `assets/images/` and use `![What the photo shows](/assets/images/photo.jpg)`.

**Post date:** a post dated in the future won't appear until that date.

## Where things live

| Path | What it is |
|---|---|
| `index.html` | Homepage |
| `blog/index.html` | Blog list page |
| `_posts/` | Blog posts |
| `_layouts/`, `_includes/` | Shared page layout, header and footer |
| `assets/css/site.css` | All styles |
| `assets/js/site.js` | Pixel art, animations, system explorer and contact form |
| `CNAME` | The custom domain |
