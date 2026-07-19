#include "lodash.h"
#include <math.h>

double lodash_add(double a, double b)
{
    return a + b;
}

double lodash_ceil(double n, int precision)
{
    double p = pow(10.0, precision);
    return ceil(n * p) / p;
}

double lodash_divide(double a, double b)
{
    return a / b;
}

double lodash_floor(double n, int precision)
{
    double p = pow(10.0, precision);
    return floor(n * p) / p;
}

double lodash_max(const double *arr, size_t n)
{
    if (n == 0) return -INFINITY;
    double v = arr[0];
    for (size_t i = 1; i < n; i++) {
        if (arr[i] > v) v = arr[i];
    }
    return v;
}

double lodash_mean(const double *arr, size_t n)
{
    if (n == 0) return NAN;
    double s = 0.0;
    for (size_t i = 0; i < n; i++) {
        s += arr[i];
    }
    return s / n;
}

double lodash_min(const double *arr, size_t n)
{
    if (n == 0) return INFINITY;
    double v = arr[0];
    for (size_t i = 1; i < n; i++) {
        if (arr[i] < v) v = arr[i];
    }
    return v;
}

double lodash_multiply(double a, double b)
{
    return a * b;
}

double lodash_round(double n, int precision)
{
    double p = pow(10.0, precision);
    return round(n * p) / p;
}

double lodash_subtract(double a, double b)
{
    return a - b;
}

double lodash_sum(const double *arr, size_t n)
{
    double s = 0.0;
    for (size_t i = 0; i < n; i++) {
        s += arr[i];
    }
    return s;
}
