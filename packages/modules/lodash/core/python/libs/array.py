"""
array
"""

import copy


def chunk(array, size=1):
    """
    chunk
    """
    new_array = []
    for i in range(0, len(array), size):
        new_array.append(array[i : i + size])
    return new_array


def compact(array):
    """
    compact
    """
    new_array = []
    for item in array:
        if item:
            new_array.append(item)
    return new_array


def concat(array, *args):
    """
    concat
    """
    new_array = array
    for arg in args:
        if isinstance(arg, list):
            for item in arg:
                new_array.append(item)
        else:
            new_array.append(arg)
    return new_array


def difference(array, values):
    """
    difference
    """
    if len(array) == 0:
        return []
    _difference = []
    for i in array:
        if i not in values:
            _difference.append(i)
    return _difference


def difference_by(array, values, callback):
    """
    difference_by
    """
    new_values = []
    for value in values:
        new_values.append(callback(value))
    new_array = []
    for item in array:
        if callback(item) not in new_values:
            new_array.append(item)
    return new_array


def drop(array, number=1):
    """
    drop
    """
    return array[number : len(array)]


def drop_right(array, number=1):
    """
    drop_right
    """
    if number >= len(array):
        return []
    return array[0 : len(array) - number]


def drop_right_while(array, callback):
    """
    drop_right_while
    """
    temp_array = copy.deepcopy(array)
    temp_array.reverse()
    for item in temp_array:
        flag = callback(item)
        if flag:
            array.remove(item)


def drop_while(array, callback):
    """
    drop_while
    """
    temp_array = copy.deepcopy(array)
    for item in temp_array:
        flag = callback(item)
        if flag:
            array.remove(item)


def fill(array, value, start=0, end=None):
    """
    fill
    """
    if end is None:
        end = len(array)
    for index, item in enumerate(array):
        if index < start or index > end - 1:
            array[index] = item
        else:
            array[index] = value
    return array


# Linear Search


def find_index(array, callback, from_index=0):
    """
    find_index
    """
    new_array = array[from_index:]
    index = -1
    for idx, item in enumerate(new_array):
        flag = callback(item)
        if flag:
            index = idx
            break
    return index


def find_last_index(array, callback, from_index=None):
    """
    find_last_index
    """
    new_array = array[0:from_index]
    index = -1
    for idx, item in enumerate(new_array):
        flag = callback(item)
        if flag:
            index = idx
    return index


def flatten(array):
    """
    flatten
    """
    new_array = []
    for item in array:
        if isinstance(item, list):
            new_array = concat(new_array, item)
        else:
            new_array.append(item)
    return new_array


def flatten_deep(array):
    """
    flatten_deep
    """
    if array == []:
        return array
    if isinstance(array[0], list):
        return flatten_deep(array[0]) + flatten_deep(array[1:])
    return array[:1] + flatten_deep(array[1:])


def flatten_depth(array, depth=1):
    """
    flatten_depth
    """
    new_array = array
    for _ in range(0, depth):
        new_array = flatten(new_array)
    return new_array


def from_pairs(pairs):
    """
    from_pairs
    """
    object_var = {}
    for pair in pairs:
        key, value = pair
        object_var[key] = value
    return object_var


def head(array):
    """
    head
    """
    if len(array) == 0:
        return
    return array[0]


def index_of(array, value, from_index=0):
    """
    index_of
    """
    if from_index >= len(array):
        return -1
    return array[from_index : len(array)].index(value) + from_index


def initial(array):
    """
    initial
    """
    return array[0 : len(array) - 1]


def intersection(*args):
    """
    intersection
    """
    arrays = list(args)
    total = len(arrays)
    flatten_array = flatten_deep(arrays)
    item_count = {}
    for item in flatten_array:
        if item in item_count:
            item_count[item] += 1
        else:
            item_count[item] = 1
    array = []
    for key, value in item_count.items():
        if value == total:
            array.append(key)
    return array


def join(array, separator):
    """
    join
    """
    return separator.join(array)


def last(array):
    """
    last
    """
    if len(array) == 0:
        return
    return array[len(array) - 1]


