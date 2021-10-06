import { parseInput, multiply } from "../util.ts";

interface Slope {
    right: number;
    down: number;
}

enum Block {
    Open = '.',
    Tree = '#'
}

const getTreeCountForSlope = (map: string[][], slope: Slope): number => {
    let treeCount = 0;

    // This could be optimized somehow me think...
    for (
        let position = { x: 0, y: 0 };
        position.y < map.length;
        position = { x: position.x + slope.right, y: position.y + slope.down }
    ) {
        const currentLine = map[position.y];
        const currentPoint = currentLine[position.x % currentLine.length];
        if (currentPoint === Block.Tree) {
            ++treeCount;
        }
    }

    return treeCount;
};

const input = await parseInput();
const map = input.map(a => a.split(''));

// Part one
console.log(getTreeCountForSlope(map, { right: 3, down: 1 }));

const partTwoResult = [
    getTreeCountForSlope(map, { right: 1, down: 1 }),
    getTreeCountForSlope(map, { right: 3, down: 1 }),
    getTreeCountForSlope(map, { right: 5, down: 1 }),
    getTreeCountForSlope(map, { right: 7, down: 1 }),
    getTreeCountForSlope(map, { right: 1, down: 2 })
];

console.log(multiply(partTwoResult));
