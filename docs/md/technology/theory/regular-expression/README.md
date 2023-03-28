# Regular Expression

## Literals

In Regular expression, the `literals` are the simplest characters that will match the exact text of the literals. For example, the regex `monkey` will completely match the text `monkey` but will also match `monkey` in text `The monkeys like to eat bananas.`

## Alternation

Alternation indicated by the pipe symbol `|`, allows for the matching of either of two subexpressions. For example, the regex `baboons|gorillas` will match the text baboons as well as the text `gorillas`.

## Character Sets

Regular expression character sets denoted by a pair of brackets `[]` will match any of the characters included within the brackets. For example, the regular expression `con[sc]en[sc]us` will match any of the spellings `consensus`, `concensus`, `consencus`, and `concencus`.

## Wild for Wildcards

In Regular expression, wildcards are denoted with the period `.` and it can match any single character (letter, number, symbol or whitespace) in a piece of text. For example, the regular expression `.........` will match the text `orangutan`, `marsupial`, or any other 9-character text.

## Ranges

Regular expression ranges are used to specify a range of characters that can be matched. Common regular expression ranges include: [A-Z]. : match any uppercase letter [a-z]. : match any lowercase letter [0-9]. : match any digit [A-Za-z] : match any uppercase or lowercase letter.

## Shorthand Character Classes

While character ranges are extremely useful, they can be cumbersome to write out every single time you want to match common ranges such as those that designate alphabetical characters or digits. To alleviate this pain, there are **shorthand character** classes that represent common ranges, and they make writing regular expressions much simpler. These shorthand classes include:

- `\w`: the “word character” class represents the regex range `[A-Za-z0-9_]`, and it matches a single uppercase character, lowercase character, digit or underscore
- `\d`: the “digit character” class represents the regex range `[0-9]`, and it matches a single digit character
- `\s`: the “whitespace character” class represents the regex range `[ \t\r\n\f\v]`, matching a single space, tab, carriage return, line break, form feed, or vertical tab

In addition to the shorthand character classes \w, \d, and \s, we also have access to the negated shorthand character classes! These shorthands will match any character that is NOT in the regular shorthand classes. These negated shorthand classes include:

- `\W`: the “non-word character” class represents the regex range `[^A-Za-z0-9_]`, matching any character that is not included in the range represented by `\w`
- `\D`: the “non-digit character” class represents the regex range `[^0-9]`, matching any character that is not included in the range represented by `\d`
- `\S`: the “non-whitespace character” class represents the regex range `[^ \t\r\n\f\v]`, matching any character that is not included in the range represented by `\s`

## Grouping

In Regular expressions, grouping is accomplished by open `(` and close parenthesis `)`. Thus the regular expression `I love (baboons|gorillas)` will match the text `I love baboons` as well as `I love gorillas`, as the grouping limits the reach of the | to the text within the parentheses.

## Quantifies

### Fixed

In Regular expressions, fixed quantifiers are denoted by curly braces `{}`. It contains either the exact quantity or the quantity range of characters to be matched. For example, the regular expression `roa{3}r` will match the text roaaar, while the regular expression `roa{3,6}r` will match `roaaar`, `roaaaar`, `roaaaaar`, or `roaaaaaar`.

### Optional

In Regular expressions, optional quantifiers are denoted by a question mark `?`. It indicates that a character can appear either 0 or 1 time. For example, the regular expression `humou?r` will match the text `humour` as well as the text `humor`.

### O or More (Kleene Star), 1 or More (Kleene Plus)

In Regular expressions, the Kleene star(`*`) indicates that the preceding character can occur 0 or more times. For example, `meo*w` will match `mew`, `meow`, `meooow`, and `meoooooooooooow`.

The Kleene plus(`+`) indicates that the preceding character can occur 1 or more times. For example, `meo+w` will match `meow`, `meooow`, and `meoooooooooooow`, but not match `mew`.

## Anchors

Anchors (hat `^` and dollar sign `$`) are used in regular expressions to match text at the start and end of a string, respectively. For example, the regex `^Monkeys: my mortal enemy$` will completely match the text `Monkeys: my mortal enemy` but not match `Spider Monkeys: my mortal enemy` or `Monkeys: my mortal enemy in the wild`. The `^` ensures that the matched text begins with `Monkeys`, and the `$` ensures the matched text ends with `enemy`.

## Review

`\d*\s*\(*\d{3}\)*(\s|-||\.)*\d{3}(\s|-|\.)*\d{3,4}`

Match these strings

- 718-555-3810
- 9175552849
- 1 212 555 3821
- (917)5551298
- 212.555.8731
