---
title: 'JavaScript Code: Maximum Subarray Sum'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'JavaScript Code: Maximum Subarray Sum'
---

```ts
const maximumSubarraySum = (nums) => {
  // Initialize currentMax and globalMax
  // with first value of nums
  let endIndex;
  let currentMax = nums[0];
  let globalMax = nums[0];

  // Iterate for all the elements
  // of the array
  for (let i = 1; i < nums.length; ++i) {
    // Update currentMax
    currentMax = Math.max(nums[i], nums[i] + currentMax);

    // Check if currentMax is greater than globalMax
    if (currentMax > globalMax) {
      globalMax = currentMax;
      endIndex = i;
    }
  }

  let startIndex = endIndex;

  // Traverse in left direction to
  // find start Index of subarray
  while (startIndex >= 0) {
    globalMax -= nums[startIndex];

    if (globalMax === 0) break;

    // Decrement the start index
    startIndex--;
  }

  console.log(nums.splice(startIndex, endIndex));
};

// Driver Code

// Given array arr[]
const arr = [-2, -5, 6, -2, -3, 1, 5, -6];

// Function call
maximumSubarraySum(arr);
```
