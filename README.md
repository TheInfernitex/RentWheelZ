# RentWheelZ is a Car Rental Website made with Next.js and Springboot. 


# [Current Status: Milestone 3 Ongoing..]

# Features Implemented: 
- Dynamic Landing Page with sleek animations
- Smooth User flow from Signup to login
- Forgot Password functionality with a 24/7 email service
- Profile Page with Dynamic Data Fetching and Updation
- Delete Account with a single click
- See available Vehicles
- Searching and Filtering
- Book a vehicle using Dynamic Calendar without worry of overlaps
- Seamlessly View the bookings in profile page
- jwt validation for all sensitive apis

# Future updates:
- Feedbacks and Ratings
- Admin dashboard for adding vehicles and analytics
- Payment System
- Deployment and testing


# Run it on your machine:


Brevo is an email service whose API key can be generated [here](https://www.brevo.com/).

To use the app, clone it to your local machine and enter your brevo API key in *application.properties*:
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
    
    brevo.api.key=*ENTER_BREVO_API_KEY_HERE*
    
    spring.security.user.name=user
    spring.security.user.password=12345678
```


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
    ./mvnw clean install
    ./mvnw spring-boot:run

```


***Enjoy the app! 🚗***
