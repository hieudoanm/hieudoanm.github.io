use chrono::{Datelike, NaiveDate, NaiveDateTime, Timelike};

pub const ONE_SECOND: i64 = 1000;
pub const ONE_MINUTE: i64 = ONE_SECOND * 60;
pub const ONE_HOUR: i64 = ONE_MINUTE * 60;
pub const ONE_DAY: i64 = ONE_HOUR * 24;

pub fn diff_millis(a: NaiveDateTime, b: NaiveDateTime) -> i64 {
    (a - b).num_milliseconds().abs()
}

pub fn diff_days(a: NaiveDateTime, b: NaiveDateTime) -> i64 {
    diff_millis(a, b) / ONE_DAY
}

pub fn diff_hours(a: NaiveDateTime, b: NaiveDateTime) -> i64 {
    diff_millis(a, b) / ONE_HOUR
}

pub fn diff_minutes(a: NaiveDateTime, b: NaiveDateTime) -> i64 {
    diff_millis(a, b) / ONE_MINUTE
}

pub fn diff_seconds(a: NaiveDateTime, b: NaiveDateTime) -> i64 {
    diff_millis(a, b) / ONE_SECOND
}

pub struct Diff {
    millis: i64,
}

impl Diff {
    fn new(a: NaiveDateTime, b: NaiveDateTime) -> Self {
        Self { millis: (a - b).num_milliseconds().abs() }
    }
    pub fn days(&self) -> i64 { self.millis / ONE_DAY }
    pub fn hours(&self) -> i64 { self.millis / ONE_HOUR }
    pub fn minutes(&self) -> i64 { self.millis / ONE_MINUTE }
    pub fn seconds(&self) -> i64 { self.millis / ONE_SECOND }
}

pub fn diff(a: NaiveDateTime, b: NaiveDateTime) -> Diff {
    Diff::new(a, b)
}

fn pad_zero(n: u32) -> String {
    format!("{:02}", n)
}

pub fn format_date(date: NaiveDate, separator: &str) -> String {
    format!(
        "{}{}{}{}{}",
        date.year(),
        separator,
        pad_zero(date.month()),
        separator,
        pad_zero(date.day())
    )
}

pub fn format_time(date: NaiveDateTime, with_seconds: bool) -> String {
    if with_seconds {
        format!(
            "{}:{}:{}",
            pad_zero(date.hour()),
            pad_zero(date.minute()),
            pad_zero(date.second())
        )
    } else {
        format!("{}:{}", pad_zero(date.hour()), pad_zero(date.minute()))
    }
}

pub fn format_date_time(date: NaiveDateTime) -> String {
    format!("{} {}", format_date(date.date(), "-"), format_time(date, true))
}

pub struct Format {
    date: NaiveDateTime,
}

impl Format {
    fn new(date: NaiveDateTime) -> Self { Self { date } }
    pub fn date(&self, separator: &str) -> String { format_date(self.date.date(), separator) }
    pub fn time(&self, with_seconds: bool) -> String { format_time(self.date, with_seconds) }
    pub fn date_time(&self) -> String { format_date_time(self.date) }
}

pub fn format(dt: NaiveDateTime) -> Format {
    Format::new(dt)
}

#[derive(Debug, Clone, Copy, PartialEq, serde::Serialize)]
pub enum CurrentMonth {
    Previous,
    Current,
    Next,
}

#[derive(Debug, Clone, serde::Serialize)]
pub struct CalendarDay {
    pub date: i32,
    pub current_month: CurrentMonth,
}

fn days_in_month(year: i32, month: u32) -> i32 {
    let next = if month == 12 {
        NaiveDate::from_ymd_opt(year + 1, 1, 1)
    } else {
        NaiveDate::from_ymd_opt(year, month + 1, 1)
    };
    let current = NaiveDate::from_ymd_opt(year, month, 1).unwrap();
    (next.unwrap() - current).num_days() as i32
}

pub fn calendar(year: i32, month: u32) -> Vec<Vec<CalendarDay>> {
    let first = NaiveDate::from_ymd_opt(year, month, 1).unwrap();
    let first_day = first.weekday().num_days_from_sunday() as i32;
    let month_days_count = days_in_month(year, month);
    let prev_month_days = if month == 1 {
        days_in_month(year - 1, 12)
    } else {
        days_in_month(year, month - 1)
    };

    let mut weeks: Vec<Vec<CalendarDay>> = Vec::new();
    let mut date_counter = 1i32;

    for i in 0..6 {
        let mut week = Vec::with_capacity(7);
        for j in 0..7 {
            let day = if i == 0 && j < first_day {
                CalendarDay {
                    date: prev_month_days - first_day + j + 1,
                    current_month: CurrentMonth::Previous,
                }
            } else if date_counter <= month_days_count {
                let d = CalendarDay {
                    date: date_counter,
                    current_month: CurrentMonth::Current,
                };
                date_counter += 1;
                d
            } else {
                let d = CalendarDay {
                    date: date_counter - month_days_count,
                    current_month: CurrentMonth::Next,
                };
                date_counter += 1;
                d
            };
            week.push(day);
        }
        weeks.push(week);
        if date_counter > month_days_count && i > 3 {
            break;
        }
    }
    weeks
}

