ig.module(
	'game.entities.choice'
)
.requires(
	'game.entities.ButtonClick'
)

.defines(function() {

	
	//-------- BUTTON SOUND -------------
	SoundButton = ButtonClick.extend({
		size: {x: 31, y:31},
		zIndex: 50,				
		init: function( x, y, settings ) {
			this.animSheet = new ig.AnimationSheet( 'media/btnsoundon.png', 31, 31),
			this.addAnim( 'on', 1, [0] );
			this.animSheet = new ig.AnimationSheet( 'media/btnsoundoff.png', 31, 31),
			this.addAnim( 'off', 1, [0] );
			this.parent( x, y, settings );
			if (!ig.global.SOUND) this.currentAnim = this.anims.off;
		},
		pressedUp:function(){
			if (!ig.game._pause){
				if (ig.global.SOUND) {
					ig.global.sound.pause();
					ig.global.SOUND = false;
					this.currentAnim = this.anims.off;
				}
				else {
					ig.global.sound.play();
					ig.global.SOUND = true;
					this.currentAnim = this.anims.on;
				}
			}
		}
	});

	//--------- BUTTON PAUSE ----------
	PauseButton = ButtonClick.extend({
		size: {x: 31, y:31},
		zIndex: 50,				
		init: function( x, y, settings ) {
			this.animSheet = new ig.AnimationSheet( 'media/btnpause.png',31, 31),
			this.addAnim( 'idle', 1, [0] );
			this.parent( x, y, settings );
		},
		pressedUp:function(){
			if (!ig.game._pause){
				ig.game.bgPause = ig.game.spawnEntity( ig.Entity.extend({
					size: {x: ig.getX(700), y:ig.getY(525)},
					zIndex: 100,
					animSheet: new ig.AnimationSheet( 'media/bgpause.png', ig.getX(700), ig.getY(525)),
					init: function( x, y, settings ) {
		    			this.addAnim( 'idle', 1, [0] );
		    			this.parent( x, y, settings );
					}
				}), ig.getX(0), ig.getY(0));

				ig.game.btnResume = ig.game.spawnEntity( Button.extend({
					size: {x: ig.getX(152), y:ig.getY(51)},
					zIndex: 101,
					text:['Resume'],
					textPos: {x:75 , y:30},
					animSheet: new ig.AnimationSheet( 'media/button.png', ig.getX(152), ig.getY(51)),
					init: function( x, y, settings ) {
		    			this.addAnim( 'idle', 1, [0] );
		    			this.parent( x, y, settings );
					},
					pressedUp:function(){
						ig.game._pause = false;
						ig.game.bgPause.kill();
						ig.game.btnMain.kill();
						this.kill();
					}
				}), ig.getX(180), ig.getY(255));

				ig.game.btnMain = ig.game.spawnEntity( Button.extend({
					size: {x: ig.getX(152), y:ig.getY(51)},
					zIndex: 102,
					text:['Main Menu'],
					textPos: {x:75 , y:30},
					animSheet: new ig.AnimationSheet( 'media/button.png', ig.getX(152), ig.getY(51)),
					init: function( x, y, settings ) {
		    			this.addAnim( 'idle', 1, [0] );
		    			this.parent( x, y, settings );
					},
					pressedUp:function(){
						ig.system.setGame(MainMenu);
					}
				}), ig.getX(380), ig.getY(255));

				ig.game._pause = true;
			}
		}
	});

	LogoButton = ButtonClick.extend({
		size: {x: 192, y:27},
		zIndex: 200,				
		init: function( x, y, settings ) {
			this.animSheet = new ig.AnimationSheet( 'media/logo.png',192, 27),
			this.addAnim( 'idle', 1, [0] );
			this.parent( x, y, settings );
		},
		pressedUp:function(){
			clickLogo("http://www.7k7k.com/m-android/play/")			
		}
	});
	

});

