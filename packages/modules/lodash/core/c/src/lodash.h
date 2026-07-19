#ifndef LODASH_H
#define LODASH_H

#include <stddef.h>
#include <stdint.h>
#include <stdbool.h>

/* ─── Dynamic array of void pointers ─── */
typedef struct {
    void **data;
    size_t len;
    size_t cap;
} lodash_array_t;

lodash_array_t *lodash_array_new(void);
lodash_array_t *lodash_array_with_capacity(size_t cap);
void lodash_array_free(lodash_array_t *arr);
int lodash_array_push(lodash_array_t *arr, void *val);
void *lodash_array_get(const lodash_array_t *arr, size_t idx);
void lodash_array_set(lodash_array_t *arr, size_t idx, void *val);

/* ─── Dynamic map (string keys → void* values) ─── */
typedef struct lodash_map_entry {
    char *key;
    void *val;
    struct lodash_map_entry *next;
} lodash_map_entry_t;

typedef struct {
    lodash_map_entry_t **buckets;
    size_t cap;
    size_t len;
} lodash_map_t;

lodash_map_t *lodash_map_new(void);
void lodash_map_free(lodash_map_t *map);
int lodash_map_set(lodash_map_t *map, const char *key, void *val);
void *lodash_map_get(const lodash_map_t *map, const char *key);
int lodash_map_has(const lodash_map_t *map, const char *key);
int lodash_map_delete(lodash_map_t *map, const char *key);
char **lodash_map_keys(const lodash_map_t *map, size_t *n);
void **lodash_map_values(const lodash_map_t *map, size_t *n);

/* ─── String builder ─── */
typedef struct {
    char *buf;
    size_t len;
    size_t cap;
} lodash_str_t;

lodash_str_t *lodash_str_new(void);
void lodash_str_free(lodash_str_t *s);
int lodash_str_append(lodash_str_t *s, const char *str);
int lodash_str_append_char(lodash_str_t *s, char c);
char *lodash_str_detach(lodash_str_t *s);

/* ─── Array helpers ─── */
lodash_array_t *lodash_array_from(void **items, size_t n);
lodash_array_t *lodash_array_copy(const lodash_array_t *src);
lodash_array_t *lodash_array_clone_deep(const lodash_array_t *src);

/* ─── Array ─── */
lodash_array_t *lodash_chunk(const lodash_array_t *arr, size_t size);
lodash_array_t *lodash_compact(const lodash_array_t *arr);
lodash_array_t *lodash_concat(const lodash_array_t *arr, const lodash_array_t *values);
lodash_array_t *lodash_difference(const lodash_array_t *arr, const lodash_array_t *values);
lodash_array_t *lodash_difference_by(const lodash_array_t *arr, const lodash_array_t *values,
                                      void *(*iteratee)(void *));
lodash_array_t *lodash_difference_with(const lodash_array_t *arr, const lodash_array_t *values,
                                        int (*comparator)(const void *, const void *));
lodash_array_t *lodash_drop(const lodash_array_t *arr, size_t n);
lodash_array_t *lodash_drop_right(const lodash_array_t *arr, size_t n);
lodash_array_t *lodash_drop_right_while(const lodash_array_t *arr, int (*predicate)(void *));
lodash_array_t *lodash_drop_while(const lodash_array_t *arr, int (*predicate)(void *));
lodash_array_t *lodash_fill(const lodash_array_t *arr, void *val, size_t start, size_t end);
int lodash_find_index(const lodash_array_t *arr, int (*predicate)(void *), size_t from);
int lodash_find_last_index(const lodash_array_t *arr, int (*predicate)(void *), size_t from);
lodash_array_t *lodash_flatten(const lodash_array_t *arr);
lodash_array_t *lodash_flatten_deep(const lodash_array_t *arr);
lodash_array_t *lodash_flatten_depth(const lodash_array_t *arr, int depth);
lodash_map_t *lodash_from_pairs(const lodash_array_t *pairs);
void *lodash_head(const lodash_array_t *arr);
int lodash_index_of(const lodash_array_t *arr, void *val, size_t from);
lodash_array_t *lodash_initial(const lodash_array_t *arr);
lodash_array_t *lodash_intersection(const lodash_array_t *arrays, size_t n_arrays);
lodash_array_t *lodash_intersection_by(void *(*iteratee)(void *), const lodash_array_t *arrays, size_t n_arrays);
lodash_array_t *lodash_intersection_with(int (*comparator)(const void *, const void *),
                                          const lodash_array_t *arrays, size_t n_arrays);
