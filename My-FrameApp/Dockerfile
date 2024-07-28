FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY My-FrameApp/My-FrameApp.csproj .
RUN dotnet restore My-FrameApp.csproj

COPY My-FrameApp/. .
RUN dotnet build My-FrameApp.csproj -c Release -o /app/build

FROM build AS publish
RUN dotnet publish My-FrameApp.csproj -c Release -o /app/publish

FROM nginx:alpine AS final
WORKDIR /usr/share/nginx/html

COPY --from=publish /app/publish/wwwroot .
COPY nginx.conf /etc/nginx/nginx.conf