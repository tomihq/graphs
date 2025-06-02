//a. La complejidad es V^3 porque usamos la implementacion de matriz de adyacencia de dijkstra. 
//b. La complejidad es V * E porque como todos los caminos tienen la misma longitud podemos usar BFS pero tenemos que hacer BFS h veces. 


//Nota: Por el inciso a, obligo a mi dijkstra a usar la implementacion para un eventual grafo denso. 

type DijkstraResult = { dist: number[]; parent: (number | null)[];};
type Graph = [number, number][][];
  
function toAdjMatrix(graph: Graph): number[][] {
    const n = graph.length;
    const matrix = Array.from({ length: n }, () => Array(n).fill(Infinity));
    for (let u = 0; u < n; u++) {
      for (const [v, cost] of graph[u]) {
        matrix[u][v] = cost;
      }
      matrix[u][u] = 0;
    }
    return matrix;
  }
  
  function dijkstraV2(graph: Graph, start: number): DijkstraResult {
    const matrix = toAdjMatrix(graph);
    const n = matrix.length;
    const dist: number[] = Array(n).fill(Infinity);
    const parent: (number | null)[] = Array(n).fill(null);
    const visited: boolean[] = Array(n).fill(false);
  
    dist[start] = 0;
  
    for (let i = 0; i < n; i++) {
      let u = -1;
      let minDist = Infinity;
      for (let j = 0; j < n; j++) {
        if (!visited[j] && dist[j] < minDist) {
          minDist = dist[j];
          u = j;
        }
      }
  
      if (u === -1) break;
      visited[u] = true;
  
      for (let v = 0; v < n; v++) {
        const w = matrix[u][v];
        if (w !== Infinity && dist[u] + w < dist[v]) {
          dist[v] = dist[u] + w;
          parent[v] = u;
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

//0 es la planta 
const tukiPlantaDePapas = (graph, knownEdges, source) =>{
    const dFromP = dijkstraV2(graph, source);
    const n = graph.length;
    const legitHNodes: number[] = [];
  
    for (let h = 0; h < n; h++) {
      if (h === source) continue;
  
      const dToH = dijkstraV2(graph, h);
      let allGood = true;
  
      for (const [u, v] of knownEdges) {
        const edgeWeight = graph[u].find(([to]) => to === v)?.[1];
  
        const validPath = dFromP.dist[u] + edgeWeight + dToH.dist[v] === dFromP.dist[h];
        if (!validPath) {
          allGood = false;
          break;
        }
      }
  
      if (allGood) legitHNodes.push(h);
    }

    return legitHNodes;

}

const graph: Graph = [
    [[1, 2], [2, 5]],   
    [[0, 2], [3, 3]],   
    [[0, 5], [3, 2]],   
    [[1, 3], [2, 2], [4, 1]], 
    [[3, 1]]            
  ];


const E_estrella = [
    [0, 1],
    [1, 3],
    [3, 4]
  ];

  console.log(tukiPlantaDePapas(graph, E_estrella, 0))