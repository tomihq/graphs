//2. Necesito ver que las aristas que estan en el grafo original pero no en el árbol. Si los nodos de esa arista estan en el conjunto de pares o en los impares, entonces ese grafo no seria bipartito.

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
//Nota: Este grafo es no dirigido pero seria lo mismo si fuese dirigido, se deberia sacar el    treeEdges[i].push(p); 
const paresImparesGEsBiparticion = (graphBFS) =>{
    const { parent, dist } = bfs(graphBFS, 0); //O(V+E)

    //0. Me guardo la lista de los pares e impares recorriendo la lista de distancia de los nodos del arbol desde la raiz. Cada valor en la lista corresponde a la distancia a la raíz. El elemento en cuestión lo representa el índice.
    const pares: number[] = []; //O(V)
    const impares: number[] = [];  //O(V)
    for(let i = 0; i<dist.length; i++){
        dist[i] % 2 == 0 ? pares.push(i) : impares.push(i);
    }

    //1. Recorro el array de parents y rdo que cada valor que hay en ese indice es el padre en el grafo origianl. 
    const treeEdges: number[][] = Array(graphBFS.length).fill(0).map(() => []); //O(V)
    const n = parent.length;
    for(let i = 0; i<n; i++){ //O(V)
        const p = parent[i];
        if (p !== null) {
            treeEdges[p].push(i);
            treeEdges[i].push(p); 
        }
    }

    //2. Recorro todas las aristas del grafo original y me quedo con las que no estan en el arbol.
    const difference: number[][] = Array(graphBFS.length).fill(0).map(() => []);
    for (let u = 0; u < graphBFS.length; u++) { //O(E)
        for (const v of graphBFS[u]) {
            if (!treeEdges[u].includes(v) && !treeEdges[v].includes(u)) {
                difference[u].push(v);
            }
        }
    }


    //3. Chequeo si todas las aristas que estan en el grafo original no estan en el arbol bfs. Por cada arista chequeo que, siendo (u, v) la arista o bien u esta en pares o bien u está en impares, lo mismo con v. Pero ambos nodos no pueden ser pares / impares a la vez porque eso rompería la posibilidad de ser bipartito.
    let validas = 0;
    for (const [u, v] of difference) {
        if ((pares.includes(u) && impares.includes(v)) || 
            (pares.includes(v) && impares.includes(u))) {
            validas++;
        }
    }   
    return validas === difference.length ? '(P, I) es una bipartición de G': '(P, I) no es una bipartición de G';

}

const graphBFS = [
    [1, 4],    // A (0)
    [0, 2, 3], // B (1)
    [1, 3],    // C (2)
    [2, 1, 4], // D (3)
    [0, 3]     // E (4)
];

console.log(paresImparesGEsBiparticion(graphBFS))