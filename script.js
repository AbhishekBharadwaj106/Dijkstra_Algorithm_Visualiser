// script.js

// Graph structure
const graph = {};
const edgesList = document.getElementById("edges-list");
const outputDiv = document.getElementById("output");

// Function to add edges to the graph
function addEdge() {
  const edgeInput = document.getElementById("edge-input").value;
  const [from, to, weight] = edgeInput.split(',');

  if (!graph[from]) graph[from] = [];
  if (!graph[to]) graph[to] = [];
  
  graph[from].push({ node: to, weight: parseInt(weight) });
  graph[to].push({ node: from, weight: parseInt(weight) });

  const listItem = document.createElement("li");
  listItem.textContent = `${from} -> ${to} (Weight: ${weight})`;
  edgesList.appendChild(listItem);

  document.getElementById("edge-input").value = '';
}

// Function to run Dijkstra's algorithm
function runDijkstra() {
  const startNode = document.getElementById("start-node").value;
  const distances = {};
  const visited = new Set();

  for (let node in graph) {
    distances[node] = Infinity;
  }
  distances[startNode] = 0;

  while (visited.size < Object.keys(graph).length) {
    const [closestNode] = Object.entries(distances)
      .filter(([node]) => !visited.has(node))
      .reduce((acc, curr) => (curr[1] < acc[1] ? curr : acc), [null, Infinity]);

    if (closestNode === null) break;
    visited.add(closestNode);

    for (let neighbor of graph[closestNode]) {
      const distance = distances[closestNode] + neighbor.weight;
      if (distance < distances[neighbor.node]) {
        distances[neighbor.node] = distance;
      }
    }
  }

  displayResults(distances);
}

// Function to display shortest path results
function displayResults(distances) {
  outputDiv.innerHTML = '<h3>Shortest Paths:</h3>';
  for (let node in distances) {
    const result = document.createElement("p");
    result.textContent = `Distance to ${node}: ${distances[node]}`;
    outputDiv.appendChild(result);
  }
}
