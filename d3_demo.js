var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

var width = 800,
    height = 400,
    radius = 16;

var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(10)
    .charge(-900)
    .chargeDistance(700)
    .gravity(.007)
    .on("tick", tick);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

    console.log(force);
    console.log(nodes);

nodes["ROOT"].x = width/3;
nodes["ROOT"].y = height/2;
nodes["ROOT"].fixed = true;

Object.keys(nodes).forEach(function(key) {
  console.log(key);
  console.log(nodes[key]);
  console.log(demo_nodes[key]);
  if(demo_nodes[key] && demo_nodes[key].group) {
    nodes[key].group = demo_nodes[key].group;
  }
});

force.start();

// Per-type markers, as they don't inherit styles.
svg.append("defs").selectAll("marker")
    .data(["link"])
  .enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "-50 -50 100 100")
    .attr("refX", 35)
    .attr("refY", 0)
    .attr("markerWidth", 16)
    .attr("markerHeight", 16)
    .attr("orient", "auto")
  .append("path")
    .attr("d", "M-50,-25L-25,0L-50,25");

var path = svg.append("g").selectAll("path")
    .data(force.links())
  .enter().append("path")
    .attr("class", function(d) { return "link" })
    .attr("marker-end", function(d) { return "url(#link)"; });

var link_text = svg.append("g").selectAll("text")
    .data(force.links())
  .enter().append("text")
    .attr("class", "link-text")
    .text(function(d) { return d.label; });

var color = d3.scale.category20();
console.log(color);
console.log(color(0));
console.log(color(1));

var circle = svg.append("g").selectAll("circle")
    .data(force.nodes())
  .enter().append("circle")
    .attr("r", 16)
    .attr("fill", function(d) { return color(d.group); })
    .call(force.drag);

var text = svg.append("g").selectAll("text")
    .data(force.nodes())
  .enter().append("text")
    .attr("x", -12)
    .attr("y", ".31em")
    .text(function(d) { return d.name; });

// Use elliptical arc path segments to doubly-encode directionality.
function tick() {
  path.attr("d", linkArc);
  circle.attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
      .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });
  text.attr("transform", transform);
  link_text.attr("transform", placeText);
}

function linkArc(d) {
  var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = 0;//Math.sqrt(dx * dx + dy * dy - 200);
  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + (d.target.y);
}

function placeText(d) {
  var dx = (d.target.px - d.source.px)/2 + d.source.px,
      dy = (d.target.py - d.source.py)/2 + d.source.py;
  return "translate(" + dx + "," + dy + ")";
}

function transform(d) {
  return "translate(" + d.x + "," + d.y + ")";
}

var updateData = function() {
  links = d3.json('d3_demo_data.js');
  force.resume();
};

