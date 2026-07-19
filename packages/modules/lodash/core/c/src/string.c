#include "lodash.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdio.h>

static char *lodash_strdup(const char *s)
{
    if (!s) return NULL;
    size_t n = strlen(s) + 1;
    char *d = malloc(n);
    if (d) memcpy(d, s, n);
    return d;
}

char *lodash_capitalize(const char *str)
{
    if (!str) return NULL;
    char *res = lodash_to_lower(str);
    if (res[0]) res[0] = toupper(res[0]);
    return res;
}

char *lodash_lower_first(const char *str)
{
    if (!str) return NULL;
    char *res = lodash_strdup(str);
    if (res[0]) res[0] = tolower(res[0]);
    return res;
}

char *lodash_upper_first(const char *str)
{
    if (!str) return NULL;
    char *res = lodash_strdup(str);
    if (res[0]) res[0] = toupper(res[0]);
    return res;
}

char *lodash_to_lower(const char *str)
{
    if (!str) return NULL;
    char *res = lodash_strdup(str);
    for (int i = 0; res[i]; i++) res[i] = tolower(res[i]);
    return res;
}

char *lodash_to_upper(const char *str)
{
    if (!str) return NULL;
    char *res = lodash_strdup(str);
    for (int i = 0; res[i]; i++) res[i] = toupper(res[i]);
    return res;
}

char *lodash_repeat(const char *str, size_t n)
{
    if (!str) return NULL;
    size_t len = strlen(str);
    char *res = malloc(len * n + 1);
    char *p = res;
    for (size_t i = 0; i < n; i++) {
        memcpy(p, str, len);
        p += len;
    }
    *p = '\0';
    return res;
}

char *lodash_escape(const char *str)
{
    if (!str) return NULL;
    lodash_str_t *sb = lodash_str_new();
    while (*str) {
        switch (*str) {
            case '&': lodash_str_append(sb, "&amp;"); break;
            case '<': lodash_str_append(sb, "&lt;"); break;
            case '>': lodash_str_append(sb, "&gt;"); break;
            case '"': lodash_str_append(sb, "&quot;"); break;
            case '\'': lodash_str_append(sb, "&#39;"); break;
            default: lodash_str_append_char(sb, *str); break;
        }
        str++;
    }
    char *res = lodash_str_detach(sb);
    lodash_str_free(sb);
    return res;
}

char *lodash_unescape(const char *str)
{
    if (!str) return NULL;
    lodash_str_t *sb = lodash_str_new();
    while (*str) {
        if (strncmp(str, "&amp;", 5) == 0) { lodash_str_append_char(sb, '&'); str += 5; }
        else if (strncmp(str, "&lt;", 4) == 0) { lodash_str_append_char(sb, '<'); str += 4; }
        else if (strncmp(str, "&gt;", 4) == 0) { lodash_str_append_char(sb, '>'); str += 4; }
        else if (strncmp(str, "&quot;", 6) == 0) { lodash_str_append_char(sb, '"'); str += 6; }
        else if (strncmp(str, "&#39;", 5) == 0) { lodash_str_append_char(sb, '\''); str += 5; }
        else { lodash_str_append_char(sb, *str++); }
    }
    char *res = lodash_str_detach(sb);
    lodash_str_free(sb);
    return res;
}

lodash_array_t *lodash_words(const char *str)
{
    lodash_array_t *arr = lodash_array_new();
    if (!str) return arr;
    const char *p = str;
    while (*p) {
        while (*p && !isalnum(*p)) p++;
        if (!*p) break;
        const char *start = p;
        while (*p && isalnum(*p)) p++;
        size_t len = p - start;
        char *word = malloc(len + 1);
        memcpy(word, start, len);
        word[len] = '\0';
        lodash_array_push(arr, word);
    }
    return arr;
}

char *lodash_camel_case(const char *str)
{
    lodash_array_t *words = lodash_words(str);
    lodash_str_t *sb = lodash_str_new();
    for (size_t i = 0; i < words->len; i++) {
        char *w = lodash_to_lower((char *)words->data[i]);
        if (i == 0) {
            lodash_str_append(sb, w);
        } else {
            w[0] = toupper(w[0]);
            lodash_str_append(sb, w);
        }
        free(w);
    }
    // Note: words themselves should be freed if we wanted full cleanup
    char *res = lodash_str_detach(sb);
    lodash_str_free(sb);
    lodash_array_free(words);
    return res;
}

char *lodash_kebab_case(const char *str)
{
    lodash_array_t *words = lodash_words(str);
    lodash_str_t *sb = lodash_str_new();
    for (size_t i = 0; i < words->len; i++) {
        char *w = lodash_to_lower((char *)words->data[i]);
        if (i > 0) lodash_str_append_char(sb, '-');
        lodash_str_append(sb, w);
        free(w);
    }
    char *res = lodash_str_detach(sb);
    lodash_str_free(sb);
    lodash_array_free(words);
    return res;
}

char *lodash_snake_case(const char *str)
{
    lodash_array_t *words = lodash_words(str);
    lodash_str_t *sb = lodash_str_new();
    for (size_t i = 0; i < words->len; i++) {
        char *w = lodash_to_lower((char *)words->data[i]);
        if (i > 0) lodash_str_append_char(sb, '_');
        lodash_str_append(sb, w);
        free(w);
    }
    char *res = lodash_str_detach(sb);
    lodash_str_free(sb);
    lodash_array_free(words);
    return res;
}

