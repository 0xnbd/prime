// biscuits of number theory
// ZH

const svgWidth = "450px"
const svgHeight = "450px"

function convert2path(xarr, yarr)
{
	scale = 5
    nPts = xarr.length
    pathStr = "M"+(xarr[0]*scale+20)+ " "+(yarr[0]*scale+20)+" "
    for (i=1;i<nPts;i++){
        coord = "L"+(xarr[i]*scale+20)+" "+(yarr[i]*scale+20)
        pathStr+=coord+" "
    }

    pathStr = pathStr.substring(0,pathStr.length-1)
    return pathStr
}



function computePath(a=1, n=37, base=35)
{
	// a/n in base b
	// var a = 1
	// var n = 7
	// var base = 10
	// var a = 1
	// var n = 5
	// var base = 2
	// var a = 17
	// var n = 19
	// var base = 5
	// var a = 1
	// var n = 101
	// var base = 40
	// var a = 1
	// var n = 37
	// var base = 35
	// var a = 23
	// var n = 53
	// var base = 35
	// var a = 23
	// var n = 53
	// var base = 91

	// var a = 17
	// var n = 79
	// var base = 37

	
	var digits = []
	var xArray = []
	var yArray = []
	r = a % n;
	while(digits.indexOf(r)==-1){
		digits.push(r);
		r = (r*base) % n;
	}
	digits.push(digits[0])
	// console.log(digits)
	
	xArray.push(digits[0])
	yArray.push(digits[0])

	for(i=0;i<digits.length-1;i++)
	{
		xArray.push(digits[i])
		yArray.push(digits[i+1])

		xArray.push(digits[i+1])
		yArray.push(digits[i+1])

	}
	d3.select("svg").remove(); 

    d3.select('#path')
        .append("svg")
        .attr("id","svg-path")
        .attr("width",svgWidth)
        .attr("height",svgHeight)
        .style("border","solid 2px black")

	nPts = xArray.length;
    pathStr = "M"+xArray[0]+ " "+yArray[0]+" "
    for (i=1;i<nPts;i++){
        coord = "L"+xArray[i]+" "+yArray[i]
        pathStr+=coord+" "
    }

    pathStr = convert2path(xArray,yArray)

    d3.select("#svg-path")
        .append("path")
        .attr("d",pathStr)
        .style("stroke-width",3)
        .style("stroke","blue")
        .style("fill","none")

    pathDone = true
}
