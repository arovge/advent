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

const isValid = (policy: PasswordPolicy): boolean => {
    const count = policy.password.split('').filter(a => a === policy.letter).length;
    return policy.min <= count && count <= policy.max;
};

const policies = await parse();
const correctPolicies = policies
    .map(a => isValid(a))
    .filter(a => a);
console.log(correctPolicies.length);
