"""
function
"""

import time


def after(n, func):
    """
    after
    """
    count = 0

    def wrapper(*args, **kwargs):
        nonlocal count
        count += 1
        if count >= n:
            return func(*args, **kwargs)
        return None

    return wrapper


def ary(func, n):
    """
    ary
    """

    def wrapper(*args, **kwargs):
        return func(*args[:n], **kwargs)

    return wrapper


def before(n, func):
    """
    before
    """
    count = 0
    result = None

    def wrapper(*args, **kwargs):
        nonlocal count, result
        count += 1
        if count < n:
            result = func(*args, **kwargs)
        return result

    return wrapper


def bind(func, this_arg, *partials):
    """
    bind
    """
    def wrapper(*args, **kwargs):
        return func(*partials, *args, **kwargs)
    return wrapper


def bind_key(obj, key, *partials):
    """
    bind_key
    """
    def wrapper(*args, **kwargs):
        return obj[key](*partials, *args, **kwargs)
    return wrapper


def curry(func, arity=None):
    """
    curry
    """
    if arity is None:
        arity = func.__code__.co_argcount

    def wrapper(*args):
        if len(args) >= arity:
            return func(*args)
        return curry(lambda *more: func(*args, *more), arity - len(args))

    return wrapper


def curry_right(func, arity=None):
    """
    curry_right
    """
    if arity is None:
        arity = func.__code__.co_argcount

    def wrapper(*args):
        if len(args) >= arity:
            return func(*args)
        return curry_right(lambda *more: func(*more, *args), arity - len(args))

    return wrapper


def debounce(func, wait=0):
    """
    debounce
    """
    time.sleep(wait)
    func()


def defer(func, *args):
    """
    defer
    """
    func(*args)


def delay(func, wait=0, *args):
    """
    delay
    """
    time.sleep(wait)
    func(*args)


def flip(func):
    """
    flip
    """

    def wrapper(*args, **kwargs):
        return func(*reversed(args), **kwargs)

    return wrapper


def memoize(func, resolver=None):
    """
    memoize
    """
    cache = {}

    def wrapper(*args, **kwargs):
        key = str(args) + str(kwargs) if resolver is None else resolver(*args, **kwargs)
        if key not in cache:
            cache[key] = func(*args, **kwargs)
        return cache[key]

    wrapper.cache = cache
    return wrapper


def negate(predicate):
    """
    negate
    """

    def wrapper(*args, **kwargs):
        return not predicate(*args, **kwargs)

    return wrapper


def once(func):
    """
    once
    """
    called = False
    result = None

    def wrapper(*args, **kwargs):
        nonlocal called, result
        if not called:
            called = True
            result = func(*args, **kwargs)
        return result

    return wrapper


def over_args(func, *transforms):
    """
    over_args
    """

    def wrapper(*args, **kwargs):
        transformed = tuple(transforms[i](args[i]) if i < len(transforms) else args[i] for i in range(len(args)))
        return func(*transformed, **kwargs)

    return wrapper


def partial(func, *partials):
    """
    partial
    """

    def wrapper(*args, **kwargs):
        return func(*partials, *args, **kwargs)

    return wrapper


def partial_right(func, *partials):
    """
    partial_right
    """

    def wrapper(*args, **kwargs):
        return func(*args, *partials, **kwargs)

    return wrapper


def rearg(func, *indexes):
    """
    rearg
    """

    def wrapper(*args, **kwargs):
        reordered = tuple(args[i] if i < len(args) else None for i in indexes)
        return func(*reordered, **kwargs)

    return wrapper


def rest(func, start=None):
    """
    rest
    """
    if start is None:
        start = func.__code__.co_argcount - 1

    def wrapper(*args, **kwargs):
        regular = args[:start]
        rest_args = list(args[start:])
        return func(*regular, rest_args, **kwargs)

    return wrapper


def spread(func):
    """
    spread
    """

    def wrapper(args, **kwargs):
        return func(*args, **kwargs)

    return wrapper


def throttle(func, wait=0):
    """
    throttle
    """
    last_called = 0
    result = None

    def wrapper(*args, **kwargs):
        nonlocal last_called, result
        now = time.time()
        if now - last_called >= wait:
            last_called = now
            result = func(*args, **kwargs)
        return result

    return wrapper


def unary(func):
    """
    unary
    """

    def wrapper(*args, **kwargs):
        return func(args[0], **kwargs) if args else func(**kwargs)

    return wrapper


def wrap(value, wrapper):
    """
    wrap
    """

    def wrapper_fn(*args, **kwargs):
        return wrapper(value, *args, **kwargs)

    return wrapper_fn
