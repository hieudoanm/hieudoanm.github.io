# [Rust](https://rust-lang.org/)

## Table of Contents

- [Rust](#rust)
  - [Table of Contents](#table-of-contents)
  - [References](#references)

## References

| No  | Category   | Function              | Rust                   | WASM                                          |
| --- | ---------- | --------------------- | ---------------------- | --------------------------------------------- |
| 1   | Array      | `_.chunk`             | `chunk`                | `chunk`, `chunkStrings`                       |
| 2   | Array      | `_.compact`           | `compact`              | `compact`, `compactStrings`                   |
| 3   | Array      | `_.concat`            | `concat`               |                                               |
| 4   | Array      | `_.difference`        | `difference`           | `difference`                                  |
| 5   | Array      | `_.differenceBy`      | `difference_by`        |                                               |
| 6   | Array      | `_.differenceWith`    | `difference_with`      | `differenceWith`, `differenceWithStrings`     |
| 7   | Array      | `_.drop`              | `drop`                 | `drop`, `dropStrings`                         |
| 8   | Array      | `_.dropRight`         | `drop_right`           | `dropRight`, `dropRightStrings`               |
| 9   | Array      | `_.dropRightWhile`    | `drop_right_while`     | `dropRightWhile`, `dropRightWhileStrings`     |
| 10  | Array      | `_.dropWhile`         | `drop_while`           | `dropWhile`, `dropWhileStrings`               |
| 11  | Array      | `_.fill`              | `fill`                 |                                               |
| 12  | Array      | `_.findIndex`         | `find_index`           | `findIndex`, `findIndexStrings`               |
| 13  | Array      | `_.findLastIndex`     | `find_last_index`      | `findLastIndex`, `findLastIndexStrings`       |
| 14  | Array      | `_.flatten`           | `flatten`              |                                               |
| 15  | Array      | `_.flattenDeep`       | `flatten_deep`         |                                               |
| 16  | Array      | `_.flattenDepth`      | `flatten_depth`        |                                               |
| 17  | Array      | `_.fromPairs`         | `from_pairs`           |                                               |
| 18  | Array      | `_.head`              | `head`                 | `head`, `headString`                          |
| 19  | Array      | `_.indexOf`           | `index_of`             | `indexOf`, `indexOfStrings`                   |
| 20  | Array      | `_.initial`           | `initial`              | `initial`, `initialStrings`                   |
| 21  | Array      | `_.intersection`      | `intersection`         | `intersection`                                |
| 22  | Array      | `_.intersectionBy`    | `intersection_by`      |                                               |
| 23  | Array      | `_.intersectionWith`  | `intersection_with`    | `intersectionWith`, `intersectionWithStrings` |
| 24  | Array      | `_.join`              | `join`                 | `join`, `joinStrings`                         |
| 25  | Array      | `_.last`              | `last`                 | `last`, `lastString`                          |
| 26  | Array      | `_.lastIndexOf`       | `last_index_of`        | `lastIndexOf`, `lastIndexOfStrings`           |
| 27  | Array      | `_.nth`               | `nth`                  | `nth`, `nthString`                            |
| 28  | Array      | `_.pull`              | `pull`                 |                                               |
| 29  | Array      | `_.pullAll`           | `pull_all`             |                                               |
| 30  | Array      | `_.pullAllBy`         | `pull_all_by`          |                                               |
| 31  | Array      | `_.pullAllWith`       | `pull_all_with`        |                                               |
| 32  | Array      | `_.pullAt`            | `pull_at`              |                                               |
| 33  | Array      | `_.remove`            | `remove`               |                                               |
| 34  | Array      | `_.reverse`           | `reverse`              | `reverse`, `reverseStrings`                   |
| 35  | Array      | `_.slice`             | `slice`                | `slice`, `sliceStrings`                       |
| 36  | Array      | `_.sortedIndex`       | `sorted_index`         | `sortedIndex`                                 |
| 37  | Array      | `_.sortedIndexBy`     | `sorted_index_by`      |                                               |
| 38  | Array      | `_.sortedIndexOf`     | `sorted_index_of`      | `sortedIndexOf`                               |
| 39  | Array      | `_.sortedLastIndex`   | `sorted_last_index`    | `sortedLastIndex`                             |
| 40  | Array      | `_.sortedLastIndexBy` | `sorted_last_index_by` |                                               |
| 41  | Array      | `_.sortedLastIndexOf` | `sorted_last_index_of` | `sortedLastIndexOf`                           |
| 42  | Array      | `_.sortedUniq`        | `sorted_uniq`          | `sortedUniq`                                  |
| 43  | Array      | `_.sortedUniqBy`      | `sorted_uniq_by`       |                                               |
| 44  | Array      | `_.tail`              | `tail`                 | `tail`, `tailStrings`                         |
| 45  | Array      | `_.take`              | `take`                 | `take`, `takeStrings`                         |
| 46  | Array      | `_.takeRight`         | `take_right`           | `takeRight`, `takeRightStrings`               |
| 47  | Array      | `_.takeRightWhile`    | `take_right_while`     | `takeRightWhile`, `takeRightWhileStrings`     |
| 48  | Array      | `_.takeWhile`         | `take_while`           | `takeWhile`, `takeWhileStrings`               |
| 49  | Array      | `_.union`             | `union`                | `union`                                       |
| 50  | Array      | `_.unionBy`           | `union_by`             |                                               |
| 51  | Array      | `_.unionWith`         | `union_with`           | `unionWith`, `unionWithStrings`               |
| 52  | Array      | `_.uniq`              | `uniq`                 | `uniq`                                        |
| 53  | Array      | `_.uniqBy`            | `uniq_by`              |                                               |
| 54  | Array      | `_.uniqWith`          | `uniq_with`            | `uniqWith`, `uniqWithStrings`                 |
| 55  | Array      | `_.unzip`             | `unzip`                |                                               |
| 56  | Array      | `_.unzipWith`         | `unzip_with`           |                                               |
| 57  | Array      | `_.without`           | `without`              | `without`, `withoutStrings`                   |
| 58  | Array      | `_.xor`               | `xor`                  | `xor`                                         |
| 59  | Array      | `_.xorBy`             | `xor_by`               |                                               |
| 60  | Array      | `_.xorWith`           | `xor_with`             | `xorWith`, `xorWithStrings`                   |
| 61  | Array      | `_.zip`               | `zip`                  |                                               |
| 62  | Array      | `_.zipObject`         | `zip_object`           |                                               |
| 63  | Array      | `_.zipObjectDeep`     | `zip_object_deep`      |                                               |
| 64  | Array      | `_.zipWith`           | `zip_with`             |                                               |
| 65  | Collection | `_.countBy`           | `count_by`             |                                               |
| 66  | Collection | `_.every`             | `every`                | `every`, `everyStrings`                       |
| 67  | Collection | `_.filter`            | `filter`               | `filter`, `filterStrings`                     |
| 68  | Collection | `_.find`              | `find`                 | `find`, `findString`                          |
| 69  | Collection | `_.findLast`          | `find_last`            | `findLast`, `findLastString`                  |
| 70  | Collection | `_.flatMap`           | `flat_map`             |                                               |
| 71  | Collection | `_.flatMapDeep`       | `flat_map_deep`        |                                               |
| 72  | Collection | `_.flatMapDepth`      | `flat_map_depth`       |                                               |
| 73  | Collection | `_.forEach`           | `for_each`             | `forEach`, `forEachStrings`                   |
| 74  | Collection | `_.forEachRight`      | `for_each_right`       |                                               |
| 75  | Collection | `_.groupBy`           | `group_by`             |                                               |
| 76  | Collection | `_.includes`          | `includes`             | `includes`, `includesStrings`                 |
| 77  | Collection | `_.invokeMap`         | `invoke_map`           |                                               |
| 78  | Collection | `_.keyBy`             | `key_by`               |                                               |
| 79  | Collection | `_.map`               | `map`                  | `map`, `mapStrings`                           |
| 80  | Collection | `_.orderBy`           | `order_by`             |                                               |
| 81  | Collection | `_.partition`         | `partition`            | `partition`, `partitionStrings`               |
| 82  | Collection | `_.reduce`            | `reduce`               | `reduce`, `reduceStrings`                     |
| 83  | Collection | `_.reduceRight`       | `reduce_right`         | `reduceRight`, `reduceRightStrings`           |
| 84  | Collection | `_.reject`            | `reject`               | `reject`, `rejectStrings`                     |
| 85  | Collection | `_.sample`            | `sample`               | `sample`, `sampleString`                      |
| 86  | Collection | `_.sampleSize`        | `sample_size`          | `sampleSize`, `sampleSizeStrings`             |
| 87  | Collection | `_.shuffle`           | `shuffle`              | `shuffle`, `shuffleStrings`                   |
| 88  | Collection | `_.size`              | `size`                 | `size`, `sizeStrings`                         |
| 89  | Collection | `_.some`              | `some`                 | `some`, `someStrings`                         |
| 90  | Collection | `_.sortBy`            | `sort_by`              |                                               |
| 91  | Date       | `_.now`               | `now`                  | `now`                                         |
| 92  | Function   | `_.after`             | `after`                | `after`                                       |
| 93  | Function   | `_.ary`               | `ary`                  |                                               |
| 94  | Function   | `_.before`            | `before`               | `before`                                      |
| 95  | Function   | `_.bind`              |                        |                                               |
| 96  | Function   | `_.bindKey`           |                        |                                               |
| 97  | Function   | `_.curry`             | `curry`                |                                               |
| 98  | Function   | `_.curryRight`        |                        |                                               |
| 99  | Function   | `_.debounce`          | `debounce`             |                                               |
| 100 | Function   | `_.defer`             |                        |                                               |
| 101 | Function   | `_.delay`             |                        |                                               |
| 102 | Function   | `_.flip`              | `flip`                 |                                               |
| 103 | Function   | `_.memoize`           | `memoize`              |                                               |
| 104 | Function   | `_.negate`            | `negate`               |                                               |
| 105 | Function   | `_.once`              | `once`                 | `once`                                        |
| 106 | Function   | `_.overArgs`          |                        |                                               |
| 107 | Function   | `_.partial`           |                        |                                               |
| 108 | Function   | `_.partialRight`      |                        |                                               |
| 109 | Function   | `_.rearg`             |                        |                                               |
| 110 | Function   | `_.rest`              | `rest`                 |                                               |
| 111 | Function   | `_.spread`            | `spread`               |                                               |
| 112 | Function   | `_.throttle`          | `throttle`             |                                               |
| 113 | Function   | `_.unary`             | `unary`                |                                               |
| 114 | Function   | `_.wrap`              | `wrap`                 |                                               |
| 115 | Lang       | `_.castArray`         | `cast_array`           |                                               |
| 116 | Lang       | `_.clone`             | `clone`                |                                               |
| 117 | Lang       | `_.cloneDeep`         | `clone_deep`           |                                               |
| 118 | Lang       | `_.cloneDeepWith`     |                        |                                               |
| 119 | Lang       | `_.cloneWith`         |                        |                                               |
| 120 | Lang       | `_.conformsTo`        | `conforms_to`          |                                               |
| 121 | Lang       | `_.eq`                | `eq`                   | `eq`, `eqStrings`                             |
| 122 | Lang       | `_.gt`                | `gt`                   | `gt`                                          |
| 123 | Lang       | `_.gte`               | `gte`                  | `gte`                                         |
| 124 | Lang       | `_.isArguments`       |                        |                                               |
| 125 | Lang       | `_.isArray`           | `is_array`             |                                               |
| 126 | Lang       | `_.isArrayBuffer`     |                        |                                               |
| 127 | Lang       | `_.isArrayLike`       |                        |                                               |
| 128 | Lang       | `_.isArrayLikeObject` |                        |                                               |
| 129 | Lang       | `_.isBoolean`         | `is_boolean`           |                                               |
| 130 | Lang       | `_.isBuffer`          |                        |                                               |
| 131 | Lang       | `_.isDate`            | `is_date`              |                                               |
| 132 | Lang       | `_.isElement`         |                        |                                               |
| 133 | Lang       | `_.isEmpty`           | `is_empty`             | `isEmpty`, `isEmptyStrings`                   |
| 134 | Lang       | `_.isEqual`           | `is_equal`             |                                               |
| 135 | Lang       | `_.isEqualWith`       | `is_equal_with`        |                                               |
| 136 | Lang       | `_.isError`           | `is_error`             |                                               |
| 137 | Lang       | `_.isFinite`          | `is_finite`            | `isFinite`                                    |
| 138 | Lang       | `_.isFunction`        | `is_function`          |                                               |
| 139 | Lang       | `_.isInteger`         | `is_integer`           | `isInteger`                                   |
| 140 | Lang       | `_.isLength`          | `is_length`            | `isLength`                                    |
| 141 | Lang       | `_.isMap`             | `is_map`               |                                               |
| 142 | Lang       | `_.isMatch`           |                        |                                               |
| 143 | Lang       | `_.isMatchWith`       |                        |                                               |
| 144 | Lang       | `_.isNaN`             | `is_nan`               | `isNaN`                                       |
| 145 | Lang       | `_.isNative`          |                        |                                               |
| 146 | Lang       | `_.isNil`             | `is_nil`               |                                               |
| 147 | Lang       | `_.isNull`            | `is_null`              |                                               |
| 148 | Lang       | `_.isNumber`          | `is_number`            | `isNumber`                                    |
| 149 | Lang       | `_.isObject`          | `is_object`            |                                               |
| 150 | Lang       | `_.isObjectLike`      |                        |                                               |
| 151 | Lang       | `_.isPlainObject`     | `is_plain_object`      |                                               |
| 152 | Lang       | `_.isRegExp`          | `is_reg_exp`           |                                               |
| 153 | Lang       | `_.isSafeInteger`     | `is_safe_integer`      |                                               |
| 154 | Lang       | `_.isSet`             | `is_set`               |                                               |
| 155 | Lang       | `_.isString`          | `is_string`            |                                               |
| 156 | Lang       | `_.isSymbol`          | `is_symbol`            |                                               |
| 157 | Lang       | `_.isTypedArray`      | `is_typed_array`       |                                               |
| 158 | Lang       | `_.isUndefined`       | `is_undefined`         |                                               |
| 159 | Lang       | `_.isWeakMap`         | `is_weak_map`          |                                               |
| 160 | Lang       | `_.isWeakSet`         | `is_weak_set`          |                                               |
| 161 | Lang       | `_.lt`                | `lt`                   | `lt`                                          |
| 162 | Lang       | `_.lte`               | `lte`                  | `lte`                                         |
| 163 | Lang       | `_.toArray`           | `to_array`             | `toArray`, `toArrayStrings`                   |
| 164 | Lang       | `_.toFinite`          | `to_finite`            | `toFinite`                                    |
| 165 | Lang       | `_.toInteger`         | `to_integer`           | `toInteger`                                   |
| 166 | Lang       | `_.toLength`          | `to_length`            |                                               |
| 167 | Lang       | `_.toNumber`          | `to_number`            | `toNumber`                                    |
| 168 | Lang       | `_.toPlainObject`     | `to_plain_object`      |                                               |
| 169 | Lang       | `_.toSafeInteger`     | `to_safe_integer`      | `toSafeInteger`                               |
| 170 | Lang       | `_.toString`          | `to_string`            | `toString`                                    |
| 171 | Math       | `_.add`               | `add`                  | `add`                                         |
| 172 | Math       | `_.ceil`              | `ceil`                 | `ceil`                                        |
| 173 | Math       | `_.divide`            | `divide`               | `divide`                                      |
| 174 | Math       | `_.floor`             | `floor`                | `floor`                                       |
| 175 | Math       | `_.max`               | `max`                  | `max`                                         |
| 176 | Math       | `_.maxBy`             | `max_by`               | `maxBy`                                       |
| 177 | Math       | `_.mean`              | `mean`                 | `mean`                                        |
| 178 | Math       | `_.meanBy`            | `mean_by`              | `meanBy`                                      |
| 179 | Math       | `_.min`               | `min`                  | `min`                                         |
| 180 | Math       | `_.minBy`             | `min_by`               | `minBy`                                       |
| 181 | Math       | `_.multiply`          | `multiply`             | `multiply`                                    |
| 182 | Math       | `_.round`             | `round`                | `round`                                       |
| 183 | Math       | `_.subtract`          | `subtract`             | `subtract`                                    |
| 184 | Math       | `_.sum`               | `sum`                  | `sum`                                         |
| 185 | Math       | `_.sumBy`             | `sum_by`               | `sumBy`                                       |
| 186 | Number     | `_.clamp`             | `clamp`                | `clamp`                                       |
| 187 | Number     | `_.inRange`           | `in_range`             | `inRange`                                     |
| 188 | Number     | `_.random`            | `random`               | `random`                                      |
| 189 | Object     | `_.assign`            | `assign`               |                                               |
| 190 | Object     | `_.assignIn`          | `assign_in`            |                                               |
| 191 | Object     | `_.assignInWith`      | `assign_in_with`       |                                               |
| 192 | Object     | `_.assignWith`        | `assign_with`          |                                               |
| 193 | Object     | `_.at`                | `at`                   |                                               |
| 194 | Object     | `_.create`            | `create`               |                                               |
| 195 | Object     | `_.defaults`          | `defaults`             |                                               |
| 196 | Object     | `_.defaultsDeep`      | `defaults_deep`        |                                               |
| 197 | Object     | `_.findKey`           | `find_key`             |                                               |
| 198 | Object     | `_.findLastKey`       | `find_last_key`        |                                               |
| 199 | Object     | `_.forIn`             | `for_in`               |                                               |
| 200 | Object     | `_.forInRight`        | `for_in_right`         |                                               |
| 201 | Object     | `_.forOwn`            | `for_own`              |                                               |
| 202 | Object     | `_.forOwnRight`       | `for_own_right`        |                                               |
| 203 | Object     | `_.functions`         | `functions`            |                                               |
| 204 | Object     | `_.functionsIn`       | `functions_in`         |                                               |
| 205 | Object     | `_.get`               | `get`                  | `get`                                         |
| 206 | Object     | `_.has`               | `has`                  | `has`                                         |
| 207 | Object     | `_.hasIn`             | `has_in`               |                                               |
| 208 | Object     | `_.invert`            | `invert`               |                                               |
| 209 | Object     | `_.invertBy`          | `invert_by`            |                                               |
| 210 | Object     | `_.invoke`            | `invoke`               |                                               |
| 211 | Object     | `_.keys`              | `keys`                 | `keys`                                        |
| 212 | Object     | `_.keysIn`            | `keys_in`              |                                               |
| 213 | Object     | `_.mapKeys`           | `map_keys`             |                                               |
| 214 | Object     | `_.mapValues`         | `map_values`           |                                               |
| 215 | Object     | `_.merge`             | `merge`                |                                               |
| 216 | Object     | `_.mergeWith`         | `merge_with`           |                                               |
| 217 | Object     | `_.omit`              | `omit`                 | `omit`                                        |
| 218 | Object     | `_.omitBy`            | `omit_by`              |                                               |
| 219 | Object     | `_.pick`              | `pick`                 | `pick`                                        |
| 220 | Object     | `_.pickBy`            | `pick_by`              |                                               |
| 221 | Object     | `_.result`            | `result`               |                                               |
| 222 | Object     | `_.set`               | `set`                  | `set`                                         |
| 223 | Object     | `_.setWith`           | `set_with`             |                                               |
| 224 | Object     | `_.toPairs`           | `to_pairs`             | `toPairs`                                     |
| 225 | Object     | `_.toPairsIn`         | `to_pairs_in`          |                                               |
| 226 | Object     | `_.transform`         | `transform`            |                                               |
| 227 | Object     | `_.unset`             | `unset`                |                                               |
| 228 | Object     | `_.update`            | `update`               |                                               |
| 229 | Object     | `_.updateWith`        | `update_with`          |                                               |
| 230 | Object     | `_.values`            | `values`               | `values`                                      |
| 231 | Object     | `_.valuesIn`          | `values_in`            |                                               |
| 232 | Seq        | `_.chain`             | `chain`                | `chain`                                       |
| 233 | Seq        | `_.tap`               | `tap`                  | `tap`                                         |
| 234 | Seq        | `_.thru`              | `thru`                 | `thru`                                        |
| 235 | String     | `_.camelCase`         | `camel_case`           | `camelCase`                                   |
| 236 | String     | `_.capitalize`        | `capitalize`           | `capitalize`                                  |
| 237 | String     | `_.deburr`            | `deburr`               | `deburr`                                      |
| 238 | String     | `_.endsWith`          |                        |                                               |
| 239 | String     | `_.escape`            | `escape`               | `escape`                                      |
| 240 | String     | `_.escapeRegExp`      | `escape_regexp`        | `escapeRegExp`                                |
| 241 | String     | `_.kebabCase`         | `kebab_case`           | `kebabCase`                                   |
| 242 | String     | `_.lowerCase`         | `lower_case`           | `lowerCase`                                   |
| 243 | String     | `_.lowerFirst`        | `lower_first`          | `lowerFirst`                                  |
| 244 | String     | `_.pad`               | `pad`                  | `pad`                                         |
| 245 | String     | `_.padEnd`            | `pad_end`              | `padEnd`                                      |
| 246 | String     | `_.padStart`          | `pad_start`            | `padStart`                                    |
| 247 | String     | `_.parseInt`          | `parse_int`            | `parseInt`                                    |
| 248 | String     | `_.repeat`            | `repeat`               | `repeat`                                      |
| 249 | String     | `_.replace`           | `replace`              | `replace`                                     |
| 250 | String     | `_.snakeCase`         | `snake_case`           | `snakeCase`                                   |
| 251 | String     | `_.split`             | `split`                | `split`                                       |
| 252 | String     | `_.startCase`         | `start_case`           | `startCase`                                   |
| 253 | String     | `_.startsWith`        |                        |                                               |
| 254 | String     | `_.template`          | `template`             | `template`                                    |
| 255 | String     | `_.toLower`           | `to_lower`             | `toLower`                                     |
| 256 | String     | `_.toUpper`           | `to_upper`             | `toUpper`                                     |
| 257 | String     | `_.trim`              |                        |                                               |
| 258 | String     | `_.trimEnd`           |                        |                                               |
| 259 | String     | `_.trimStart`         |                        |                                               |
| 260 | String     | `_.truncate`          | `truncate`             | `truncate`                                    |
| 261 | String     | `_.unescape`          | `unescape`             | `unescape`                                    |
| 262 | String     | `_.upperCase`         | `upper_case`           | `upperCase`                                   |
| 263 | String     | `_.upperFirst`        | `upper_first`          | `upperFirst`                                  |
| 264 | String     | `_.words`             | `words`                | `words`                                       |
| 265 | Util       | `_.attempt`           | `attempt`              |                                               |
| 266 | Util       | `_.bindAll`           |                        |                                               |
| 267 | Util       | `_.cond`              | `cond`                 |                                               |
| 268 | Util       | `_.conforms`          | `conforms`             |                                               |
| 269 | Util       | `_.constant`          | `constant`             | `constant`                                    |
| 270 | Util       | `_.defaultTo`         | `default_to`           |                                               |
| 271 | Util       | `_.flow`              | `flow`                 |                                               |
| 272 | Util       | `_.flowRight`         | `flow_right`           |                                               |
| 273 | Util       | `_.identity`          | `identity`             | `identity`                                    |
| 274 | Util       | `_.iteratee`          | `iteratee`             |                                               |
| 275 | Util       | `_.matches`           | `matches`              |                                               |
| 276 | Util       | `_.matchesProperty`   | `matches_property`     |                                               |
| 277 | Util       | `_.method`            | `method`               |                                               |
| 278 | Util       | `_.methodOf`          | `method_of`            |                                               |
| 279 | Util       | `_.mixin`             | `mixin`                |                                               |
| 280 | Util       | `_.noConflict`        |                        |                                               |
| 281 | Util       | `_.noop`              | `noop`                 | `noop`                                        |
| 282 | Util       | `_.nthArg`            | `nth_arg`              |                                               |
| 283 | Util       | `_.over`              | `over`                 |                                               |
| 284 | Util       | `_.overEvery`         | `over_every`           |                                               |
| 285 | Util       | `_.overSome`          | `over_some`            |                                               |
| 286 | Util       | `_.property`          | `property`             |                                               |
| 287 | Util       | `_.propertyOf`        | `property_of`          |                                               |
| 288 | Util       | `_.range`             | `range`                | `range`                                       |
| 289 | Util       | `_.rangeRight`        | `range_right`          | `rangeRight`                                  |
| 290 | Util       | `_.runInContext`      |                        |                                               |
| 291 | Util       | `_.stubArray`         | `stub_array`           | `stubArray`                                   |
| 292 | Util       | `_.stubFalse`         | `stub_false`           | `stubFalse`                                   |
| 293 | Util       | `_.stubObject`        | `stub_object`          | `stubObject`                                  |
| 294 | Util       | `_.stubString`        | `stub_string`          | `stubString`                                  |
| 295 | Util       | `_.stubTrue`          | `stub_true`            | `stubTrue`                                    |
| 296 | Util       | `_.times`             | `times`                |                                               |
| 297 | Util       | `_.toPath`            | `to_path`              |                                               |
| 298 | Util       | `_.uniqueId`          | `unique_id`            | `uniqueId`                                    |
