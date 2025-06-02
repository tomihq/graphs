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


const graphBFS = [
    [1, 4],    // A (0)
    [0, 2, 3], // B (1)
    [1, 3],    // C (2)
    [2, 1, 4], // D (3)
    [0, 3]     // E (4)
  ];

const { parent, dist } = bfs(graphBFS, 0);
console.log('parent:', parent);
console.log('dist:', dist);