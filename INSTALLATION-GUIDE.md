# Quota Solutions — Fix Installation Guide

## What These Files Fix
1. **nav-fix.js** — Stops the "Home" button loop that kicks users back to the root homepage
2. **widget-fix.css** — Stops WhatsApp/chat floats from covering forms and CTAs
3. **travel-services-fix.css** — Makes the travel-services page match the main dark navy theme

## How to Install

### Step 1: Upload the 3 fix files to Cloudflare Pages

Upload these files to your `/campaigns/` folder:
- `campaigns/nav-fix.js`
- `campaigns/widget-fix.css`
- `campaigns/travel-services-fix.css`

### Step 2: Add to EVERY page (nav-fix.js + widget-fix.css)

Open each HTML file and add these 2 lines just before the closing `</body>` tag:

```html
<link rel="stylesheet" href="widget-fix.css">
<script src="nav-fix.js"></script>
```

If the page is NOT in the /campaigns/ folder (like index.html at root, or /compare/ or /resources/ pages), adjust the path:

```html
<link rel="stylesheet" href="campaigns/widget-fix.css">
<script src="campaigns/nav-fix.js"></script>
```

### Step 3: Add to travel-services.html ONLY

Open `campaigns/travel-services.html` and add this line in the `<head>` section, AFTER all other stylesheets:

```html
<link rel="stylesheet" href="travel-services-fix.css">
```

### Step 4: Re-upload to Cloudflare Pages

Drag and drop your entire site folder to Cloudflare Pages to deploy.

## What Each Fix Does

### nav-fix.js
- Intercepts all "Home" links on /campaigns/ pages
- Redirects them to campaigns/index.html instead of root /
- Fixes logo click to go to campaign hub, not homepage
- Fixes breadcrumb "Home" links
- Rewrites travel-services nav to match main site (Services/Blog/About/Contact)

### widget-fix.css
- Lowers z-index of WhatsApp/chat floats below forms
- Raises z-index of all form elements above floats
- On mobile: shrinks and fades floats so they don't cover content
- Removes duplicate float on contact page
- Pushes floats up when cookie banner is visible

### travel-services-fix.css
- Overrides the warm cream/copper theme with dark navy
- Matches nav, cards, forms, buttons, footer to main site design
- Ensures consistent visual experience when navigating from homepage
