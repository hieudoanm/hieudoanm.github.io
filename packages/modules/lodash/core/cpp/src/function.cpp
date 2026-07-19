#include "lodash.hpp"

namespace lodash {

std::function<void()> after(int n, std::function<void()> func) {
    auto count = std::make_shared<int>(0);
    return [n, func, count]() {
        if (++(*count) >= n) {
            func();
        }
    };
}

std::function<void()> before(int n, std::function<void()> func) {
    auto count = std::make_shared<int>(0);
    return [n, func, count]() {
        if (++(*count) < n) {
            func();
        }
    };
}

std::function<void()> once(std::function<void()> func) {
    auto called = std::make_shared<bool>(false);
    return [func, called]() {
        if (!(*called)) {
            *called = true;
            func();
        }
    };
}

} // namespace lodash
