"""
object
"""

import copy

from .lang import is_function


def assign(obj, *args):
    """
    assign
    """
    for arg in args:
        for key in arg:
            value = arg[key]
            obj[key] = value
    return obj


def at(object_var, paths):
    """
    at
    """
    array = []
    for path in paths:
        value = get(object_var, path)
        array.append(value)
    return array


def defaults(*args):
    """
    defaults
    """
    objects = list(args)
    objects.reverse()
    object_var = {}
    for item in objects:
        for key in item.keys():
            value = item[key]
            object_var[key] = value
    return object_var


def find_key(object_var, callback):
    """
    find_key
    """
    _keys = keys(object_var)
    new_keys = []
    for key in _keys:
        value = object_var[key]
        if callback(value):
            new_keys.append(key)
    if len(new_keys) > 0:
        return new_keys[0]
    return None


def find_last_key(object_var, callback):
    """
    find_last_key
    """
    _keys = keys(object_var)
    _keys.reverse()
    new_keys = []
    for key in _keys:
        value = object_var[key]
        if callback(value):
            new_keys.append(key)
    if len(new_keys) > 0:
        return new_keys[0]
    return None


def for_in(object_var, callback):
    """
    for_in
    """
    _keys = keys(object_var)
    for key in _keys:
        value = object_var[key]
        callback(value, key)


def for_in_right(object_var, callback):
    """
    for_in_right
    """
    _keys = keys(object_var)
    _keys.reverse()
    for key in _keys:
        value = object_var[key]
        callback(value, key)


def for_own(object_var, callback):
    """
    for_own
    """
    for_in(object_var, callback)


def for_own_right(object_var, callback):
    """
    for_own_right
    """
    for_in_right(object_var, callback)


def functions(object_var):
    """
    functions
    """
    _keys = keys(object_var)
    new_array = []
    for key in _keys:
        value = object_var[key]
        new_array.append(value)
    return new_array


def functions_in(object_var):
    """
    functions_in
    """
    return functions(object_var)


def get(obj, path, default_value=None):
    """
    get
    """
    has_path = has(obj, path)
    if not has_path:
        return default_value
    _keys = path.split(".")
    value = obj
    for key in _keys:
        value = value.get(key)
    return value


def has(obj, path):
    """
    has
    """
    _keys = path.split(".")
    flag = True
    nested = obj
    for key in _keys:
        if not isinstance(nested, dict):
            flag = False
            break
        if key in nested:
            nested = nested[key]
        else:
            flag = False
            break
    return flag


def invert(obj):
    """
    invert
    """
    new_obj = {}
    _keys = keys(obj)
    for key in _keys:
        value = obj[key]
        new_key = str(value)
        new_obj[new_key] = key
    return new_obj


def invert_by(obj, callback=None):
    """
    invert_by
    """
    new_obj = {}
    _keys = keys(obj)
    for key in _keys:
        value = obj[key]
        new_key = str(value)
        if is_function(callback):
            new_key = callback(value)
        if new_key in new_obj:
            new_obj[new_key].append(key)
        else:
            new_obj[new_key] = [key]
    return new_obj


def keys(obj):
    """
    keys
    """
    return list(obj.keys())


def keys_in(obj):
    """
    keys_in
    """
    return list(obj.keys())


def map_keys(obj, callback):
    """
    map_keys
    """
    old_keys = keys(obj)
    new_obj = {}
    for key in old_keys:
        value = obj[key]
        new_key = callback(value, key)
        new_obj[new_key] = value
    return new_obj


def map_values(object_var, callback):
    """
    map_values
    """
    _keys = keys(object_var)
    for key in _keys:
        value = object_var[key]
        new_value = callback(value)
        object_var[key] = new_value
    return object_var


def omit(object_var, paths):
    """
    omit
    """
    new_object = {}
    _keys = keys(object_var)
    for key in _keys:
        if key not in paths:
            value = object_var[key]
            new_object[key] = value
    return new_object


def omit_by(obj, callback):
    """
    omit_by
    """
    new_object = {}
    _keys = keys(obj)
    for key in _keys:
        value = obj[key]
        flag = callback(value)
        if not flag:
            new_object[key] = value
    return new_object


def pick(obj, paths):
    """
    pick
    """
    new_obj = {}
    for path in paths:
        value = get(obj, path)
        set_object(new_obj, path, value)
    return new_obj


def pick_by(obj, callback):
    """
    pick_by
    """
    new_obj = {}
    _keys = keys(obj)
    for key in _keys:
        value = get(obj, key)
        flag = callback(value)
        if flag:
            set_object(new_obj, key, value)
    return new_obj


def result(obj, path, default_value=None):
    """
    result
    """
    callback = get(obj, path, default_value)
    if not callable(callback):
        return callback
    value = callback()
    if value is None:
        return default_value
    return value


