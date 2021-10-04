interface PasswordPolicy {
    min: number;
    max: number;
    letter: string;
    password: string;
}

const regex = /(\d+)-(\d+) (\w): (\w+)/;

const parse = async (): Promise<PasswordPolicy[]> => {
    const input = await Deno.readTextFile('./input.txt');
    return input
        .split('\n')
        .map(line => regex.exec(line))
        .map(line => {
            if (line == null) return null;
            return {
                min: parseInt(line[1], 10),
                max: parseInt(line[2], 10),
                letter: line[3],
                password: line[4]
            };
        })
        .filter((a): a is PasswordPolicy => a !== null);
};

const isPartOneValid = (policy: PasswordPolicy): boolean => {
    const count = policy.password.split('').filter(a => a === policy.letter).length;
    return policy.min <= count && count <= policy.max;
};

const isPartTwoValid = (policy: PasswordPolicy): boolean => {
    const characters = policy.password.split('');

    // Only really min/max for part one. Part two has them as start at 1 indices
    const matchedFirstIndex = characters[policy.min - 1] === policy.letter;
    const matchedSecondIndex = characters[policy.max - 1] === policy.letter;
    const xor = (matchedFirstIndex ? 1 : 0) ^ (matchedSecondIndex ? 1 : 0);
    return xor === 1;
};

const policies = await parse();
const partOneCorrectPolicies = policies
    .map(a => isPartOneValid(a))
    .filter(a => a);

const partTwoCorrectPolicies = policies
    .map(a => isPartTwoValid(a))
    .filter(a => a);

console.log(partOneCorrectPolicies.length);
console.log(partTwoCorrectPolicies.length);
