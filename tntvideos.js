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

(function($){ 
$.fn.extend({          
	tntvideos: function(options) { 
	  var defaults = {				
		youtube: true,
		youtubeClass: '.youtube',
		playButton: '.play',
		closeButton: '.close',
		mobileWidth: 900
	}                      
  	options =  $.extend(defaults, options);
	if(options.youtube == true) {
		var yt = options.youtubeClass;
		ytLazyLoad(yt);
	}				
	return this.each(function() {				
			var o = options;
		if ($(window).width() > o.mobileWidth) {
			$(this).find(".thumbnail").remove();
			$(this)
				.find("[data-embed]")
				.prepend('<video autoplay="true" muted="muted" loop="true" src="https://player.vimeo.com/external/' + $(this).data('vimeo') + '&profile_id=174"></video>');
			}
		if ($(window).width() < o.mobileWidth) {
			$(this).find(o.playButton).appendTo("[data-vimeo] [data-embed]");
		}
		$(this).on("click", o.playButton, function () {
			var closeBtn = o.closeButton.replace(/\./g, '');
			var video_parent = $(this).parents("[data-vimeo]");
			video_parent
				.addClass("playing")
				.find("[data-embed]")
				.append('<a class="' + closeBtn + '"><i class="icon-plus"></i> Close Video</a>')
				.setupYoutube();
			video_parent.find("video, .thumbnail").hide();
			video_parent.find(o.playButton).hide();

			if ($(window).width() > o.mobileWidth) {
				$('html, body').animate({
					scrollTop: video_parent.find("[data-embed]").offset().top - $("header").outerHeight()
				}, 1000);
			}

			for (var i = 0; i < $('iframe').length; i++) {
							$('iframe')[i].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');}
			return false;
		});

		$(this).on("click", o.closeButton, function () {
			var video_parent = $(this).parents("[data-vimeo]");						
			video_parent.removeClass("playing").find(".fluid-vid, iframe").remove();
						video_parent.find(o.closeButton).remove();
			video_parent.find("video, .thumbnail").show();
						video_parent.find(o.playButton).show();
			$('html, body').animate({
				scrollTop: video_parent.offset().top - $("header").outerHeight()
			}, 1000);
			return false;
		});								
	});	
	
	//skip load if youtube option is false
	function ytLazyLoad(yt){
		$(yt).each(function () {
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
	}			
	}
});
})(jQuery);