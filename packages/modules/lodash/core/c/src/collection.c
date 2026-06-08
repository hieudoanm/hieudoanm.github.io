#include "lodash.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

/* ─── Collection ─── */

lodash_map_t *lodash_count_by(const lodash_array_t *arr, void *(*iteratee)(void *))
{
    lodash_map_t *map = lodash_map_new();
    if (!arr || !iteratee) return map;
    for (size_t i = 0; i < arr->len; i++) {
        const char *key = (const char *)iteratee(arr->data[i]);
        if (!key) continue;
        void *val = lodash_map_get(map, key);
        size_t count = (val != NULL) ? (size_t)val + 1 : 1;
        lodash_map_set(map, key, (void *)count);
    }
    return map;
}

bool lodash_every(const lodash_array_t *arr, bool (*predicate)(void *))
{
    if (!arr) return true;
    for (size_t i = 0; i < arr->len; i++) {
        if (!predicate(arr->data[i])) return false;
    }
    return true;
}

lodash_array_t *lodash_filter(const lodash_array_t *arr, bool (*predicate)(void *))
{
    lodash_array_t *result = lodash_array_new();
    if (!arr) return result;
    for (size_t i = 0; i < arr->len; i++) {
        if (predicate(arr->data[i])) {
            lodash_array_push(result, arr->data[i]);
        }
    }
    return result;
}

void *lodash_find(const lodash_array_t *arr, bool (*predicate)(void *))
{
    if (!arr) return NULL;
    for (size_t i = 0; i < arr->len; i++) {
        if (predicate(arr->data[i])) return arr->data[i];
    }
    return NULL;
}

void *lodash_find_last(const lodash_array_t *arr, bool (*predicate)(void *))
{
    if (!arr) return NULL;
    for (size_t i = arr->len; i > 0; i--) {
        if (predicate(arr->data[i - 1])) return arr->data[i - 1];
    }
    return NULL;
}

lodash_array_t *lodash_flat_map(const lodash_array_t *arr, lodash_array_t *(*iteratee)(void *))
{
    lodash_array_t *result = lodash_array_new();
    if (!arr || !iteratee) return result;
    for (size_t i = 0; i < arr->len; i++) {
        lodash_array_t *sub = iteratee(arr->data[i]);
        if (sub) {
            for (size_t j = 0; j < sub->len; j++) {
                lodash_array_push(result, sub->data[j]);
            }
        }
    }
    return result;
}

lodash_array_t *lodash_flat_map_deep(const lodash_array_t *arr, lodash_array_t *(*iteratee)(void *))
{
    (void)arr;
    (void)iteratee;
    lodash_array_t *result = lodash_array_new();
    return result;
}

lodash_array_t *lodash_flat_map_depth(const lodash_array_t *arr, lodash_array_t *(*iteratee)(void *), int depth)
{
    (void)depth;
    (void)arr;
    (void)iteratee;
    lodash_array_t *result = lodash_array_new();
    return result;
}

void lodash_for_each(lodash_array_t *arr, void (*iteratee)(void *))
{
    if (!arr || !iteratee) return;
    for (size_t i = 0; i < arr->len; i++) {
        iteratee(arr->data[i]);
    }
}

void lodash_for_each_right(lodash_array_t *arr, void (*iteratee)(void *))
{
    if (!arr || !iteratee) return;
    for (size_t i = arr->len; i > 0; i--) {
        iteratee(arr->data[i - 1]);
    }
}

lodash_map_t *lodash_group_by(const lodash_array_t *arr, void *(*iteratee)(void *))
{
    lodash_map_t *map = lodash_map_new();
    if (!arr || !iteratee) return map;
    for (size_t i = 0; i < arr->len; i++) {
        const char *key = (const char *)iteratee(arr->data[i]);
        if (!key) continue;
        lodash_array_t *group = (lodash_array_t *)lodash_map_get(map, key);
        if (!group) {
            group = lodash_array_new();
            lodash_map_set(map, key, (void *)group);
        }
        lodash_array_push(group, arr->data[i]);
    }
    return map;
}

bool lodash_includes(const lodash_array_t *arr, void *val, int from)
{
    if (!arr) return false;
    size_t start;
    if (from >= 0) {
        start = (size_t)from;
    } else {
        int len = (int)arr->len;
        start = (size_t)(len + from);
        if ((int)start < 0) start = 0;
    }
    for (size_t i = start; i < arr->len; i++) {
        if (arr->data[i] == val) return true;
    }
    return false;
}

lodash_array_t *lodash_invoke_map(const lodash_array_t *arr, void *(*iteratee)(void *))
{
    lodash_array_t *result = lodash_array_new();
    if (!arr || !iteratee) return result;
    for (size_t i = 0; i < arr->len; i++) {
        lodash_array_push(result, iteratee(arr->data[i]));
    }
    return result;
}

lodash_map_t *lodash_key_by(const lodash_array_t *arr, void *(*iteratee)(void *))
{
    lodash_map_t *map = lodash_map_new();
    if (!arr || !iteratee) return map;
    for (size_t i = 0; i < arr->len; i++) {
        const char *key = (const char *)iteratee(arr->data[i]);
        if (!key) continue;
        lodash_map_set(map, key, arr->data[i]);
    }
    return map;
}

