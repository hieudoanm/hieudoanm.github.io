FROM gcc:14-alpine AS builder

WORKDIR /app

COPY src/ src/

RUN c++ -Wall -Wextra -pedantic -std=c++17 -lpthread -o /app/kv src/main.cpp

FROM scratch

COPY --from=builder /app/kv /kv

EXPOSE 6379

ENTRYPOINT ["/kv"]
