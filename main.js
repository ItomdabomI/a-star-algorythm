class Node{constructor(x,y,walkable=true){this.x=x;this.y=y;this.walkable=walkable;this.g=0;this.h=0;this.f=0;this.parent=null;}}class AStar{constructor(grid,start,end){this.grid=grid;this.start=start;this.end=end;this.openList=[];this.closedList=[];}heuristic(node1,node2){return Math.abs(node1.x-node2.x)+Math.abs(node1.y-node2.y);}getNeighbors(node){const neighbors=[];const{x,y}=node;const directions=[[0,-1],[0,1],[-1,0],[1,0]];for(let[dx,dy]of directions){const nx=x+dx,ny=y+dy;if(nx>=0&&ny>=0&&nx<this.grid.length&&ny<this.grid[0].length){neighbors.push(this.grid[nx][ny]);}}return neighbors;}search(){this.openList.push(this.start);while(this.openList.length>0){let lowIndex=0;for(let i=0;i<this.openList.length;i++){if(this.openList[i].f<this.openList[lowIndex].f){lowIndex=i;}}const currentNode=this.openList[lowIndex];if(currentNode===this.end){return this.retracePath(currentNode);}this.openList.splice(lowIndex,1);this.closedList.push(currentNode);for(let neighbor of this.getNeighbors(currentNode)){if(!neighbor.walkable||this.closedList.includes(neighbor)){continue;}const tentativeG=currentNode.g+1;if(tentativeG<neighbor.g||!this.openList.includes(neighbor)){neighbor.g=tentativeG;neighbor.h=this.heuristic(neighbor,this.end);neighbor.f=neighbor.g+neighbor.h;neighbor.parent=currentNode;if(!this.openList.includes(neighbor)){this.openList.push(neighbor);}}}}return [];}retracePath(node){const path=[];let current=node;while(current!==null){path.push(current);current=current.parent;}return path.reverse();}}const grid=[];const rows=5,cols=5;for(let i=0;i<rows;i++){const row=[];for(let j=0;j<cols;j++){row.push(new Node(i,j));}grid.push(row);}grid[1][1].walkable=false;grid[1][2].walkable=false;grid[1][3].walkable=false;const startNode=grid[0][0];const endNode=grid[4][4];const astar=new AStar(grid,startNode,endNode);const path=astar.search();if(path.length>0){console.log("Path found:");for(let node of path){console.log(`(${node.x}, ${node.y})`);}}else{console.log("No path found.");}
