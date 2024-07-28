FROM golang:1.22-alpine as builder
ARG CGO_ENABLED=0
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download
COPY . .

COPY . .

RUN go build -o /todo-list-backend

FROM scratch
COPY --from=builder /todo-list-backend /todo-list-backend
ENTRYPOINT [ "/todo-list-backend" ]