pub fn week_of_year(date: NaiveDate) -> u32 {
    date.iso_week().week()
}

pub struct LunarCalendar;

impl LunarCalendar {
    pub const LUNAR_INFO: [i64; 201] = [
        0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0,
        0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540,
        0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50,
        0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0,
        0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2,
        0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573,
        0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4,
        0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5,
        0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46,
        0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58,
        0x05ac0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50,
        0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0,
        0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260,
        0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0,
        0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0,
        0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x14b63, 0x09370,
        0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
        0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0,
        0x0a6d0, 0x055d4, 0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50,
        0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, 0x0b273, 0x06930, 0x07337, 0x06aa0,
        0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, 0x0e968, 0x0d520,
        0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
        0x0d520,
    ];

    pub fn leap_days(&self, y: i32) -> i32 {
        if self.leap_month(y) != 0 {
            return if Self::LUNAR_INFO[(y - 1900) as usize] & 0x10000 != 0 { 30 } else { 29 };
        }
        0
    }

    pub fn leap_month(&self, y: i32) -> i32 {
        (Self::LUNAR_INFO[(y - 1900) as usize] & 0xf) as i32
    }

    pub fn l_year_days(&self, y: i32) -> i32 {
        let mut sum = 348i32;
        let mut i = 0x8000i64;
        while i > 0x8 {
            if Self::LUNAR_INFO[(y - 1900) as usize] & i != 0 {
                sum += 1;
            }
            i >>= 1;
        }
        sum + self.leap_days(y)
    }

    pub fn month_days(&self, y: i32, m: i32) -> i32 {
        if m > 12 || m < 1 {
            return -1;
        }
        if Self::LUNAR_INFO[(y - 1900) as usize] & (0x10000 >> m) != 0 { 30 } else { 29 }
    }

    pub fn solar_to_lunar(&self, y: i32, m: i32, d: i32) -> Result<LunarResult, i32> {
        if y < 1900 || y > 2100 {
            return Err(-1);
        }
        if y == 1900 && m == 1 && d < 31 {
            return Err(-1);
        }

        let dt = NaiveDate::from_ymd_opt(y, m as u32, d as u32)
            .ok_or(-1)?;
        let base = NaiveDate::from_ymd_opt(1900, 1, 31).unwrap();
        let mut offset = (dt - base).num_days();

        let mut i = 1900i32;
        let mut temp = 0i32;
        while i < 2101 && offset > 0 {
            temp = self.l_year_days(i);
            offset -= temp as i64;
            i += 1;
        }
        if offset < 0 {
            offset += temp as i64;
            i -= 1;
        }

        let year = i;
        let leap = self.leap_month(i);
        let mut is_leap = false;

        let mut month = 1i32;
        while month < 13 && offset > 0 {
            if leap > 0 && month == leap + 1 && !is_leap {
                month -= 1;
                is_leap = true;
                temp = self.leap_days(year);
            } else {
                temp = self.month_days(year, month);
            }
            if is_leap && month == leap + 1 {
                is_leap = false;
            }
            offset -= temp as i64;
            month += 1;
        }

        if offset == 0 && leap > 0 && month == leap + 1 && !is_leap {
            month -= 1;
        }
        if offset < 0 {
            offset += temp as i64;
            month -= 1;
        }

        let day = (offset as i32) + 1;
        let now = chrono::Local::now().naive_local().date();
        let is_today = dt == now;

        Ok(LunarResult {
            is_today,
            l_year: year,
            l_month: month,
            l_day: day,
            c_year: y,
            c_month: m,
            c_day: d,
        })
    }
}

#[derive(serde::Serialize)]
pub struct LunarResult {
    pub is_today: bool,
    pub l_year: i32,
    pub l_month: i32,
    pub l_day: i32,
    pub c_year: i32,
    pub c_month: i32,
    pub c_day: i32,
}

#[cfg(test)]
mod tests {
    use super::*;
    use chrono::{NaiveDate, NaiveDateTime};

    fn dt(y: i32, m: u32, d: u32, h: u32, min: u32, s: u32) -> NaiveDateTime {
        NaiveDate::from_ymd_opt(y, m, d).unwrap().and_hms_opt(h, min, s).unwrap()
    }

    #[test]
    fn test_diff_millis() {
        let a = dt(2024, 1, 1, 0, 0, 0);
        let b = dt(2024, 1, 1, 0, 0, 1);
        assert_eq!(diff_millis(a, b), 1000);
        assert_eq!(diff_millis(b, a), 1000);
        assert_eq!(diff_millis(a, a), 0);
    }

