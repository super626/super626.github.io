ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.input',
	//'impact.debug.debug',
	'plugins.button',
	'plugins.button2state',
	'plugins.myinput',
	'plugins.myfont',
	'plugins.preloader',
	'plugins.mysound',
	'game.levels.MainMenu' ,	
	'game.levels.SelectLevel' ,	
	'game.levels.Game' ,	
	'game.levels.DressUp' ,	
	'game.levels.Lose' ,	
	'game.levels.NextLevel' ,	
	'game.levels.Congrat' ,	
	'plugins.scale',
	'plugins.empika.game_utilities',
	'plugins.empika.entity_utilities',
	'game.entities.ButtonClick',
	'game.entities.choice',
	'game.entities.hint',
	'game.entities.interactiveObject'
)

.defines(function(){
	//document.getElementById("result").innerHTML = Math.floor(ig.input.mouse.x) + ':' + Math.floor(ig.input.mouse.y);
	ig.global.sound = new MySound("media/449866_slow_jazz_loop.mp3",1,57,0);
	ig.global.SOUND = false;

	ig.global.tempScore = 1;
	ig.global.totalLevel = 1;
	ig.global.level = 1;
	ig.global.tipeGame = "Game";
	ig.global.jumlahStar = [0,0,0,0,0,0,0,0,0,0,0,0];
	ig.global.ORI_WIDTH = 700;
	ig.global.ORI_HEIGHT = 525;
	
	ig.global.CUR_WIDTH = 700;
	ig.global.CUR_HEIGHT = 525;

	ig.main( '#canvas', MainMenu, 60, ig.getX(700), ig.getY(525), 1, Preloader );	

});
