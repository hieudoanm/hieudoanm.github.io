FROM gcc:14-alpine AS builder

WORKDIR /app

COPY src/ src/

RUN cc -Wall -Wextra -pedantic -std=c11 -lpthread -o /app/kv src/main.c

FROM scratch

COPY --from=builder /app/kv /kv

EXPOSE 6379

ENTRYPOINT ["/kv"]
