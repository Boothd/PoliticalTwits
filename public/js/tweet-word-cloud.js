var fill = d3.scale.category20();
var data = [];
var testData = [{
	text: "hello world"
}, {
	text: "this is a test tweet"
}, {
	text: "hello world"
}, {
	text: "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test "
}, {
	text: "hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello"
}, {
	text: "this a tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet"
}];

function generateData(tweets, callback) {
	var text;
	var i;
	for (i = 0, size = tweets.length; i < size; i++) {
		processTweet(tweets[i], callback);
	}

	callback();
	drawUpdate(data);
}

var setUp = function setUp() {
	d3.layout.cloud().size([500, 500])
		.words(data.map(function(d) {
			return {
				text: d.word,
				size: d.weight
			};
		}))
		.padding(5)
		.rotate(function() {
			return~~ (Math.random() * 2) * 90;
		})
		.font("Impact")
		.fontSize(function(d) {
			return d.size;
		})
		.on("end", draw)
		.start();
};

function getTweet(tweet) {
	return tweet.text;
}

function processTweet(tweet, callback) {
	var text = tweet.text;
	var words = text.split(" ");
	var i;

	data = aggregateWords(data, words);
}

function aggregateWords(cloud, words) {


	for (var i = 0; i < words.length; i++) {
		var result = isWordInCloud(cloud, words[i]);
		if (result.isInCloud) {
			cloud[result.index].weight++;
		} else {
			cloud.push({
				"word": words[i],
				"weight": 1
			});
		}
	}

	return cloud;
}

function isWordInCloud(cloud, word) {
	var isInCloud = false;
	var index;

	console.log(cloud);
	console.log(word);

	for (var i = 0; i < cloud.length; i++) {
		if (cloud[i].word === word) {
			isInCloud = true;
			index = i;
		}
	}



	console.log(isInCloud);

	return {
		isInCloud: isInCloud,
		index: index
	};
}

generateData(testData, setUp);



function draw(words) {
	d3.select("body").append("svg")
		.attr("width", 300)
		.attr("height", 300)
		.append("g")
		.attr("transform", "translate(150,150)")
		.selectAll("text")
		.data(words)
		.enter().append("text")
		.style("font-size", function(d) {
			return d.size + "px";
		})
		.style("font-family", "Impact")
		.style("fill", function(d, i) {
			return fill(i);
		})
		.attr("text-anchor", "middle")
		.attr("transform", function(d) {

			return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		})
		.text(function(d) {
			return d.text;
		});
}

function drawUpdate(words) {
	d3.layout.cloud().size([500, 500])
		.words(words)
		.padding(5)
		.rotate(function() {
			return~~ (Math.random() * 2) * 90;
		})
		.font("Impact")
		.fontSize(function(d) {
			return d.size;
		})
		.start();


	d3.select("svg")
		.selectAll("g")
		.attr("transform", "translate(150,150)")
		.selectAll("text")
		.data(words).enter().append("text")
		.style("font-size", function(d) {
			return d.size * 10 + "px";
		})
		.style("font-family", "Impact")
		.style("fill", function(d, i) {
			return fill(i);
		})

	.attr("transform", function(d) {

		return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	})
		.text(function(d) {
			return d.text;
		});
}