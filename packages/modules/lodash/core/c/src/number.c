#include "lodash.h"
#include <stdlib.h>
#include <math.h>

double lodash_clamp(double n, double lower, double upper)
{
    if (n < lower) return lower;
    if (n > upper) return upper;
    return n;
}

bool lodash_in_range(double n, double start, double end)
{
    if (start > end) {
        double tmp = start;
        start = end;
        end = tmp;
    }
    return n >= start && n < end;
}

double lodash_random(double lower, double upper, bool floating)
{
    if (lower > upper) {
        double tmp = lower;
        lower = upper;
        upper = tmp;
    }

    double r = (double)rand() / (double)RAND_MAX;
    double res = lower + r * (upper - lower);

    if (!floating) {
        return floor(res);
    }
    return res;
}
