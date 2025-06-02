//b. La complejidad es V * E porque como todos los caminos tienen la misma longitud podemos usar BFS pero tenemos que hacer BFS h veces. Solo cambiamos lo de edgeWeight y la estructura del grafo. Lo otro queda igual.


//Nota: Por el inciso a, obligo a mi dijkstra a usar la implementacion para un eventual grafo denso. 

function bfs(graph: number[][], origen: number) {
  const n = graph.length;
  const visited = Array(n).fill(false);
  const parent = Array(n).fill(null);   
  const dist = Array(n).fill(-1);      

  const queue = [origen];
  visited[origen] = true;
  dist[origen] = 0;

  while (queue.length > 0) {
    const u = queue.shift()!;

    for (const v of graph[u]) {
      if (!visited[v]) {
        visited[v] = true;
        parent[v] = u;
        dist[v] = dist[u] + 1;
        queue.push(v);
      }
    }
  }

  return { parent, dist };
}

//0 es la planta 
const tukiPlantaDePapas = (graph, knownEdges, source) =>{
    const dFromP = bfs(graph, source);
    const n = graph.length;
    const legitHNodes: number[] = [];
  
    for (let h = 0; h < n; h++) {
      if (h === source) continue;
  
      const dToH = bfs(graph, h);
      let allGood = true;
  
      for (const [u, v] of knownEdges) {
        const edgeWeight = 1 //solo cambiamos esto
  
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

const graph: number[][] = [
    [1, 2],   
    [0, 3],   
    [0, 3],   
    [1, 2, 4], 
    [3]            
  ];


const E_estrella = [
    [0, 1],
    [1, 3],
    [3, 4]
  ];

console.log(tukiPlantaDePapas(graph, E_estrella, 0))