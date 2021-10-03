const getTwoEntriesForSum = (numbers: number[], target: number): number[] => {
    for (let i = 0; i < numbers.length; ++i) {
        for (let j = i + 1; j < numbers.length; ++j) {
            if (numbers[i] + numbers[j] === target) {
                return [numbers[i], numbers[j]];
            }
        }
    }
    throw new Error(`No number combination for sum: ${target} found`);
};

const getThreeEntriesForSum = (numbers: number[], target: number): number[] => {
    for (let i = 0; i < numbers.length; ++i) {
        for (let j = i + 1; j < numbers.length; ++j) {
            for (let k = j + 1; k < numbers.length; ++k) {
                if (numbers[i] + numbers[j] + numbers[k] === target) {
                    return [numbers[i], numbers[j], numbers[k]];
                }
            }
        }
    }
    throw new Error(`No number combination for sum: ${target} found`);
};

const printProduct = async (sum: number, getEntries: (numbers: number[], sum: number) => number[]) => {
    const input = await Deno.readTextFile('./input.txt');
    const numbers = input
        .split('\n')
        .map(a => parseInt(a, 10));

    const entries = getEntries(numbers, sum);
    const product = entries.reduce((acc, current) => acc * current, 1);
    console.log(product);
};

// Not super elegant
printProduct(2020, getTwoEntriesForSum);
printProduct(2020, getThreeEntriesForSum);
