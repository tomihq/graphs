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

function reconstruirCicloImpar(u: number, v: number, parent: (number | null)[]): number[] {
    const pathU: number[] = [];
    const pathV: number[] = [];

    let curU: number | null= u;
    let curV: number | null = v;

    while (curU !== null && curV !== null && curU !== curV) {
        if (curU !== null) {
            pathU.push(curU);
            curU = parent[curU];
        }
        if (curV !== null) {
            pathV.push(curV);
            curV = parent[curV];
        }
    }

    if (curU !== null) {
        pathU.push(curU); 
    }

    pathV.reverse();

    return [...pathU, ...pathV];
}

const bipartitoCicloImparBFS = (graphBFS: number[][]) =>{
    const { parent, dist } = bfs(graphBFS, 0); //O(V+E)

    //0. Me guardo la lista de los pares e impares recorriendo la lista de distancia de los nodos del arbol desde la raiz. Cada valor en la lista corresponde a la distancia a la raíz. El elemento en cuestión lo representa el índice.
    const pares: number[] = [];
    const impares: number[] = [];
    for(let i = 0; i<dist.length; i++){
        dist[i] % 2 == 0 ? pares.push(i) : impares.push(i);
    }

     //1. Recorro el array de parents y rdo que cada valor que hay en ese indice es el padre en el grafo origianl. 
    const treeEdges: number[][] = Array(graphBFS.length).fill(0).map(() => []);
    const n = parent.length;
    for(let i = 0; i<n; i++){
        const p = parent[i];
        if (p !== null) {
            treeEdges[p].push(i);
            treeEdges[i].push(p);
        }
    }

    //2. Recorro todas las aristas del grafo original y me quedo con las que no estan en el arbol.
    const difference: number[][] = Array(graphBFS.length).fill(0).map(() => []);
    for (let u = 0; u < graphBFS.length; u++) {
        for (const v of graphBFS[u]) {
            if (!treeEdges[u].includes(v) && !treeEdges[v].includes(u)) {
                difference[u].push(v);
            }
        }
    }

    // 3. Reviso si existe una arista en difference que conecte dos nodos pares o dos nodos impares
    for (let u = 0; u < difference.length; u++) {
        for (const v of difference[u]) {
            if ((pares.includes(u) && pares.includes(v)) || (impares.includes(u) && impares.includes(v))) {
                // Encontramos ciclo impar, reconstruimos ciclo y devolvemos
                const ciclo = reconstruirCicloImpar(u, v, parent);
                return {
                    bipartito: false,
                    cicloImpar: ciclo
                };
            }
        }
    }

    return {
        bipartito: true,
        P: pares,
        I: impares
    };
};

const graphBFS = [
    [1, 4],    // A (0)
    [0, 2, 3], // B (1)
    [1, 3],    // C (2)
    [2, 1, 4], // D (3)
    [0, 3]     // E (4)
];

console.log(bipartitoCicloImparBFS(graphBFS));
