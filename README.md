# imgcrop

## crop

imgcrop [in png/jpeg] [x,y,w,h]+
```sh
deon run -A imgcrop.js test.jpg 100,100,500,500 200,200,500,500
```

## crop repeat

imgcroprepeat [in png/jpeg] [offx,offy,w,h,gapw,gaph,nw,nh]
```sh
deno run -A imgcroprepeat.js test.jpg 4,4,616,616,7,7,3,3
```

## crop for Instagram

imgcropinsta [in png/jpeg] [offx,offy,imgw,nw,nh,pcmode=0]
```sh
deno run -A imgcropinsta.js test.jpg 0,0,1200,3,2,0
```

## image

- [SLIM The Coffee Resort](https://slim.velvet.jp/index.html/)
