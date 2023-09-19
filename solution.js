function HUFFMAN_ENCODING(text, probabilities) {
    // Створення масиву вузлів
    let nodes = [];
    let newStr = text.split('');
    newStr.map((i) => nodes.push({char: i, prob: probabilities[newStr.indexOf(i)][0], code: ''}));

    while (nodes.length > 1) {
        // Сортування вузлів за ймовірністю
        nodes.sort((a, b) => b.prob - a.prob);

        // Об'єднання двох вузлів з найменшою ймовірністю
        let node1 = nodes.pop();
        let node2 = nodes.pop();

        // Створення нового вузла з об'єднаними ймовірностями та символами
        let newNode = {
            char: node1.char + node2.char,
            prob: node1.prob + node2.prob,
            left: node1,
            right: node2,
        };
        nodes.push(newNode);
    }

    // Отримання дерева Хаффмана
    let tree = nodes[0];
    tree.code = '';  // Initialize the root node's code to an empty string

    // Створення таблиці кодування
    let codes = {};
    let stack = [tree];
    while (stack.length > 0) {
        let node = stack.pop();
        if (node.left) {
            node.left.code = node.code + '0';
            stack.push(node.left);
        }
        if (node.right) {
            node.right.code = node.code + '1';
            stack.push(node.right);
        }
        if (!node.left && !node.right) {
            codes[node.char] = node.code;
        }
    }

    // Кодування тексту
    let encodedText = [];
    for (let i = 0; i < text.length; i++) {
        encodedText.push(codes[text[i]]);
    }

    return [encodedText];
}