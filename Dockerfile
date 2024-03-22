FROM --platform=linux/amd64 openjdk:21
EXPOSE 8080
ADD backend/target/SupermarketSimBrowsergame.jar SupermarketSimBrowsergame.jar
ENTRYPOINT ["java", "-jar", "SupermarketSimBrowsergame.jar"]