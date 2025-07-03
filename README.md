# ImageCompressor Electron App

ImageCompressor is a simple desktop application built with Electron that allows you to compress JPEG and PNG images with adjustable quality. It provides a user-friendly interface for selecting images, setting compression quality, and saving the compressed images to your computer.

## Features

- Compress JPEG and PNG images
- Adjustable quality slider
- File picker interface
- Output folder is automatically created in your home directory
- Cross-platform: works on Windows, macOS, and Linux
- Developer tools available in development mode

## Main Files

- `main.js`: Main Electron process, window creation, menu, and image compression logic
- `app/index.html`: Main UI for selecting and compressing images
- `app/js/render.js`: Renderer process script, handles UI events and IPC communication
- `app/about.html`: About window
- `assets/icons/`: Application icons for different platforms

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/image-compressor-electron.git
   cd image-compressor-electron
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the app:**
   ```bash
   npm start
   ```

## Usage

1. Launch the app with `npm start`.
2. Click "Browse" to select a JPEG or PNG image.
3. Adjust the quality slider to set the desired compression level.
4. Click "Resize" to compress the image.
5. The compressed image will be saved to a folder named `imageCompress` in your home directory. The output path is displayed in the app.

## Development

- To run in development mode (with dev tools enabled), set `NODE_ENV=development` before starting the app.
- The developer menu provides quick access to reload and toggle dev tools.

## Dependencies

- [Electron](https://www.electronjs.org/)
- [imagemin](https://github.com/imagemin/imagemin)
- [imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg)
- [imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant)
- [Materialize CSS](https://materializecss.com/)

## License

MIT

## Sidenote
This project is a part of electron Udemy course: "Electron From Scratch: Build Desktop Apps With JavaScript" by Brad Traversy
