FROM golang:1.26 AS builder
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/bin/api ./cmd/api

FROM gcr.io/distroless/static-debian12
WORKDIR /app
COPY --from=builder /app/bin/api ./api

EXPOSE 3002
ENTRYPOINT ["./api"]
