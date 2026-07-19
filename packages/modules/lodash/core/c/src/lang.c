#include "lodash.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <math.h>
#include <float.h>
#include <errno.h>

bool lodash_eq(void *a, void *b)
{
    return a == b;
}

bool lodash_gt(double a, double b)
{
    return a > b;
}

bool lodash_gte(double a, double b)
{
    return a >= b;
}

bool lodash_is_array(void *val)
{
    return val != NULL;
}

bool lodash_is_boolean(int val)
{
    return val == 0 || val == 1;
}

bool lodash_is_empty(const lodash_array_t *arr)
{
    return arr == NULL || arr->len == 0;
}

bool lodash_is_equal(void *a, void *b)
{
    return a == b;
}

bool lodash_is_finite(double val)
{
    return isfinite(val);
}

bool lodash_is_integer(double val)
{
    return isfinite(val) && trunc(val) == val;
}

bool lodash_is_nan(double val)
{
    return isnan(val);
}

bool lodash_is_nil(void *val)
{
    return val == NULL;
}

bool lodash_is_null(void *val)
{
    return val == NULL;
}

bool lodash_is_number(double val)
{
    (void)val;
    return true;
}

bool lodash_is_string(const char *val)
{
    return val != NULL;
}

bool lodash_is_undefined(void *val)
{
    return val == NULL;
}

double lodash_to_finite(double val)
{
    if (isnan(val)) return 0.0;
    if (isinf(val)) return val > 0.0 ? DBL_MAX : -DBL_MAX;
    return val;
}

int64_t lodash_to_integer(double val)
{
    if (isnan(val)) return 0;
    if (isinf(val)) return val > 0.0 ? INT64_MAX : INT64_MIN;
    return (int64_t)trunc(val);
}

double lodash_to_number(const char *val)
{
    if (val == NULL || *val == '\0') return 0.0;
    char *end = NULL;
    double v = strtod(val, &end);
    if (end == val) return 0.0;
    return v;
}

char *lodash_to_string_int(int val)
{
    char buf[32];
    int n = snprintf(buf, sizeof(buf), "%d", val);
    if (n < 0) return NULL;
    char *s = malloc((size_t)n + 1);
    if (!s) return NULL;
    memcpy(s, buf, (size_t)n + 1);
    return s;
}

char *lodash_to_string_double(double val)
{
    char buf[64];
    int n = snprintf(buf, sizeof(buf), "%g", val);
    if (n < 0) return NULL;
    char *s = malloc((size_t)n + 1);
    if (!s) return NULL;
    memcpy(s, buf, (size_t)n + 1);
    return s;
}
