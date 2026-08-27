FROM node:22-alpine AS frontend-build
WORKDIR /workspace
COPY package.json package-lock.json ./
RUN npm ci
COPY index.html vite.config.js ./
COPY public ./public
COPY src ./src
RUN npm run build

FROM eclipse-temurin:21-jdk-alpine AS backend-build
WORKDIR /workspace/backend
COPY backend/mvnw backend/mvnw.cmd backend/pom.xml ./
COPY backend/.mvn ./.mvn
RUN chmod +x mvnw && ./mvnw dependency:go-offline -DskipTests
COPY backend/src ./src
COPY --from=frontend-build /workspace/dist ./src/main/resources/static
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN addgroup -S portfolio && adduser -S portfolio -G portfolio \
    && mkdir -p /app/uploads && chown -R portfolio:portfolio /app
COPY --from=backend-build /workspace/backend/target/portfolio-api-*.jar /app/app.jar
COPY --chown=portfolio:portfolio backend/uploads/ /app/uploads/
USER portfolio
ENV SPRING_PROFILES_ACTIVE=postgres
ENV PORTFOLIO_UPLOAD_DIR=/app/uploads
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
