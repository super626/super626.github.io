ig.module( 
	'game.levels.Game' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.input',
	'plugins.button',
	'game.entities.ButtonClick',
	'game.entities.hint'
)

.defines(function(){

	Game = ig.Game.extend({
		
		// Load a font
		font: new ig.Font( '', 23, null, null, '#FFFFFF','center', 2, false),
		fontGame: new ig.Font( '', 23, null, null, '#FFFFFF','center', 1, false),
		_pause : false,
		statusItem : ["shower","shampo1","shampo2","shampo3","shampo4","mask1","mask2","mask3","serum","towel"],
		statusHint : ["Wise Hair: Wise and rinse hair","Urang Aring Shampoo: Nourishing, great for wiry hair.",
					  "Aloe Vera Shampoo: Strengthens weak hair.","Honey Shampoo: Prevents hair loss.",
					  "Rose Petal Shampoo: Cools and moisturizes hair.","Wheat Hair Mask: Strengthens hair's roots.",
					  "Rose Petal Mask: Makes hair shine.","Olive Oil Mask: Nourishes hair.",
					  "Hair Serum: Makes hair shine.","Soft Towel: To dry hair."],
		posItemY : [6,6,94,184,274,6,94,184,6,6],
		posHintY : [40,129,218,308],
		statusGame : "shower",
		tempStatus : "",
		_animasi : false,
		totalShower : 0,

		timer_text : "",
		timer : 120,
		countTimer : 0,

		init: function() {		
			ig.global.tipeGame = "Game";
			// activate the mouse input
	  		ig.input.initMouse();
	  		ig.input.bind( ig.KEY.MOUSE1, 'click');	
	  		
			// background
			bg = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(700), y:ig.getY(525)},
				zIndex: 0,
				animSheet: new ig.AnimationSheet( 'media/bggame.png', ig.getX(700), ig.getY(525)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(0), ig.getY(0));

			for (var i = 1; i <=4 ; i++) {
				this["hint"+i] = this.spawnEntity( HintText.extend({
					zIndex: i,
					status:ig.game.statusItem[i-1],
					animSheet: new ig.AnimationSheet( 'media/game/hint.png', ig.getX(185), ig.getY(57)),
				}), ig.getX(470), ig.getY(ig.game.posHintY[i-1]));
			}

			for (var i = 1; i <=10 ; i++) {
				this["item"+i] = this.spawnEntity( ButtonClick.extend({
					size: {x: ig.getX(85), y:ig.getY(85)},
					zIndex: i+5,
					status:ig.game.statusItem[i-1],
					animSheet: new ig.AnimationSheet( 'media/item/item'+i+'.png', ig.getX(85), ig.getY(85)),
					init: function( x, y, settings ) {
		    			this.addAnim( 'idle', 1, [0] );
		    			this.parent( x, y, settings );
					},
					pressedUp:function(){
						if (!ig.game._pause && this.currentAnim.alpha == 1 && !ig.game._animasi){
							ig.game.tempStatus = this.status;
							ig.game.anim_panah.currentAnim.alpha = 1;
							ig.game.item_glow.currentAnim.alpha = 1;
							ig.game.item_glow.pos.x = this.pos.x - (ig.game.item_glow.size.x - this.size.x)/2;
							ig.game.item_glow.pos.y = this.pos.y - (ig.game.item_glow.size.y - this.size.y)/2;

						}
					}
				}), ig.getX(605), ig.getY(ig.game.posItemY[i-1]));
			};
			
			this.item_glow = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(90), y:ig.getY(90)},
				zIndex: 5,
				animSheet: new ig.AnimationSheet( 'media/game/item-glow.png', ig.getX(90), ig.getY(90)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(0), ig.getY(0));
			
			

			this.anim_panah = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 16,
				animSheet: new ig.AnimationSheet( 'media/game/anim-panah.png', ig.getX(48), ig.getY(68)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 0.033, [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(250), ig.getY(50));

			this.sensor_muka = this.spawnEntity( ButtonClick.extend({
				size: {x: ig.getX(167), y:ig.getY(132)},
				zIndex: 17,
				tekan:false,
				animSheet: new ig.AnimationSheet( 'media/game/sensor-muka.png', ig.getX(167), ig.getY(132)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				},
				pressedUp:function(){
					if (ig.game.tempStatus != "" && !ig.game._animasi){
						console.log('masuk');
						ig.game._animasi = true;
						ig.game.anim_panah.currentAnim.alpha = 0;
						ig.game.item_glow.currentAnim.alpha = 0;
						if (ig.game.statusGame == "shower")	ig.game.showAnimasiShower()
						else if (ig.game.statusGame == "shampo") ig.game.showAnimasiShampo();
						else if (ig.game.statusGame == "mask") ig.game.showAnimasiMask();
						else if (ig.game.statusGame == "towel") ig.system.setGame(DressUp);
						ig.game.sortEntitiesDeferred();
					}
				}
			}), ig.getX(220), ig.getY(105));

			this.wastafel = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 50,
				animSheet: new ig.AnimationSheet( 'media/game/wastafel.png', ig.getX(411), ig.getY(305)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(0), ig.getY(221));

			this.item_glow.currentAnim.alpha = 0;
			this.anim_panah.currentAnim.alpha = 0;
			this.sensor_muka.currentAnim.alpha = 0;
			//btnLogo = this.spawnEntity(LogoButton, 500, 480);
			btnSound = this.spawnEntity(SoundButton, 15, 15);
			btnPause = this.spawnEntity(PauseButton, 15, 55);
			
			this.sortEntitiesDeferred();

			this.showItem("shower");
			this.initTimer();
		},

		showItem: function(str) {
			var count = 1;

			for (var i = 1; i <=4 ; i++) {
				this["hint"+i].currentAnim.alpha = 0;
				this["hint"+i].text = [""];
			}
			for (var i = 1; i <=10 ; i++) {
				this["item"+i].currentAnim.alpha = 0;
				if (this["item"+i].status.substr(0,str.length) == str){
					this["item"+i].currentAnim.alpha = 1;
					this["hint"+count].currentAnim.alpha = 1;
					this["hint"+count].text = [ig.game.statusHint[i-1]];
					count++;
				}
			}
		},

		showAnimasiShower: function() {
			this.anim_shower = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 21,
				init: function( x, y, settings ) {
					this.animSheet = new ig.AnimationSheet( 'media/game/anim-shower.png', ig.getX(154), ig.getY(157));
		    		this.addAnim( 'idle', 0.033, [0,1,2,3] );
	    			this.parent( x, y, settings );
				},
				update:function(){
					this.parent();
					if (ig.game.tempStatus == "shower" && this.currentAnim.loopCount > 8){
						ig.game.totalShower++;
						ig.game._animasi = false;
						ig.game.showItem("shampo");
						ig.game.statusGame = "shampo";
						ig.game.tempStatus = "";
						this.kill();
						if (ig.game.totalShower == 2) {
							ig.game.anim_shampo.kill();
							ig.game.showItem("mask");
							ig.game.statusGame = "mask";
						}
						if (ig.game.totalShower == 3) {
							ig.game.anim_mask.kill();
							ig.game.showItem("towel");
							ig.game.statusGame = "towel";
						}
					}
				}
			}), ig.getX(0), ig.getY(0));

			this.anim_shower.pos.x = 130;
			this.anim_shower.pos.y = 65;
			
		},

		showAnimasiShampo: function() {
			this.anim_shampo = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 18,
				init: function( x, y, settings ) {
	    			this.animSheet = new ig.AnimationSheet( 'media/game/'+ig.game.tempStatus+'.png', ig.getX(129), ig.getY(149));
		    		this.addAnim( 'idle', 1, [0,0] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(0), ig.getY(0));

			this.anim_shampo.pos.x = 182;
			this.anim_shampo.pos.y = 124;

			ig.game._animasi = false;
			ig.game.showItem("shower");
			ig.game.statusGame = "shower";
			ig.game.tempStatus = "";
		},

		showAnimasiMask: function() {
			this.anim_mask = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 19,
				init: function( x, y, settings ) {
	    			this.animSheet = new ig.AnimationSheet( 'media/game/anim-mask.png', ig.getX(111), ig.getY(114));
		    		this.addAnim( 'idle', 1, [0,0] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(0), ig.getY(0));

			this.anim_mask.pos.x = 209;
			this.anim_mask.pos.y = 124;

			ig.game._animasi = false;
			ig.game.showItem("shower");
			ig.game.statusGame = "shower";
			ig.game.tempStatus = "";
		},
		
		initTimer: function(){
			var menit = Math.floor(100 + this.timer / 60) + "" ;
			var detik = 100 + this.timer % 60 + "";
			this.timer_text = menit.substr(1,2) + ":"+ detik.substr(1,2);

			if (this.timer <= 0) {
				this._pause = true;
				ig.system.setGame(Lose);
			}
		},

		cekTimer: function(){
			this.countTimer++;
			if (this.countTimer >= 60){
				this.countTimer = 0;
				this.timer--;
				this.initTimer();
			}
		},

		update: function() {
			this.parent();
			if (!this._pause) this.cekTimer();
		},
		
		draw: function() {
			this.parent();
			if (!ig.game._pause){
				this.fontGame.draw("Time : " + this.timer_text, 220, 25);
				this.fontGame.draw("Level : " + ig.global.level, 390, 25);
			}
		}

	});

	
});
