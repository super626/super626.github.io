ig.module( 
	'plugins.preloader' 
)

.requires(
	'impact.font',
	'impact.image',
	'impact.game',
	'plugins.button'
)

.defines(function(){
	Preloader = ig.Loader.extend({
		font: new ig.Font( '', 25, '#fff', 3, true ),
		//bgImg: new ig.Image('media/buttler.png'),
		
		draw: function() {
			var p = (this._drawStatus*100).ceil();
			//log("@Preloader loading : " + p + " %");
			this._drawStatus += (this.status - this._drawStatus)/5;
			var s = ig.system.scale;
			var w = ig.system.width * 0.6;
			var h = ig.system.height * 0.01;
			var x = ig.system.width * 0.5-w/2;
			var y = ig.system.height * 0.5-h/2;
			
			this.font.draw("Loading Game ... ", x+w/2, y+h+30, ig.Font.ALIGN.CENTER);
		},
		
		//end: function() {
			// Unset .loader to tell the game we're finished
			//ig.game.loader = null;
			//clearInterval( this._intervalId );
		//},
		
	});
	
	IntermediateLoader = Preloader.extend({   
		font: new ig.Font( '', 25, '#fff', 3, true ),
		//bgImg: new ig.Image('media/buttler.png'),
		
		draw: function() {
			//window.log("bla");
			var p = (this._drawStatus*100).ceil();
			//log("@Preloader loading : " + p + " %");
			this._drawStatus += (this.status - this._drawStatus)/5;
			var s = ig.system.scale;
			var w = ig.system.width * 0.6;
			var h = ig.system.height * 0.01;
			var x = ig.system.width * 0.5-w/2;
			var y = ig.system.height * 0.5-h/2;
			
			ig.system.context.fillStyle = '#8B4C30';
			ig.system.context.fillRect( 0, 0, ig.global.CUR_WIDTH, ig.global.CUR_HEIGHT );
			
			//this.bgImg.draw(x, 0);
			
			ig.system.context.fillStyle = '#fff';
			ig.system.context.fillRect( x*s, y*s, w*s, h*s );
			
			ig.system.context.fillStyle = '#000';
			ig.system.context.fillRect( x*s+s, y*s+s, w*s-s-s, h*s-s-s );
			
			ig.system.context.fillStyle = '#fff';
			ig.system.context.fillRect( x*s, y*s, w*s*this._drawStatus, h*s );
			
			this.font.draw("Loading Game ... " + p + "%", x+w/2, y+h+30, ig.Font.ALIGN.CENTER);
		
		},
		
		end: function() {
		  // Unset .loader to tell the game we're finished
			ig.game.loader = null;
			clearInterval( this._intervalId );
		},
	});
	
	IntermediateLoader = ig.Loader.extend({    
	  end: function() {
		  // Unset .loader to tell the game we're finished
			ig.game.loader = null;
			clearInterval( this._intervalId );
	  },
	});
	
	/* TEMPORARY OUT OF ORDER
	PreloaderWin = ig.Game.extend({
		dummyImages:null,
		dummySounds:null,
		  
		init:function() {
			// test custom preloader
			ig.resources = [];
			ig.ready = false;
		  
			// load all images/animation needed on MainMenuWin ONLY !!
			this.dummyImages = [
				new ig.Image( 'media/1 - Main Menu/Main Menu.png' ),
				new ig.Image( 'media/Badonkadonk70.png' ),
				new ig.Image( 'media/Angelashand45White.png' )
			];
				
			// load all music/sound needed on MainMenuWin ONLY !!
			this.dummySounds = [
				new ig.Sound( 'media/0 - Sound/CMain_Sound.*', false)
			];
				
				
			// load the resources
			ig.ready = true;
			
			// Start the custom preloader with the captured resources
			this.loader = new Preloader( null, ig.resources );
			this.loader.load();
		}, 
		
		run:function() {
			if (!this.loader)
				this.parent();
		},
	  
	});
	*/
})
