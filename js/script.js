$(document).ready(function(){
	var albumLength = Object.keys(albums).length;
	var albumIdx = Math.floor(Math.random() * albumLength);
	
	var playList = new jPlayerPlaylist(
		{
			jPlayer: '#player-container',
			cssSelectorAncestor: '#player'
		},
		albums[albumIdx]["songs"],
		{
			playlistOptions: {
				autoPlay: true,
				loopOnPrevious: true
			},
			swfPath: 'js/',
			supplied: 'mp3',
			wmod: 'window',
			solution: 'html, flash',
			cssSelector: {
				play: '.btn-play',
				pause: '.btn-pause',
				seekBar: '.seek-bar',
				playBar: '.play-bar',
				volumeBar: ".volume",
				volumeBarValue: ".volume-value",
				title: '.name',
				mute: '.max-volume',
				unmute: '.min-volume',
				currentTime: '.current-time',
				duration: '.duration'
			},
			volume: 1
		}
	);
	playList.shuffle(true, false);
	
	$("#player-container").bind($.jPlayer.event.loadstart, function(e){
		var current = playList.current;
		var list = playList.playlist;
		
		$.each(list, function(idx, obj){
			if(idx == current){
				$(".artist").text(obj.artist);
				$("title").html(obj.title + " - " + obj.artist + " | Feeling Music");
				$(".middle-control").css("background", "url(" + obj.poster + ")");
			}
		});
	});
		
	var $playerBtn = $(".middle-control a");
	$(".middle-control").hover(function() {
		$playerBtn.addClass("animated fadeInDown")
			.css('visibility', 'visible')
			.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
				$(this).removeClass("animated fadeInDown");
			});
	}, function() {
		$playerBtn.addClass("animated fadeOutUp")
			.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
				$(this).removeClass("animated fadeOutUp")
					.css('visibility', 'hidden');
			});
	});
	
	$("#popup-overlay").on("click", function() {
		showPopup(false);
	});
	$("#popup-container").on("click", function(event) {
		event.stopPropagation();
	});
	
	$(".show-popup").on("click", function() {
		var url = $(this).data("url");
		showPopup(true);
		$("#popup-content").html("Đang tải. Vui lòng đợi <img src='imgs/brick.png' />")
			.load(url, function() {
				$(this).find("li").eq(albumIdx).addClass("active");
			}
		);
	});
	
	$("#popup-content").on("click", "#list-album li", function() {
		albumIdx = $(this).index();
		playList.setPlaylist(albums[albumIdx]["songs"]);
		playList.shuffle(true, true);
		$("#popup-content li").removeClass();
		$(this).addClass("active");
		showPopup(false);
	});
	
	function showPopup(state) {
		var $popupOverlay = $("#popup-overlay");
		
		if (state == true) {
			$popupOverlay.fadeIn(function() {
				$popupOverlay.children().removeClass().show().addClass("animated fadeInDownBig");
			});
		} else {
			$popupOverlay.fadeOut();
			$popupOverlay.children().removeClass().addClass("animated fadeOutUpBig");
		}
	}
});