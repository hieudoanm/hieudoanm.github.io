#include "lodash.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

void *lodash_attempt(void *(*fn)(void))
{
    if (!fn) return NULL;
    return fn();
}

void *lodash_constant(void *val)
{
    return val;
}

void *lodash_default_to(void *val, void *def)
{
    return val ? val : def;
}

void *lodash_identity(void *val)
{
    return val;
}

bool lodash_matches(const lodash_map_t *src, const lodash_map_t *obj)
{
    if (!src || !obj) return false;
    for (size_t i = 0; i < src->cap; i++) {
        lodash_map_entry_t *entry = src->buckets[i];
        while (entry) {
            void *obj_val = lodash_map_get(obj, entry->key);
            if (!obj_val || obj_val != entry->val) return false;
            entry = entry->next;
        }
    }
    return true;
}

bool lodash_matches_property(const char *key, void *val, const lodash_map_t *obj)
{
    if (!key || !obj) return false;
    void *obj_val = lodash_map_get(obj, key);
    return obj_val == val;
}

void lodash_noop(void) {}

int lodash_nth_arg(int n, int *args, size_t n_args)
{
    if (n < 0) n += n_args;
    if (n < 0 || (size_t)n >= n_args) return 0;
    return args[n];
}

lodash_array_t *lodash_range(int start, int end, int step)
{
    if (step == 0) step = (start < end) ? 1 : -1;
    size_t n = 0;
    if (step > 0 && start < end) n = (end - start + step - 1) / step;
    else if (step < 0 && start > end) n = (start - end + (-step) - 1) / (-step);
    
    lodash_array_t *arr = lodash_array_with_capacity(n);
    int curr = start;
    for (size_t i = 0; i < n; i++) {
        int *v = malloc(sizeof(int));
        *v = curr;
        lodash_array_push(arr, v);
        curr += step;
    }
    return arr;
}

lodash_array_t *lodash_range_right(int start, int end, int step)
{
    lodash_array_t *arr = lodash_range(start, end, step);
    return lodash_reverse(arr);
}

lodash_array_t *lodash_stub_array(void) { return lodash_array_new(); }
bool lodash_stub_false(void) { return false; }
lodash_map_t *lodash_stub_object(void) { return lodash_map_new(); }

char *lodash_stub_string(void)
{
    char *s = malloc(1);
    s[0] = '\0';
    return s;
}

bool lodash_stub_true(void) { return true; }

lodash_array_t *lodash_times(size_t n, void *(*iteratee)(size_t))
{
    lodash_array_t *arr = lodash_array_with_capacity(n);
    for (size_t i = 0; i < n; i++) {
        lodash_array_push(arr, iteratee ? iteratee(i) : NULL);
    }
    return arr;
}

static int unique_id_counter = 0;
char *lodash_unique_id(const char *prefix)
{
    char buf[128];
    sprintf(buf, "%s%d", prefix ? prefix : "", ++unique_id_counter);
    char *res = malloc(strlen(buf) + 1);
    strcpy(res, buf);
    return res;
}
