# [lodash](https://lodash.com/) v4.18.1

A modern JavaScript utility library delivering modularity, performance & extras.

## Table of Contents

- [lodash v4.18.1](#lodash-v4181)
  - [Table of Contents](#table-of-contents)
  - [Languages](#languages)
  - [Categories](#categories)
  - [API Checklist](#api-checklist)
    - [Array](#array)
    - [Collection](#collection)
    - [Date](#date)
    - [Function](#function)
    - [Lang](#lang)
    - [Math](#math)
    - [Number](#number)
    - [Object](#object)
    - [Seq](#seq)
    - [String](#string)
    - [Util](#util)

## Languages

| No  | Language         | Usage   | Other Usage |
| --- | ---------------- | ------- | ----------- |
| 1   | [C][c]           | System  |             |
| 2   | [C++][cpp]       | Game    |             |
| 3   | [Go][go]         | CLI     | Server      |
| 4   | [Kotlin][kt]     | Android | Server      |
| 5   | [Python][py]     | AI      | Server      |
| 6   | [Rust][rs]       | Desktop |             |
| 7   | [Swift][swift]   | iOS     |             |
| 8   | [TypeScript][ts] | Web     |             |

## Categories

| No  | Category                  | Count |
| --- | ------------------------- | ----- |
| 01  | [Array](#array)           | 64    |
| 02  | [Collection](#collection) | 26    |
| 03  | [Date](#date)             | 1     |
| 04  | [Function](#function)     | 23    |
| 05  | [Lang](#lang)             | 56    |
| 06  | [Math](#math)             | 15    |
| 07  | [Number](#number)         | 3     |
| 08  | [Object](#object)         | 43    |
| 09  | [Seq](#seq)               | 11    |
| 10  | [String](#string)         | 30    |
| 11  | [Util](#util)             | 34    |

## API Checklist

### Array

| No  | Category | Function              | [kt][kt] | [c][c] | [go][go] | [py][py] | [rs][rs] | [ts][ts] |
| --- | -------- | --------------------- | :------: | ------ | -------- | -------- | -------- | :------: |
| 1   | Array    | `_.chunk`             |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 2   | Array    | `_.compact`           |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 3   | Array    | `_.concat`            |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 4   | Array    | `_.difference`        |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 5   | Array    | `_.differenceBy`      |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 6   | Array    | `_.differenceWith`    |          | ✓      | ✓        | ✓        | ✓        |          |
| 7   | Array    | `_.drop`              |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 8   | Array    | `_.dropRight`         |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 9   | Array    | `_.dropRightWhile`    |    ✓     | ✓      | ✓        | ✓        | ✓        |          |
| 10  | Array    | `_.dropWhile`         |    ✓     | ✓      | ✓        | ✓        | ✓        |          |
| 11  | Array    | `_.fill`              |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 12  | Array    | `_.findIndex`         |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 13  | Array    | `_.findLastIndex`     |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 14  | Array    | `_.flatten`           |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 15  | Array    | `_.flattenDeep`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 16  | Array    | `_.flattenDepth`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 17  | Array    | `_.fromPairs`         |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 18  | Array    | `_.head`              |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 19  | Array    | `_.indexOf`           |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 20  | Array    | `_.initial`           |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 21  | Array    | `_.intersection`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 22  | Array    | `_.intersectionBy`    |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 23  | Array    | `_.intersectionWith`  |          | ✓      | ✓        | ✓        | ✓        |          |
| 24  | Array    | `_.join`              |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 25  | Array    | `_.last`              |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 26  | Array    | `_.lastIndexOf`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 27  | Array    | `_.nth`               |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 28  | Array    | `_.pull`              |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 29  | Array    | `_.pullAll`           |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 30  | Array    | `_.pullAllBy`         |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 31  | Array    | `_.pullAllWith`       |          | ✓      | ✓        | ✓        | ✓        |          |
| 32  | Array    | `_.pullAt`            |          | ✓      | ✓        | ✓        | ✓        |          |
| 33  | Array    | `_.remove`            |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 34  | Array    | `_.reverse`           |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 35  | Array    | `_.slice`             |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 36  | Array    | `_.sortedIndex`       |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 37  | Array    | `_.sortedIndexBy`     |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 38  | Array    | `_.sortedIndexOf`     |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 39  | Array    | `_.sortedLastIndex`   |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 40  | Array    | `_.sortedLastIndexBy` |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 41  | Array    | `_.sortedLastIndexOf` |          | ✓      | ✓        | ✓        | ✓        |          |
| 42  | Array    | `_.sortedUniq`        |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 43  | Array    | `_.sortedUniqBy`      |          | ✓      | ✓        | ✓        | ✓        |          |
| 44  | Array    | `_.tail`              |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 45  | Array    | `_.take`              |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 46  | Array    | `_.takeRight`         |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 47  | Array    | `_.takeRightWhile`    |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 48  | Array    | `_.takeWhile`         |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 49  | Array    | `_.union`             |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 50  | Array    | `_.unionBy`           |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 51  | Array    | `_.unionWith`         |          | ✓      | ✓        | ✓        | ✓        |          |
| 52  | Array    | `_.uniq`              |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 53  | Array    | `_.uniqBy`            |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 54  | Array    | `_.uniqWith`          |          | ✓      | ✓        | ✓        | ✓        |          |
| 55  | Array    | `_.unzip`             |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 56  | Array    | `_.unzipWith`         |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 57  | Array    | `_.without`           |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 58  | Array    | `_.xor`               |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 59  | Array    | `_.xorBy`             |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 60  | Array    | `_.xorWith`           |          | ✓      | ✓        | ✓        | ✓        |          |
| 61  | Array    | `_.zip`               |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 62  | Array    | `_.zipObject`         |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 63  | Array    | `_.zipObjectDeep`     |          | ✓      | ✓        | ✓        | ✓        |          |
| 64  | Array    | `_.zipWith`           |          | ✓      | ✓        | ✓        | ✓        |    ✓     |

### Collection

| No  | Category   | Function         | [kt][kt] | [c][c] | [go][go] | [py][py] | [rs][rs] | [ts][ts] |
| --- | ---------- | ---------------- | :------: | ------ | -------- | -------- | -------- | :------: |
| 65  | Collection | `_.countBy`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 66  | Collection | `_.every`        |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 67  | Collection | `_.filter`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 68  | Collection | `_.find`         |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 69  | Collection | `_.findLast`     |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 70  | Collection | `_.flatMap`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 71  | Collection | `_.flatMapDeep`  |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 72  | Collection | `_.flatMapDepth` |          | ✓      | ✓        | ✓        | ✓        |          |
| 73  | Collection | `_.forEach`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 74  | Collection | `_.forEachRight` |    ✓     | ✓      | ✓        | ✓        | ✓        |          |
| 75  | Collection | `_.groupBy`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 76  | Collection | `_.includes`     |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 77  | Collection | `_.invokeMap`    |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 78  | Collection | `_.keyBy`        |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 79  | Collection | `_.map`          |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 80  | Collection | `_.orderBy`      |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 81  | Collection | `_.partition`    |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 82  | Collection | `_.reduce`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 83  | Collection | `_.reduceRight`  |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 84  | Collection | `_.reject`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 85  | Collection | `_.sample`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 86  | Collection | `_.sampleSize`   |    ✓     | ✓      | ✓        | ✓        | ✓        |          |
| 87  | Collection | `_.shuffle`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 88  | Collection | `_.size`         |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 89  | Collection | `_.some`         |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 90  | Collection | `_.sortBy`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |

### Date

| No  | Category | Function | [kt][kt] | [c][c] | [go][go] | [py][py] | [rs][rs] | [ts][ts] |
| --- | -------- | -------- | :------: | ------ | -------- | -------- | -------- | :------: |
| 91  | Date     | `_.now`  |    ✓     | ✓      | ✓        | ✓        | ✓        |          |

### Function

| No  | Category | Function         | [kt][kt] | [c][c] | [go][go] | [py][py] | [rs][rs] | [ts][ts] |
| --- | -------- | ---------------- | :------: | ------ | -------- | -------- | -------- | :------: |
| 92  | Function | `_.after`        |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 93  | Function | `_.ary`          |          |        | ✓        | ✓        | ✓        |    ✓     |
| 94  | Function | `_.before`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 95  | Function | `_.bind`         |          |        | ✓        | ✓        |          |    ✓     |
| 96  | Function | `_.bindKey`      |          |        | ✓        | ✓        |          |          |
| 97  | Function | `_.curry`        |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 98  | Function | `_.curryRight`   |          |        | ✓        | ✓        |          |          |
| 99  | Function | `_.debounce`     |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 100 | Function | `_.defer`        |          |        | ✓        | ✓        |          |    ✓     |
| 101 | Function | `_.delay`        |          |        | ✓        | ✓        |          |    ✓     |
| 102 | Function | `_.flip`         |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 103 | Function | `_.memoize`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 104 | Function | `_.negate`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 105 | Function | `_.once`         |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 106 | Function | `_.overArgs`     |          |        | ✓        | ✓        |          |          |
| 107 | Function | `_.partial`      |          |        | ✓        | ✓        |          |    ✓     |
| 108 | Function | `_.partialRight` |          |        | ✓        | ✓        |          |          |
| 109 | Function | `_.rearg`        |          |        | ✓        | ✓        |          |          |
| 110 | Function | `_.rest`         |          |        | ✓        | ✓        | ✓        |    ✓     |
| 111 | Function | `_.spread`       |          |        | ✓        | ✓        | ✓        |    ✓     |
| 112 | Function | `_.throttle`     |    ✓     |        | ✓        | ✓        | ✓        |    ✓     |
| 113 | Function | `_.unary`        |    ✓     |        | ✓        | ✓        | ✓        |    ✓     |
| 114 | Function | `_.wrap`         |    ✓     |        | ✓        | ✓        | ✓        |          |

### Lang

| No  | Category | Function              | [kt][kt] | [c][c] | [go][go] | [py][py] | [rs][rs] | [ts][ts] |
| --- | -------- | --------------------- | :------: | ------ | -------- | -------- | -------- | :------: |
| 115 | Lang     | `_.castArray`         |    ✓     |        | ✓        | ✓        | ✓        |          |
| 116 | Lang     | `_.clone`             |          |        | ✓        | ✓        | ✓        |    ✓     |
| 117 | Lang     | `_.cloneDeep`         |          |        | ✓        | ✓        | ✓        |    ✓     |
| 118 | Lang     | `_.cloneDeepWith`     |          |        | ✓        | ✓        |          |          |
| 119 | Lang     | `_.cloneWith`         |          |        | ✓        | ✓        |          |          |
| 120 | Lang     | `_.conformsTo`        |          |        | ✓        | ✓        | ✓        |          |
| 121 | Lang     | `_.eq`                |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 122 | Lang     | `_.gt`                |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 123 | Lang     | `_.gte`               |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 124 | Lang     | `_.isArguments`       |          |        | ✓        | ✓        |          |    ✓     |
| 125 | Lang     | `_.isArray`           |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 126 | Lang     | `_.isArrayBuffer`     |          |        | ✓        | ✓        |          |          |
| 127 | Lang     | `_.isArrayLike`       |          |        | ✓        | ✓        |          |          |
| 128 | Lang     | `_.isArrayLikeObject` |          |        | ✓        | ✓        |          |          |
| 129 | Lang     | `_.isBoolean`         |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 130 | Lang     | `_.isBuffer`          |          |        | ✓        | ✓        |          |          |
| 131 | Lang     | `_.isDate`            |    ✓     |        | ✓        | ✓        | ✓        |    ✓     |
| 132 | Lang     | `_.isElement`         |    ✓     |        | ✓        | ✓        |          |    ✓     |
| 133 | Lang     | `_.isEmpty`           |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 134 | Lang     | `_.isEqual`           |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 135 | Lang     | `_.isEqualWith`       |          |        | ✓        | ✓        | ✓        |          |
| 136 | Lang     | `_.isError`           |    ✓     |        | ✓        | ✓        | ✓        |    ✓     |
| 137 | Lang     | `_.isFinite`          |    ✓     | ✓      | ✓        | ✓        | ✓        |          |
| 138 | Lang     | `_.isFunction`        |    ✓     |        | ✓        | ✓        | ✓        |    ✓     |
| 139 | Lang     | `_.isInteger`         |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 140 | Lang     | `_.isLength`          |          |        | ✓        | ✓        | ✓        |    ✓     |
| 141 | Lang     | `_.isMap`             |    ✓     |        | ✓        | ✓        | ✓        |    ✓     |
| 142 | Lang     | `_.isMatch`           |          |        | ✓        | ✓        |          |          |
| 143 | Lang     | `_.isMatchWith`       |          |        | ✓        | ✓        |          |          |
| 144 | Lang     | `_.isNaN`             |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 145 | Lang     | `_.isNative`          |          |        | ✓        | ✓        |          |          |
| 146 | Lang     | `_.isNil`             |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 147 | Lang     | `_.isNull`            |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 148 | Lang     | `_.isNumber`          |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 149 | Lang     | `_.isObject`          |          |        | ✓        | ✓        | ✓        |    ✓     |
| 150 | Lang     | `_.isObjectLike`      |          |        | ✓        | ✓        |          |    ✓     |
| 151 | Lang     | `_.isPlainObject`     |          |        | ✓        | ✓        | ✓        |    ✓     |
| 152 | Lang     | `_.isRegExp`          |    ✓     |        | ✓        | ✓        | ✓        |    ✓     |
| 153 | Lang     | `_.isSafeInteger`     |          |        | ✓        | ✓        | ✓        |          |
| 154 | Lang     | `_.isSet`             |    ✓     |        | ✓        | ✓        | ✓        |    ✓     |
| 155 | Lang     | `_.isString`          |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 156 | Lang     | `_.isSymbol`          |          |        | ✓        | ✓        | ✓        |    ✓     |
| 157 | Lang     | `_.isTypedArray`      |          |        | ✓        | ✓        | ✓        |          |
| 158 | Lang     | `_.isUndefined`       |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 159 | Lang     | `_.isWeakMap`         |          |        | ✓        | ✓        | ✓        |          |
| 160 | Lang     | `_.isWeakSet`         |          |        | ✓        | ✓        | ✓        |          |
| 161 | Lang     | `_.lt`                |    ✓     |        | ✓        | ✓        | ✓        |    ✓     |
| 162 | Lang     | `_.lte`               |    ✓     |        | ✓        | ✓        | ✓        |    ✓     |
| 163 | Lang     | `_.toArray`           |          |        | ✓        | ✓        | ✓        |    ✓     |
| 164 | Lang     | `_.toFinite`          |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 165 | Lang     | `_.toInteger`         |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 166 | Lang     | `_.toLength`          |          |        | ✓        | ✓        | ✓        |          |
| 167 | Lang     | `_.toNumber`          |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 168 | Lang     | `_.toPlainObject`     |          |        | ✓        | ✓        | ✓        |          |
| 169 | Lang     | `_.toSafeInteger`     |          |        | ✓        | ✓        | ✓        |          |
| 170 | Lang     | `_.toString`          |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |

### Math

| No  | Category | Function     | [kt][kt] | [c][c] | [go][go] | [py][py] | [rs][rs] | [ts][ts] |
| --- | -------- | ------------ | :------: | ------ | -------- | -------- | -------- | :------: |
| 171 | Math     | `_.add`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 172 | Math     | `_.ceil`     |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 173 | Math     | `_.divide`   |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 174 | Math     | `_.floor`    |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 175 | Math     | `_.max`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 176 | Math     | `_.maxBy`    |    ✓     |        | ✓        | ✓        | ✓        |    ✓     |
| 177 | Math     | `_.mean`     |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 178 | Math     | `_.meanBy`   |    ✓     |        | ✓        | ✓        | ✓        |    ✓     |
| 179 | Math     | `_.min`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 180 | Math     | `_.minBy`    |    ✓     |        | ✓        | ✓        | ✓        |    ✓     |
| 181 | Math     | `_.multiply` |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 182 | Math     | `_.round`    |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 183 | Math     | `_.subtract` |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 184 | Math     | `_.sum`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 185 | Math     | `_.sumBy`    |    ✓     |        | ✓        | ✓        | ✓        |    ✓     |

### Number

| No  | Category | Function    | [kt][kt] | [c][c] | [go][go] | [py][py] | [rs][rs] | [ts][ts] |
| --- | -------- | ----------- | :------: | ------ | -------- | -------- | -------- | :------: |
| 186 | Number   | `_.clamp`   |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 187 | Number   | `_.inRange` |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 188 | Number   | `_.random`  |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |

### Object

| No  | Category | Function         | [kt][kt] | [c][c] | [go][go] | [py][py] | [rs][rs] | [ts][ts] |
| --- | -------- | ---------------- | :------: | ------ | -------- | -------- | -------- | :------: |
| 189 | Object   | `_.assign`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 190 | Object   | `_.assignIn`     |          |        | ✓        | ✓        | ✓        |          |
| 191 | Object   | `_.assignInWith` |          |        | ✓        | ✓        | ✓        |          |
| 192 | Object   | `_.assignWith`   |          |        | ✓        | ✓        | ✓        |          |
| 193 | Object   | `_.at`           |          | ✓      | ✓        | ✓        | ✓        |          |
| 194 | Object   | `_.create`       |          |        | ✓        | ✓        | ✓        |          |
| 195 | Object   | `_.defaults`     |    ✓     | ✓      | ✓        | ✓        | ✓        |          |
| 196 | Object   | `_.defaultsDeep` |          |        | ✓        | ✓        | ✓        |          |
| 197 | Object   | `_.findKey`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 198 | Object   | `_.findLastKey`  |          |        | ✓        | ✓        | ✓        |    ✓     |
| 199 | Object   | `_.forIn`        |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 200 | Object   | `_.forInRight`   |          |        | ✓        | ✓        | ✓        |          |
| 201 | Object   | `_.forOwn`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 202 | Object   | `_.forOwnRight`  |          |        | ✓        | ✓        | ✓        |          |
| 203 | Object   | `_.functions`    |          |        | ✓        | ✓        | ✓        |    ✓     |
| 204 | Object   | `_.functionsIn`  |          |        | ✓        | ✓        | ✓        |          |
| 205 | Object   | `_.get`          |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 206 | Object   | `_.has`          |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 207 | Object   | `_.hasIn`        |          |        | ✓        | ✓        | ✓        |    ✓     |
| 208 | Object   | `_.invert`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 209 | Object   | `_.invertBy`     |    ✓     | ✓      | ✓        | ✓        | ✓        |          |
| 210 | Object   | `_.invoke`       |          |        | ✓        | ✓        | ✓        |          |
| 211 | Object   | `_.keys`         |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 212 | Object   | `_.keysIn`       |          |        | ✓        | ✓        | ✓        |          |
| 213 | Object   | `_.mapKeys`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 214 | Object   | `_.mapValues`    |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 215 | Object   | `_.merge`        |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 216 | Object   | `_.mergeWith`    |          |        | ✓        | ✓        | ✓        |          |
| 217 | Object   | `_.omit`         |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 218 | Object   | `_.omitBy`       |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 219 | Object   | `_.pick`         |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 220 | Object   | `_.pickBy`       |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 221 | Object   | `_.result`       |          |        | ✓        | ✓        | ✓        |          |
| 222 | Object   | `_.set`          |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 223 | Object   | `_.setWith`      |          |        | ✓        | ✓        | ✓        |          |
| 224 | Object   | `_.toPairs`      |          |        | ✓        | ✓        | ✓        |    ✓     |
| 225 | Object   | `_.toPairsIn`    |          |        | ✓        | ✓        | ✓        |          |
| 226 | Object   | `_.transform`    |          |        | ✓        | ✓        | ✓        |          |
| 227 | Object   | `_.unset`        |    ✓     | ✓      | ✓        | ✓        | ✓        |          |
| 228 | Object   | `_.update`       |          |        | ✓        | ✓        | ✓        |          |
| 229 | Object   | `_.updateWith`   |          |        | ✓        | ✓        | ✓        |          |
| 230 | Object   | `_.values`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 231 | Object   | `_.valuesIn`     |          |        | ✓        | ✓        | ✓        |          |

### Seq

| No  | Category | Function                       | [kt][kt] | [c][c] | [go][go] | [py][py] | [rs][rs] | [ts][ts] |
| --- | -------- | ------------------------------ | :------: | ------ | -------- | -------- | -------- | :------: |
| 232 | Seq      | `_.chain`                      |    ✓     | ✓      |          |          | ✓        |    ✓     |
| 233 | Seq      | `_.tap`                        |    ✓     | ✓      |          |          | ✓        |    ✓     |
| 234 | Seq      | `_.thru`                       |    ✓     | ✓      |          |          | ✓        |    ✓     |
| 235 | Seq      | `_.prototype[Symbol.iterator]` |          |        |          |          |          |          |
| 236 | Seq      | `_.prototype.at`               |          |        |          |          |          |          |
| 237 | Seq      | `_.prototype.chain`            |    ✓     | ✓      |          |          |          |          |
| 238 | Seq      | `_.prototype.commit`           |          |        |          |          |          |          |
| 239 | Seq      | `_.prototype.next`             |          |        |          |          |          |          |
| 240 | Seq      | `_.prototype.plant`            |          |        |          |          |          |          |
| 241 | Seq      | `_.prototype.reverse`          |          |        |          |          |          |          |
| 242 | Seq      | `_.prototype.value`            |          |        |          |          |          |          |

### String

| No  | Category | Function         | [kt][kt] | [c][c] | [go][go] | [py][py] | [rs][rs] | [ts][ts] |
| --- | -------- | ---------------- | :------: | ------ | -------- | -------- | -------- | :------: |
| 243 | String   | `_.camelCase`    |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 244 | String   | `_.capitalize`   |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 245 | String   | `_.deburr`       |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 246 | String   | `_.endsWith`     |    ✓     |        | ✓        | ✓        |          |    ✓     |
| 247 | String   | `_.escape`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 248 | String   | `_.escapeRegExp` |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 249 | String   | `_.kebabCase`    |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 250 | String   | `_.lowerCase`    |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 251 | String   | `_.lowerFirst`   |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 252 | String   | `_.pad`          |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 253 | String   | `_.padEnd`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 254 | String   | `_.padStart`     |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 255 | String   | `_.parseInt`     |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 256 | String   | `_.repeat`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 257 | String   | `_.replace`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 258 | String   | `_.snakeCase`    |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 259 | String   | `_.split`        |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 260 | String   | `_.startCase`    |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 261 | String   | `_.startsWith`   |    ✓     |        | ✓        | ✓        |          |    ✓     |
| 262 | String   | `_.template`     |          | ✓      | ✓        | ✓        | ✓        |          |
| 263 | String   | `_.toLower`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 264 | String   | `_.toUpper`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 265 | String   | `_.trim`         |          |        | ✓        | ✓        |          |    ✓     |
| 266 | String   | `_.trimEnd`      |          |        | ✓        | ✓        |          |    ✓     |
| 267 | String   | `_.trimStart`    |          |        | ✓        | ✓        |          |    ✓     |
| 268 | String   | `_.truncate`     |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 269 | String   | `_.unescape`     |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 270 | String   | `_.upperCase`    |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 271 | String   | `_.upperFirst`   |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 272 | String   | `_.words`        |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |

### Util

| No  | Category | Function            | [kt][kt] | [c][c] | [go][go] | [py][py] | [rs][rs] | [ts][ts] |
| --- | -------- | ------------------- | :------: | ------ | -------- | -------- | -------- | :------: |
| 273 | Util     | `_.attempt`         |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 274 | Util     | `_.bindAll`         |          |        | ✓        | ✓        |          |    ✓     |
| 275 | Util     | `_.cond`            |          |        | ✓        | ✓        | ✓        |          |
| 276 | Util     | `_.conforms`        |          |        | ✓        | ✓        | ✓        |          |
| 277 | Util     | `_.constant`        |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 278 | Util     | `_.defaultTo`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 279 | Util     | `_.flow`            |          |        | ✓        | ✓        | ✓        |    ✓     |
| 280 | Util     | `_.flowRight`       |          |        | ✓        | ✓        | ✓        |    ✓     |
| 281 | Util     | `_.identity`        |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 282 | Util     | `_.iteratee`        |          |        | ✓        | ✓        | ✓        |    ✓     |
| 283 | Util     | `_.matches`         |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 284 | Util     | `_.matchesProperty` |          | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 285 | Util     | `_.method`          |          |        | ✓        | ✓        | ✓        |    ✓     |
| 286 | Util     | `_.methodOf`        |          |        | ✓        | ✓        | ✓        |    ✓     |
| 287 | Util     | `_.mixin`           |          |        | ✓        | ✓        | ✓        |    ✓     |
| 288 | Util     | `_.noConflict`      |          |        | ✓        | ✓        |          |          |
| 289 | Util     | `_.noop`            |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 290 | Util     | `_.nthArg`          |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 291 | Util     | `_.over`            |          |        | ✓        | ✓        | ✓        |    ✓     |
| 292 | Util     | `_.overEvery`       |          |        | ✓        | ✓        | ✓        |    ✓     |
| 293 | Util     | `_.overSome`        |          |        | ✓        | ✓        | ✓        |    ✓     |
| 294 | Util     | `_.property`        |          |        | ✓        | ✓        | ✓        |    ✓     |
| 295 | Util     | `_.propertyOf`      |          |        | ✓        | ✓        | ✓        |    ✓     |
| 296 | Util     | `_.range`           |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 297 | Util     | `_.rangeRight`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 298 | Util     | `_.runInContext`    |          |        | ✓        | ✓        |          |    ✓     |
| 299 | Util     | `_.stubArray`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 300 | Util     | `_.stubFalse`       |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 301 | Util     | `_.stubObject`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 302 | Util     | `_.stubString`      |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 303 | Util     | `_.stubTrue`        |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 304 | Util     | `_.times`           |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |
| 305 | Util     | `_.toPath`          |          |        | ✓        | ✓        | ✓        |    ✓     |
| 306 | Util     | `_.uniqueId`        |    ✓     | ✓      | ✓        | ✓        | ✓        |    ✓     |

> Note: Aliases (e.g., `_.first` → `_.head`, `_.each` → `_.forEach`, `_.entries` → `_.toPairs`) are not listed separately. Properties (`_.VERSION`, `_.templateSettings`) are excluded from the count.

[c]: https://www.c-language.org/
[cpp]: https://www.isocpp.org/
[go]: https://go.dev/
[kt]: https://kotlinlang.org/
[py]: https://python.org/
[rs]: https://rust-lang.org/
[swift]: https://developer.apple.com/swift/
[ts]: https://www.typescriptlang.org/
