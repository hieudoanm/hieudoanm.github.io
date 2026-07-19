"""
collection
"""

import copy
import random as rand

from .array import flatten, flatten_deep, flatten_depth


def count_by(array, callback):
    """
    count_by
    """
    obj = {}
    for item in array:
        key = callback(item)
        if key not in obj:
            obj[key] = 1
        else:
            obj[key] += 1
    return obj


def every(array, callback):
    """
    every
    """
    flag = True
    for item in array:
        if not callback(item):
            flag = False
        break
    return flag


def filter(array, callback):
    """
    filter
    """
    new_array = []
    for item in array:
        if callback(item):
            new_array.append(item)
    return new_array


def find(array, predicate, from_index=0):
    """
    find
    """
    filtered = filter(array[from_index : len(array)], predicate)
    if len(filtered) == 0:
        return None
    return filtered[0]


def find_last(array, predicate, from_index=0):
    """
    find_last
    """
    filtered = filter(array[from_index : len(array)], predicate)
    if len(filtered) == 0:
        return None
    return filtered[len(filtered) - 1]


def flat_map(collection, callback):
    """
    flat_map
    """
    new_array = []
    for item in collection:
        new_value = callback(item)
        new_array.append(new_value)
    return flatten(new_array)


def flat_map_deep(collection, callback):
    """
    flat_map_deep
    """
    new_array = []
    for item in collection:
        new_value = callback(item)
        new_array.append(new_value)
    return flatten_deep(new_array)


def flat_map_depth(collection, callback, depth=1):
    """
    flat_map_depth
    """
    new_array = []
    for item in collection:
        new_value = callback(item)
        new_array.append(new_value)
    return flatten_depth(new_array, depth)


def for_each(array, callback):
    """
    for_each
    """
    for item in array:
        callback(item)


def for_each_right(array, callback):
    """
    for_each_right
    """
    array.reverse()
    for_each(array, callback)


def group_by(array, callback):
    """
    group_by
    """
    obj = {}
    for item in array:
        key = str(callback(item))
        if key in obj:
            obj[key].append(item)
        else:
            obj[key] = [item]
    return obj


def includes(array, value, from_index=0):
    """
    includes
    """
    return value in array[from_index : len(array)]


def invoke_map(collection, callback, *args):
    """
    invoke_map
    """
    new_array = []
    for item in collection:
        new_value = callback(item, *args)
        new_array.append(new_value)
    return new_array


def key_by(array, callback):
    """
    key_by
    """
    obj = {}
    for item in array:
        key = callback(item)
        obj[key] = item
    return obj


def map(array, callback):
    """
    map
    """
    new_array = []
    for value in array:
        new_value = callback(value)
        new_array.append(new_value)
    return new_array


def partition(array, callback):
    """
    partition
    """
    truthy = filter(array, callback)
    falsey = reject(array, callback)
    return [truthy, falsey]


def reduce(collection, callback, accumulator):
    """
    reduce
    """
    if isinstance(collection, list):
        for item in collection:
            accumulator = callback(accumulator, item)
        return accumulator
    if isinstance(collection, dict):
        for key in collection.keys():
            value = collection[key]
            accumulator = callback(accumulator, value, key)
        return accumulator


def reduce_right(collection, callback, accumulator):
    """
    reduce_right
    """
    if isinstance(collection, list):
        collection.reverse()
        for item in collection:
            accumulator = callback(accumulator, item)
        return accumulator
    if isinstance(collection, dict):
        keys = collection.keys()
        keys.reverse()
        for key in keys:
            value = collection[key]
            accumulator = callback(accumulator, value, key)
        return accumulator


def reject(array, callback):
    """
    sample
    """
    return filter(array, lambda i: not callback(i))


def sample(array):
    """
    sample
    """
    index = rand.randrange(0, len(array))
    return array[index]


def sample_size(array, numbers):
    """
    sample_size
    """
    if numbers >= len(array):
        return array
    new_array = copy.deepcopy(array)
    rand.shuffle(new_array)
    return new_array[0:numbers]


def shuffle(array):
    """
    shuffle
    """
    rand.shuffle(array)


def size(collection):
    """
    size
    """
    if isinstance(collection, str) or isinstance(collection, list):
        return len(collection)
    elif isinstance(collection, dict):
        return len(collection.keys())
    return 0


def some(array, callback):
    """
    some
    """
    flag = False
    for item in array:
        if callback(item):
            flag = True
            break
    return flag


def sort_by(array, key):
    """
    sort_by
    """
    return sorted(array, key=lambda d: d[key])


class _Descending:
    def __init__(self, value):
        self.value = value
    def __lt__(self, other):
        if isinstance(other, _Descending):
            return self.value > other.value
        return self.value > other
    def __le__(self, other):
        if isinstance(other, _Descending):
            return self.value >= other.value
        return self.value >= other
    def __gt__(self, other):
        if isinstance(other, _Descending):
            return self.value < other.value
        return self.value < other
    def __ge__(self, other):
        if isinstance(other, _Descending):
            return self.value <= other.value
        return self.value <= other
    def __eq__(self, other):
        if isinstance(other, _Descending):
            return self.value == other.value
        return self.value == other


def _order_key(item, iteratees, orders):
    result = []
    for i, iteratee in enumerate(iteratees):
        if callable(iteratee):
            value = iteratee(item)
        else:
            value = item[iteratee]
        if i < len(orders) and orders[i] == "desc":
            if isinstance(value, (int, float)):
                value = -value
            else:
                value = _Descending(value)
        result.append(value)
    return tuple(result)


def order_by(collection, iteratees, orders=None):
    """
    order_by
    """
    if orders is None:
        orders = ["asc"] * len(iteratees)
    return sorted(collection, key=lambda item: _order_key(item, iteratees, orders))
