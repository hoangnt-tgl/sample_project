/* 
Mini-Max Sum

Given five positive integers, find the minimum and maximum values that can be calculated by summing
exactly four of the five integers. Then print the respective minimum and maximum values as a single line
of two space-separated long integers.
For example arr = [1, 3, 5, 7, 9], . Our minimum sum is 1 + 3 + 5 + 7 = 16 and our maximum sum is 3 + 5 + 7 + 9 = 24

We would print
16 24

*/

const miniMaxSum = (arr) => {
  let min = 0;
  let max = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  min = sum - Math.max(...arr);
  max = sum - Math.min(...arr);
  console.log(min, max);
};

input = [1, 2, 3, 4, 5];
miniMaxSum(input);

// + Count total of array
// + Find min in array
// + Find max in array
// + Find even elements in array
// + Find odd elements in array

const countTotal = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};
const findMin = (arr) => {
  return Math.min(...arr);
};

const findMax = (arr) => {
  return Math.max(...arr);
};

const findEven = (arr) => {
  let even = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      even.push(arr[i]);
    }
  }
  return even;
};

const findOdd = (arr) => {
  let odd = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 !== 0) {
      odd.push(arr[i]);
    }
  }
  return odd;
};
