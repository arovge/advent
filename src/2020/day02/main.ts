import { parseInput } from '../util.ts';

interface PasswordPolicy {
    min: number;
    max: number;
    letter: string;
    password: string;
}

const regex = /(\d+)-(\d+) (\w): (\w+)/;

const parse = async (): Promise<PasswordPolicy[]> => {
    const input = await parseInput();
    return input
        .map(line => regex.exec(line))
        .filter((line): line is RegExpExecArray => line !== null)
        .map(line => ({
            min: parseInt(line[1], 10),
            max: parseInt(line[2], 10),
            letter: line[3],
            password: line[4]
        }));
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
    const xor = matchedFirstIndex ? !matchedSecondIndex : matchedSecondIndex;
    return xor;
};

const getCorrectPolicyCount = (policies: PasswordPolicy[], isValid: (policy: PasswordPolicy) => boolean): number => 
    policies.reduce((acc, policy) => isValid(policy) ? acc + 1 : acc, 0);

const policies = await parse();

const correctPolicyCountForPartOne = getCorrectPolicyCount(policies, isPartOneValid);
const correctPolicyCountForPartTwo = getCorrectPolicyCount(policies, isPartTwoValid);

console.log(correctPolicyCountForPartOne);
console.log(correctPolicyCountForPartTwo);
