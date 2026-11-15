# Bundled fonts

These assets retain the site's existing typefaces without reaching Google Fonts
at build time. They add about 97 KiB of font data and no package dependency.

| File | Source | License |
| --- | --- | --- |
| `instrument-sans-latin.woff2` | [Google Fonts Instrument Sans v4, Latin 400-700](https://fonts.gstatic.com/s/instrumentsans/v4/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr0SZe1ZuWi3g.woff2) | [OFL](instrument-sans-OFL.txt) |
| `newsreader-latin.woff2` | [Google Fonts Newsreader v26, Latin 200-800](https://fonts.gstatic.com/s/newsreader/v26/cY9VfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBAbNJYQ5ayZC.woff2) | [OFL](newsreader-OFL.txt) |
| `noto-sans-sc-social.ttf` | [Google Fonts Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC), v41 regular, text subset | [OFL](noto-sans-sc-OFL.txt) |

The first two are the same Latin files already preloaded by the site. Chinese
web text still uses the existing system font stacks. The TTF includes only the
characters rendered in the Chinese share image, including `XENTRA`. When that
copy changes, request a new Noto Sans SC subset using the Google Fonts CSS API
`text` parameter and download the TrueType URL with the existing OFL notice.
Rebuild and inspect both Chinese share-image endpoints before publishing.
