var ls;
(function (ls) {
	ls.MainScene = function() {
		return {
			"sun.scores": function() { return sun.scores },
			"ls.random()*360": function() { return ls.random()*360 },
			"enemyb": function() { return enemyb },
			"gameover.scale": function() { return gameover.scale },
			"%22MainScene%22": function() { return "MainScene" },
			"%22TF%22": function() { return "TF" },
			"true": function() { return true },
			"false": function() { return false },
			"bullet": function() { return bullet },
			"%22dir%22": function() { return "dir" },
			"emeny": function() { return emeny },
			"Sun_center": function() { return Sun_center },
			"%22n%22": function() { return "n" },
			"%22scores%22": function() { return "scores" },
			"plane.hp*20": function() { return plane.hp*20 },
			"%22equalTo%22": function() { return "equalTo" },
			"%22hp%22": function() { return "hp" },
			"plane.speed*plane.dir": function() { return plane.speed*plane.dir },
			"gameover.scale%2B0.1": function() { return gameover.scale+0.1 },
			"%22speed%22": function() { return "speed" },
			"%22lessOrEqual%22": function() { return "lessOrEqual" },
			"%22greaterOrEqual%22": function() { return "greaterOrEqual" },
			"2%2BMath.random()*3": function() { return 2+Math.random()*3 }
		}
	};
})(ls || (ls = {}));