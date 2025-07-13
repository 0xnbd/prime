function convert2path(xarr, yarr, scale, tx, ty) {
    let nPts = xarr.length;
    let pathStr = "M" + (xarr[0]*scale + tx) + " " + (yarr[0]*scale + ty) + " ";
    for (let i=1; i<nPts; i++) {
        let coord = "L" + (xarr[i]*scale + tx) + " " + (yarr[i]*scale + ty) + " ";
        pathStr += coord;
    }
    return pathStr.trim();
}

function computePath(a=1, n=37, base=35) {
    // Ensure numeric inputs
    a = Number(a);
    n = Number(n);
    base = Number(base);

    // Defensive: check for valid inputs
    if (!Number.isFinite(a) || !Number.isFinite(n) || !Number.isFinite(base) || n === 0) {
        alert("Invalid input values.");
        return;
    }

    // Generate digit sequence
    let digits = [];
    let xArray = [];
    let yArray = [];
    let r = a % n;
    while (digits.indexOf(r) === -1) {
        digits.push(r);
        r = (r * base) % n;
    }
    digits.push(digits[0]);

    xArray.push(digits[0]);
    yArray.push(digits[0]);
    for (let i = 0; i < digits.length - 1; i++) {
        xArray.push(digits[i]);
        yArray.push(digits[i+1]);
        xArray.push(digits[i+1]);
        yArray.push(digits[i+1]);
    }

    // Defensive: check for valid data
    if (!xArray.length || !yArray.length || xArray.some(isNaN) || yArray.some(isNaN)) {
        alert("No valid data to draw.");
        return;
    }

    // Compute bounds
    let minX = Math.min(...xArray);
    let maxX = Math.max(...xArray);
    let minY = Math.min(...yArray);
    let maxY = Math.max(...yArray);

    // SVG size and margin
    const svgWidth = 450, svgHeight = 450, margin = 20;

    // Compute scale to fit, avoid zero division
    let rangeX = maxX - minX || 1;
    let rangeY = maxY - minY || 1;
    let scaleX = (svgWidth - 2 * margin) / rangeX;
    let scaleY = (svgHeight - 2 * margin) / rangeY;
    let scale = Math.min(scaleX, scaleY);

    // Compute translation to center
    let tx = margin - minX * scale;
    let ty = margin - minY * scale;

    // Build path string with scaling and translation
    let pathStr = convert2path(xArray, yArray, scale, tx, ty);

    // Remove any existing SVG
    d3.select("svg").remove();

    // Draw SVG and path
    d3.select('#path')
        .append("svg")
        .attr("id", "svg-path")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .style("border", "solid 2px black");

    d3.select("#svg-path")
        .append("path")
        .attr("d", pathStr)
        .style("stroke-width", 3)
        .style("stroke", "blue")
        .style("fill", "none");
}
