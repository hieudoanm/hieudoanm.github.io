#include "lodash.hpp"

namespace lodash {

std::vector<int> range(int start, int end, int step) {
    std::vector<int> result;
    if (step == 0) return result;
    if (step > 0) {
        for (int i = start; i < end; i += step) result.push_back(i);
    } else {
        for (int i = start; i > end; i += step) result.push_back(i);
    }
    return result;
}

std::vector<int> range(int end) {
    return range(0, end, end >= 0 ? 1 : -1);
}

} // namespace lodash
