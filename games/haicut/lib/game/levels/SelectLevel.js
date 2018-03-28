ig.module( 
	'game.levels.SelectLevel' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.input',
	'plugins.button'
	
)

.defines(function(){

	SelectLevel = ig.Game.extend({
		
		font: new ig.Font( '', 35, null, null, '#000','center', 2, true),
		init: function() {

	  		ig.input.initMouse();
	  		ig.input.bind( ig.KEY.MOUSE1, 'click');	
	  		
			bg = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(700), y:ig.getY(525)},
				zIndex: 0,
				animSheet: new ig.AnimationSheet( 'media/bglevel.png', ig.getX(700), ig.getY(525)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(0), ig.getY(0));

			for (var i = 1; i <= 12; i++) {
				this["btnLevel"+i] = this.spawnEntity( ButtonClick.extend({
					size: {x: ig.getX(72), y:ig.getY(73)},
					zIndex: 1,
					idx:i,
					init: function( x, y, settings ) {
						this.animSheet = new ig.AnimationSheet( 'media/btn-level-enabled.png',  ig.getX(72), ig.getY(73));
		    			this.addAnim( 'enabled', 1, [0] );
		    			this.animSheet = new ig.AnimationSheet( 'media/btn-level-disabled.png',  ig.getX(72), ig.getY(73));
		    			this.addAnim( 'disabled', 1, [0] );
		    			this.parent( x, y, settings );
		    			this.currentAnim = this.anims.disabled;
					},
					pressedUp:function(){
						if (this.currentAnim == this.anims.enabled){
							ig.global.level = this.idx;
							ig.system.setGame(Game);
						}
					}
					
				}), ig.getX(0), ig.getY(0));

				this["star"+i] = this.spawnEntity( ig.Entity.extend({
					size: {x: ig.getX(0), y:ig.getY(0)},
					zIndex: 2,
					page:0,
					init: function( x, y, settings ) {
						this.animSheet = new ig.AnimationSheet( 'media/star-level.png',  ig.getX(66), ig.getY(18));
		    			this.addAnim( 'star0', 1, [0] );
		    			this.animSheet = new ig.AnimationSheet( 'media/star-level.png',  ig.getX(66), ig.getY(18));
		    			this.addAnim( 'star1', 1, [1] );
		    			this.animSheet = new ig.AnimationSheet( 'media/star-level.png',  ig.getX(66), ig.getY(18));
		    			this.addAnim( 'star2', 1, [2] );
		    			this.animSheet = new ig.AnimationSheet( 'media/star-level.png',  ig.getX(66), ig.getY(18));
		    			this.addAnim( 'star3', 1, [3] );
		    			this.parent( x, y, settings );
		    			this.currentAnim = this.anims["star"+ig.global.jumlahStar[i-1]];
					}
				}), ig.getX(0), ig.getY(0));

				if (i <= ig.global.totalLevel) this["btnLevel"+i].currentAnim = this["btnLevel"+i].anims.enabled;
			};

			for (var i = 1; i <= 5; i++) {
				this["btnLevel"+i].pos.x = 116+(i-1)*98;
				this["btnLevel"+i].pos.y = 169;
				this["btnLevel"+(i+5)].pos.x = 116+(i-1)*98;
				this["btnLevel"+(i+5)].pos.y = 265;
				this["star"+i].pos.x = 119+(i-1)*98;
				this["star"+i].pos.y = 226;
				this["star"+(i+5)].pos.x = 116+(i-1)*98;
				this["star"+(i+5)].pos.y = 322;
				
			};
			this.btnLevel11.pos.x = 256;
			this.btnLevel11.pos.y = 360;
			this.btnLevel12.pos.x = 357;
			this.btnLevel12.pos.y = 360;

			this.star11.pos.x = 259;
			this.star11.pos.y = 417;
			this.star12.pos.x = 360;
			this.star12.pos.y = 417;
			
			//btnLogo = this.spawnEntity(LogoButton, 10, 15);
			btnSound = this.spawnEntity(SoundButton, 638, 15);

			this.sortEntitiesDeferred();
		},

		
		
		draw: function() {
			this.parent();

			this.font.draw("01", 151, 215,ig.Font.ALIGN.CENTER);
			this.font.draw("02", 249, 215,ig.Font.ALIGN.CENTER);
			this.font.draw("03", 347, 215,ig.Font.ALIGN.CENTER);
			this.font.draw("04", 446, 215,ig.Font.ALIGN.CENTER);
			this.font.draw("05", 544, 215,ig.Font.ALIGN.CENTER);
			this.font.draw("06", 151, 311,ig.Font.ALIGN.CENTER);
			this.font.draw("07", 249, 311,ig.Font.ALIGN.CENTER);
			this.font.draw("08", 347, 311,ig.Font.ALIGN.CENTER);
			this.font.draw("09", 446, 311,ig.Font.ALIGN.CENTER);
			this.font.draw("10", 544, 311,ig.Font.ALIGN.CENTER);
			this.font.draw("11", 292, 407,ig.Font.ALIGN.CENTER);
			this.font.draw("12", 392, 407,ig.Font.ALIGN.CENTER);
		}

	});

	
});
