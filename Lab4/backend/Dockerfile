# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-oracle

# Set the working directory in the container
WORKDIR /usr/app

# Copy the JAR file into the container at /usr/app
COPY app.jar .

EXPOSE 8080

# Run the JAR file
CMD ["java", "-jar", "app.jar"]