def last_index_of(array, value, from_index=None):
    """
    last_index_of
    """
    new_array = array[0:from_index]
    index = -1
    for idx, item in enumerate(new_array):
        if item == value:
            index = idx
    return index


def nth(array, number):
    """
    nth
    """
    return array[number]


def pull(array, *args):
    """
    pull
    """
    values = list(args)
    temp_array = copy.deepcopy(array)
    for item in temp_array:
        if item in values:
            array.remove(item)


def pull_all(array, values):
    """
    pull_all
    """
    temp_array = copy.deepcopy(array)
    for item in temp_array:
        if item in values:
            array.remove(item)


def pull_at(array, indexes):
    """
    pull_at
    """
    temp_array = copy.deepcopy(array)
    removed_array = []
    for index, item in enumerate(temp_array):
        if index in indexes:
            array.remove(item)
            removed_array.append(item)
    return removed_array


def remove(array, callback):
    """
    remove
    """
    new_array = []
    temp_array = copy.deepcopy(array)
    for item in temp_array:
        flag = callback(item)
        if flag:
            array.remove(item)
            new_array.append(item)
    return new_array


# _recursion


def reverse(array):
    """
    reverse
    """
    if len(array) == 0:
        return []
    sub = array[1:]
    reverse_sub = reverse(sub)
    reverse_sub.append(array[0])
    return reverse_sub


def slice(array, start=0, end=None):
    """
    slice
    """
    return array[start:end]


def sorted_index(array, value):
    """
    sorted_index
    """
    index = -1
    for idx, _ in enumerate(array):
        if idx < len(array) - 1:
            first = array[idx]
            second = array[idx + 1]
            if first <= value and value <= second:
                index = idx + 1
                break
        else:
            idx = index + 1
    return index


def sorted_last_index(array, value):
    """
    sorted_last_index
    """
    index = -1
    for idx, _ in enumerate(array):
        if idx < len(array) - 1:
            first = array[idx]
            second = array[idx + 1]
            if first <= value and value <= second:
                index = idx + 1
        else:
            idx = index + 1
    return index


def sorted_uniq(array):
    """
    sorted_uniq
    """
    new_array = []
    for item in array:
        if item not in new_array:
            new_array.append(item)
    return new_array


def tail(array):
    """
    tail
    """
    return array[1 : len(array)]


def take(array, number=1):
    """
    take
    """
    return array[0:number]


def take_right(array, number=1):
    """
    take_right
    """
    length = len(array)
    start = length - number if length - number >= 0 else 0
    return array[start:length]


def take_right_while(array, callback):
    """
    take_right_while
    """
    temp_array = copy.deepcopy(array)
    temp_array.reverse()
    for item in temp_array:
        flag = callback(item)
        if not flag:
            array.remove(item)


def take_while(array, callback):
    """
    take_while
    """
    temp_array = copy.deepcopy(array)
    for item in temp_array:
        flag = callback(item)
        if not flag:
            array.remove(item)


def union(*args):
    """
    union
    """
    arrays = list(args)
    new_array = []
    for array in arrays:
        for item in array:
            if item not in new_array:
                new_array.append(item)
    return new_array


def uniq(array):
    """
    uniq
    """
    return list(set(array))


def unzip(arrays):
    """
    unzip
    """
    total_items_per_array = len(arrays)
    total_arrays = 0
    for array in arrays:
        if total_arrays < len(array):
            total_arrays = len(array)
    new_array = []
    for idx1 in range(0, total_arrays):
        new_array.append([])
        for idx2 in range(0, total_items_per_array):
            value = arrays[idx2][idx1]
            new_array[idx1].append(value)
    return new_array


def unzip_with(arrays, callback):
    """
    unzip_with
    """
    unzipped = unzip(arrays)
    new_array = []
    for array in unzipped:
        value = callback(*array)
        new_array.append(value)
    return new_array


def without(array, *args):
    """
    without
    """
    values = list(args)
    new_array = []
    for item in array:
        if item not in values:
            new_array.append(item)
    return new_array


def xor(*args):
    """
    xor
    """
    arrays = list(args)
    flatten_array = flatten_deep(arrays)
    item_count = {}
    for item in flatten_array:
        if item in item_count:
            item_count[item] += 1
        else:
            item_count[item] = 1
    array = []
    for key, value in item_count.items():
        if value == 1:
            array.append(key)
    return array


