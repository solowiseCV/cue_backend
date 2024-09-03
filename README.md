

# Cue API Documentation

## Overview
Welcome to the Cue API! We're thrilled you're here. Cue is your gateway to a seamless, all-in-one travel experience, and our API is the tool that lets you bring that experience to your users. Whether you're building an app to book flights, secure accommodations, or explore hidden gems around the world, Cue API makes it easy.

Base URL
All API requests should be made to the following endpoint:

```
https://api.cue.ng/v1/
```

Authentication

### Endpoints

1. User Management
Everything you need to manage your users—creating profiles, updating details, and more.

- Create User
  - Endpoint: `/users`
  - Method:`POST`
  - Purpose:Register a new user on Cue.ng.
  - **Request Body Example:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword",
      "name": "Jane Doe"
    }
    ```
  - Sample Response:
    ```json
    {
      "user_id": "abc123",
      "message": "User created successfully"
    }
    ```

- Get User Profile
  - Endpoint: `/users/{user_id}`
  - Method: `GET`
  - Purpose: Fetch detailed information about a specific user.
  - Sample Response:
    ```json
    {
      "user_id": "abc123",
      "name": "Jane Doe",
      "email": "user@example.com",
      "travel_preferences": ["adventure", "luxury"]
    }
    ```

- Update User Profile
  - Endpoint: `/users/{user_id}`
  - Method: `PUT`
  - Purpose:Update user details like name and travel preferences.
  - Request Body Example:
    ```json
    {
      "name": "Jane Doe",
      "travel_preferences": ["beach", "culture"]
    }
    ```
  - Sample Response:
    ```json
    {
      "message": "User profile updated successfully"
    }
    ```

2. Booking Management
Handle bookings with ease—whether it's flights, hotels, or events.

- Search Flights
  - Endpoint:`/flights/search`
  - Method:`GET`
  - Purpose: Find available flights based on user criteria.
  - Query Parameters:
    - `origin` (string) – e.g., "Lagos"
    - `destination` (string) – e.g., "London"
    - `departure_date` (date) – e.g., "2024-10-01"
    - `return_date` (date, optional) – e.g., "2024-10-10"
  - Sample Response:
    ```json
    {
      "flights": [
        {
          "flight_id": "XYZ123",
          "airline": "Cue Airlines",
          "price": 75000,
          "departure_time": "2024-10-01T08:00:00Z",
          "arrival_time": "2024-10-01T12:00:00Z"
        }
      ]
    }
    ```

- Book Hotel
  - Endpoint:`/hotels/book`
  - Method: `POST`
  - Purpose: Book a hotel stay directly through Cue
  - Request Body Example:
    ```json
    {
      "user_id": "abc123",
      "hotel_id": "xyz456",
      "check_in": "2024-10-01",
      "check_out": "2024-10-05"
    }
    ```
  - **Sample Response:**
    ```json
    {
      "booking_id": "booking789",
      "message": "Hotel booked successfully"
    }
    ```

3. Travel Guides & Recommendations
Provide your users with personalized travel insights and recommendations.

- Get Local Travel Guide
  - Endpoint: `/guides/local`
  - Method: `GET`
  - Purpose: Retrieve travel tips and must-see spots for a specific location.
  - Query Parameters:
    - `location` (string) – e.g., "New York"
  - Sample Response:
    ```json
    {
      "location": "New York",
      "highlights": ["Statue of Liberty", "Central Park"],
      "restaurants": ["Le Bernardin", "Joe's Pizza"]
    }
    ```

- Personalized Recommendations
  - Endpoint:`/recommendations`
  - Method: `GET`
  - Purpose: Offer tailored travel suggestions based on user preferences.
  - Query Parameters:
    - `user_id` (string) – e.g., "abc123"
  - Sample Response:
    ```json
    {
      "recommendations": [
        {
          "type": "event",
          "name": "Broadway Show",
          "location": "New York",
          "date": "2024-10-02"
        }
      ]
    }
    ```

Error Handling
Things don't always go as planned. When something goes wrong, our API will return an error code along with a message to help you diagnose the issue.

- Sample Error Response:
  ```json
  {
    "error_code": "400",
    "message": "Bad Request - Check your parameters"
  }
  ```

## Rate Limits
We like to keep things fair. That’s why we have rate limits in place:

- Standard Rate Limit:1000 requests per day
- Exceeded Rate Limit Response:
  ```json
  {
    "error_code": "429",
    "message": "Rate limit exceeded - Please try again later"
  }
  ```

### Support
Need a hand? We're here to help. Reach out to us at [support@cue.ng](mailto:support@cue.ng) for any questions or assistance.
