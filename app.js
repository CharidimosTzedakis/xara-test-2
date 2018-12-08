const datapoints = require('./datapoints');

function sortByStart(a,b) {
    if (a.start < b.start)
      return -1;
    if (a.start > b.start)
      return 1;
    return 0;
}

function createDataTree (datapoints) {

    //* 1. sort based on tier 
    const tierSorted = datapoints.sort(sortByStart);
    
    //* create tree structure
    const dataTree = [];
    let currentParentNode = null;
    let parentNodeStack = []; //* this stack holds data nodes that are not yet finalized
    let currentNode = null;
    for (var datapoint of tierSorted) {
      currentNode = Object.assign(datapoint, {children:[]});
      if (!currentParentNode) {
        currentParentNode = currentNode;
      } else {
        if (currentNode.tier === currentParentNode.tier ) { //* currentNode: will be child of current parent and wont have children
          currentParentNode.children.push(currentNode);
        } else if (currentNode.tier.startsWith(currentParentNode.tier)) { //* currentNode: will be child of current parent and might have children
          currentParentNode.children.push(currentNode);
          parentNodeStack.push(currentParentNode); //* push currentParentNode to the stack
          currentParentNode = currentNode; //* this node is now the current parent
        }
      }
    }
    return tierSorted;
}

console.log(datapoints.length);
const dataTree = createDataTree(datapoints);
console.log(dataTree);