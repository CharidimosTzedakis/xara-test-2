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
    let previousDataNode = {};
    let currentOpentierLevel = 0;
    let dataNodesNotFinalized = []; //* this holds data nodes that are not yet finalized
    for (var datapoint of tierSorted) {
      const currentTier = findDatapointTierLevel(datapoint);
      
      if (currentTier >= currentOpentierLevel) { //* will be either child of previous node or sibling
        if (datapoint.tier === previousDataNode.tier) {

        }
      } else { //* will be surely sibling

      }
    }

    //* sort children

    return tierSorted;
}

console.log(datapoints.length);
const dataTree = createDataTree(datapoints);
console.log(dataTree);