var fill = d3.scale.category20();
var data = [];

function generateData(tweets, callback) {
	var text;
	var i;
	for (i = 0, size = tweets.length; i < size; i++) {
		processTweet(tweets[i], callback);
	}

	//callback();
	//setUp();
	initialise(data);
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
			cloud[result.index].size++;
		} else {
			cloud.push({
				"text": words[i],
				"size": 1
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
		if (cloud[i].text === word) {
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

function initialise(words){


    d3.layout.cloud().size([700, 700])
            .words(words)
            .rotate(0)
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();
}



    function draw(words) {
			    var color = d3.scale.linear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);
		
		
        d3.select("body").append("svg")
                .attr("width", 1000)
                .attr("height", 600)
                .attr("class", "wordcloud")
                .append("g")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                //.attr("transform", "translate(320,200)")
				.attr("transform", "translate(600,600)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size*10 + "px"; })
                .style("fill", function(d, i) { return color(i); })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
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