pub mod day_01 {
    use std::fs;

    pub fn part_01() {
        let contents = fs::read_to_string("./src/day01/input.txt")
            .expect("Something went wrong reading the file");

        let depths = contents.lines().map(|x| x.parse::<i32>().unwrap());

        let mut sequential_increased_depths_count = 0;
        let mut last_depth = 0;

        for (index, current_depth) in depths.enumerate() {
            if index == 0 {
                last_depth = current_depth;
                continue;
            }
            if current_depth > last_depth {
                sequential_increased_depths_count += 1;
            } 
            last_depth = current_depth;
        }

        assert_eq!(sequential_increased_depths_count, 1195);
    }

    pub fn part_02() {
        let contents = fs::read_to_string("./src/day01/input.txt")
            .expect("Something went wrong reading the file");

        let depths: Vec<i32> = contents
            .lines()
            .map(|x| x.parse::<i32>().unwrap())
            .collect();

        let mut sequential_increased_depths_count = 0;
        let mut last_depth_window = 0;

        for (index, window) in depths.windows(3).enumerate() {
            if index == 0 {
                last_depth_window = window[0] + window[1] + window[2];
                continue;
            }
            if window[0] + window[1] + window[2] > last_depth_window {
                sequential_increased_depths_count += 1;
            }
            last_depth_window = window[0] + window[1] + window[2];
        }

        assert_eq!(sequential_increased_depths_count, 1235);
    }
}
