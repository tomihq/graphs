/* 
Dado un digrafo D con pesos c : E(D) → N y dos vértices s y t, decimos que una arista v → w
es st-eficiente cuando v → w pertenece a algún camino mínimo de s a t. Sea d(·, ·) la función
que indica el peso de un camino mínimo entre dos vértices.
a. Demostrar que v → w es st-eficiente si y sólo si d(s, v) + c(v → w) + d(w, t) = d(s, t).
b. Usando el inciso anterior, proponga un algoritmo eficiente que encuentre el mínimo de los
caminos entre s y t que no use aristas st-eficientes. Si dicho camino no existe, el algoritmo
retorna ⊥

b. Como necesitamos tener d(s, v) y además d(w, t) necesito correr Dijkstra dos veces:
    1. Desde s (ya lo tengo)
    2. Desde t (no lo tengo): Para conseguir, tengo que invertir las direcciones de las aristas del grafo. 
Una vez que tenemos ambas, recorremos el grafo original y utilizamos la fórmula. Si la arista no satisface la fórmula, es decir, no es st-eficiente, la guardo. 

Por último, modifico dijkstra para guardar el nodo padre que lo llama para poder reconstruir el camino. 

Luego, vuelvo a ejecutar dijkstra desde el grafo modificado, desde s, y reconstruyo el camino. 
*/
type Edge = { to: number; cost: number };
type Graph = Edge[][];

function dijkstra(graph: Graph, start: number): { dist: number[], parent: (number | null)[] } {
    const n = graph.length;
    const dist = Array(n).fill(Infinity);
    const parent = Array(n).fill(null) as (number | null)[];
    dist[start] = 0;
  
    const pq: [number, number][] = []; // [dist, nodo]
    pq.push([0, start]);
  
    while (pq.length > 0) {
      pq.sort((a, b) => a[0] - b[0]);
      const [curDist, u] = pq.shift()!;
  
      if (curDist > dist[u]) continue;
  
      for (const { to: v, cost: w } of graph[u]) {
        const nd = dist[u] + w;
        if (nd < dist[v]) {
          dist[v] = nd;
          parent[v] = u;      // Guardamos el padre para reconstruir camino
          pq.push([nd, v]);
        }
      }
    }
    return { dist, parent };
}

function reconstructPath(parent: (number | null)[], start: number, end: number): number[] | null {
    const path: number[] = [];
    let current: number | null = end;
    while (current !== null) {
        path.push(current);
        if (current === start) break;
        current = parent[current];
    }
    if (path[path.length - 1] !== start) return null; 
    return path.reverse();
}

const minPathWithoutSTEdges = (graph: Graph, s: number, t: number) => {
    const n = graph.length;
  
    const { dist: distS } = dijkstra(graph, s);

    const invertedGraph: Graph = Array(n).fill(0).map(() => []);
    for(let u = 0; u < n; u++) {
        for(const edge of graph[u]) {
            invertedGraph[edge.to].push({ to: u, cost: edge.cost });
        }
    }
    const { dist: distT } = dijkstra(invertedGraph, t);
  

    const filteredGraph: Graph = Array(n).fill(0).map(() => []);
    for(let u = 0; u < n; u++) {
        for(const edge of graph[u]) {
            const w = edge.to;
            const cost = edge.cost;
            if(distS[u] + cost + distT[w] !== distS[t]) {
                filteredGraph[u].push(edge);
            }
        }
    }
  
    const { dist: distFiltered, parent: parentFiltered } = dijkstra(filteredGraph, s);
    if(distFiltered[t] === Infinity) {
        console.log("No existe camino mínimo sin usar aristas st-eficientes");
        return null; 
    }
  
    const path = reconstructPath(parentFiltered, s, t);
    console.log("Camino mínimo sin aristas st-eficientes:", path);
    console.log("Costo:", distFiltered[t]);
    return { path, cost: distFiltered[t] };
}

const graph: Graph = [
    [{ to: 1, cost: 2 }, { to: 2, cost: 4 }], 
    [{ to: 2, cost: 1 }, { to: 3, cost: 7 }],
    [{ to: 4, cost: 3 }],
    [{ to: 4, cost: 1 }],
    [], 
];

minPathWithoutSTEdges(graph, 0, 4);