def zip(*args):
    """
    zip
    """
    arrays = list(args)
    maximum = 0
    for array in arrays:
        if maximum < len(array):
            maximum = len(array)
    new_arrays = []

    def get_item(array, i):
        try:
            return array[i]
        except Exception:
            return None

    for i in range(0, maximum):
        new_array = []
        for array in arrays:
            item = get_item(array, i)
            new_array.append(item)
        new_arrays.append(new_array)
    return new_arrays


def zip_object(props, values):
    """
    zip_object
    """
    obj = {}
    for index, prop in enumerate(props):
        value = None
        if index < len(values):
            value = values[index]
        obj[prop] = value
    return obj


def _iteratee_value(item, iteratee):
    if iteratee is None:
        return item
    if callable(iteratee):
        return iteratee(item)
    return item[iteratee]


def _is_iteratee(value):
    return callable(value) or isinstance(value, str)


def difference_with(array, values, comparator=None):
    """
    difference_with
    """
    result = []
    for item in array:
        found = False
        for val in values:
            if comparator is None:
                if item == val:
                    found = True
                    break
            elif comparator(item, val):
                found = True
                break
        if not found:
            result.append(item)
    return result


def intersection_by(*arrays):
    """
    intersection_by
    """
    if not arrays:
        return []
    iteratee = arrays[-1] if len(arrays) > 1 and _is_iteratee(arrays[-1]) else None
    if iteratee is not None:
        arrays = arrays[:-1]
    if not arrays:
        return []
    result = []
    seen = set()
    for item in arrays[0]:
        key = _iteratee_value(item, iteratee)
        if key not in seen:
            if all(any(_iteratee_value(x, iteratee) == key for x in arr) for arr in arrays[1:]):
                seen.add(key)
                result.append(item)
    return result


def intersection_with(*arrays):
    """
    intersection_with
    """
    comparator = arrays[-1] if len(arrays) > 1 and callable(arrays[-1]) else None
    if comparator is not None:
        arrays = arrays[:-1]
    if not arrays:
        return []
    result = []
    for item in arrays[0]:
        if all(any(comparator(item, x) for x in arr) for arr in arrays[1:]):
            if not any(comparator(item, r) for r in result):
                result.append(item)
    return result


def pull_all_by(array, values, iteratee=None):
    """
    pull_all_by
    """
    result = []
    for item in array:
        key = _iteratee_value(item, iteratee)
        if not any(_iteratee_value(v, iteratee) == key for v in values):
            result.append(item)
    return result


def pull_all_with(array, values, comparator=None):
    """
    pull_all_with
    """
    result = []
    for item in array:
        if not any(
            item == v if comparator is None else comparator(item, v) for v in values
        ):
            result.append(item)
    return result


def sorted_index_by(array, value, iteratee=None):
    """
    sorted_index_by
    """
    key = _iteratee_value(value, iteratee)
    for i, item in enumerate(array):
        if _iteratee_value(item, iteratee) >= key:
            return i
    return len(array)


def sorted_index_of(array, value):
    """
    sorted_index_of
    """
    for i, item in enumerate(array):
        if item == value:
            return i
        if item > value:
            return -1
    return -1


def sorted_last_index_by(array, value, iteratee=None):
    """
    sorted_last_index_by
    """
    key = _iteratee_value(value, iteratee)
    idx = len(array)
    for i in range(len(array) - 1, -1, -1):
        if _iteratee_value(array[i], iteratee) == key:
            return i + 1
        if _iteratee_value(array[i], iteratee) < key:
            break
    return max(idx, 0)


def sorted_last_index_of(array, value):
    """
    sorted_last_index_of
    """
    idx = -1
    for i, item in enumerate(array):
        if item == value:
            idx = i
        elif item > value:
            break
    return idx


def sorted_uniq_by(array, iteratee=None):
    """
    sorted_uniq_by
    """
    result = []
    seen = set()
    for item in array:
        key = _iteratee_value(item, iteratee)
        if key not in seen:
            seen.add(key)
            result.append(item)
    return result


