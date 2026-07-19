#include "lodash.hpp"
#include <numeric>

namespace lodash {

double add(double augend, double addend) {
    return augend + addend;
}

double ceil(double number, int precision) {
    double factor = std::pow(10, precision);
    return std::ceil(number * factor) / factor;
}

double divide(double dividend, double divisor) {
    return dividend / divisor;
}

double floor(double number, int precision) {
    double factor = std::pow(10, precision);
    return std::floor(number * factor) / factor;
}

double mean(const std::vector<double>& array) {
    if (array.empty()) return std::nan("");
    return std::accumulate(array.begin(), array.end(), 0.0) / array.size();
}

double multiply(double multiplier, double multiplicand) {
    return multiplier * multiplicand;
}

double round(double number, int precision) {
    double factor = std::pow(10, precision);
    return std::round(number * factor) / factor;
}

double subtract(double minuend, double subtrahend) {
    return minuend - subtrahend;
}

double sum(const std::vector<double>& array) {
    return std::accumulate(array.begin(), array.end(), 0.0);
}

} // namespace lodash
