#include "lodash.h"
#include <stdlib.h>

void *lodash_after(int n, void (*fn)(void))
{
    lodash_fn_t *w = malloc(sizeof(lodash_fn_t));
    if (!w) return NULL;
    w->fn = fn;
    w->remaining = n;
    return w;
}

void *lodash_before(int n, void (*fn)(void))
{
    lodash_fn_t *w = malloc(sizeof(lodash_fn_t));
    if (!w) return NULL;
    w->fn = fn;
    w->remaining = n;
    return w;
}

void *lodash_curry(void (*fn)(void), int arity)
{
    (void)arity;
    return (void *)fn;
}

void *lodash_flip(void (*fn)(void))
{
    return (void *)fn;
}

void lodash_debounce(void (*fn)(void), int wait)
{
    (void)wait;
    if (fn) fn();
}

void *lodash_memoize(void *(*fn)(void *))
{
    static lodash_map_t *cache = NULL;
    if (!cache) cache = lodash_map_new();
    (void)cache;
    return (void *)fn;
}

bool lodash_negate(bool (*predicate)(void *), void *arg)
{
    return !predicate(arg);
}

void *lodash_once(void (*fn)(void))
{
    lodash_fn_t *w = malloc(sizeof(lodash_fn_t));
    if (!w) return NULL;
    w->fn = fn;
    w->remaining = 1;
    return w;
}
