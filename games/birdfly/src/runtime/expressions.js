var ls;
(function (ls) {
	ls.Gamestart = function() {
		return {
			"%22MainScene%22": function() { return "MainScene" }
		}
	};
	ls.MainScene = function() {
		return {
			"%22greaterOrEqual%22": function() { return "greaterOrEqual" },
			"%22t%22": function() { return "t" },
			"center": function() { return center },
			"%22equalTo%22": function() { return "equalTo" },
			"%22greaterThan%22": function() { return "greaterThan" },
			"columnu": function() { return columnu },
			"fly.v": function() { return fly.v },
			"columnd": function() { return columnd },
			"150%2Bls.random()*600": function() { return 150+ls.random()*600 },
			"%E8%AE%A1%E5%88%86%E7%82%B9": function() { return 计分点 },
			"%22start%22": function() { return "start" },
			"fly": function() { return fly },
			"%22score%22": function() { return "score" },
			"%22MainScene%22": function() { return "MainScene" },
			"%22gameover%22": function() { return "gameover" },
			"fly.score": function() { return fly.score },
			"%22Score%3A%22%2Bfly.score": function() { return "Score:"+fly.score },
			"%22v%22": function() { return "v" },
			"2%2Bls.random()*2": function() { return 2+ls.random()*2 },
			"System.start": function() { return System.start },
			"4*fly.t": function() { return 4*fly.t },
			"System.start-300-ls.random()*300": function() { return System.start-300-ls.random()*300 },
			"%22lessThan%22": function() { return "lessThan" }
		}
	};
})(ls || (ls = {}));