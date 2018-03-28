ig.module( 
	'game.levels.Congrat' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.input',
	'plugins.button'
	
)

.defines(function(){

	Congrat = ig.Game.extend({
		
		// Load a font
		font: new ig.Font( '', 23, null, null, '#FFFFFF','center', 2, false),
		init: function() {

			ig.global.totalLevel = 12;
			ig.global.level = 1; 

			// activate the mouse input
	  		ig.input.initMouse();
	  		ig.input.bind( ig.KEY.MOUSE1, 'click');	
	  		
			// background
			bg = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(700), y:ig.getY(525)},
				zIndex: 0,
				animSheet: new ig.AnimationSheet( 'media/bgcongrat.png', ig.getX(700), ig.getY(525)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(0), ig.getY(0));

			btnStart = this.spawnEntity( Button.extend({
				size: {x: ig.getX(179), y:ig.getY(74)},
				zIndex: 1,
				text:['Play Again'],
				textPos: {x:ig.getX(89),y:ig.getY(37)},
				animSheet: new ig.AnimationSheet( 'media/button-main.png',  ig.getX(179), ig.getY(74)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				},
				pressedUp:function(){
					ig.system.setGame(SelectLevel);
				}
				
			}), ig.getX(30), ig.getY(180));

			btnStart = this.spawnEntity( Button.extend({
				size: {x: ig.getX(179), y:ig.getY(74)},
				zIndex: 1,
				text:['Main Menu'],
				textPos: {x:ig.getX(89),y:ig.getY(37)},
				animSheet: new ig.AnimationSheet( 'media/button-main.png',  ig.getX(179), ig.getY(74)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				},
				pressedUp:function(){
					ig.system.setGame(MainMenu);
				}
				
			}), ig.getX(500), ig.getY(180));
			
			//btnLogo = this.spawnEntity(LogoButton, 10, 15);
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
