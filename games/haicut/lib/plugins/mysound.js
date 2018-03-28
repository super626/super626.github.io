ig.module( 
	'plugins.mysound' 
)

.requires(
	'impact.font'
)


.defines(function(){
	
	ig.global.pauseBGM = function() {
		ig.global.universalBGM.pause();
	};
	
	ig.global.resumeBGM = function() {
		if (ig.global.SOUND)
			ig.global.universalBGM.play();
	};
	
	function Track(src, spriteLength, audioLead) {
		var track = this,
		audio = document.createElement('audio');
		audio.setAttribute("id","masterBGM");
		
		ig.global.universalBGM = audio;

//		audio.id = "masterBGM";
		audio.src = src;
		audio.autobuffer = true;
		audio.load();
		audio.muted = false; // makes no difference on iOS :(

		/* This is the magic. Since we can't preload, and loading requires a user's
		input. So we bind a touch event to the body, and fingers crossed, the
		user taps. This means we can call play() and immediate pause - which will
		start the download process - so it's effectively preloaded.
		This logic is pretty insane, but forces iOS devices to successfully
		skip an unload audio to a specific point in time.
		first we play, when the play event fires we pause, allowing the asset
		to be downloaded, once the progress event fires, we should have enough
		to skip the currentTime head to a specific point. */
		this.canPlay = false;
		var canplay = function() {
			if (ig.global.SOUND){
				this.canPlay = true;
				track.play();
			}
		}

		var force = function () {
			//console.log("force function");
			audio.load();

			if (this.canPlay == false)
				audio.pause();

			audio.removeEventListener('play', force, false);
		};

		var progress = function () {
			//console.log("progress audio");
			audio.removeEventListener('progress', progress, false);
			if (track.updateCallback !== null) track.updateCallback();
		};

		audio.addEventListener('canplay', canplay, false);
		audio.addEventListener('play', force, false);
		audio.addEventListener('progress', progress, false);
		
		var click = document.ontouchstart === undefined ? 'click' : 'touchstart';
		//console.log("CLICKKKK listener : " + click);
		
		var kickoff = function () {
			//console.log("CLICKKKK");
			track.play();
			document.documentElement.removeEventListener(click, kickoff, true);
		};

		document.documentElement.addEventListener(click, kickoff, true);
		
		
		//ig.system.canvas.addEventListener("click", sapi, true);
		//document.addEventListener("blur", sapi, true);
		

		this.updateCallback = null;
		this.audio = audio;
		this.playing = false;
		this.lastUsed = 0;
		this.spriteLength = spriteLength;
		this.audioLead = audioLead;
		
	}
	Track.prototype.pause = function() {
		this.audio.pause();
	}
	Track.prototype.play = function (position) {
		var track = this,
		audio = this.audio,
		lead = this.audioLead,
		length = this.spriteLength,
		time = lead + position * length,
		nextTime = time + length;
		  
		clearInterval(track.timer);
		track.playing = true;
		track.lastUsed = +new Date;

		audio.muted = false;
		audio.pause();
		audio.addEventListener('ended', function() {
			//console.log("ended");
			this.currentTime = 0;
			this.play();
			console.log('c');
		}, false);
		try {
			//console.log("sapi update call back A");
			if (time == 0) time = 0.01; // yay hacks. Sometimes setting time to 0 doesn't play back
			audio.currentTime = time;
			audio.play();
			
		} catch (e) {
			//console.log("sapi update call back b");
			this.updateCallback = function () {
			  //console.log("update callback audio");
			  track.updateCallback = null;
			  audio.currentTime = time;
			  audio.play();
			};
			audio.play();
		}

		//track.timer = setInterval(function () {
			//if (audio.currentTime >= nextTime) {
			  //audio.pause();
			  //audio.muted = true;
			  //clearInterval(track.timer);
			  //player.playing = false;
			//}
		//}, 10);
	};
	
	MySound = ig.Class.extend({
		
		tracks: null,
		total:0,
		init: function(src, n, spriteLength, audioLead) {
			var tracks = [];
			this.total = n;
			
		  
			while (n--) {
				tracks.push(new Track(src, spriteLength, audioLead));
			}

			this.tracks = tracks;
			
		},
		
		play: function (position) {
			//return;
			//console.log('MySound Play');
			var i = this.total;
			track = null;
			  
			while (i--) {
			if (this.tracks[i].playing === false) {
			  track = this.tracks[i];
			  break;
			} else if (track === null || this.tracks[i].lastUsed < track.lastUsed) {
					track = this.tracks[i];
				}
			}

			if (track) {
				track.play(position);
			} else {
				//console.log('could not find a track to play :');
			}
		},
		
		pause: function() {
			
			var i = this.total;
			while (i--) {
				if (this.tracks[i].playing === true) {
					this.tracks[i].pause();
				  	break;
				}
			}
		}
		
	});

	

})
