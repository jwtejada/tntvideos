# TNT Videos
Code by Tabitha R. modified by Jose T. Use it, try it, modify it, love it or hate it.

## Dependents
- Get Device 
- Retrieve Youtube
- Fluid-vid

### Basic 
```javascript
$(function () {			
	$("[data-vimeo]").tntvideos();	
});
```

### Advanced 
```javascript
$(function () {			
	$("[data-vimeo]").tntvideos({
		playButton: '.play-btn',
		youtube: false
	});	
});
```

## Available Options
|  Defaults | Description  |
| ------------ | ------------ |
|  youtube: true | Lazy load youtube videos, container must have a youtube class.   |
|  youtubeClass: '.youtube' | Lazy load youtube class default  |
| playButton: '.play'  | Default class for the play button  |
| closeButton: '.close' |  Default class for the close button |
| animate: true  | Scroll animation to the top of the container  |
| offset: Int | By default the offset is the height of the header tag, you can also use an integer.  |

## Banner HTML
    <div class="banner" data-vimeo="290738166.hd.mp4?s=ee27ae407692d8723a18b6c5e43356c7caac01a6">
    		<div data-embed="yEkWVQywXIE" data-width="560" data-height="315">
    			<img alt="youtube thumbnail" class="thumbnail" src="https://img.youtube.com/vi/yEkWVQywXIE/maxresdefault.jpg">
    		</div>
    		<div class="caption">
    			<h1>example caption</h1>
    			<a class="play">Play Video</a>
    		</div>
    </div>

## Youtube Lazyload HTML
Include a custom image thumbnail or leave the container empty to use the default high resolution image from the youtube video.
```html
<div class="youtube" data-embed="Ivx8TAcGKP8" data-width="560" data-height="315">
		<img alt="youtube thumbnail" class="thumbnail" src="mycustomthumbnail.jpg">
</div>
```

## Links
https://codepen.io/endeart/pen/WPNBWW