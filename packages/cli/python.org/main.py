import argparse
import uuid


def generate_uuid(count: int):
    """Generate and print UUIDs."""
    for _ in range(count):
        print(uuid.uuid4())


def main():
    parser = argparse.ArgumentParser(
        prog="uuidcli", description="A simple CLI tool to generate UUIDs"
    )

    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # UUID subcommand
    uuid_parser = subparsers.add_parser("uuid", help="Generate UUIDs")
    uuid_parser.add_argument(
        "-c",
        "--count",
        type=int,
        default=1,
        help="Number of UUIDs to generate (default: 1)",
    )

    args = parser.parse_args()

    if args.command == "uuid":
        generate_uuid(args.count)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
