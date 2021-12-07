pub mod day_01 {
    use std::fs;

    pub fn part_01() {
        let contents = fs::read_to_string("./src/day01/input.txt")
            .expect("Something went wrong reading the file");

        let depths = contents.lines().map(|x| x.parse::<i32>().unwrap());

        let mut increased_depths_count = 0;
        let mut last_depth = 0;

        for (index, current_depth) in depths.enumerate() {
            if index == 0 {
                last_depth = current_depth;
                continue;
            }
            if current_depth > last_depth {
                increased_depths_count += 1;
            } 
            last_depth = current_depth;
        }

        assert_eq!(increased_depths_count, 1195);
    }
}
