#ifndef LODASH_HPP
#define LODASH_HPP

#include <vector>
#include <string>
#include <functional>
#include <optional>
#include <map>
#include <variant>
#include <chrono>
#include <algorithm>
#include <cmath>
#include <random>
#include <regex>

namespace lodash {

// --- Date ---
int64_t now();

// --- Number ---
double clamp(double number, double lower, double upper);
bool inRange(double number, double start, double end);
double random(double lower = 0.0, double upper = 1.0, bool floating = false);

// --- Math ---
double add(double augend, double addend);
double ceil(double number, int precision = 0);
double divide(double dividend, double divisor);
double floor(double number, int precision = 0);

template <typename T>
std::optional<T> max(const std::vector<T>& array) {
    if (array.empty()) return std::nullopt;
    return *std::max_element(array.begin(), array.end());
}

template <typename T, typename R>
std::optional<T> maxBy(const std::vector<T>& array, std::function<R(T)> iteratee) {
    if (array.empty()) return std::nullopt;
    return *std::max_element(array.begin(), array.end(), [&](const T& a, const T& b) {
        return iteratee(a) < iteratee(b);
    });
}

double mean(const std::vector<double>& array);
double multiply(double multiplier, double multiplicand);
double round(double number, int precision = 0);
double subtract(double minuend, double subtrahend);
double sum(const std::vector<double>& array);

// --- Function ---
std::function<void()> after(int n, std::function<void()> func);
std::function<void()> before(int n, std::function<void()> func);
template <typename T>
std::function<bool(T)> negate(std::function<bool(T)> predicate) {
    return [predicate](T arg) { return !predicate(arg); };
}
std::function<void()> once(std::function<void()> func);

// --- Collection ---
template <typename T, typename K>
std::map<K, int> countBy(const std::vector<T>& collection, std::function<K(T)> iteratee) {
    std::map<K, int> result;
    for (const auto& item : collection) {
        result[iteratee(item)]++;
    }
    return result;
}

template <typename T>
bool every(const std::vector<T>& collection, std::function<bool(T)> predicate) {
    return std::all_of(collection.begin(), collection.end(), predicate);
}

template <typename T>
std::vector<T> filter(const std::vector<T>& collection, std::function<bool(T)> predicate) {
    std::vector<T> result;
    std::copy_if(collection.begin(), collection.end(), std::back_inserter(result), predicate);
    return result;
}

// --- String ---
std::string camelCase(const std::string& str);
std::string capitalize(const std::string& str);
std::string kebabCase(const std::string& str);
std::string lowerFirst(const std::string& str);
std::string upperFirst(const std::string& str);
std::string repeat(const std::string& str, int n = 1);
std::vector<std::string> words(const std::string& str);

// --- Util ---
template <typename T>
T identity(T value) { return value; }

std::vector<int> range(int start, int end, int step);
std::vector<int> range(int end);

// --- Array ---
template <typename T>
std::vector<std::vector<T>> chunk(const std::vector<T>& array, size_t size = 1) {
    std::vector<std::vector<T>> result;
    if (size < 1) return result;
    for (size_t i = 0; i < array.size(); i += size) {
        auto last = std::min(i + size, array.size());
        result.emplace_back(array.begin() + i, array.begin() + last);
    }
    return result;
}

template <typename T>
T head(const std::vector<T>& array) {
    return array.empty() ? T() : array.front();
}

} // namespace lodash

#endif