def set_object(obj, path, value):
    """
    set_object
    """
    _keys = path.split(".")
    if len(_keys) == 1:
        obj[_keys[0]] = value
    else:
        key = _keys[0]
        object_value = set_object({}, ".".join(_keys[1 : len(_keys)]), value)
        obj[key] = object_value
    return obj


def to_pairs(obj):
    """
    to_pairs
    """
    array = []
    for key in obj:
        value = obj[key]
        array.append([key, value])
    return array


def to_pairs_in(obj):
    """
    to_pairs_in
    """
    return to_pairs(obj)


def update(obj, path, updater):
    """
    update
    """
    old_value = get(obj, path)
    if old_value is None:
        return obj
    new_value = updater(old_value)
    new_obj = set_object(obj, path, new_value)
    return new_obj


def values(obj):
    """
    values
    """
    return list(obj.values())


def values_in(obj):
    """
    values_in
    """
    return values(obj)


def assign_in(obj, *args):
    """
    assign_in
    """
    return assign(obj, *args)


def assign_with(obj, *args, customizer=None):
    """
    assign_with
    """
    if customizer is None:
        return assign(obj, *args)
    for arg in args:
        for key in arg:
            value = arg[key]
            new_value = customizer(obj.get(key), value, key, obj, arg)
            if new_value is not None:
                obj[key] = new_value
            else:
                obj[key] = value
    return obj


def assign_in_with(obj, *args, customizer=None):
    """
    assign_in_with
    """
    return assign_with(obj, *args, customizer=customizer)


def create(prototype, props=None):
    """
    create
    """
    obj = {}
    if isinstance(prototype, dict):
        for key in prototype:
            obj[key] = prototype[key]
    if props is not None:
        for key in props:
            obj[key] = props[key]
    return obj


def defaults_deep(*args):
    """
    defaults_deep
    """
    objects = list(args)
    objects.reverse()
    result = {}
    for item in objects:
        for key in item.keys():
            if key not in result:
                result[key] = copy.deepcopy(item[key])
            else:
                existing = result[key]
                incoming = item[key]
                if isinstance(existing, dict) and isinstance(incoming, dict):
                    result[key] = defaults_deep(existing, incoming)
    return result


def has_in(obj, path):
    """
    has_in
    """
    return has(obj, path)


def get_value(obj, path):
    """
    get_value
    """
    _keys = path.split(".")
    value = obj
    for key in _keys:
        if isinstance(value, dict) and key in value:
            value = value[key]
        else:
            return None
    return value


def invoke(obj, path, *args):
    """
    invoke
    """
    _keys = path.split(".")
    method_name = _keys[-1]
    target = obj
    for key in _keys[:-1]:
        if isinstance(target, dict) and key in target:
            target = target[key]
        else:
            return None
    method = getattr(target, method_name, None)
    if not callable(method):
        return None
    return method(*args)


def merge(obj, *sources):
    """
    merge
    """
    for source in sources:
        for key in source:
            if key in obj and isinstance(obj[key], dict) and isinstance(source[key], dict):
                obj[key] = merge(obj[key], source[key])
            else:
                obj[key] = copy.deepcopy(source[key])
    return obj


def merge_with(obj, *sources, customizer=None):
    """
    merge_with
    """
    if customizer is None:
        return merge(obj, *sources)
    for source in sources:
        for key in source:
            result_value = customizer(obj.get(key), source[key], key, obj, source)
            if result_value is not None:
                obj[key] = result_value
            elif key in obj and isinstance(obj[key], dict) and isinstance(source[key], dict):
                obj[key] = merge_with(obj[key], source[key], customizer=customizer)
            else:
                obj[key] = copy.deepcopy(source[key])
    return obj


def set_with(obj, path, value, customizer=None):
    """
    set_with
    """
    _keys = path.split(".")
    if customizer is not None:
        nested = obj
        for i, key in enumerate(_keys[:-1]):
            if key not in nested:
                nested[key] = {}
            nested = nested[key]
        last_key = _keys[-1]
        new_value = customizer(nested.get(last_key), value, last_key, obj, path)
        nested[last_key] = new_value if new_value is not None else value
        return obj
    return set_object(obj, path, value)


def transform(obj, callback, accumulator=None):
    """
    transform
    """
    if accumulator is None:
        accumulator = {}
    _keys = keys(obj)
    for key in _keys:
        value = obj[key]
        callback(accumulator, value, key)
    return accumulator


def unset(obj, path):
    """
    unset
    """
    _keys = path.split(".")
    nested = obj
    for key in _keys[:-1]:
        if not isinstance(nested, dict) or key not in nested:
            return False
        nested = nested[key]
    last_key = _keys[-1]
    if last_key in nested:
        del nested[last_key]
        return True
    return False


def update_with(obj, path, updater, customizer=None):
    """
    update_with
    """
    _keys = path.split(".")
    value = get_value(obj, path)
    if value is None:
        return obj
    new_value = updater(value)
    if customizer is not None:
        return set_with(obj, path, new_value, customizer=customizer)
    return set_object(obj, path, new_value)
