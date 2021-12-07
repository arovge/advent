pub mod day_02 {
    use std::fs;
    use std::str;
    use std::num::ParseIntError;

    enum Command {
        Up(i32),
        Down(i32),
        Forward(i32)
    }

    impl str::FromStr for Command {
        type Err = ParseIntError;

        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let pieces: Vec<&str> = s.split(' ')
                                     .collect();

            let command = pieces[0];
            let value = pieces[1].parse::<i32>()?;

            match command {
                "up" => Ok(Command::Up(value)),
                "down" => Ok(Command::Down(value)),
                "forward" => Ok(Command::Forward(value)),
                _ => panic!("Invalid command") // FIXME: Better error handling so the error is propgated back to the caller
            }
        }
    }

    pub fn part_01() {
        let contents = fs::read_to_string("./src/day02/input.txt")
            .expect("Something went wrong reading the file");

        let commands = contents.lines()
                               .map(|x| x.parse::<Command>().unwrap());

        let mut depth = 0;
        let mut horizontal_position = 0;

        for command in commands {
            match command {
                Command::Up(value) => depth -= value,
                Command::Down(value) => depth += value,
                Command::Forward(value) => horizontal_position += value
            }
        }

        let product = depth * horizontal_position;
        assert_eq!(product, 2027977);
    }

    pub fn part_02() {
        let contents = fs::read_to_string("./src/day02/input.txt")
            .expect("Something went wrong reading the file");

        let commands = contents.lines()
                               .map(|x| x.parse::<Command>().unwrap());

        let mut depth = 0;
        let mut horizontal_position = 0;
        let mut aim = 0;

        for command in commands {
            match command {
                Command::Up(value) => aim -= value,
                Command::Down(value) => aim += value,
                Command::Forward(value) => {
                    horizontal_position += value;
                    depth += aim * value;
                }
            }
        }

        let product = depth * horizontal_position;
        assert_eq!(product, 1903644897);
    }
}