char *lodash_lower_case(const char *str)
{
    lodash_array_t *words = lodash_words(str);
    lodash_str_t *sb = lodash_str_new();
    for (size_t i = 0; i < words->len; i++) {
        char *w = lodash_to_lower((char *)words->data[i]);
        if (i > 0) lodash_str_append_char(sb, ' ');
        lodash_str_append(sb, w);
        free(w);
    }
    char *res = lodash_str_detach(sb);
    lodash_str_free(sb);
    lodash_array_free(words);
    return res;
}

char *lodash_upper_case(const char *str)
{
    lodash_array_t *words = lodash_words(str);
    lodash_str_t *sb = lodash_str_new();
    for (size_t i = 0; i < words->len; i++) {
        char *w = lodash_to_upper((char *)words->data[i]);
        if (i > 0) lodash_str_append_char(sb, ' ');
        lodash_str_append(sb, w);
        free(w);
    }
    char *res = lodash_str_detach(sb);
    lodash_str_free(sb);
    lodash_array_free(words);
    return res;
}

char *lodash_start_case(const char *str)
{
    lodash_array_t *words = lodash_words(str);
    lodash_str_t *sb = lodash_str_new();
    for (size_t i = 0; i < words->len; i++) {
        char *w = lodash_to_lower((char *)words->data[i]);
        w[0] = toupper(w[0]);
        if (i > 0) lodash_str_append_char(sb, ' ');
        lodash_str_append(sb, w);
        free(w);
    }
    char *res = lodash_str_detach(sb);
    lodash_str_free(sb);
    lodash_array_free(words);
    return res;
}

int lodash_parse_int(const char *str, int radix)
{
    if (!str) return 0;
    return (int)strtol(str, NULL, radix);
}

lodash_array_t *lodash_split(const char *str, const char *sep, size_t limit)
{
    lodash_array_t *arr = lodash_array_new();
    if (!str) return arr;
    char *s = lodash_strdup(str);
    char *saveptr;
    char *token = strtok_r(s, sep, &saveptr);
    size_t count = 0;
    while (token && (limit == 0 || count < limit)) {
        lodash_array_push(arr, lodash_strdup(token));
        token = strtok_r(NULL, sep, &saveptr);
        count++;
    }
    free(s);
    return arr;
}

char *lodash_truncate(const char *str, size_t len, const char *omission)
{
    if (!str) return NULL;
    size_t str_len = strlen(str);
    if (str_len <= len) return lodash_strdup(str);
    const char *om = omission ? omission : "...";
    size_t om_len = strlen(om);
    if (len < om_len) return lodash_strdup(om);
    char *res = malloc(len + 1);
    memcpy(res, str, len - om_len);
    memcpy(res + len - om_len, om, om_len);
    res[len] = '\0';
    return res;
}

char *lodash_pad(const char *str, size_t len, const char *chars)
{
    if (!str) return NULL;
    size_t s_len = strlen(str);
    if (s_len >= len) return lodash_strdup(str);
    size_t diff = len - s_len;
    size_t left = diff / 2;
    size_t right = diff - left;
    char *res = malloc(len + 1);
    const char *c = (chars && *chars) ? chars : " ";
    size_t c_len = strlen(c);
    for (size_t i = 0; i < left; i++) res[i] = c[i % c_len];
    memcpy(res + left, str, s_len);
    for (size_t i = 0; i < right; i++) res[left + s_len + i] = c[i % c_len];
    res[len] = '\0';
    return res;
}

char *lodash_pad_start(const char *str, size_t len, const char *chars)
{
    if (!str) return NULL;
    size_t s_len = strlen(str);
    if (s_len >= len) return lodash_strdup(str);
    size_t diff = len - s_len;
    char *res = malloc(len + 1);
    const char *c = (chars && *chars) ? chars : " ";
    size_t c_len = strlen(c);
    for (size_t i = 0; i < diff; i++) res[i] = c[i % c_len];
    memcpy(res + diff, str, s_len);
    res[len] = '\0';
    return res;
}

char *lodash_pad_end(const char *str, size_t len, const char *chars)
{
    if (!str) return NULL;
    size_t s_len = strlen(str);
    if (s_len >= len) return lodash_strdup(str);
    size_t diff = len - s_len;
    char *res = malloc(len + 1);
    const char *c = (chars && *chars) ? chars : " ";
    size_t c_len = strlen(c);
    memcpy(res, str, s_len);
    for (size_t i = 0; i < diff; i++) res[s_len + i] = c[i % c_len];
    res[len] = '\0';
    return res;
}

char *lodash_replace(const char *str, const char *pattern, const char *replacement)
{
    if (!str || !pattern || !replacement) return lodash_strdup(str);
    char *pos = strstr(str, pattern);
    if (!pos) return lodash_strdup(str);
    size_t p_len = strlen(pattern);
    size_t r_len = strlen(replacement);
    size_t s_len = strlen(str);
    char *res = malloc(s_len - p_len + r_len + 1);
    size_t head_len = pos - str;
    memcpy(res, str, head_len);
    memcpy(res + head_len, replacement, r_len);
    strcpy(res + head_len + r_len, pos + p_len);
    return res;
}

char *lodash_deburr(const char *str) { return lodash_strdup(str); }
char *lodash_escape_regexp(const char *str) { return lodash_strdup(str); }
char *lodash_template(const char *tmpl, const lodash_map_t *data)
{
    (void)data;
    return lodash_strdup(tmpl);
}
