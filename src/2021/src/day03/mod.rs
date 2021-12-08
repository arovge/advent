pub mod day_03 {
    use std::fs;

    struct DiagnosticReportColumn {
        zero_bit_count: u32,
        one_bit_count: u32
    }

    pub fn part_01() {
        let contents = fs::read_to_string("./src/day03/input.txt")
            .expect("Something went wrong reading the file");

        let mut diagnostic_report = Vec::new();

        for line in contents.lines() {
            for (index, bit) in line.chars().enumerate() {
                if index >= diagnostic_report.len() {
                    diagnostic_report.push(DiagnosticReportColumn { zero_bit_count: 0, one_bit_count: 0 });
                }
                match bit {
                    '0' => diagnostic_report[index].zero_bit_count += 1,
                    '1' => diagnostic_report[index].one_bit_count += 1,
                    _ => panic!("Unhandled character: {}", bit)
                }
            }
        }

        let mut most_common_bits = String::from("");
        let mut least_common_bits = String::from("");

        for column in diagnostic_report {
            if column.one_bit_count > column.zero_bit_count {
                least_common_bits.push('0');
                most_common_bits.push('1');
            } else {
                least_common_bits.push('1');
                most_common_bits.push('0');
            }
        }

        let gamma_rate = isize::from_str_radix(&most_common_bits, 2).unwrap();
        let epsilon_rate = isize::from_str_radix(&least_common_bits, 2).unwrap();
        let product = gamma_rate * epsilon_rate;
        
        assert_eq!(product, 3813416);
    }

    pub fn part_02() {
        // find most common bit in position
        // filter out invalid lines
        // repeat until 1 remaining
    }
}
