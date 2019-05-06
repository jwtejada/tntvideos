/* get device */
function getOS() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
		return 'iOS'
	} else if (userAgent.match(/Android/i)) {
		return 'Android'
	} else {
		return 'unknown'
	}
}

/* retrive youtube video */
(function ($) {
	$.fn.setupYoutube = function () {
		iframe = document.createElement("iframe");
		iframe.setAttribute("frameborder", "0");
		iframe.setAttribute("allowfullscreen", "");
		iframe.setAttribute("width", this.attr("data-width"));
		iframe.setAttribute("height", this.attr("data-height"));
		iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.attr("data-embed") + "?rel=0&autoplay=1&playsinline=1&enablejsapi=1");
		this.prepend(iframe);
		var videoRatio = (iframe.height / iframe.width) * 100;
		iframe.style.position = 'absolute';
		iframe.style.top = '0';
		iframe.style.left = '0';
		iframe.style.right = '0';
		iframe.width = '100%';
		iframe.height = '100%';
		var wrap = document.createElement('div');
		wrap.className = 'fluid-vid';
		wrap.style.width = '100%';
		wrap.style.position = 'relative';
		wrap.style.paddingTop = videoRatio + '%';
		var iframeParent = iframe.parentNode;
		iframeParent.insertBefore(wrap, iframe);
		wrap.appendChild(iframe)
	}
})(jQuery);

$('.youtube').each(function () {
	//check if div is empty
	if($(this).is(':empty')) {
		$(this)
			.empty()
			.append('<img alt="youtube thumbnail" class="thumbnail" src="https://img.youtube.com/vi/' +	$(this).data('embed') + '/maxresdefault.jpg">');
	}
	$(this).on("click", function () {
		$(this).find(".thumbnail").remove();
		for (var i = 0; i < $('iframe').length; i++) {
			$('iframe')[i].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
		}
		$(this).addClass("active").setupYoutube();
	});
});  

(function($){ 
	$.fn.extend({          
		tntvideos: function(options) { 
			var defaults = {
				playButton: '.play',
				closeButton: '.close',
				closeButtonString: null,
				animate: true,
				offset: $("header").outerHeight(),
				bodyPlaying: null,			
				mobileWidth: 900,
				onPlay: function() {},
				onClose: function() {}
			}                  
			options =  $.extend(defaults, options);			
			var vid_total = this.length - 1;
			return this.each(function(index) {		
				var o = options;			
				var closeBtn = o.closeButton.replace(/\./g, '');
				var vid_obj = $(this);
				var vid_type = vid_obj.data('player');								
								
				if ( $(window).width() > o.mobileWidth ) {
						if (vid_type == "vimeo" || vid_type == "vimeo-solo") {							
							$(this).find(".thumbnail").remove();
							setupVimeo(vid_obj);					
						}
				}					
				if ($(window).width() < o.mobileWidth ) {
					$(this).find(o.playButton).appendTo($(this).find("[data-embed]"));
				}	
				if (o.closeButtonString != null) {
					var closeBtnString = o.closeButtonString;
				} else {
					var closeBtnString = '<i class="icon-plus"></i> Close Video';
				}
				
				//PLAY BUTTON
				$(this).on("click", o.playButton, function () {		
					var vid_type = vid_obj.data('player');

					//check if user wants a header class
					if(o.bodyPlaying != null) {
						$("body").addClass(o.bodyPlaying.replace(/\./g, ''));
					}
					vid_obj.find(o.playButton).hide();

					if (vid_type=="vimeo") {
						playVimeo(vid_obj, closeBtn, closeBtnString);					
					} else if (vid_type=="youtube") {
						playYoutube(vid_obj, closeBtn, closeBtnString);
					}
					
					if (vid_type=="vimeo-solo") {
						if ($(window).width() < o.mobileWidth) {							
					  	setupVimeo(vid_obj);
						}
						playVimeoSolo(vid_obj, closeBtn, closeBtnString);											
					}
					
					if ($(window).width() > o.mobileWidth && o.animate == true) {
						$('html, body').animate({
							scrollTop: vid_obj.find("[data-embed]").offset().top - o.offset
						}, 1000);
					}

					//on play stop all other videos
					for (var i = 0; i < $('iframe').length; i++) {
						$('iframe')[i].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
					}
					options.onPlay.call(this);
					return false;
				});

				$(this).on("click", o.closeButton, function () {					
					var vid_obj = $(this).parents("[data-player]");	
					var vid_type = vid_obj.data('player');
					
					vid_obj.removeClass("playing");
					vid_obj.find('.fluid-vid, iframe').remove();
					vid_obj.find(o.closeButton).remove();					
					vid_obj.find('video, .thumbnail').show();
					vid_obj.find(o.playButton).show();

					if(o.bodyPlaying != null) {
						$("body").removeClass(o.bodyPlaying.replace(/\./g, ''));
					}
					
					var vid_stop = true;
					if (vid_type == "vimeo-solo") {
						if ( $(window).width() < options.mobileWidth ) {
							  vid_obj.find('video').remove();						
						} else {
						 playVimeoSolo(vid_obj, closeBtn, closeBtnString, vid_stop);
						}
					}
					
					if(o.animate == true) {
						$('html, body').animate({
							scrollTop: vid_obj.offset().top - o.offset
						}, 1000);	}
					options.onClose.call(this);
					return false;
				});					
				if ( index == vid_total ){
					return false;
				} 			
			});	//end each loop
			
			function setupVimeo(vid_obj) {
				vid_obj
					.find("[data-embed]")
					.prepend('<video autoplay="true" muted="muted" loop="true" src="https://player.vimeo.com/external/' + vid_obj.data('vimeo') + '&profile_id=174"></video>');
			}

			function playVimeo(vid_obj, closeBtn, closeBtnString) {
				vid_obj.addClass("playing").find("[data-embed]")
					.append('<a class="' + closeBtn + '">' + closeBtnString + '</a>')
					.setupYoutube();
				vid_obj
					.find("video, .thumbnail")
					.hide();
			}
			//extra function to setup vimeo legacy code		
			function playVimeoSolo(vid_obj, closeBtn, closeBtnString, vid_stop) {
				var video = vid_obj.find("video");		
								
				if (vid_stop){	
					vid_obj.removeClass("playing");
					video.attr({
						"controls": "false",
						"muted": "true",
						"loop": "true"
					});
					video[0].muted = 1;
					video[0].controls = 0;
				}else {    
					vid_obj.addClass("playing")
						.find("[data-embed]")
						.append('<a class="' + closeBtn + '">' + closeBtnString + '</a>').find(".thumbnail").hide();
					video.attr({
						"controls": "true",
						"muted": "false",
						"loop": "false"
					});
					video[0].currentTime = 0;
					video[0].muted = 0;
					video[0].controls = 1;
				}
			}

			function playYoutube(vid_obj, closeBtn, closeBtnString) {
				vid_obj.addClass("playing").find("[data-embed]")
					.append('<a class="' + closeBtn + '">' + closeBtnString +'</a>');
				vid_obj.find(".thumbnail").hide();
				for (var i = 0; i < $('iframe').length; i++) {
					$('iframe')[i].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
				}
				vid_obj.addClass("active").find('[data-embed]').setupYoutube();

			}
		}
	});
})(jQuery);
