#include "lodash.h"
#include <stdlib.h>
#include <string.h>

static char *lodash_strdup(const char *s)
{
    if (!s) return NULL;
    size_t n = strlen(s) + 1;
    char *d = malloc(n);
    if (d) memcpy(d, s, n);
    return d;
}

void lodash_assign(lodash_map_t *obj, const lodash_map_t *src)
{
    if (!obj || !src) return;
    for (size_t i = 0; i < src->cap; i++) {
        lodash_map_entry_t *entry = src->buckets[i];
        while (entry) {
            lodash_map_set(obj, entry->key, entry->val);
            entry = entry->next;
        }
    }
}

lodash_array_t *lodash_at(const lodash_map_t *obj, const char **paths, size_t n)
{
    lodash_array_t *arr = lodash_array_with_capacity(n);
    for (size_t i = 0; i < n; i++) {
        lodash_array_push(arr, lodash_get(obj, paths[i]));
    }
    return arr;
}

void lodash_defaults(lodash_map_t *obj, const lodash_map_t *src)
{
    if (!obj || !src) return;
    for (size_t i = 0; i < src->cap; i++) {
        lodash_map_entry_t *entry = src->buckets[i];
        while (entry) {
            if (!lodash_map_has(obj, entry->key)) {
                lodash_map_set(obj, entry->key, entry->val);
            }
            entry = entry->next;
        }
    }
}

char *lodash_find_key(const lodash_map_t *obj, bool (*predicate)(void *))
{
    if (!obj || !predicate) return NULL;
    for (size_t i = 0; i < obj->cap; i++) {
        lodash_map_entry_t *entry = obj->buckets[i];
        while (entry) {
            if (predicate(entry->val)) return entry->key;
            entry = entry->next;
        }
    }
    return NULL;
}

void lodash_for_in(const lodash_map_t *obj, void (*iteratee)(const char *, void *))
{
    if (!obj || !iteratee) return;
    for (size_t i = 0; i < obj->cap; i++) {
        lodash_map_entry_t *entry = obj->buckets[i];
        while (entry) {
            iteratee(entry->key, entry->val);
            entry = entry->next;
        }
    }
}

void lodash_for_own(const lodash_map_t *obj, void (*iteratee)(const char *, void *))
{
    lodash_for_in(obj, iteratee);
}

void *lodash_get(const lodash_map_t *obj, const char *path)
{
    if (!obj || !path) return NULL;
    char *p = lodash_strdup(path);
    char *saveptr;
    char *token = strtok_r(p, ".", &saveptr);
    void *current = (void *)obj;
    while (token) {
        current = lodash_map_get((lodash_map_t *)current, token);
        if (!current) break;
        token = strtok_r(NULL, ".", &saveptr);
    }
    free(p);
    return current;
}

bool lodash_has(const lodash_map_t *obj, const char *path)
{
    return lodash_get(obj, path) != NULL;
}

lodash_map_t *lodash_invert(const lodash_map_t *obj)
{
    if (!obj) return NULL;
    lodash_map_t *res = lodash_map_new();
    for (size_t i = 0; i < obj->cap; i++) {
        lodash_map_entry_t *entry = obj->buckets[i];
        while (entry) {
            // Assuming values are strings for invert
            lodash_map_set(res, (const char *)entry->val, entry->key);
            entry = entry->next;
        }
    }
    return res;
}

lodash_map_t *lodash_invert_by(const lodash_map_t *obj, void *(*iteratee)(void *))
{
    if (!obj) return NULL;
    lodash_map_t *res = lodash_map_new();
    for (size_t i = 0; i < obj->cap; i++) {
        lodash_map_entry_t *entry = obj->buckets[i];
        while (entry) {
            void *key = iteratee ? iteratee(entry->val) : entry->val;
            lodash_map_set(res, (const char *)key, entry->key);
            entry = entry->next;
        }
    }
    return res;
}

char **lodash_keys(const lodash_map_t *obj, size_t *n)
{
    return lodash_map_keys(obj, n);
}

lodash_map_t *lodash_map_keys_by(const lodash_map_t *obj, char *(*iteratee)(const char *))
{
    if (!obj) return NULL;
    lodash_map_t *res = lodash_map_new();
    for (size_t i = 0; i < obj->cap; i++) {
        lodash_map_entry_t *entry = obj->buckets[i];
        while (entry) {
            char *new_key = iteratee(entry->key);
            lodash_map_set(res, new_key, entry->val);
            entry = entry->next;
        }
    }
    return res;
}

lodash_map_t *lodash_map_values_by(const lodash_map_t *obj, void *(*iteratee)(void *))
{
    if (!obj) return NULL;
    lodash_map_t *res = lodash_map_new();
    for (size_t i = 0; i < obj->cap; i++) {
        lodash_map_entry_t *entry = obj->buckets[i];
        while (entry) {
            void *new_val = iteratee(entry->val);
            lodash_map_set(res, entry->key, new_val);
            entry = entry->next;
        }
    }
    return res;
}

lodash_map_t *lodash_merge(lodash_map_t *obj, const lodash_map_t *src)
{
    // Shallow merge for now
    lodash_assign(obj, src);
    return obj;
}

lodash_map_t *lodash_omit(const lodash_map_t *obj, const char **paths, size_t n)
{
    if (!obj) return NULL;
    lodash_map_t *res = lodash_map_new();
    for (size_t i = 0; i < obj->cap; i++) {
        lodash_map_entry_t *entry = obj->buckets[i];
        while (entry) {
            bool found = false;
            for (size_t j = 0; j < n; j++) {
                if (strcmp(entry->key, paths[j]) == 0) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                lodash_map_set(res, entry->key, entry->val);
            }
            entry = entry->next;
        }
    }
    return res;
}

lodash_map_t *lodash_omit_by(const lodash_map_t *obj, bool (*predicate)(const char *))
{
    if (!obj || !predicate) return NULL;
    lodash_map_t *res = lodash_map_new();
    for (size_t i = 0; i < obj->cap; i++) {
        lodash_map_entry_t *entry = obj->buckets[i];
        while (entry) {
            if (!predicate(entry->key)) {
                lodash_map_set(res, entry->key, entry->val);
            }
            entry = entry->next;
        }
    }
    return res;
}

lodash_map_t *lodash_pick(const lodash_map_t *obj, const char **paths, size_t n)
{
    if (!obj) return NULL;
    lodash_map_t *res = lodash_map_new();
    for (size_t i = 0; i < n; i++) {
        if (lodash_map_has(obj, paths[i])) {
            lodash_map_set(res, paths[i], lodash_map_get(obj, paths[i]));
        }
    }
    return res;
}

lodash_map_t *lodash_pick_by(const lodash_map_t *obj, bool (*predicate)(const char *))
{
    if (!obj || !predicate) return NULL;
    lodash_map_t *res = lodash_map_new();
    for (size_t i = 0; i < obj->cap; i++) {
        lodash_map_entry_t *entry = obj->buckets[i];
        while (entry) {
            if (predicate(entry->key)) {
                lodash_map_set(res, entry->key, entry->val);
            }
            entry = entry->next;
        }
    }
    return res;
}

void lodash_set(lodash_map_t *obj, const char *path, void *val)
{
    if (!obj || !path) return;
    // Simple set for now (no deep support)
    lodash_map_set(obj, path, val);
}

void lodash_unset(lodash_map_t *obj, const char *path)
{
    if (!obj || !path) return;
    lodash_map_delete(obj, path);
}

void **lodash_values(const lodash_map_t *obj, size_t *n)
{
    return lodash_map_values(obj, n);
}
