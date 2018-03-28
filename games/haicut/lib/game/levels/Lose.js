ig.module( 
	'game.levels.Lose' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.input',
	'plugins.button'
	
)

.defines(function(){

	Lose = ig.Game.extend({
		
		// Load a font
		font: new ig.Font( '', 18, null, null, '#FFFFFF','center', 2, false),
		init: function() {		
			// activate the mouse input
	  		ig.input.initMouse();
	  		ig.input.bind( ig.KEY.MOUSE1, 'click');	
	  		
			// background
			bg = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(700), y:ig.getY(525)},
				zIndex: 0,
				animSheet: new ig.AnimationSheet( 'media/bglose.png', ig.getX(700), ig.getY(525)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(0), ig.getY(0));

			anim_bintang = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 1,
				init: function( x, y, settings ) {
					this.animSheet= new ig.AnimationSheet( 'media/anim-bintangbesar.png', ig.getX(236), ig.getY(56));
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(300), ig.getY(226));

			btnSelect = this.spawnEntity( Button.extend({
				size: {x: ig.getX(111), y:ig.getY(44)},
				zIndex: 2,
				text:['Select Level'],
				textPos: {x:ig.getX(55),y:ig.getY(30)},
				animSheet: new ig.AnimationSheet( 'media/button2.png',  ig.getX(111), ig.getY(44)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				},
				pressedUp:function(){
					ig.system.setGame(SelectLevel);
				}
				
			}), ig.getX(300), ig.getY(318));

			btnTry = this.spawnEntity( Button.extend({
				size: {x: ig.getX(111), y:ig.getY(44)},
				zIndex: 3,
				text:['Try Again'],
				textPos: {x:ig.getX(55),y:ig.getY(30)},
				animSheet: new ig.AnimationSheet( 'media/button2.png',  ig.getX(111), ig.getY(44)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				},
				pressedUp:function(){
					ig.system.setGame(eval(ig.global.tipeGame));
				}
				
			}), ig.getX(426), ig.getY(318));
			
			
			btnLogo = this.spawnEntity(LogoButton, 10, 15);
			btnSound = this.spawnEntity(SoundButton, 638, 15);
			
			this.sortEntitiesDeferred();
		},

		update: function() {
			this.parent();
		},
		
		draw: function() {
			this.parent();
		}

	});

	
});