lodash_array_t *lodash_map(const lodash_array_t *arr, void *(*iteratee)(void *))
{
    lodash_array_t *result = lodash_array_new();
    if (!arr || !iteratee) return result;
    for (size_t i = 0; i < arr->len; i++) {
        lodash_array_push(result, iteratee(arr->data[i]));
    }
    return result;
}

lodash_array_t *lodash_order_by(const lodash_array_t *arr, int (*cmp)(const void *, const void *),
                                int *orders, size_t n_orders)
{
    lodash_array_t *result = lodash_array_copy(arr);
    if (!result || result->len <= 1) return result;
    if (!cmp) return result;

    int dir = (n_orders > 0 && orders && orders[0] == -1) ? -1 : 1;

    for (size_t i = 0; i < result->len; i++) {
        for (size_t j = i + 1; j < result->len; j++) {
            if (dir * cmp(&result->data[i], &result->data[j]) > 0) {
                void *tmp = result->data[i];
                result->data[i] = result->data[j];
                result->data[j] = tmp;
            }
        }
    }
    return result;
}

lodash_array_t *lodash_partition(const lodash_array_t *arr, bool (*predicate)(void *))
{
    lodash_array_t *result = lodash_array_with_capacity(2);
    if (!result) return NULL;
    lodash_array_t *truthy = lodash_array_new();
    lodash_array_t *falsy = lodash_array_new();
    if (!truthy || !falsy) {
        lodash_array_free(truthy);
        lodash_array_free(falsy);
        lodash_array_free(result);
        return NULL;
    }
    if (arr) {
        for (size_t i = 0; i < arr->len; i++) {
            if (predicate(arr->data[i])) {
                lodash_array_push(truthy, arr->data[i]);
            } else {
                lodash_array_push(falsy, arr->data[i]);
            }
        }
    }
    lodash_array_push(result, (void *)truthy);
    lodash_array_push(result, (void *)falsy);
    return result;
}

void *lodash_reduce(const lodash_array_t *arr, void *(*iteratee)(void *, void *), void *acc)
{
    if (!arr) return acc;
    void *result = acc;
    for (size_t i = 0; i < arr->len; i++) {
        result = iteratee(result, arr->data[i]);
    }
    return result;
}

void *lodash_reduce_right(const lodash_array_t *arr, void *(*iteratee)(void *, void *), void *acc)
{
    if (!arr) return acc;
    void *result = acc;
    for (size_t i = arr->len; i > 0; i--) {
        result = iteratee(result, arr->data[i - 1]);
    }
    return result;
}

lodash_array_t *lodash_reject(const lodash_array_t *arr, bool (*predicate)(void *))
{
    lodash_array_t *result = lodash_array_new();
    if (!arr) return result;
    for (size_t i = 0; i < arr->len; i++) {
        if (!predicate(arr->data[i])) {
            lodash_array_push(result, arr->data[i]);
        }
    }
    return result;
}

void *lodash_sample(const lodash_array_t *arr)
{
    if (!arr || arr->len == 0) return NULL;
    size_t idx = rand() % arr->len;
    return arr->data[idx];
}

lodash_array_t *lodash_sample_size(const lodash_array_t *arr, size_t n)
{
    lodash_array_t *result = lodash_array_new();
    if (!arr || n == 0) return result;

    size_t count = (n < arr->len) ? n : arr->len;
    lodash_array_t *copy = lodash_array_copy(arr);
    if (!copy) return result;

    for (size_t i = copy->len; i > 1; i--) {
        size_t j = rand() % i;
        void *tmp = copy->data[i - 1];
        copy->data[i - 1] = copy->data[j];
        copy->data[j] = tmp;
    }

    for (size_t i = 0; i < count; i++) {
        lodash_array_push(result, copy->data[i]);
    }
    lodash_array_free(copy);
    return result;
}

lodash_array_t *lodash_shuffle(const lodash_array_t *arr)
{
    lodash_array_t *result = lodash_array_copy(arr);
    if (!result) return NULL;

    for (size_t i = result->len; i > 1; i--) {
        size_t j = rand() % i;
        void *tmp = result->data[i - 1];
        result->data[i - 1] = result->data[j];
        result->data[j] = tmp;
    }
    return result;
}

size_t lodash_size(const lodash_array_t *arr)
{
    if (!arr) return 0;
    return arr->len;
}

bool lodash_some(const lodash_array_t *arr, bool (*predicate)(void *))
{
    if (!arr) return false;
    for (size_t i = 0; i < arr->len; i++) {
        if (predicate(arr->data[i])) return true;
    }
    return false;
}

lodash_array_t *lodash_sort_by(const lodash_array_t *arr, int (*cmp)(const void *, const void *))
{
    lodash_array_t *result = lodash_array_copy(arr);
    if (!result || result->len <= 1) return result;
    if (!cmp) return result;

    for (size_t i = 0; i < result->len; i++) {
        for (size_t j = i + 1; j < result->len; j++) {
            if (cmp(&result->data[i], &result->data[j]) > 0) {
                void *tmp = result->data[i];
                result->data[i] = result->data[j];
                result->data[j] = tmp;
            }
        }
    }
    return result;
}
