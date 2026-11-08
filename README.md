# Forkcast

A meal-planning web app that people open from a link and add to their phone's home screen. Nothing to install from an app store.

- **Profile:** goal, current and goal weight, pace, 25 health focus options in four groups, 26 dietary restrictions in four groups, and how strictly you want to eat. Some conditions turn on the restrictions they need (celiac disease adds gluten-free).
- **Meal plan:** a weekly plan built for that profile, with calorie and macro targets, a goal date, meal swaps and a grocery list.
- **"I ate something else":** log what you actually ate (presets for common takeout meals, or your own numbers). The app rates it against the planned meal for your profile, explains why, and counts it in the day's totals.
- **Scanner:** the phone camera reads grocery barcodes. Products are looked up in [Open Food Facts](https://world.openfoodfacts.org), scored for your profile, and paired with healthier products from the same shelf.

Everything is saved on the user's own device; there are no accounts and no server.

## Hosting

It's a static site: `index.html`, `manifest.webmanifest`, `sw.js`, `icons/` and `vendor/`. Any HTTPS static host works (GitHub Pages, Netlify, Cloudflare Pages). HTTPS is required for the camera and the home-screen install.

On GitHub Pages: open the repo's **Settings → Pages**, set the source to **Deploy from a branch**, choose `main` and `/ (root)`, and save.

## Third-party code

`vendor/zxing.min.js` is the ZXing barcode library (Apache 2.0, see `vendor/zxing-LICENSE`). It is used on iPhones and other browsers that lack the built-in barcode reader.
