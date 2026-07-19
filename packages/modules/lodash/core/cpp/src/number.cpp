#include "lodash.hpp"

namespace lodash {

double clamp(double number, double lower, double upper) {
    return std::max(lower, std::min(number, upper));
}

bool inRange(double number, double start, double end) {
    if (start > end) {
        std::swap(start, end);
    }
    return number >= start && number < end;
}

double random(double lower, double upper, bool floating) {
    if (lower > upper) {
        std::swap(lower, upper);
    }
    
    static std::random_device rd;
    static std::mt19937 gen(rd());
    
    if (floating || std::fmod(lower, 1.0) != 0.0 || std::fmod(upper, 1.0) != 0.0) {
        std::uniform_real_distribution<> dis(lower, upper);
        return dis(gen);
    } else {
        std::uniform_int_distribution<long long> dis(static_cast<long long>(lower), static_cast<long long>(upper));
        return static_cast<double>(dis(gen));
    }
}

} // namespace lodash