    #[test]
    fn test_diff_days() {
        let a = dt(2024, 1, 1, 0, 0, 0);
        let b = dt(2024, 1, 3, 0, 0, 0);
        assert_eq!(diff_days(a, b), 2);
    }

    #[test]
    fn test_diff_hours() {
        let a = dt(2024, 1, 1, 0, 0, 0);
        let b = dt(2024, 1, 1, 5, 0, 0);
        assert_eq!(diff_hours(a, b), 5);
    }

    #[test]
    fn test_diff_minutes() {
        let a = dt(2024, 1, 1, 0, 0, 0);
        let b = dt(2024, 1, 1, 0, 30, 0);
        assert_eq!(diff_minutes(a, b), 30);
    }

    #[test]
    fn test_diff_seconds() {
        let a = dt(2024, 1, 1, 0, 0, 0);
        let b = dt(2024, 1, 1, 0, 0, 45);
        assert_eq!(diff_seconds(a, b), 45);
    }

    #[test]
    fn test_diff_struct() {
        let a = dt(2024, 1, 1, 0, 0, 0);
        let b = dt(2024, 1, 1, 1, 30, 15);
        let d = diff(a, b);
        assert_eq!(d.days(), 0);
        assert_eq!(d.hours(), 1);
        assert_eq!(d.minutes(), 90);
        assert_eq!(d.seconds(), 5415);
    }

    #[test]
    fn test_format_date() {
        let date = NaiveDate::from_ymd_opt(2024, 3, 5).unwrap();
        assert_eq!(format_date(date, "-"), "2024-03-05");
        assert_eq!(format_date(date, "/"), "2024/03/05");
    }

    #[test]
    fn test_format_time() {
        let d = dt(2024, 1, 1, 9, 5, 3);
        assert_eq!(format_time(d, true), "09:05:03");
        assert_eq!(format_time(d, false), "09:05");
    }

    #[test]
    fn test_format_date_time() {
        let d = dt(2024, 12, 25, 14, 30, 0);
        assert_eq!(format_date_time(d), "2024-12-25 14:30:00");
    }

    #[test]
    fn test_format_struct() {
        let d = dt(2024, 6, 15, 10, 20, 30);
        let f = format(d);
        assert_eq!(f.date("/"), "2024/06/15");
        assert_eq!(f.time(true), "10:20:30");
        assert_eq!(f.time(false), "10:20");
        assert_eq!(f.date_time(), "2024-06-15 10:20:30");
    }

    #[test]
    fn test_days_in_month() {
        assert_eq!(days_in_month(2024, 1), 31);
        assert_eq!(days_in_month(2024, 2), 29);
        assert_eq!(days_in_month(2023, 2), 28);
        assert_eq!(days_in_month(2024, 4), 30);
    }

    #[test]
    fn test_calendar_structure() {
        let weeks = calendar(2024, 1);
        assert!(!weeks.is_empty());
        for week in &weeks {
            assert_eq!(week.len(), 7);
            for day in week {
                assert!(day.date >= 1 && day.date <= 31);
            }
        }
    }

    #[test]
    fn test_week_of_year() {
        let d = NaiveDate::from_ymd_opt(2024, 1, 1).unwrap();
        assert_eq!(week_of_year(d), 1);
    }

    #[test]
    fn test_lunar_calendar_leap_month() {
        let lc = LunarCalendar;
        assert_eq!(lc.leap_month(2023), 2);
    }

    #[test]
    fn test_lunar_calendar_leap_days() {
        let lc = LunarCalendar;
        let days = lc.leap_days(2023);
        assert!(days == 29 || days == 30 || days == 0);
    }

    #[test]
    fn test_lunar_calendar_month_days() {
        let lc = LunarCalendar;
        let days = lc.month_days(2024, 1);
        assert!(days == 29 || days == 30);
        assert_eq!(lc.month_days(2024, 13), -1);
        assert_eq!(lc.month_days(2024, 0), -1);
    }

    #[test]
    fn test_lunar_calendar_l_year_days() {
        let lc = LunarCalendar;
        let days = lc.l_year_days(2024);
        assert!(days > 0);
    }

    #[test]
    fn test_solar_to_lunar() {
        let lc = LunarCalendar;
        let result = lc.solar_to_lunar(2024, 1, 1).unwrap();
        assert_eq!(result.c_year, 2024);
        assert_eq!(result.c_month, 1);
        assert_eq!(result.c_day, 1);
    }

    #[test]
    fn test_solar_to_lunar_out_of_range() {
        let lc = LunarCalendar;
        assert!(lc.solar_to_lunar(1899, 1, 1).is_err());
        assert!(lc.solar_to_lunar(2101, 1, 1).is_err());
    }

    #[test]
    fn test_solar_to_lunar_before_1900_base() {
        let lc = LunarCalendar;
        assert!(lc.solar_to_lunar(1900, 1, 1).is_err());
    }
}
