# imgcrop

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A Deno-based command-line tool for cropping images, with specialized features for creating grid-based and Instagram-ready posts.

## Features

-   Crop images into one or more specified regions.
-   Divide a single image into a grid with configurable dimensions, offsets, and gaps.
-   Generate perfectly sized and spaced image grids for Instagram multi-image posts.
-   Supports PNG and JPEG formats.

## Requirements

-   [Deno](https://deno.land) runtime environment

## Usage

The tool consists of three distinct scripts for different cropping tasks. Output files are saved in the same directory as the input file, with a `_<number>` suffix (e.g., `input_1.jpg`, `input_2.jpg`).

### 1. Basic Crop (`imgcrop.js`)

Crops an image into one or more specified rectangular regions.

**Command:**

```sh
deno run -A imgcrop.js <input_file> <x,y,w,h> [<x,y,w,h>...]
```

-   `<input_file>`: Path to the source image (e.g., `test.jpg`).
-   `<x,y,w,h>`: A comma-separated string defining a crop area: `x`-coordinate, `y`-coordinate, `width`, and `height`. You can specify multiple areas.

**Example:**

```sh
deno run -A imgcrop.js test.jpg 100,100,500,500 200,200,500,500
```

This command creates two files, `test_1.jpg` and `test_2.jpg`, from the specified coordinates.

### 2. Grid Crop (`imgcroprepeat.js`)

Divides a source image into a grid of smaller images.

**Command:**

```sh
deno run -A imgcroprepeat.js <input_file> <offx,offy,w,h,gapw,gaph,nw,nh>
```

-   `<offx,offy>`: The starting `x,y` coordinates for the top-left corner of the grid.
-   `<w,h>`: The `width` and `height` of each individual cropped image.
-   `<gapw,gaph>`: The horizontal and vertical gap (in pixels) between each crop.
-   `<nw,nh>`: The number of columns (`nw`) and rows (`nh`) in the grid.

**Example:**

```sh
deno run -A imgcroprepeat.js test.jpg 4,4,616,616,7,7,3,3
```

This command creates a 3×3 grid (9 total images, `test_1.jpg` to `test_9.jpg`). Each crop is 616x616 pixels, with a 7-pixel gap between them, starting from an offset of (4,4).

### 3. Instagram Grid Crop (`imgcropinsta.js`)

Generates a grid of square images optimized for Instagram's multi-post feature. The output files are numbered in reverse order, so you can upload them sequentially (`_1`, `_2`, etc.) to have them appear correctly in your profile grid.

**Command:**

```sh
deno run -A imgcropinsta.js <input_file> <offx,offy,imgw,nw,nh,pcmode>
```

-   `<offx,offy>`: The starting `x,y` coordinates for the top-left corner of the grid.
-   `<imgw>`: The width and height for each square image (e.g., `1080` for standard Instagram posts).
-   `<nw,nh>`: The number of columns (`nw`) and rows (`nh`) in the grid.
-   `<pcmode>`: Sets the gap calculation mode.
    -   `0`: Smartphone mode (smaller gap, proportional to a 388px base).
    -   `1`: PC mode (larger gap, proportional to a 618px base).

**Example:**

```sh
deno run -A imgcropinsta.js test.jpg 0,0,1200,3,2,0
```

This command creates a 3×2 grid (6 images) optimized for smartphone viewing. Each image is 1200x1200 pixels. The output files (`test_1.jpg` to `test_6.jpg`) are numbered for correct upload order.

## License

MIT License — see [LICENSE](LICENSE).