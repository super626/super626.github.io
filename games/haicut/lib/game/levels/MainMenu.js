ig.module( 
	'game.levels.MainMenu' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.input',
	'plugins.button'
	
)

.defines(function(){

	MainMenu = ig.Game.extend({
		
		// Load a font
		font: new ig.Font( '', 23, null, null, '#FFFFFF','center', 2, false),
		init: function() {

			ig.resources = [];
			ig.ready = false;
			
			dummyImages = [
				new ig.Image( 'media/anim-bintangbesar.png' ),
				new ig.Image( 'media/bgcongrat.png' ),
				new ig.Image( 'media/bgcredit.png' ),
				new ig.Image( 'media/bgdress.png' ),
				new ig.Image( 'media/bggame.png' ),
				new ig.Image( 'media/bglevel.png' ),
				new ig.Image( 'media/bglose.png' ),
				new ig.Image( 'media/bgmain.png' ),
				new ig.Image( 'media/bgnext.png' ),
				new ig.Image( 'media/bgpause.png' ),
				new ig.Image( 'media/btndress.png' ),
				new ig.Image( 'media/btn-level-disabled.png' ),
				new ig.Image( 'media/btn-level-enabled.png' ),
				new ig.Image( 'media/btnpause.png' ),
				new ig.Image( 'media/btnsoundoff.png' ),
				new ig.Image( 'media/btnsoundon.png' ),
				new ig.Image( 'media/button.png' ),
				new ig.Image( 'media/button2.png' ),
				new ig.Image( 'media/button-main.png' ),
				new ig.Image( 'media/logo.png' ),
				new ig.Image( 'media/star-level.png' ),
				new ig.Image( 'media/game/anim-mask.png' ),
				new ig.Image( 'media/game/anim-panah.png' ),
				new ig.Image( 'media/game/anim-serum.png' ),
				new ig.Image( 'media/game/anim-shower.png' ),
				new ig.Image( 'media/game/hint.png' ),
				new ig.Image( 'media/game/item-glow.png' ),
				new ig.Image( 'media/game/sensor-muka.png' ),
				new ig.Image( 'media/game/shampo1.png' ),
				new ig.Image( 'media/game/shampo2.png' ),
				new ig.Image( 'media/game/shampo3.png' ),
				new ig.Image( 'media/game/shampo4.png' ),
				new ig.Image( 'media/game/wastafel.png' ),
				new ig.Image( 'media/item/item1.png' ),
				new ig.Image( 'media/item/item2.png' ),
				new ig.Image( 'media/item/item3.png' ),
				new ig.Image( 'media/item/item4.png' ),
				new ig.Image( 'media/item/item5.png' ),
				new ig.Image( 'media/item/item6.png' ),
				new ig.Image( 'media/item/item7.png' ),
				new ig.Image( 'media/item/item8.png' ),
				new ig.Image( 'media/item/item9.png' ),
				new ig.Image( 'media/item/item10.png' ),
				
				new ig.Image( 'media/dressup/acc.png' ),
				new ig.Image( 'media/dressup/acc1.png' ),
				new ig.Image( 'media/dressup/acc2.png' ),
				new ig.Image( 'media/dressup/acc3.png' ),
				new ig.Image( 'media/dressup/acc4.png' ),
				new ig.Image( 'media/dressup/acc5.png' ),
				new ig.Image( 'media/dressup/acc6.png' ),
				new ig.Image( 'media/dressup/acc7.png' ),
				new ig.Image( 'media/dressup/acc8.png' ),
				new ig.Image( 'media/dressup/acc9.png' ),
				new ig.Image( 'media/dressup/acc10.png' ),
				new ig.Image( 'media/dressup/acc11.png' ),
				new ig.Image( 'media/dressup/acc12.png' ),
				new ig.Image( 'media/dressup/acc13.png' ),
				new ig.Image( 'media/dressup/acc14.png' ),
				new ig.Image( 'media/dressup/baju1.png' ),
				new ig.Image( 'media/dressup/baju2.png' ),
				new ig.Image( 'media/dressup/baju3.png' ),
				new ig.Image( 'media/dressup/baju4.png' ),
				new ig.Image( 'media/dressup/body.png' ),
				new ig.Image( 'media/dressup/btnquit.png' ),
				new ig.Image( 'media/dressup/cermin.png' ),
				new ig.Image( 'media/dressup/hair-basah1.png' ),
				new ig.Image( 'media/dressup/hair-basah2.png' ),
				new ig.Image( 'media/dressup/item1.png' ),
				new ig.Image( 'media/dressup/item2.png' ),
				new ig.Image( 'media/dressup/item3.png' ),
				new ig.Image( 'media/dressup/item4.png' ),
				new ig.Image( 'media/dressup/item5.png' ),
				new ig.Image( 'media/dressup/item6.png' ),
				new ig.Image( 'media/dressup/mata1.png' ),
				new ig.Image( 'media/dressup/mata2.png' ),
				new ig.Image( 'media/dressup/mata3.png' ),
				new ig.Image( 'media/dressup/mata4.png' ),
				new ig.Image( 'media/dressup/panah-click.png' ),
				new ig.Image( 'media/dressup/panah-click2.png' ),
				new ig.Image( 'media/dressup/papan-acc.png' ),
				new ig.Image( 'media/dressup/pigura.png' ),
				new ig.Image( 'media/dressup/warna0.png' ),
				new ig.Image( 'media/dressup/warna1.png' ),
				new ig.Image( 'media/dressup/warna2.png' ),
				new ig.Image( 'media/dressup/warna3.png' ),
				new ig.Image( 'media/dressup/warna4.png' ),
				new ig.Image( 'media/dressup/warna5.png' ),
				new ig.Image( 'media/dressup/warna6.png' ),
				new ig.Image( 'media/dressup/warna7.png' ),

				new ig.Image( 'media/dressup/hair-acc/acc1.png' ),
				new ig.Image( 'media/dressup/hair-acc/acc2.png' ),
				new ig.Image( 'media/dressup/hair-acc/acc3.png' ),
				new ig.Image( 'media/dressup/hair-acc/acc4.png' ),
				new ig.Image( 'media/dressup/hair-acc/acc5.png' ),
				new ig.Image( 'media/dressup/hair-acc/acc6.png' ),
				new ig.Image( 'media/dressup/hair-acc/acc7.png' ),
				new ig.Image( 'media/dressup/hair-acc/acc8.png' ),
				new ig.Image( 'media/dressup/hair-acc/acc9.png' ),
				new ig.Image( 'media/dressup/hair-acc/acc10.png' ),
				new ig.Image( 'media/dressup/hair-acc/acc11.png' ),
				new ig.Image( 'media/dressup/hair-acc/acc12.png' ),
				new ig.Image( 'media/dressup/hair-acc/acc13.png' ),
				new ig.Image( 'media/dressup/hair-acc/acc14.png' ),

				new ig.Image( 'media/dressup/hair-depan/besar-warna0-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna0-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna0-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna1-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna1-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna1-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna2-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna2-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna2-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna3-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna3-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna3-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna4-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna4-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna4-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna5-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna5-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna5-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna6-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna6-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna6-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna7-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna7-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/besar-warna7-3.png' ),

				new ig.Image( 'media/dressup/hair-depan/biasa-warna0-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna0-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna0-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna1-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna1-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna1-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna2-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna2-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna2-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna3-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna3-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna3-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna4-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna4-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna4-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna5-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna5-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna5-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna6-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna6-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna6-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna7-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna7-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/biasa-warna7-3.png' ),

				new ig.Image( 'media/dressup/hair-depan/ion-warna0-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna0-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna0-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna1-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna1-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna1-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna2-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna2-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna2-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna3-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna3-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna3-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna4-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna4-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna4-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna5-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna5-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna5-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna6-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna6-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna6-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna7-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna7-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/ion-warna7-3.png' ),

				new ig.Image( 'media/dressup/hair-depan/kecil-warna0-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna0-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna0-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna1-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna1-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna1-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna2-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna2-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna2-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna3-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna3-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna3-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna4-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna4-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna4-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna5-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna5-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna5-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna6-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna6-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna6-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna7-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna7-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/kecil-warna7-3.png' ),

				new ig.Image( 'media/dressup/hair-depan/lurus-warna0-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna0-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna0-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna1-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna1-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna1-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna2-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna2-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna2-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna3-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna3-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna3-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna4-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna4-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna4-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna5-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna5-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna5-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna6-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna6-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna6-3.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna7-1.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna7-2.png' ),
				new ig.Image( 'media/dressup/hair-depan/lurus-warna7-3.png' ),

				new ig.Image( 'media/dressup/hair-belakang/besar-warna0-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna0-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna0-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna1-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna1-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna1-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna2-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna2-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna2-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna3-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna3-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna3-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna4-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna4-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna4-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna5-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna5-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna5-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna6-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna6-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna6-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna7-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna7-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/besar-warna7-3.png' ),

				new ig.Image( 'media/dressup/hair-belakang/biasa-warna0-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna0-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna0-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna1-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna1-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna1-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna2-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna2-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna2-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna3-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna3-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna3-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna4-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna4-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna4-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna5-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna5-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna5-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna6-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna6-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna6-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna7-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna7-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/biasa-warna7-3.png' ),

				new ig.Image( 'media/dressup/hair-belakang/ion-warna0-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna0-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna0-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna1-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna1-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna1-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna2-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna2-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna2-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna3-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna3-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna3-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna4-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna4-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna4-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna5-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna5-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna5-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna6-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna6-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna6-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna7-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna7-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/ion-warna7-3.png' ),

				new ig.Image( 'media/dressup/hair-belakang/kecil-warna0-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna0-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna0-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna1-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna1-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna1-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna2-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna2-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna2-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna3-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna3-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna3-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna4-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna4-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna4-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna5-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna5-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna5-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna6-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna6-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna6-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna7-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna7-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/kecil-warna7-3.png' ),

				new ig.Image( 'media/dressup/hair-belakang/lurus-warna0-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna0-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna0-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna1-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna1-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna1-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna2-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna2-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna2-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna3-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna3-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna3-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna4-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna4-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna4-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna5-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna5-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna5-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna6-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna6-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna6-3.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna7-1.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna7-2.png' ),
				new ig.Image( 'media/dressup/hair-belakang/lurus-warna7-3.png' ),

				new ig.Image( 'media/dressup/hair-tengah/besar-warna0-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna0-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna0-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna1-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna1-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna1-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna2-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna2-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna2-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna3-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna3-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna3-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna4-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna4-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna4-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna5-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna5-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna5-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna6-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna6-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna6-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna7-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna7-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/besar-warna7-3.png' ),

				new ig.Image( 'media/dressup/hair-tengah/biasa-warna0-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna0-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna0-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna1-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna1-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna1-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna2-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna2-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna2-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna3-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna3-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna3-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna4-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna4-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna4-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna5-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna5-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna5-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna6-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna6-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna6-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna7-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna7-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/biasa-warna7-3.png' ),

				new ig.Image( 'media/dressup/hair-tengah/ion-warna0-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna0-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna0-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna1-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna1-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna1-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna2-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna2-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna2-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna3-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna3-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna3-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna4-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna4-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna4-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna5-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna5-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna5-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna6-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna6-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna6-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna7-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna7-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/ion-warna7-3.png' ),

				new ig.Image( 'media/dressup/hair-tengah/kecil-warna0-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna0-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna0-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna1-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna1-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna1-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna2-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna2-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna2-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna3-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna3-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna3-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna4-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna4-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna4-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna5-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna5-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna5-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna6-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna6-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna6-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna7-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna7-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/kecil-warna7-3.png' ),

				new ig.Image( 'media/dressup/hair-tengah/lurus-warna0-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna0-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna0-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna1-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna1-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna1-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna2-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna2-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna2-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna3-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna3-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna3-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna4-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna4-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna4-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna5-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna5-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna5-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna6-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna6-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna6-3.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna7-1.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna7-2.png' ),
				new ig.Image( 'media/dressup/hair-tengah/lurus-warna7-3.png' )
			];

			// activate the mouse input
	  		ig.input.initMouse();
	  		ig.input.bind( ig.KEY.MOUSE1, 'click');	
	  		
			// background
			bg = this.spawnEntity( ig.Entity.extend({
				size: {x: ig.getX(700), y:ig.getY(525)},
				zIndex: 0,
				animSheet: new ig.AnimationSheet( 'media/bgmain.png', ig.getX(700), ig.getY(525)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				}
			}), ig.getX(0), ig.getY(0));

			btnStart = this.spawnEntity( Button.extend({
				size: {x: ig.getX(179), y:ig.getY(74)},
				zIndex: 1,
				text:['Play Game'],
				textPos: {x:ig.getX(89),y:ig.getY(37)},
				animSheet: new ig.AnimationSheet( 'media/button-main.png',  ig.getX(179), ig.getY(74)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				},
				pressedUp:function(){
					if (ig.game.bgCredit.zIndex == -1)
						ig.system.setGame(SelectLevel);
					adRequest();
				}
				
			}), ig.getX(390), ig.getY(254));

			btnCredit = this.spawnEntity( Button.extend({
				size: {x: ig.getX(179), y:ig.getY(74)},
				zIndex: 2,
				text:['Credits'],
				textPos: {x:ig.getX(89),y:ig.getY(37)},
				animSheet: new ig.AnimationSheet( 'media/button-main.png',  ig.getX(179), ig.getY(74)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				},
				pressedUp:function(){
					if (ig.game.bgCredit.zIndex == -1){
						ig.game.count = 0;
						ig.game.bgCredit.zIndex = 99;
						ig.game.sortEntitiesDeferred();
					}
				}
				
			}), ig.getX(390), ig.getY(334));

			btnMore = this.spawnEntity( Button.extend({
				size: {x: ig.getX(179), y:ig.getY(74)},
				zIndex: 3,
				text:['More Games'],
				textPos: {x:ig.getX(89),y:ig.getY(37)},
				animSheet: new ig.AnimationSheet( 'media/button-main.png',  ig.getX(179), ig.getY(74)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				},
				pressedUp:function(){
					if (ig.game.bgCredit.zIndex == -1){
						//clickLogo('http://www.7k7k.com/m-android/play/');
						console.log("Clicked more games");
						GameAPI.Branding.getLink("more_games").action();
						
					}
				}
				
			}), ig.getX(390), ig.getY(413));

			//btnLogo = this.spawnEntity(LogoButton, 10, 15);
			btnSound = this.spawnEntity(SoundButton, 638, 15);

			this.bgCredit = this.spawnEntity( InteractiveObject.extend({
				type: ig.Entity.TYPE.A,
				size: {x: ig.getX(700), y:ig.getY(525)},
				zIndex: -1,
				animSheet: new ig.AnimationSheet( 'media/bgcredit.png', ig.getX(700), ig.getY(525)),
				init: function( x, y, settings ) {
	    			this.addAnim( 'idle', 1, [0] );
	    			this.parent( x, y, settings );
				},
				update:function(){
					this.parent();
					if (this.zIndex == 99){
						ig.game.count++;
					}
				},
				pressedUp:function(){
					if (ig.game.count >= 40 && this.zIndex == 99){
						this.zIndex = -1;
						ig.game.sortEntitiesDeferred();
					}
				}				
			}), ig.getX(0), ig.getY(0));

			this.sortEntitiesDeferred();

			// load the resources
			ig.ready = true;
				
			// Start the custom preloader with the captured resources
			this.loader = new IntermediateLoader( null, ig.resources );
			this.loader.load();
		},
		
		run:function(){
			if( !this.loader ) {
			  this.parent();
			}
		},

		update: function() {
			this.parent();
		},
		
		draw: function() {
			this.parent();
		}

	});

	
});

        /*
* GAME API
*/
function adRequest(params) 
{
    if (typeof GameAPI === 'object' && GameAPI !== null)
    {
        
            GameAPI.GameBreak.request(fnPause,fnResume);
        
    }
}
function fnPause()
{
    console.log('Pause Game')
}
function fnResume()
{
    console.log('resume game')
}
