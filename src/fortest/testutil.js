import { getA_not_in_B } from './util.js'; // 替换为你的模块路径

// 正常情况测试
const A = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Alice' },
  { id: 3, name: 'Bob' },
];

const B = [
  { id: 2, name: 'Alice' },
  { id: 4, name: 'Eve' },
];

const keyname = 'id';

const result = getA_not_in_B(A, B, keyname);
console.log(result); // 期望输出: [{ id: 1, name: 'John' }, { id: 3, name: 'Bob' }]

// 边界情况测试
const emptyA = [];
const emptyB = [];
const emptyResult = getA_not_in_B(emptyA, emptyB, keyname);
console.log(emptyResult); // 期望输出: []

const emptyAWithElements = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Alice' },
];

const emptyBWithElements = [
  { id: 3, name: 'Bob' },
  { id: 4, name: 'Eve' },
];

const emptyResultWithElements = getA_not_in_B(emptyAWithElements, emptyBWithElements, keyname);
console.log(emptyResultWithElements); // 期望输出: [{ id: 1, name: 'John' }, { id: 2, name: 'Alice' }]

const sameKeyValues = [
  { id: 1, name: 'John' },
  { id: 1, name: 'Alice' },
];

const sameKeyValuesResult = getA_not_in_B(sameKeyValues, B, keyname);
console.log(sameKeyValuesResult); // 期望输出: [{ id: 1, name: 'John' }, { id: 1, name: 'Alice' }]
