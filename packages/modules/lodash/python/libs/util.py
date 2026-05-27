"""
util
"""

import uuid


def constant(value):
    """
    constant
    """
    return value


def default_to(value, default_value):
    """
    defaultTo
    """
    if value is None:
        return default_value
    return value


def identity(*args):
    """
    identity
    """
    value = args[0]
    return value


def noop():
    """
    noop
    """
    return None


def range_array(_start, _end=None, step=1):
    """
    range_array
    """
    start = 0
    end = _start
    if _end is not None:
        start = _start
        end = _end
    array = [*range(start, end, step)]
    return array


def range_right(start, end=None, step=1):
    """
    range_right
    """
    array = range_array(start, end, step)
    array.reverse()
    return array


def stub_array():
    """
    stub_array
    """
    return []


def stub_false():
    """
    stub_false
    """
    return False


def stub_object():
    """
    stub_object
    """
    return {}


def stub_string():
    """
    stub_string
    """
    return ""


def stub_true():
    """
    stub_true
    """
    return True


def times(number, callback=None):
    """
    times
    """
    array = [*range(0, number, 1)]
    if callback is None:
        return array
    for index, _ in enumerate(array):
        array[index] = callback
    return array


def to_path(value):
    """
    to_path
    """
    value = value.replace("[", ".")
    value = value.replace("]", ".")
    return value.split(".")


def unique_id(prefix=""):
    """
    unique_id
    """
    return prefix + str(uuid.uuid4())


def attempt(func, *args, **kwargs):
    """
    attempt
    """
    try:
        return func(*args, **kwargs)
    except Exception as e:
        return e


def bind_all(obj, *method_names):
    """
    bind_all
    """
    result = {}
    for name in method_names:
        if callable(getattr(obj, name, None)):
            result[name] = getattr(obj, name)
    return result


def cond(pairs):
    """
    cond
    """
    def wrapper(*args, **kwargs):
        for predicate, action in pairs:
            if predicate(*args, **kwargs):
                return action(*args, **kwargs)
        return None
    return wrapper


def conforms(source):
    """
    conforms
    """
    def wrapper(obj):
        for key, predicate in source.items():
            if key in obj:
                if not predicate(obj[key]):
                    return False
            else:
                return False
        return True
    return wrapper


def flow(*funcs):
    """
    flow
    """
    def wrapper(*args, **kwargs):
        result = funcs[0](*args, **kwargs) if funcs else args[0]
        for func in funcs[1:]:
            result = func(result)
        return result
    return wrapper


def flow_right(*funcs):
    """
    flow_right
    """
    def wrapper(*args, **kwargs):
        result = funcs[-1](*args, **kwargs) if funcs else args[0]
        for func in reversed(funcs[:-1]):
            result = func(result)
        return result
    return wrapper


def iteratee(func):
    """
    iteratee
    """
    if callable(func):
        return func
    if isinstance(func, str):
        def accessor(obj):
            return obj[func] if isinstance(obj, dict) else getattr(obj, func, None)
        return accessor
    if isinstance(func, dict):
        def matcher(obj):
            return all(obj.get(k) == v for k, v in func.items())
        return matcher
    return lambda x: x


def matches(source):
    """
    matches
    """
    def wrapper(obj):
        for key, value in source.items():
            if key not in obj or obj[key] != value:
                return False
        return True
    return wrapper


def matches_property(key, value):
    """
    matches_property
    """
    def wrapper(obj):
        return obj.get(key) == value
    return wrapper


def method(key, *args):
    """
    method
    """
    def wrapper(obj, *more_args):
        func = obj[key] if isinstance(obj, dict) else getattr(obj, key)
        return func(*args, *more_args)
    return wrapper


def method_of(obj, *args):
    """
    method_of
    """
    def wrapper(key, *more_args):
        func = obj[key] if isinstance(obj, dict) else getattr(obj, key)
        return func(*args, *more_args)
    return wrapper


def mixin(obj, source):
    """
    mixin
    """
    for key, value in source.items():
        obj[key] = value
    return obj


def no_conflict():
    """
    no_conflict
    """
    return None


def nth_arg(n):
    """
    nth_arg
    """
    def wrapper(*args):
        return args[n] if n < len(args) else None
    return wrapper


def over(*iteratees):
    """
    over
    """
    def wrapper(*args, **kwargs):
        return [func(*args, **kwargs) for func in iteratees]
    return wrapper


def over_every(*predicates):
    """
    over_every
    """
    def wrapper(*args, **kwargs):
        return all(func(*args, **kwargs) for func in predicates)
    return wrapper


def over_some(*predicates):
    """
    over_some
    """
    def wrapper(*args, **kwargs):
        return any(func(*args, **kwargs) for func in predicates)
    return wrapper


def property_(key):
    """
    property
    """
    def wrapper(obj):
        if isinstance(obj, dict):
            return obj.get(key)
        return getattr(obj, key, None)
    return wrapper


def property_of(obj):
    """
    property_of
    """
    def wrapper(key):
        return obj.get(key) if isinstance(obj, dict) else getattr(obj, key, None)
    return wrapper


def run_in_context(context):
    """
    run_in_context
    """
    return context
