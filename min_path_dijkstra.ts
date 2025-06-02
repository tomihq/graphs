//Encuentre las aristas que estan en el camino minimo de s y t.
const minPathEdges = (graph: Graph,  s: number, t: number) => {
    const dijkstraS = dijkstra(graph, s);
    const invertedGraph:Graph = Array(graph.length).fill(0).map(() => [])
    for(let i = 0; i<graph.length; i++){
        for(let j = 0; j<graph[i].length; j++){
            const { to, cost } = graph[i][j];
            invertedGraph[to].push({to: i, cost})
        }
    }
    const dijkstraT = dijkstra(invertedGraph, t); 
    const efficientEdges:Edge[] = [];
    for(let i = 0; i<graph.length; i++){
        for(let j = 0; j<graph[i].length; j++){
            const edge = graph[i][j]; //edge = (v -> w)
            //dist(s, v) + cost(v -> w) + dist(w, t) = dist[s, t]
            if(dijkstraS[i] + edge.cost + dijkstraT[edge.to] === dijkstraS[t]){
                efficientEdges.push(edge);
            }
        }
    }

    return efficientEdges
}

console.log(minPathEdges(graph, 0, 4))