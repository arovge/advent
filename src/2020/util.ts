export const parseInput = async (): Promise<string[]> => {
    const input = await Deno.readTextFile('./input.txt');
    return input.split('\n');
};

export const multiply = (args: number[]) => args.reduce((acc, current) => acc * current, 1);
