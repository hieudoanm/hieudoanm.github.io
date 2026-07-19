#include "lodash.h"

void *lodash_chain(void *val)
{
    return val;
}

void *lodash_tap(void *val, void (*interceptor)(void *))
{
    if (interceptor) interceptor(val);
    return val;
}

void *lodash_thru(void *val, void *(*interceptor)(void *))
{
    if (interceptor) return interceptor(val);
    return val;
}
