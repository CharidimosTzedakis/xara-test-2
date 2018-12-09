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
    if (node.children.length>0) {
      node.children = recursivelySortChildren(node.children);
    }
  }
  return dataTree.sort(sortByStart);
}

function createDataTree (datapoints) {

    //* 1. sort based on tier 
    const tierSorted = datapoints.sort(sortByTier);
    
    //* 2. create tree structure
    let currentParentNode = null;
    let parentNodeStack = []; //* this is a stack that holds parent data nodes 
    let currentNode = null;
    let dataTree = [];
    for (let datapoint of tierSorted) {
      currentNode = Object.assign(datapoint, {children: []});
      if (!currentParentNode) { //* top level node
        currentParentNode = currentNode;
        dataTree.push(currentParentNode);
      } else {
        if (currentNode.tier === currentParentNode.tier ) { //* currentNode: is surely a leaf of the tree
          if (currentParentNode.start > currentNode.start) { //* if start of parent > start of child, swap roles 
            let startSwap = currentParentNode.start;
            currentParentNode.start = currentNode.start;
            currentNode.start = startSwap;
          }
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
    // console.log(JSON.stringify(dataTree));
    //* 3. recursively sort children by start
    dataTree = recursivelySortChildren(dataTree);
    return dataTree;
}

console.log(datapoints.length);
const dataTree = createDataTree(datapoints);
console.log(JSON.stringify(dataTree));