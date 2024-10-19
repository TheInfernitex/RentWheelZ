RentWheelZ is a Car Rental Website made with Next.js and Springboot.

To use the app, clone it to your local machine and make a file called *application.properties* inside *car-rental-backend/src/main/resources* and set the following properties:

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

Brevo is an email service. You can get your API key from [here](https://www.brevo.co/). 

Enter the API key in the *application.properties* file.

Then, open a terminal and run the following commands:

```bash
    cd car-rental-frontend
    npm install
    npm run dev
```

The frontend app will be running on http://localhost:3000

Then, open another terminal and run the following commands to start the backend server:

```bash
    cd car-rental-backend
    mvn clean install
    mvn spring-boot:run
```


***Enjoy the app! 🚗***
