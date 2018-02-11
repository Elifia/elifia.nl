$(document).ready(function()
{
	$("#calculate").click(function()
	{
		var $scores = [];
		$("#calculator input").each(function(a,b)
		{
			$this = $(b);
			$scores.push({index: a, value: $this.val()});
		});

		$scores.sort(function(a,b)
		{
			return Math.abs(a.value) - Math.abs(b.value);
		})

		for(var i = 0; i < $scores.length; i++)
		{
			if($scores[i]["mp"] === undefined)
			{
				averageMp($scores, i, [i*2]);
			}
			$("#calculator tbody > tr:nth-child(" + ($scores[i]["index"] + 1) + ") span.mp.nz").text($scores[i]["mp"] + " (" + Math.round(($scores[i]["mp"] / 2) / ($scores.length-1) * 10000)/100 + "%)");
			$("#calculator tbody > tr:nth-child(" + ($scores[i]["index"] + 1) + ") span.mp.ow").text(($scores.length - 1) * 2 - $scores[i]["mp"] + " (" + Math.round(((($scores.length - 1) * 2 - $scores[i]["mp"]) / 2) / ($scores.length-1) * 10000)/100 + "%)");
		}
	});

	function averageMp($scores, i, $array)
	{
		if ($scores[i+1] && Math.abs($scores[i]["value"]) === Math.abs($scores[i+1]["value"]))
		{
			$array.push((i+1)*2);
			var avg = averageMp($scores, i+1, $array);
			$scores[i]["mp"] = $scores[i]["value"] > 0 ? avg : (($scores.length - 1) * 2 - avg);
			return avg;
		}
		else
		{
			var sum = 0;
			for(var j = 0; j < $array.length; j++)
			{
				sum += $array[j];
			}
			var avg = sum / $array.length;
			$scores[i]["mp"] = $scores[i]["value"] > 0 ? avg : (($scores.length - 1) * 2 - avg);
			return avg;
		}
	}
});