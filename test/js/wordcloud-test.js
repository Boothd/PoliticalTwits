function aggregateWords(words){
	var cloud = [];
	
	for(var i=0;i<words.length;i++){
		var result = isWordInCloud(cloud, words[i].text);
		if(result.isInCloud){
			cloud.push(
				{//"text":words[i].text,
				 "weight":cloud[result.index].weight++
				});
		}
		else{
			cloud.push(
				{"word":words[i].text,
				 "weight":0
				});
		}
	}
	
	return cloud;
}

function isWordInCloud(cloud, word){
	var isInCloud = false;
	var index;

		console.log(cloud);
	console.log(word);
	
	for(var i=0;i<cloud.length;i++){
		if(cloud[i].word === word){
			isInCloud = true;
			index = i;
		}
	}

	

	console.log(isInCloud);
	
	return {
		isInCloud:isInCloud,
		index:index
	};
}


var cloud = aggregateWords([{text:"hello"},{text:"world"},{text:"hello"}]);
console.log(cloud);