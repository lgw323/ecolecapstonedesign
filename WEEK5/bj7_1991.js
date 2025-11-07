const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let lineIndex = 0;

const N = parseInt(input[lineIndex++]);
const tree = {};

for (let i = 0; i < N; i++) {
    const [parent, left, right] = input[lineIndex++].split(' ');
    tree[parent] = { left, right };
}

let resultPre = "";
let resultIn = "";
let resultPost = "";

function preorder(current) {
    if (current === '.') return;
    resultPre += current;
    preorder(tree[current].left);
    preorder(tree[current].right);
}

function inorder(current) {
    if (current === '.') return;
    inorder(tree[current].left);
    resultIn += current;
    inorder(tree[current].right);
}

function postorder(current) {
    if (current === '.') return;
    postorder(tree[current].left);
    postorder(tree[current].right);
    resultPost += current;
}

preorder('A');
inorder('A');
postorder('A');

console.log(resultPre);
console.log(resultIn);
console.log(resultPost);