// Визначення вузла дерева
class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

// Вставка елемента в двійкове дерево пошуку
function insert(root, value) {
  if (root === null) {
    return new TreeNode(value)
  }
  if (value < root.value) {
    root.left = insert(root.left, value)
  } else {
    root.right = insert(root.right, value)
  }
  return root
}

// Обхід дерева в порядку зростання
function inorderTraversal(root) {
  if (root === null) {
    return []
  }
  let left = inorderTraversal(root.left)
  let right = inorderTraversal(root.right)
  return [...left, root.value, ...right]
}

// Алгоритм сортування за допомогою двійкового дерева пошуку
function bstSort(arr) {
  let root = null
  for (let i = 0; i < arr.length; i++) {
    root = insert(root, arr[i])
  }
  return inorderTraversal(root)
}

// Приклад використання
let arr = [5, 2, 8, 1, 3, 7, 6]
let sortedArr = bstSort(arr)
console.log('Відсортований масив:', sortedArr)
