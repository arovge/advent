pub mod day_01 {
    use std::fs;

    pub fn part_01() {
        let contents = fs::read_to_string("./src/day01/input.txt")
            .expect("Something went wrong reading the file");

        let depths = contents.lines().map(|x| x.parse::<i32>().unwrap());

        let increased_depths = depths.fold(
            (0, 0),
            |(increased_depths_count, last_depth), current_depth| match last_depth != 0 && current_depth > last_depth {
                true => (increased_depths_count + 1, current_depth),
                false => (increased_depths_count, current_depth)
            }
        );

        let increased_depths_count = increased_depths.0;

        println!("Number of increased depths: {}", increased_depths_count);
    }
}