def union_by(*arrays):
    """
    union_by
    """
    if not arrays:
        return []
    iteratee = arrays[-1] if len(arrays) > 1 and _is_iteratee(arrays[-1]) else None
    if iteratee is not None:
        arrays = arrays[:-1]
    result = []
    seen = set()
    for arr in arrays:
        for item in arr:
            key = _iteratee_value(item, iteratee)
            if key not in seen:
                seen.add(key)
                result.append(item)
    return result


def union_with(*arrays):
    """
    union_with
    """
    comparator = arrays[-1] if len(arrays) > 1 and callable(arrays[-1]) else None
    if comparator is not None:
        arrays = arrays[:-1]
    result = []
    for arr in arrays:
        for item in arr:
            if not any(
                item == r if comparator is None else comparator(item, r) for r in result
            ):
                result.append(item)
    return result


def uniq_by(array, iteratee=None):
    """
    uniq_by
    """
    result = []
    seen = set()
    for item in array:
        key = _iteratee_value(item, iteratee)
        if key not in seen:
            seen.add(key)
            result.append(item)
    return result


def uniq_with(array, comparator=None):
    """
    uniq_with
    """
    result = []
    for item in array:
        if not any(
            item == r if comparator is None else comparator(item, r) for r in result
        ):
            result.append(item)
    return result


def xor_by(*arrays):
    """
    xor_by
    """
    if not arrays:
        return []
    iteratee = arrays[-1] if len(arrays) > 1 and _is_iteratee(arrays[-1]) else None
    if iteratee is not None:
        arrays = arrays[:-1]
    counts = {}
    for arr in arrays:
        seen_in_arr = set()
        for item in arr:
            key = _iteratee_value(item, iteratee)
            if key not in seen_in_arr:
                counts[key] = counts.get(key, 0) + 1
                seen_in_arr.add(key)
    result = []
    seen = set()
    for arr in arrays:
        for item in arr:
            key = _iteratee_value(item, iteratee)
            if counts[key] == 1 and key not in seen:
                seen.add(key)
                result.append(item)
    return result


def xor_with(*arrays):
    """
    xor_with
    """
    comparator = arrays[-1] if len(arrays) > 1 and callable(arrays[-1]) else None
    if comparator is not None:
        arrays = arrays[:-1]
    counts = []
    for arr in arrays:
        arr_group = []
        for item in arr:
            found = False
            for existing, _ in arr_group:
                if comparator is not None and comparator(item, existing):
                    found = True
                    break
                if comparator is None and item == existing:
                    found = True
                    break
            if not found:
                arr_group.append([item, 1])
            else:
                arr_group[-1][1] += 1
        counts.append(arr_group)
    result = []
    for i, arr in enumerate(arrays):
        for item in arr:
            total = 0
            for j, arr_group in enumerate(counts):
                for existing, count in arr_group:
                    match = comparator(item, existing) if comparator else item == existing
                    if match:
                        total += count
                        break
            if total == 1:
                if not any(
                    r == item if comparator is None else comparator(r, item) for r in result
                ):
                    result.append(item)
    return result


def zip_object_deep(props, values):
    """
    zip_object_deep
    """
    obj = {}
    for i, prop in enumerate(props):
        value = None
        if i < len(values):
            value = values[i]
        keys = prop.split(".") if isinstance(prop, str) else [prop]
        current = obj
        for j, key in enumerate(keys):
            if j == len(keys) - 1:
                if isinstance(value, dict) and isinstance(current.get(key), dict):
                    current[key].update(value)
                else:
                    current[key] = value
            else:
                if key not in current:
                    current[key] = {}
                current = current[key]
    return obj


def zip_with(*arrays):
    """
    zip_with
    """
    if not arrays:
        return []
    iteratee = arrays[-1] if len(arrays) > 1 and _is_iteratee(arrays[-1]) else None
    if iteratee is not None:
        arrays = arrays[:-1]
    if not arrays:
        return []
    max_len = max(len(arr) for arr in arrays)
    result = []
    for i in range(max_len):
        values = [arr[i] if i < len(arr) else None for arr in arrays]
        if iteratee is not None:
            result.append(iteratee(*values))
        else:
            result.append(values)
    return result
