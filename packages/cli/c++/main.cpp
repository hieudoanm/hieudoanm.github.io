#include <iostream>
#include <string>
#include <vector>
#include <random>
#include <sstream>

void help() {
    std::cout << "Available commands:\n";
    std::cout << "  help  Display this help message\n";
    std::cout << "  uuid  Generate UUID\n";
    std::cout << "  exit  Exit the CLI\n";
}

std::string generate_uuid() {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<int> dist(0, 15);

    std::stringstream ss;
    for (int i = 0; i < 32; ++i) {
        ss << std::hex << dist(gen);
        if (i == 7 || i == 11 || i == 15 || i == 19) ss << "-";
    }
    return ss.str();
}

int main(int argc, char* argv[]) {
    std::string command;

    // Show welcome message
    std::cout << "Welcome to the CLI application. Type 'help' for a list of commands.\n";

    while (true) {
        // Prompt for input
        std::cout << "> ";
        std::getline(std::cin, command);

        // Handle the 'help' command
        if (command == "help") {
            help();
        }
        // Handle the 'exit' command
        else if (command == "exit") {
            std::cout << "Exiting the CLI. Goodbye!\n";
            break;
        }
        // Handle the 'greet' command
        else if (command == "uuid") { // Check if the command starts with 'greet'
            std::string uuid = generate_uuid();
            std::cout << uuid << "\n";
        }
        // Handle unknown commands
        else {
            std::cout << "Unknown command. Type 'help' for a list of commands.\n";
        }
    }

    return 0;
}
