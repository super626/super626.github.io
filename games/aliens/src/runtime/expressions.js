var ls;
(function (ls) {
	ls.MainScene = function() {
		return {
			"score.s": function() { return score.s },
			"full": function() { return full },
			"empty": function() { return empty },
			"yeah": function() { return yeah },
			"%22greaterOrEqual%22": function() { return "greaterOrEqual" },
			"bee_player": function() { return bee_player },
			"life.width*player.hp%2F100": function() { return life.width*player.hp/100 },
			"%22greaterThan%22": function() { return "greaterThan" },
			"%22lessThan%22": function() { return "lessThan" },
			"life.height": function() { return life.height },
			"dead": function() { return dead },
			"Math.abs(player.x-enemy.x)": function() { return Math.abs(player.x-enemy.x) },
			"stand": function() { return stand },
			"dead1": function() { return dead1 },
			"gold": function() { return gold },
			"enemy.y-30": function() { return enemy.y-30 },
			"Math.abs(player.x-bank.x)": function() { return Math.abs(player.x-bank.x) },
			"enemy": function() { return enemy },
			"bank": function() { return bank },
			"%22s%22": function() { return "s" },
			"run": function() { return run },
			"bee_player.y-30": function() { return bee_player.y-30 },
			"golda": function() { return golda },
			"hit": function() { return hit },
			"%22c%22": function() { return "c" },
			"Math.abs(player.x-bee_player.x)": function() { return Math.abs(player.x-bee_player.x) },
			"%22hp%22": function() { return "hp" },
			"%22lessOrEqual%22": function() { return "lessOrEqual" },
			"player": function() { return player },
			"dead2": function() { return dead2 }
		}
	};
	ls.opening = function() {
		return {
			"%22backOut%22": function() { return "backOut" },
			"%22backIn%22": function() { return "backIn" },
			"content1.text.charAt(content1.c)": function() { return content1.text.charAt(content1.c) },
			"%22tween%22": function() { return "tween" },
			"%22n%22": function() { return "n" },
			"%22elasticOut%22": function() { return "elasticOut" },
			"%22notEqualTo%22": function() { return "notEqualTo" },
			"%22MainScene%22": function() { return "MainScene" },
			"content2.text.charAt(content2.c)": function() { return content2.text.charAt(content2.c) },
			"%22c%22": function() { return "c" },
			"%22lessOrEqual%22": function() { return "lessOrEqual" },
			"%22bounceOut%22": function() { return "bounceOut" },
			"%22equalTo%22": function() { return "equalTo" }
		}
	};
})(ls || (ls = {}));