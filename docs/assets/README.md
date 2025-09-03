# Assets Directory

This directory contains all the static assets for the Illusions Galore website.

## Files

- `favicon.svg` - Website favicon with gradient design
- `README.md` - This file

## Audio File

The website references an ambient audio file at `assets/ambient.mp3` for the sound toggle feature. 

**Note**: You'll need to add your own ambient audio file named `ambient.mp3` to this directory for the sound feature to work. The audio should be:
- Calming and non-intrusive
- Looped seamlessly
- In MP3 format
- Under 5MB for optimal loading

If you don't have an audio file, the sound toggle will still work but won't play any audio.

## Adding Your Own Audio

1. Place your `ambient.mp3` file in this directory
2. Ensure the filename matches exactly: `ambient.mp3`
3. The website will automatically detect and use it

## Alternative Audio Formats

If you prefer other audio formats, you can:
1. Update the `<audio>` tag in `index.html`
2. Change the `src` attribute to match your file
3. Update the `type` attribute accordingly

