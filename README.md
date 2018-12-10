### xara-test-2

#### Algorithm description

1. Sort datapoints based on "tier".
1. This sorting enables us to create the tree structure with one pass. A stack is used to temporarily keep the parents until all their children are placed.
3. As a final step, each children array is sorted by "start".