char *lodash_join(const lodash_array_t *arr, const char *sep);
void *lodash_last(const lodash_array_t *arr);
int lodash_last_index_of(const lodash_array_t *arr, void *val, size_t from);
void *lodash_nth(const lodash_array_t *arr, int n);
lodash_array_t *lodash_pull(const lodash_array_t *arr, const lodash_array_t *vals);
lodash_array_t *lodash_pull_all(const lodash_array_t *arr, const lodash_array_t *vals);
lodash_array_t *lodash_pull_all_by(const lodash_array_t *arr, const lodash_array_t *vals,
                                    void *(*iteratee)(void *));
lodash_array_t *lodash_pull_all_with(const lodash_array_t *arr, const lodash_array_t *vals,
                                      int (*comparator)(const void *, const void *));
lodash_array_t *lodash_pull_at(const lodash_array_t *arr, const size_t *idxs, size_t n_idxs);
lodash_array_t *lodash_remove(const lodash_array_t *arr, int (*predicate)(void *));
lodash_array_t *lodash_reverse(const lodash_array_t *arr);
lodash_array_t *lodash_slice(const lodash_array_t *arr, int start, int end);
int lodash_sorted_index(const double *arr, size_t n, double val);
int lodash_sorted_index_by(const lodash_array_t *arr, void *val, void *(*iteratee)(void *));
int lodash_sorted_index_of(const double *arr, size_t n, double val);
int lodash_sorted_last_index(const double *arr, size_t n, double val);
int lodash_sorted_last_index_by(const lodash_array_t *arr, void *val, void *(*iteratee)(void *));
int lodash_sorted_last_index_of(const double *arr, size_t n, double val);
lodash_array_t *lodash_sorted_uniq(const double *arr, size_t n);
lodash_array_t *lodash_sorted_uniq_by(const lodash_array_t *arr, void *(*iteratee)(void *));
lodash_array_t *lodash_tail(const lodash_array_t *arr);
lodash_array_t *lodash_take(const lodash_array_t *arr, size_t n);
lodash_array_t *lodash_take_right(const lodash_array_t *arr, size_t n);
lodash_array_t *lodash_take_right_while(const lodash_array_t *arr, int (*predicate)(void *));
lodash_array_t *lodash_take_while(const lodash_array_t *arr, int (*predicate)(void *));
lodash_array_t *lodash_union(const lodash_array_t *arrays, size_t n_arrays);
lodash_array_t *lodash_union_by(void *(*iteratee)(void *), const lodash_array_t *arrays, size_t n_arrays);
lodash_array_t *lodash_union_with(int (*comparator)(const void *, const void *),
                                   const lodash_array_t *arrays, size_t n_arrays);
lodash_array_t *lodash_uniq(const lodash_array_t *arr);
lodash_array_t *lodash_uniq_by(const lodash_array_t *arr, void *(*iteratee)(void *));
lodash_array_t *lodash_uniq_with(const lodash_array_t *arr, int (*comparator)(const void *, const void *));
lodash_array_t *lodash_unzip(const lodash_array_t *arr);
lodash_array_t *lodash_unzip_with(const lodash_array_t *arr, void *(*iteratee)(void *));
lodash_array_t *lodash_without(const lodash_array_t *arr, const lodash_array_t *vals);
lodash_array_t *lodash_xor(const lodash_array_t *arrays, size_t n_arrays);
lodash_array_t *lodash_xor_by(void *(*iteratee)(void *), const lodash_array_t *arrays, size_t n_arrays);
lodash_array_t *lodash_xor_with(int (*comparator)(const void *, const void *),
                                 const lodash_array_t *arrays, size_t n_arrays);
lodash_array_t *lodash_zip(const lodash_array_t *arrays, size_t n_arrays);
lodash_map_t *lodash_zip_object(const lodash_array_t *props, const lodash_array_t *vals);
lodash_map_t *lodash_zip_object_deep(const char **props, size_t n_props, const lodash_array_t *vals);
lodash_array_t *lodash_zip_with(void *(*iteratee)(void *), const lodash_array_t *arrays, size_t n_arrays);

