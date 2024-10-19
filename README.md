RentWheelZ is a Car Rental Website made with Next.js and Springboot.

To use the app, clone it to your local machine and run the following commands:

```bash
    cd car-rental-frontend
    npm install
    npm run dev
```

The app will be running on http://localhost:3000

then, use the following commands to run the backend:

```bash
    cd car-rental-backend
    mvn clean install
```

make a file called *application.properties* inside *car-rental-backend/src/main/resources* and set the following properties:

```properties
    spring.application.name=car-rental-backend


    # H2 Database Configuration
    spring.h2.console.enabled=true
    spring.datasource.url=jdbc:h2:file:./data/auctionbazar;
    spring.datasource.driverClassName=org.h2.Driver
    spring.datasource.username=sa
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
    server.port=8081
    
    brevo.api.key=ENTER BREVO API KEY HERE
    
    spring.security.user.name=user
    spring.security.user.password=12345678
```

Then run the following command:

```bash
    mvn spring-boot:run
```

