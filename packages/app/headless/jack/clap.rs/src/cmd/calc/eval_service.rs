use std::f64::consts;

struct EvalParser {
    s: Vec<char>,
    pos: usize,
    tok: String,
    val: f64,
}

impl EvalParser {
    fn new(s: &str) -> Self {
        let mut p = EvalParser {
            s: s.chars().collect(),
            pos: 0,
            tok: String::new(),
            val: 0.0,
        };
        p.lex();
        p
    }

    fn lex(&mut self) {
        while self.pos < self.s.len() && self.s[self.pos] == ' ' {
            self.pos += 1;
        }
        if self.pos >= self.s.len() {
            self.tok = "EOF".to_string();
            return;
        }
        let c = self.s[self.pos];
        if c.is_ascii_digit() || c == '.' {
            let start = self.pos;
            while self.pos < self.s.len()
                && (self.s[self.pos].is_ascii_digit() || self.s[self.pos] == '.')
            {
                self.pos += 1;
            }
            let s: String = self.s[start..self.pos].iter().collect();
            self.tok = "NUM".to_string();
            self.val = s.parse().unwrap_or(0.0);
            return;
        }
        if c.is_ascii_alphabetic() || c == '_' {
            let start = self.pos;
            while self.pos < self.s.len()
                && (self.s[self.pos].is_ascii_alphanumeric() || self.s[self.pos] == '_')
            {
                self.pos += 1;
            }
            self.tok = self.s[start..self.pos].iter().collect();
            return;
        }
        self.tok = c.to_string();
        self.pos += 1;
    }

    fn eval(&mut self) -> Result<f64, String> {
        let v = self.parse_expr()?;
        if self.tok != "EOF" {
            return Err(format!("unexpected token '{}'", self.tok));
        }
        Ok(v)
    }

    fn parse_expr(&mut self) -> Result<f64, String> {
        let mut v = self.parse_term()?;
        while self.tok == "+" || self.tok == "-" {
            let op = self.tok.clone();
            self.lex();
            let rhs = self.parse_term()?;
            if op == "+" {
                v += rhs;
            } else {
                v -= rhs;
            }
        }
        Ok(v)
    }

    fn parse_term(&mut self) -> Result<f64, String> {
        let mut v = self.parse_power()?;
        while self.tok == "*" || self.tok == "/" {
            let op = self.tok.clone();
            self.lex();
            let rhs = self.parse_power()?;
            if op == "*" {
                v *= rhs;
            } else {
                if rhs == 0.0 {
                    return Err("division by zero".to_string());
                }
                v /= rhs;
            }
        }
        Ok(v)
    }

    fn parse_power(&mut self) -> Result<f64, String> {
        let mut v = self.parse_unary()?;
        if self.tok == "^" {
            self.lex();
            let rhs = self.parse_power()?;
            v = v.powf(rhs);
        }
        Ok(v)
    }

    fn parse_unary(&mut self) -> Result<f64, String> {
        if self.tok == "-" {
            self.lex();
            let v = self.parse_unary()?;
            return Ok(-v);
        }
        if self.tok == "+" {
            self.lex();
            return self.parse_unary();
        }
        self.parse_primary()
    }

    fn parse_primary(&mut self) -> Result<f64, String> {
        match self.tok.as_str() {
            "NUM" => {
                let v = self.val;
                self.lex();
                Ok(v)
            }
            "pi" | "π" => {
                self.lex();
                Ok(consts::PI)
            }
            "e" => {
                self.lex();
                Ok(consts::E)
            }
            "(" => {
                self.lex();
                let v = self.parse_expr()?;
                if self.tok != ")" {
                    return Err(format!("expected ')' got '{}'", self.tok));
                }
                self.lex();
                Ok(v)
            }
            name => {
                let name = name.to_string();
                self.lex();
                if self.tok != "(" {
                    return Err(format!("expected '(' after {}", name));
                }
                self.lex();
                let arg = self.parse_expr()?;
                if self.tok != ")" {
                    return Err(format!("expected ')' after {} argument", name));
                }
                self.lex();
                apply_fn(&name, arg)
            }
        }
    }
}

fn apply_fn(name: &str, x: f64) -> Result<f64, String> {
    match name.to_lowercase().as_str() {
        "sqrt" => Ok(x.sqrt()),
        "sin" => Ok(x.sin()),
        "cos" => Ok(x.cos()),
        "tan" => Ok(x.tan()),
        "abs" => Ok(x.abs()),
        "floor" => Ok(x.floor()),
        "ceil" => Ok(x.ceil()),
        "round" => Ok(x.round()),
        "log" => Ok(x.ln()),
        "log10" => Ok(x.log10()),
        "exp" => Ok(x.exp()),
        _ => Err(format!("unknown function '{}'", name)),
    }
}

