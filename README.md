Dijkstra's D3 Demo
---

Basic framework for running Dijkstra's algorithm and displaying the results on an undirected graph via d3.

`chrome d3_demo.html`

to view the d3 demo. Integrate this with the included `DijkstrasAlgorithm.js` for cool technology.


Dijkstra.js
---

Swap the commented lines in the file to perform Dijkstra's Algorithm on the tree defined on the Dijkstra's Algorithm wikipedia page. Leave the current comment structure to build a dynamic graph randomly and solve it with Dijkstra's Algorithm.

    let graph_spec = gen_graph(1000, 5);
    let tree = build_tree(graph_spec.V, graph_spec.E);
    //let tree = build_tree(V,E);
    //console.log(JSON.stringify(tree,null,2));