/* ─── Collection ─── */
lodash_map_t *lodash_count_by(const lodash_array_t *arr, void *(*iteratee)(void *));
bool lodash_every(const lodash_array_t *arr, bool (*predicate)(void *));
lodash_array_t *lodash_filter(const lodash_array_t *arr, bool (*predicate)(void *));
void *lodash_find(const lodash_array_t *arr, bool (*predicate)(void *));
void *lodash_find_last(const lodash_array_t *arr, bool (*predicate)(void *));
lodash_array_t *lodash_flat_map(const lodash_array_t *arr, lodash_array_t *(*iteratee)(void *));
lodash_array_t *lodash_flat_map_deep(const lodash_array_t *arr, lodash_array_t *(*iteratee)(void *));
lodash_array_t *lodash_flat_map_depth(const lodash_array_t *arr, lodash_array_t *(*iteratee)(void *), int depth);
void lodash_for_each(lodash_array_t *arr, void (*iteratee)(void *));
void lodash_for_each_right(lodash_array_t *arr, void (*iteratee)(void *));
lodash_map_t *lodash_group_by(const lodash_array_t *arr, void *(*iteratee)(void *));
bool lodash_includes(const lodash_array_t *arr, void *val, int from);
lodash_array_t *lodash_invoke_map(const lodash_array_t *arr, void *(*iteratee)(void *));
lodash_map_t *lodash_key_by(const lodash_array_t *arr, void *(*iteratee)(void *));
lodash_array_t *lodash_map(const lodash_array_t *arr, void *(*iteratee)(void *));
lodash_array_t *lodash_order_by(const lodash_array_t *arr, int (*cmp)(const void *, const void *),
                                  int *orders, size_t n_orders);
lodash_array_t *lodash_partition(const lodash_array_t *arr, bool (*predicate)(void *));
void *lodash_reduce(const lodash_array_t *arr, void *(*iteratee)(void *, void *), void *acc);
void *lodash_reduce_right(const lodash_array_t *arr, void *(*iteratee)(void *, void *), void *acc);
lodash_array_t *lodash_reject(const lodash_array_t *arr, bool (*predicate)(void *));
void *lodash_sample(const lodash_array_t *arr);
lodash_array_t *lodash_sample_size(const lodash_array_t *arr, size_t n);
lodash_array_t *lodash_shuffle(const lodash_array_t *arr);
size_t lodash_size(const lodash_array_t *arr);
bool lodash_some(const lodash_array_t *arr, bool (*predicate)(void *));
lodash_array_t *lodash_sort_by(const lodash_array_t *arr, int (*cmp)(const void *, const void *));

/* ─── Date ─── */
int64_t lodash_now(void);

/* ─── Function ─── */
typedef struct lodash_fn {
    void (*fn)(void);
    int remaining;
} lodash_fn_t;

void *lodash_after(int n, void (*fn)(void));
void *lodash_before(int n, void (*fn)(void));
void *lodash_curry(void (*fn)(void), int arity);
void *lodash_flip(void (*fn)(void));
void lodash_debounce(void (*fn)(void), int wait);
void *lodash_memoize(void *(*fn)(void *));
bool lodash_negate(bool (*predicate)(void *), void *arg);
void *lodash_once(void (*fn)(void));

/* ─── Lang ─── */
bool lodash_eq(void *a, void *b);
bool lodash_gt(double a, double b);
bool lodash_gte(double a, double b);
bool lodash_is_array(void *val);
bool lodash_is_boolean(int val);
bool lodash_is_empty(const lodash_array_t *arr);
bool lodash_is_equal(void *a, void *b);
bool lodash_is_finite(double val);
bool lodash_is_integer(double val);
bool lodash_is_nan(double val);
bool lodash_is_nil(void *val);
bool lodash_is_null(void *val);
bool lodash_is_number(double val);
bool lodash_is_string(const char *val);
bool lodash_is_undefined(void *val);
double lodash_to_finite(double val);
int64_t lodash_to_integer(double val);
double lodash_to_number(const char *val);
char *lodash_to_string_int(int val);
char *lodash_to_string_double(double val);

/* ─── Math ─── */
double lodash_add(double a, double b);
double lodash_ceil(double n, int precision);
double lodash_divide(double a, double b);
double lodash_floor(double n, int precision);
double lodash_max(const double *arr, size_t n);
double lodash_mean(const double *arr, size_t n);
double lodash_min(const double *arr, size_t n);
double lodash_multiply(double a, double b);
double lodash_round(double n, int precision);
double lodash_subtract(double a, double b);
double lodash_sum(const double *arr, size_t n);

/* ─── Number ─── */
double lodash_clamp(double n, double lower, double upper);
bool lodash_in_range(double n, double start, double end);
double lodash_random(double lower, double upper, bool floating);

