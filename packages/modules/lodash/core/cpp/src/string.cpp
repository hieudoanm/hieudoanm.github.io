#include "lodash.hpp"

namespace lodash {

std::string camelCase(const std::string& str) {
    auto w = words(str);
    std::string result;
    for (size_t i = 0; i < w.size(); ++i) {
        std::string s = w[i];
        std::transform(s.begin(), s.end(), s.begin(), ::tolower);
        if (i > 0) {
            s[0] = std::toupper(s[0]);
        }
        result += s;
    }
    return result;
}

std::string capitalize(const std::string& str) {
    if (str.empty()) return "";
    std::string result = str;
    std::transform(result.begin(), result.end(), result.begin(), ::tolower);
    result[0] = std::toupper(result[0]);
    return result;
}

std::string kebabCase(const std::string& str) {
    auto w = words(str);
    std::string result;
    for (size_t i = 0; i < w.size(); ++i) {
        std::string s = w[i];
        std::transform(s.begin(), s.end(), s.begin(), ::tolower);
        if (i > 0) result += "-";
        result += s;
    }
    return result;
}

std::string lowerFirst(const std::string& str) {
    if (str.empty()) return "";
    std::string result = str;
    result[0] = std::tolower(result[0]);
    return result;
}

std::string upperFirst(const std::string& str) {
    if (str.empty()) return "";
    std::string result = str;
    result[0] = std::toupper(result[0]);
    return result;
}

std::string repeat(const std::string& str, int n) {
    std::string result;
    for (int i = 0; i < n; ++i) result += str;
    return result;
}

std::vector<std::string> words(const std::string& str) {
    std::vector<std::string> result;
    std::regex re("[a-zA-Z0-9]+");
    std::sregex_iterator next(str.begin(), str.end(), re);
    std::sregex_iterator end;
    while (next != end) {
        result.push_back(next->str());
        ++next;
    }
    return result;
}

} // namespace lodash
