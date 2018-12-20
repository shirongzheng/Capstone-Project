var margin = {top: 20, right: 10, bottom: 100, left:50},
    width = 900 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("body")
    .append("svg")
      .attr ({
        "width": width + margin.right + margin.left,
        "height": height + margin.top + margin.bottom
      })
    .append("g")
      .attr("transform","translate(" + margin.left + "," + margin.right + ")");

var xScale = d3.scale.ordinal()
    .rangeRoundBands([0,width], 0.2, 0.2);

var yScale = d3.scale.linear()
    .range([height, 0]);

// define x axis and y axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");
d3.csv("Gdata.csv", function(error,data) {
  if(error) console.log("Error: data not loaded!");

  /*----------------------------------------------------------------------------
  Convert data if necessary. We want to make sure our grades vaulues are
  represented as integers rather than strings. Use "+" before the variable to
  convert a string represenation of a number to an actual number. Sometimes
  the data will be in number format, but when in doubt use "+" to avoid issues.
  ----------------------------------------------------------------------------*/
  data.forEach(function(d) {
    d.StudentID = d.StudentID;
    d.grades = +d.grades;       // try removing the + and see what the console prints
    d.sex = d.sex;
    console.log(d.grades);   // use console.log to confirm
    console.log(d.sex);
  });

    // sort the grades values
    data.sort(function(a,b) {
    return b.grades - a.grades;
  });

  xScale.domain(data.map(function(d) { return d.StudentID; }) );
  yScale.domain([0, d3.max(data, function(d) { return d.grades; } ) ]);
  // var z = console.log(d.sex);
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    // .attr("height", 0)
    // .attr("y", height)
    // .transition().duration(3000)
    // .delay( function(d,i) { return i * 200; })
    // attributes can be also combined under one .attr
    .attr({
      "x": function(d) { return xScale(d.StudentID); },
      "y": function(d) { return yScale(d.grades); },
      "width": xScale.rangeBand(),
      "height": function(d) { return  height - yScale(d.grades); }
    })
    .style("fill", function(d,i) { return 'rgb(20, 20, ' + ((i * 30) + 100) + ')'});
      svg.selectAll('text')
      
            .data(data)
            .enter()
            .append('text')



            .text(function(d){
                return d.sex;
            })
            .attr({
                "x": function(d){ return xScale(d.StudentID) +  xScale.rangeBand()/2; },
                "y": function(d){ return yScale(d.grades)+ 12; },
                "font-family": 'sans-serif',
                "font-size": '10px',
                "font-weight": 'bold',
                "fill": 'white',
                "text-anchor": 'middle'
            });

    // Draw xAxis and position the label
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("dx", "-.8em")
        .attr("dy", ".25em")
        .attr("transform", "rotate(-60)" )
        .style("text-anchor", "end")
        .attr("font-size", "10px");


    // Draw yAxis and postion the label
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("dy", "-3em")
        .style("text-anchor", "middle")
        .text("Grade out of 100");
    

  });