pub fn eval_expression(expr: &str) -> Result<f64, String> {
    let mut parser = EvalParser::new(expr);
    parser.eval()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_simple_addition() {
        let result = eval_expression("2+3").unwrap();
        assert!((result - 5.0).abs() < 1e-10);
    }

    #[test]
    fn test_simple_subtraction() {
        let result = eval_expression("10-4").unwrap();
        assert!((result - 6.0).abs() < 1e-10);
    }

    #[test]
    fn test_simple_multiplication() {
        let result = eval_expression("6*7").unwrap();
        assert!((result - 42.0).abs() < 1e-10);
    }

    #[test]
    fn test_simple_division() {
        let result = eval_expression("10/4").unwrap();
        assert!((result - 2.5).abs() < 1e-10);
    }

    #[test]
    fn test_power() {
        let result = eval_expression("2^3").unwrap();
        assert!((result - 8.0).abs() < 1e-10);
    }

    #[test]
    fn test_operator_precedence() {
        let result = eval_expression("2+3*4").unwrap();
        assert!((result - 14.0).abs() < 1e-10);
    }

    #[test]
    fn test_parentheses() {
        let result = eval_expression("(2+3)*4").unwrap();
        assert!((result - 20.0).abs() < 1e-10);
    }

    #[test]
    fn test_nested_parentheses() {
        let result = eval_expression("((2+3)*4)").unwrap();
        assert!((result - 20.0).abs() < 1e-10);
    }

    #[test]
    fn test_unary_minus() {
        let result = eval_expression("-5+3").unwrap();
        assert!((result - (-2.0)).abs() < 1e-10);
    }

    #[test]
    fn test_unary_plus() {
        let result = eval_expression("+5").unwrap();
        assert!((result - 5.0).abs() < 1e-10);
    }

    #[test]
    fn test_constant_pi() {
        let result = eval_expression("pi").unwrap();
        assert!((result - std::f64::consts::PI).abs() < 1e-10);
    }

    #[test]
    fn test_constant_e() {
        let result = eval_expression("e").unwrap();
        assert!((result - std::f64::consts::E).abs() < 1e-10);
    }

    #[test]
    fn test_sqrt_function() {
        let result = eval_expression("sqrt(16)").unwrap();
        assert!((result - 4.0).abs() < 1e-10);
    }

    #[test]
    fn test_sin_function() {
        let result = eval_expression("sin(0)").unwrap();
        assert!((result - 0.0).abs() < 1e-10);
    }

    #[test]
    fn test_cos_function() {
        let result = eval_expression("cos(0)").unwrap();
        assert!((result - 1.0).abs() < 1e-10);
    }

    #[test]
    fn test_division_by_zero() {
        let result = eval_expression("1/0");
        assert!(result.is_err());
    }

    #[test]
    fn test_missing_parenthesis() {
        let result = eval_expression("(2+3");
        assert!(result.is_err());
    }

    #[test]
    fn test_unknown_function() {
        let result = eval_expression("foo(5)");
        assert!(result.is_err());
    }

    #[test]
    fn test_decimal_numbers() {
        let result = eval_expression("3.5+2.5").unwrap();
        assert!((result - 6.0).abs() < 1e-10);
    }

    #[test]
    fn test_complex_expression() {
        let result = eval_expression("sqrt(2^2+3^2)").unwrap();
        assert!((result - 3.605551275).abs() < 1e-6);
    }

    #[test]
    fn test_unexpected_token() {
        let result = eval_expression("2+3+");
        assert!(result.is_err());
    }

    #[test]
    fn test_whitespace_handling() {
        let result = eval_expression("  2  +  3  ").unwrap();
        assert!((result - 5.0).abs() < 1e-10);
    }

    #[test]
    fn test_chained_operations() {
        let result = eval_expression("10-5-3").unwrap();
        assert!((result - 2.0).abs() < 1e-10);
    }

    #[test]
    fn test_abs_function() {
        let result = eval_expression("abs(-5)").unwrap();
        assert!((result - 5.0).abs() < 1e-10);
    }

    #[test]
    fn test_floor_function() {
        let result = eval_expression("floor(3.7)").unwrap();
        assert!((result - 3.0).abs() < 1e-10);
    }

    #[test]
    fn test_ceil_function() {
        let result = eval_expression("ceil(3.2)").unwrap();
        assert!((result - 4.0).abs() < 1e-10);
    }

    #[test]
    fn test_round_function() {
        let result = eval_expression("round(3.5)").unwrap();
        assert!((result - 4.0).abs() < 1e-10);
    }

    #[test]
    fn test_log_function() {
        let result = eval_expression("log(1)").unwrap();
        assert!((result - 0.0).abs() < 1e-10);
    }
}
