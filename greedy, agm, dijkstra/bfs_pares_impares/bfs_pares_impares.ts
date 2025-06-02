//O. Test de BFS
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

//Nota, este es no dirigido pero da igual la verdad. Este codigo particular se usó para practicar la idea de como distinguir los nodos que están a nivel par o impar de la raíz usando bfs.
const graphBFS = [
    [1, 4],    // A (0)
    [0, 2, 3], // B (1)
    [1, 3],    // C (2)
    [2, 1, 4], // D (3)
    [0, 3]     // E (4)
];

const aliases: string[] = ["A", "B", "C", "D", "E"]


const paresImparesBFS = (graphBFS) =>{
    const { parent, dist } = bfs(graphBFS, 0);
    const pares: string[] = [];
    const impares: string[] = []; 
    for(let i = 0; i<dist.length; i++){
        dist[i] % 2 == 0 ? pares.push(aliases[i]) : impares.push(aliases[i]);
    }
    return {pares, impares}
}
//Devuelve los índices de los nodos a distancia par-impar enraizado desde 0. 
console.log(paresImparesBFS(graphBFS))