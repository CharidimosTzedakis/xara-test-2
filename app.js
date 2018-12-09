const datapoints = require('./datapoints');

function sortByTier(a,b) {
    if (a.tier < b.tier)
      return -1;
    if (a.tier > b.tier)
      return 1;
    return 0;
}

function sortByStart(a,b) {
  if (a.start < b.start)
    return -1;
  if (a.start > b.start)
    return 1;
  return 0;
}

function recursivelySortChildren (tree) {
  let dataTree = tree;
  for (let node of dataTree) {
    if (dataTree.children.length>0) {
      dataTree.children = recursivelySortChildren(dataTree.children);
    }
  }
  return dataTree;
}


function createDataTree (datapoints) {

    //* 1. sort based on tier 
    const tierSorted = datapoints.sort(sortByTier);
    
    //* create tree structure
    const dataTree = [];
    let currentParentNode = null;
    let parentNodeStack = []; //* this stack holds data nodes that are not yet finalized
    let currentNode = null;
    let dataTree = [];
    for (let datapoint of tierSorted) {
      currentNode = Object.assign(datapoint, {children:[]});
      if (!currentParentNode) { //* top level node
        currentParentNode = currentNode;
        dataTree.push(currentParentNode);
      } else {
        if (currentNode.tier === currentParentNode.tier ) { //* currentNode: is a leaf of the tree
          currentParentNode.children.push(currentNode);
        } else if (currentNode.tier.startsWith(currentParentNode.tier)) { //* currentNode: will be child of current parent and might have children
          currentParentNode.children.push(currentNode);
          parentNodeStack.push(currentParentNode); //* push currentParentNode to the stack
          currentParentNode = currentNode; //* this node is now the current parent
        } else {
          currentParentNode = parentNodeStack.pop();
          while (currentParentNode && !currentNode.tier.startsWith(currentParentNode.tier)) {
            currentParentNode = parentNodeStack.pop();
          }
          if (!currentParentNode) {
            currentParentNode = currentNode;
            dataTree.push(currentParentNode); //* fount a top level node
          }
          else {  //* while case: currentNode.tier.startsWith(currentParentNode.tier)
            currentParentNode.children.push(currentNode);
            parentNodeStack.push(currentParentNode);
            currentParentNode = currentNode; 
          }
        }
      }
    }
    // *recursively sort children by start
    dataTree = recursivelySortChildren(dataTree);
    return tierSorted;
}

console.log(datapoints.length);
const dataTree = createDataTree(datapoints);
console.log(dataTree);