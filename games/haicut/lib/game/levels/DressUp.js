ig.module( 
	'game.levels.DressUp' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.input',
	'plugins.button',
	'game.entities.ButtonClick'
)

.defines(function(){

	DressUp = ig.Game.extend({
		
		// Load a font
		font: new ig.Font( '', 23, null, null, '#FFFFFF','center', 2, false),
		fontGame: new ig.Font( '', 20, null, null, '#2480A8','center', 1, false),
		fontDress: new ig.Font( '', 18, null, null, '#FFFFFF','center', 2, false),
		posItem: {x:[480,488,584,562,480,480],y:[408,106,190,65,318,196]},
		sizeItem:{x:[60,72,86,117,173,108],y:[72,71,90,104,58,93]},
		posAcc:{x:[473,571,474,571,482,524,470,568,477,577,563,619,480,576],y:[55,55,133,133,339,339,163,163,237,237,349,349,296,296]},
		sizeAcc:{x:[92,92,91,91,20,20,101,101,89,89,47,47,86,86],y:[59,59,29,29,26,26,62,62,45,45,48,48,28,28]},
		status:"",
		tempStatus:"",
		_mulai:false,
		_acc:false,
		_pause:false,
		
		jenis_mata:0,
		jenis_baju:0,
		timer_text : "",
		timer : 120,
		countTimer : 0,
		warnaRambut:-1,
		jenis_belakang:"biasa",
		jenis_tengah:"biasa",
		jenis_depan:"biasa",
		pjg_belakang:1,
		pjg_tengah:1,
		pjg_depan:1,
		wrn_belakang:0,
		wrn_tengah:0,
		wrn_depan:0,
		jenis_acc:0,

		cth_jenis_belakang:null,
		cth_jenis_tengah:null,
		cth_jenis_depan:null,
		cth_pjg_belakang:1,
		cth_pjg_tengah:1,
		cth_pjg_depan:1,
		cth_wrn_belakang:0,
		cth_wrn_tengah:0,
		cth_wrn_depan:0,
		cth_jenis_acc:0,
		_showPigura:false,
		namaRambut:["depan","tengah","belakang"],
		init: function() {		
			ig.global.tipeGame = "DressUp";
			// activate the mouse input
	  		ig.input.initMouse();
	  		ig.input.bind( ig.KEY.MOUSE1, 'click');	
	  		
			// background
			this.jenis_mata =Math.floor(Math.random()*(4)+1);
			this.jenis_baju =Math.floor(Math.random()*(4)+1);

			this.cth_pjg_belakang=Math.floor(Math.random()*(3)+1);
			this.cth_pjg_tengah=Math.floor(Math.random()*(3)+1);
			this.cth_pjg_depan=Math.floor(Math.random()*(3)+1);
			this.cth_wrn_belakang=Math.floor(Math.random()*(8));
			this.cth_wrn_tengah=Math.floor(Math.random()*(8));
			this.cth_wrn_depan=Math.floor(Math.random()*(8));
			this.cth_jenis_acc=Math.floor(Math.random()*(14)+1);

			var arr = ['besar','biasa','ion','kecil','lurus'];
			this.cth_jenis_belakang = arr[Math.floor(Math.random()*(4))];
			this.cth_jenis_tengah = arr[Math.floor(Math.random()*(4))];
			this.cth_jenis_depan = arr[Math.floor(Math.random()*(4))];
			
			cermin = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 0,
				animSheet: new ig.AnimationSheet( 'media/dressup/cermin.png', ig.getX(383), ig.getY(383)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(34), ig.getY(25));			

			body = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 2,
				animSheet: new ig.AnimationSheet( 'media/dressup/body.png', ig.getX(240), ig.getY(380)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(106), ig.getY(50));		

			mata = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 3,
				animSheet: new ig.AnimationSheet( 'media/dressup/mata'+ig.game.jenis_mata+'.png', ig.getX(240), ig.getY(380)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(106), ig.getY(50));		

			baju = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 4,
				animSheet: new ig.AnimationSheet( 'media/dressup/baju'+ig.game.jenis_baju+'.png', ig.getX(240), ig.getY(380)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(106), ig.getY(50));		



			bg = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(700), y:ig.getY(525)},
				zIndex: 7,
				animSheet: new ig.AnimationSheet( 'media/bgdress.png', ig.getX(700), ig.getY(525)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(0), ig.getY(0));


			
			btnLogo = this.spawnEntity(LogoButton, 10, 15);
			btnSound = this.spawnEntity(SoundButton, 10, 60);
			btnPause = this.spawnEntity(PauseButton, 10, 100);
			
			for (var i = 1; i <=6 ; i++) {
				this["item"+i]= this.spawnEntity( ButtonClick.extend({
					size: {x: ig.getX(ig.game.sizeItem.x[i-1]), y:ig.getY(ig.game.sizeItem.y[i-1])},					
					zIndex: 8,
					idx:i,
					init: function( x, y, settings ) {
						this.animSheet = new ig.AnimationSheet( 'media/dressup/item'+i+'.png', ig.getX(ig.game.sizeItem.x[i-1]), ig.getY(ig.game.sizeItem.y[i-1]));
						this.addAnim( 'idle', 1, [0] );
						this.parent( x, y, settings );
					},
					pressedUp:function(){
						if (this.currentAnim.alpha != 0 && ig.game._mulai && !ig.game._showPigura && !ig.game._pause){
							ig.game.warnaRambut = -1;
							for (var i = 1; i <= 3; i++) 
								ig.game["btn"+i].currentAnim.alpha = 1;
							ig.game.btn1.text = ['front'];
							ig.game.btn2.text = ['mid'];
							ig.game.btn3.text = ['back'];
							if (this.idx == 1){ //gulung kecil
								ig.game.status = "kecil";
							}else if (this.idx == 2){ //gulung besar
								ig.game.status = "besar";
							}else if (this.idx == 3){ //gunting merah
								ig.game.status = "lurus";
							}else if (this.idx == 4){ //gunting hitam
								if (ig.game.status != "gunting") ig.game.tempStatus = ig.game.status;
								ig.game.status = "gunting";
							}else if (this.idx == 5){ //penjapit
								ig.game.status = "ion";
							}
						}
						if (this.currentAnim.alpha == 1 && !ig.game._showPigura && !ig.game._pause && !ig.game._mulai){
							if (this.idx == 6){ //hairdryer
								for (var i = 1; i <= 3; i++) 
									ig.game["btn"+i].currentAnim.alpha = 0;
								ig.game.btn1.text = [''];
								ig.game.btn2.text = [''];
								ig.game.btn3.text = [''];
								if (!ig.game._mulai){
									ig.game.panah.currentAnim.alpha = 0;
									ig.game.panah2.currentAnim.alpha = 1;
									ig.game.status = "biasa";
									ig.game._mulai = true;
									ig.game.cek_belakang(0,1,"biasa");
									ig.game.cek_tengah(0,1,"biasa");
									ig.game.cek_depan(0,1,"biasa");
									ig.game.sortEntitiesDeferred();
								}
							}
						}
					}
				}), ig.getX(ig.game.posItem.x[i-1]), ig.getY(ig.game.posItem.y[i-1]));	


			};

			for (var i = 0; i <=7 ; i++) {
				this["warna"+i]= this.spawnEntity( ButtonClick.extend({
					size: {x: ig.getX(32), y:ig.getY(80)},
					zIndex: 9,
					idx:i,
					init: function( x, y, settings ) {
						this.animSheet = new ig.AnimationSheet( 'media/dressup/warna'+i+'.png', ig.getX(32), ig.getY(80));
						this.addAnim( 'idle', 1, [0] );
						this.parent( x, y, settings );
					},
					pressedUp:function(){
						if (this.currentAnim.alpha != 0 && ig.game._mulai && !ig.game._showPigura && !ig.game._pause){
							if (ig.game.status == "gunting") ig.game.status = "biasa";
							ig.game.warnaRambut = this.idx;
							for (var i = 1; i <= 3; i++) 
								ig.game["btn"+i].currentAnim.alpha = 1;
							ig.game.btn1.text = ['front'];
							ig.game.btn2.text = ['mid'];
							ig.game.btn3.text = ['back'];
						}
					}
				}), ig.getX(150+(i-1)*47), ig.getY(396));
				
			};

			for (var i = 1; i <= 3; i++) {
				this["btn"+i] = this.spawnEntity( Button.extend({
					size: {x: ig.getX(92), y:ig.getY(42)},
					zIndex: 10,
					jenisBtn:ig.game.namaRambut[i-1],
					idx:i,
					font:ig.game.fontDress,
					text:[''],
					textPos:{x:46,y:25},
					animSheet: new ig.AnimationSheet( 'media/btndress.png', ig.getX(92), ig.getY(42)),
					init: function( x, y, settings ) {
		    			this.addAnim( 'idle', 1, [0] );
		    			this.parent( x, y, settings );
		    			this.currentAnim.alpha = 0;
					},
					pressedUp:function(){
						if (ig.game.status != "" && this.currentAnim.alpha != 0 && ig.game._mulai && !ig.game._showPigura && !ig.game._pause){
							if (ig.game.status != "gunting"){
								if (ig.game.warnaRambut != -1)
									ig.game["wrn_"+this.jenisBtn] = ig.game.warnaRambut;
								else ig.game["jenis_"+this.jenisBtn] = ig.game.status;
								ig.game["cek_"+this.jenisBtn](ig.game["wrn_"+this.jenisBtn],ig.game["pjg_"+this.jenisBtn],ig.game["jenis_"+this.jenisBtn]);
							}else if (ig.game.status == "gunting"){
								if (ig.game["pjg_"+this.jenisBtn] < 3) {
									ig.game["pjg_"+this.jenisBtn]++;
									ig.game["cek_"+this.jenisBtn](ig.game["wrn_"+this.jenisBtn],ig.game["pjg_"+this.jenisBtn],ig.game["jenis_"+this.jenisBtn]);
								}
							}
							ig.game.sortEntitiesDeferred();

						}
					}

				}), ig.getX(355), ig.getY(i*55));
				
			};

			this.acc = this.spawnEntity( ButtonClick.extend({
				size: {x: ig.getX(129), y:ig.getY(77)},
				zIndex: 11,
				animSheet: new ig.AnimationSheet( 'media/dressup/acc.png', ig.getX(129), ig.getY(77)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				},
				pressedUp:function(){
					if (this.currentAnim.alpha != 0 && ig.game._mulai && !ig.game._showPigura && !ig.game._pause){
						for (var i = 1; i <=6 ; i++) {
							if (i!=1) ig.game["item"+i].currentAnim.alpha = 0;
						}
						for (var i = 1; i <=14 ; i++) {
							ig.game["btnacc"+i].currentAnim.alpha = 1;
						}
						ig.game.papan_acc.currentAnim.alpha = 1;
						ig.game.btnCloseAcc.currentAnim.alpha = 1;
						ig.game.btnCloseAcc.text = ['Quit'];
						for (var i = 1; i <= 3; i++) 
							ig.game["btn"+i].currentAnim.alpha = 0;
						ig.game.btn1.text = [''];
						ig.game.btn2.text = [''];
						ig.game.btn3.text = [''];
					}
				}
			}), ig.getX(550), ig.getY(398));

			this.papan_acc = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 12,
				animSheet: new ig.AnimationSheet( 'media/dressup/papan-acc.png', ig.getX(232), ig.getY(392)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(450), ig.getY(36));

			this.btnCloseAcc = this.spawnEntity( Button.extend({
				size: {x: ig.getX(57), y:ig.getY(25)},
				zIndex: 13,
				text:[''],
				font:ig.game.fontDress,
				textPos:{x:27,y:15},
				animSheet: new ig.AnimationSheet( 'media/dressup/btnquit.png', ig.getX(57), ig.getY(25)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				},
				pressedUp:function(){
					if (this.currentAnim.alpha == 1 && !ig.game._pause){
						for (var i = 1; i <=6 ; i++) {
							ig.game["item"+i].currentAnim.alpha = 1;
						}
						for (var i = 1; i <=14 ; i++) {
							ig.game["btnacc"+i].currentAnim.alpha = 0;
						}
						ig.game.papan_acc.currentAnim.alpha = 0;
						ig.game.btnCloseAcc.currentAnim.alpha = 0;
						ig.game.btnCloseAcc.text = [''];
					}
				}
			}), ig.getX(470), ig.getY(380));

			for (var i = 1; i <=14 ; i++) {
				this["btnacc"+i]= this.spawnEntity( ButtonClick.extend({
					size: {x: ig.getX(ig.game.sizeAcc.x[i-1]), y:ig.getY(ig.game.sizeAcc.y[i-1])},
					zIndex: 14,
					idx:i,
					init: function( x, y, settings ) {
						this.animSheet = new ig.AnimationSheet( 'media/dressup/acc'+i+'.png', ig.getX(ig.game.sizeAcc.x[i-1]), ig.getY(ig.game.sizeAcc.y[i-1]));
						this.addAnim( 'idle', 1, [0] );
						this.parent( x, y, settings );
						this.currentAnim.alpha = 0;
					},
					pressedUp:function(){						
						if (this.currentAnim.alpha != 0 && ig.game._mulai && !ig.game._showPigura && !ig.game._pause){
							ig.game.cek_acc(this.idx);
							ig.game.jenis_acc = this.idx;
						}
					}
				}), ig.getX(ig.game.posAcc.x[i-1]), ig.getY(ig.game.posAcc.y[i-1]));
				
			};

			this.btnFoto = this.spawnEntity( Button.extend({
				size: {x: ig.getX(92), y:ig.getY(42)},
				zIndex: 15,
				font:ig.game.fontDress,
				text:['Photo'],
				textPos:{x:46,y:25},
				animSheet: new ig.AnimationSheet( 'media/btndress.png', ig.getX(92), ig.getY(42)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				},
				pressedUp:function(){
					if (!ig.game._showPigura && !ig.game._pause && ig.game._mulai) ig.game.showPigura();
				}
			}), ig.getX(5), ig.getY(325));

			this.pigura = this.spawnEntity( ButtonClick.extend({
				size: {x: ig.getX(266), y:ig.getY(433)},
				zIndex: 16,
				animSheet: new ig.AnimationSheet( 'media/dressup/pigura.png', ig.getX(266), ig.getY(433)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
	    			this.currentAnim.alpha = 0;
				}
			}), ig.getX(422), ig.getY(24));

			this.cth_rambut_belakang = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 17,
				animSheet: new ig.AnimationSheet( 'media/dressup/hair-belakang/'+ig.game.cth_jenis_belakang+'-'+'warna'+ig.game.cth_wrn_belakang+'-'+ig.game.cth_pjg_belakang+'.png', ig.getX(240), ig.getY(380)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
	    			this.currentAnim.alpha = 0;
				}
			}), ig.getX(436), ig.getY(60));	

			this.cth_body = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 18,
				animSheet: new ig.AnimationSheet( 'media/dressup/body.png', ig.getX(240), ig.getY(380)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
	    			this.currentAnim.alpha = 0;
				}
			}), ig.getX(436), ig.getY(60));		

			this.cth_mata = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 19,
				animSheet: new ig.AnimationSheet( 'media/dressup/mata'+this.jenis_mata+'.png', ig.getX(240), ig.getY(380)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
	    			this.currentAnim.alpha = 0;
				}
			}), ig.getX(436), ig.getY(60));		

			this.cth_baju = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 20,
				animSheet: new ig.AnimationSheet( 'media/dressup/baju'+this.jenis_baju+'.png', ig.getX(240), ig.getY(380)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
	    			this.currentAnim.alpha = 0;
				}
			}), ig.getX(436), ig.getY(60));			

			this.cth_rambut_tengah = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 21,
				animSheet: new ig.AnimationSheet( 'media/dressup/hair-tengah/'+ig.game.cth_jenis_tengah+'-'+'warna'+ig.game.cth_wrn_tengah+'-'+ig.game.cth_pjg_tengah+'.png', ig.getX(240), ig.getY(380)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
	    			this.currentAnim.alpha = 0;
				}
			}), ig.getX(436), ig.getY(60));	

			this.cth_rambut_depan = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 22,
				animSheet: new ig.AnimationSheet( 'media/dressup/hair-depan/'+ig.game.cth_jenis_depan+'-'+'warna'+ig.game.cth_wrn_depan+'-'+ig.game.cth_pjg_depan+'.png', ig.getX(240), ig.getY(380)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
	    			this.currentAnim.alpha = 0;
				}
			}), ig.getX(436), ig.getY(60));	

			this.cth_rambut_acc = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 23,
				animSheet: new ig.AnimationSheet( 'media/dressup/hair-acc/acc'+ig.game.cth_jenis_acc+'.png', ig.getX(240), ig.getY(380)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
	    			this.currentAnim.alpha = 0;
				}
			}), ig.getX(436), ig.getY(60));		

			this.btnClosePigura = this.spawnEntity( Button.extend({
				size: {x: ig.getX(92), y:ig.getY(42)},
				zIndex: 24,
				font:ig.game.fontDress,
				text:[''],
				textPos:{x:46,y:25},
				animSheet: new ig.AnimationSheet( 'media/btndress.png', ig.getX(92), ig.getY(42)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
	    			this.currentAnim.alpha = 0;
				},
				pressedUp:function(){
					if (this.currentAnim.alpha == 1 && !ig.game._pause){
						ig.game.hiddenPigura();
					}
				}

			}), ig.getX(510), ig.getY(415));	

			this.btnReset = this.spawnEntity( Button.extend({
				size: {x: ig.getX(92), y:ig.getY(42)},
				zIndex: 25,
				font:ig.game.fontDress,
				text:['Reset'],
				textPos:{x:46,y:25},
				animSheet: new ig.AnimationSheet( 'media/btndress.png', ig.getX(92), ig.getY(42)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				},
				pressedUp:function(){
					if (!ig.game._pause && ig.game._mulai){
						ig.game.setDefault();
						ig.game.sortEntitiesDeferred();
					}
				}

			}), ig.getX(5), ig.getY(372));

			this.btnFinish = this.spawnEntity( Button.extend({
				size: {x: ig.getX(92), y:ig.getY(42)},
				zIndex: 26,
				font:ig.game.fontDress,
				text:['Finish'],
				textPos:{x:46,y:25},
				animSheet: new ig.AnimationSheet( 'media/btndress.png', ig.getX(92), ig.getY(42)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				},
				pressedUp:function(){
					if (!ig.game._pause){
						ig.game.cekScore();
					}
				}

			}), ig.getX(5), ig.getY(420));

			this.panah = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 26,
				animSheet: new ig.AnimationSheet( 'media/dressup/panah-click.png', ig.getX(72), ig.getY(55)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 0.033, [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(403), ig.getY(237));

			this.panah2 = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(0), y:ig.getY(0)},
				zIndex: 27,
				animSheet: new ig.AnimationSheet( 'media/dressup/panah-click2.png', ig.getX(56), ig.getY(72)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 0.033, [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1] );
	    			this.parent( x, y, settings );
	    			this.currentAnim.alpha = 0;
				}
			}), ig.getX(24), ig.getY(240));

			this.btn1.text = [''];
			this.btn2.text = [''];
			this.btn3.text = [''];

			this.btnCloseAcc.currentAnim.alpha = 0;
			this.papan_acc.currentAnim.alpha = 0;
			this.initTimer();
			this.setDefault();
			this.sortEntitiesDeferred();
		},
		
		cekScore: function() {
			this._pause = true;
			ig.global.tempScore = 0;
			var countMirip = 0;
			if (this.jenis_belakang == this.cth_jenis_belakang) countMirip++;
			if (this.jenis_tengah == this.cth_jenis_tengah) countMirip++;
			if (this.jenis_depan == this.cth_jenis_depan) countMirip++;
			if (this.pjg_belakang == this.cth_pjg_belakang) countMirip++;
			if (this.pjg_tengah == this.cth_pjg_tengah) countMirip++;
			if (this.pjg_depan == this.cth_pjg_depan) countMirip++;
			if (this.wrn_belakang == this.cth_wrn_belakang) countMirip++;
			if (this.wrn_tengah == this.cth_wrn_tengah) countMirip++;
			if (this.wrn_depan == this.cth_wrn_depan) countMirip++;
			if (this.jenis_acc == this.cth_jenis_acc) countMirip++;

			if (!this._mulai) countMirip = 0;
			if (countMirip <= 6) {
				ig.system.setGame(Lose);
			}else if (countMirip > 6) {
				if (countMirip <= 8) ig.global.tempScore = 1
				else if (countMirip <= 9) ig.global.tempScore = 2
				else if (countMirip >= 10) ig.global.tempScore = 3;
				if (ig.global.tempScore > ig.global.jumlahStar[ig.global.level - 1] )  ig.global.jumlahStar[ig.global.level - 1] = ig.global.tempScore;
				if (ig.global.level < 12) ig.system.setGame(NextLevel)
				else ig.system.setGame(Congrat);
			}
		},

		setDefault: function() {
			this.panah.currentAnim.alpha = 1;

			if (this.rambut_belakang != null) 
				this.rambut_belakang.currentAnim = this.rambut_belakang.anims.basah
			else {
				this.rambut_belakang = this.spawnEntity( ig.Entity.extend({
					size: {x: ig.getX(0), y:ig.getY(0)},
					zIndex: 1,
					init: function( x, y, settings ) {
						this.animSheet = new ig.AnimationSheet( 'media/dressup/hair-basah2.png', ig.getX(240), ig.getY(380));
						this.addAnim( 'basah', 1, [0] );
						var temp = ["besar","biasa","ion","kecil","lurus"];
						for (var i = 0; i <= 4; i++) {
							for (var j = 0; j <= 7; j++) {
								for (var k = 1; k <= 3; k++) {
									this.animSheet = new ig.AnimationSheet( 'media/dressup/hair-belakang/'+temp[i]+'-'+'warna'+j+'-'+k+'.png', ig.getX(240), ig.getY(380));
									this.addAnim( temp[i]+'-'+'warna'+j+'-'+k, 1, [0] );
								};
							};
						};
		    			this.parent( x, y, settings );
					}
				}), ig.getX(106), ig.getY(50));	
			};
			
			if (this.rambut_tengah != null) 
				this.rambut_tengah.currentAnim = this.rambut_tengah.anims.basah
			else {
				this.rambut_tengah = this.spawnEntity( ig.Entity.extend({
					size: {x: ig.getX(0), y:ig.getY(0)},
					zIndex: 5,
					init: function( x, y, settings ) {
						this.animSheet = new ig.AnimationSheet( 'media/dressup/hair-basah1.png', ig.getX(240), ig.getY(380));
						this.addAnim( 'basah', 1, [0] );
						var temp = ["besar","biasa","ion","kecil","lurus"];
						for (var i = 0; i <= 4; i++) {
							for (var j = 0; j <= 7; j++) {
								for (var k = 1; k <= 3; k++) {
									this.animSheet = new ig.AnimationSheet( 'media/dressup/hair-tengah/'+temp[i]+'-'+'warna'+j+'-'+k+'.png', ig.getX(240), ig.getY(380));
									this.addAnim( temp[i]+'-'+'warna'+j+'-'+k, 1, [0] );
								};
							};
						};
		    			this.parent( x, y, settings );
					}
				}), ig.getX(106), ig.getY(50));	
			};

			if (this.rambut_depan != null) 
				this.rambut_depan.currentAnim = this.rambut_depan.anims.basah
			else {
				this.rambut_depan = this.spawnEntity( ig.Entity.extend({
					size: {x: ig.getX(0), y:ig.getY(0)},
					zIndex: 6,
					init: function( x, y, settings ) {
						this.animSheet = new ig.AnimationSheet( 'media/dressup/hair-basah1.png', ig.getX(240), ig.getY(380));
						this.addAnim( 'basah', 1, [0] );
						var temp = ["besar","biasa","ion","kecil","lurus"];
						for (var i = 0; i <= 4; i++) {
							for (var j = 0; j <= 7; j++) {
								for (var k = 1; k <= 3; k++) {
									this.animSheet = new ig.AnimationSheet( 'media/dressup/hair-depan/'+temp[i]+'-'+'warna'+j+'-'+k+'.png', ig.getX(240), ig.getY(380));
									this.addAnim( temp[i]+'-'+'warna'+j+'-'+k, 1, [0] );
								};
							};
						};
		    			this.parent( x, y, settings );
					}
				}), ig.getX(106), ig.getY(50));	
			};

			if (this.rambut_acc != null) this.rambut_acc.currentAnim.alpha = 0
			else {
				this.rambut_acc = this.spawnEntity( ig.Entity.extend({
					size: {x: ig.getX(0), y:ig.getY(0)},
					zIndex: 7,
					init: function( x, y, settings ) {
						for (var i = 1; i <= 14; i++) {
							this.animSheet = new ig.AnimationSheet( 'media/dressup/hair-acc/acc'+i+'.png', ig.getX(240), ig.getY(380)),
							this.addAnim( 'acc'+i, 1, [0] );
							this.currentAnim.alpha = 0;
						}
		    			this.parent( x, y, settings );
					}
				}), ig.getX(106), ig.getY(50));	
			}
			this.status = "";
			this._mulai = false;
			this.warnaRambut=-1;
			this.pjg_belakang=1;
			this.pjg_tengah=1;
			this.pjg_depan=1;
			this.wrn_belakang=0;
			this.wrn_tengah=0;
			this.wrn_depan=0;
			this.jenis_acc=0;
			this.showPigura();
			this.hiddenPigura();
			for (var i = 1; i <=6 ; i++) {
				ig.game["item"+i].currentAnim.alpha = 1;
			}
			for (var i = 1; i <=14 ; i++) {
				ig.game["btnacc"+i].currentAnim.alpha = 0;
			}
			ig.game.papan_acc.currentAnim.alpha = 0;
			ig.game.btnCloseAcc.currentAnim.alpha = 0;
			ig.game.btnCloseAcc.text = [''];
		},

		showPigura: function() {
			this._showPigura = true;
			this.panah2.currentAnim.alpha = 0;
			this.pigura.currentAnim.alpha = 1;
			this.cth_rambut_belakang.currentAnim.alpha = 1;
			this.cth_body.currentAnim.alpha = 1;
			this.cth_mata.currentAnim.alpha = 1;
			this.cth_baju.currentAnim.alpha = 1;
			this.cth_rambut_tengah.currentAnim.alpha = 1;
			this.cth_rambut_depan.currentAnim.alpha = 1;
			this.cth_rambut_acc.currentAnim.alpha = 1;
			this.btnClosePigura.currentAnim.alpha = 1;
			this.btnClosePigura.text = ['Close'];
			this.btn1.currentAnim.alpha = 0;
			this.btn2.currentAnim.alpha = 0;
			this.btn3.currentAnim.alpha = 0;
			this.btn1.text = [''];
			this.btn2.text = [''];
			this.btn3.text = [''];
		},

		hiddenPigura: function() {
			this._showPigura = false;
			this.pigura.currentAnim.alpha = 0;
			this.cth_rambut_belakang.currentAnim.alpha = 0;
			this.cth_body.currentAnim.alpha = 0;
			this.cth_mata.currentAnim.alpha = 0;
			this.cth_baju.currentAnim.alpha = 0;
			this.cth_rambut_tengah.currentAnim.alpha = 0;
			this.cth_rambut_depan.currentAnim.alpha = 0;
			this.cth_rambut_acc.currentAnim.alpha = 0;
			this.btnClosePigura.currentAnim.alpha = 0;
			this.btnClosePigura.text = [''];
		},

		cek_acc: function(jenis) {			
			this.rambut_acc.currentAnim = this.rambut_acc.anims["acc"+jenis];
			this.rambut_acc.currentAnim.alpha = 1;
		},

		cek_belakang: function(warna,panjang,jenis) {
			this.rambut_belakang.currentAnim = this.rambut_belakang.anims[jenis+'-'+'warna'+warna+'-'+panjang];
			
		},

		cek_tengah: function(warna,panjang,jenis) {
			this.rambut_tengah.currentAnim = this.rambut_tengah.anims[jenis+'-'+'warna'+warna+'-'+panjang];
		},

		cek_depan: function(warna,panjang,jenis) {
			this.rambut_depan.currentAnim = this.rambut_depan.anims[jenis+'-'+'warna'+warna+'-'+panjang];
		},

		initTimer: function(){
			var menit = Math.floor(100 + this.timer / 60) + "" ;
			var detik = 100 + this.timer % 60 + "";
			this.timer_text = menit.substr(1,2) + ":"+ detik.substr(1,2);

			if (this.timer <= 0) {
				this._pause = true;
				this.cekScore();
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
				this.fontGame.draw("Time : " + this.timer_text, 450, 25);
				this.fontGame.draw("Level : " + ig.global.level, 590, 25);
			}
		}

	});

	
});