/* ─── Object ─── */
void lodash_assign(lodash_map_t *obj, const lodash_map_t *src);
lodash_array_t *lodash_at(const lodash_map_t *obj, const char **paths, size_t n);
void lodash_defaults(lodash_map_t *obj, const lodash_map_t *src);
char *lodash_find_key(const lodash_map_t *obj, bool (*predicate)(void *));
void lodash_for_in(const lodash_map_t *obj, void (*iteratee)(const char *, void *));
void lodash_for_own(const lodash_map_t *obj, void (*iteratee)(const char *, void *));
void *lodash_get(const lodash_map_t *obj, const char *path);
bool lodash_has(const lodash_map_t *obj, const char *path);
lodash_map_t *lodash_invert(const lodash_map_t *obj);
lodash_map_t *lodash_invert_by(const lodash_map_t *obj, void *(*iteratee)(void *));
char **lodash_keys(const lodash_map_t *obj, size_t *n);
lodash_map_t *lodash_map_keys_by(const lodash_map_t *obj, char *(*iteratee)(const char *));
lodash_map_t *lodash_map_values_by(const lodash_map_t *obj, void *(*iteratee)(void *));
lodash_map_t *lodash_merge(lodash_map_t *obj, const lodash_map_t *src);
lodash_map_t *lodash_omit(const lodash_map_t *obj, const char **paths, size_t n);
lodash_map_t *lodash_omit_by(const lodash_map_t *obj, bool (*predicate)(const char *));
lodash_map_t *lodash_pick(const lodash_map_t *obj, const char **paths, size_t n);
lodash_map_t *lodash_pick_by(const lodash_map_t *obj, bool (*predicate)(const char *));
void lodash_set(lodash_map_t *obj, const char *path, void *val);
void lodash_unset(lodash_map_t *obj, const char *path);
void **lodash_values(const lodash_map_t *obj, size_t *n);

/* ─── Seq ─── */
void *lodash_chain(void *val);
void *lodash_tap(void *val, void (*interceptor)(void *));
void *lodash_thru(void *val, void *(*interceptor)(void *));

/* ─── String ─── */
char *lodash_camel_case(const char *str);
char *lodash_capitalize(const char *str);
char *lodash_deburr(const char *str);
char *lodash_escape(const char *str);
char *lodash_escape_regexp(const char *str);
char *lodash_kebab_case(const char *str);
char *lodash_lower_case(const char *str);
char *lodash_lower_first(const char *str);
char *lodash_pad(const char *str, size_t len, const char *chars);
char *lodash_pad_end(const char *str, size_t len, const char *chars);
char *lodash_pad_start(const char *str, size_t len, const char *chars);
int lodash_parse_int(const char *str, int radix);
char *lodash_repeat(const char *str, size_t n);
char *lodash_replace(const char *str, const char *pattern, const char *replacement);
char *lodash_snake_case(const char *str);
lodash_array_t *lodash_split(const char *str, const char *sep, size_t limit);
char *lodash_start_case(const char *str);
char *lodash_template(const char *tmpl, const lodash_map_t *data);
char *lodash_to_lower(const char *str);
char *lodash_to_upper(const char *str);
char *lodash_truncate(const char *str, size_t len, const char *omission);
char *lodash_unescape(const char *str);
char *lodash_upper_case(const char *str);
char *lodash_upper_first(const char *str);
lodash_array_t *lodash_words(const char *str);

/* ─── Util ─── */
void *lodash_attempt(void *(*fn)(void));
void *lodash_constant(void *val);
void *lodash_default_to(void *val, void *def);
void *lodash_identity(void *val);
bool lodash_matches(const lodash_map_t *src, const lodash_map_t *obj);
bool lodash_matches_property(const char *key, void *val, const lodash_map_t *obj);
void lodash_noop(void);
int lodash_nth_arg(int n, int *args, size_t n_args);
lodash_array_t *lodash_range(int start, int end, int step);
lodash_array_t *lodash_range_right(int start, int end, int step);
lodash_array_t *lodash_stub_array(void);
bool lodash_stub_false(void);
lodash_map_t *lodash_stub_object(void);
char *lodash_stub_string(void);
bool lodash_stub_true(void);
lodash_array_t *lodash_times(size_t n, void *(*iteratee)(size_t));
char *lodash_unique_id(const char *prefix);

#endif /* LODASH_H */
