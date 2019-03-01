# TNT Videos
Jquery code for TNT banners and optimized youtube videos with lazyload.

## Dependents
- Get Device 
- Retrieve Youtube
- Fluid-vid

### Basic 
```javascript
$(function () {			
	$("[data-player]").tntvideos();	
});
```

### Basic Options 
```javascript
$(function () {			
	//defaults
	$("[data-player]").tntvideos({		
		playButton: '.play',
		closeButton: '.close',
		bodyPlaying: '.playing',
		mobileWidth: 900
	});			
});
```

### Advanced Options
```javascript
$(function () {			
	//defaults
	$("[data-player]").tntvideos({		
		playButton: '.play',
		closeButton: '.close',
		bodyPlaying: null,
		animate: true,
		mobileWidth: 900,
		onPlay: function() {
			//do something
		},
		onClose: function() {
			//do something
		}
	});			
});
```

## Available Options
|  Defaults | Description  |
| ------------ | ------------ |
| playButton: '.play'  | Default class for the play button  |
| closeButton: '.close' |  Default class for the close button |
| animate: true  | Scroll animation to the top of the container  |
| bodyPlaying: null | Add a body playing class |
| mobileWIdth: 900 | Responsive width |
| offset: Int | By default the offset is the height of the header, you can also use an integer.  |
| onPlay: function() | Callback function for the play button  |
| onClose: function() | Callback function for the close button |

## Banner Vimeo HTML
```html
    <div class="banner" data-player="vimeo" data-vimeo="290738166.hd.mp4?s=ee27ae407692d8723a18b6c5e43356c7caac01a6">
    	<div data-embed="yEkWVQywXIE" data-width="560" data-height="315">
    		<img alt="youtube thumbnail" class="thumbnail" src="https://img.youtube.com/vi/yEkWVQywXIE/maxresdefault.jpg">
    	</div>
    	<div class="caption">
    		<h1>example caption</h1>
    		<a class="play">Play Video</a>
    	</div>
    </div>
```
    
## Banner Vimeo Full Length HTML
```html
    <div class="banner" data-player="vimeo-solo" data-vimeo="290738166.hd.mp4?s=ee27ae407692d8723a18b6c5e43356c7caac01a6">
    	<div data-embed="290738166" data-width="560" data-height="315"></div>
    	<div class="caption">
    		<h1>example caption</h1>
    		<a class="play">Play Video</a>
    	</div>
    </div> 
```

## Banner Youtube Only(NEW) HTML
```html
    <div class="banner" data-player="youtube">
    	<div data-embed="yEkWVQywXIE" data-width="560" data-height="315"></div>
    	<a class="play"></a>
    </div> 
```    

## Youtube Lazyload HTML
Include a custom image thumbnail or leave the container empty to use the default high resolution image from the youtube video.
```html
	<div class="youtube" data-embed="Ivx8TAcGKP8" data-width="560" data-height="315">
		<img alt="youtube thumbnail" class="thumbnail" src="mycustomthumbnail.jpg">
	</div>
```

## Links
https://codepen.io/endeart/pen/WPNBWW
