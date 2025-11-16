# Workshop Roadmap Backend: Simple API + Frontend Integration

> Goal: Build a basic backend with `GET all` and `POST` routes, test them with Postman, then connect them to the frontend via `useGameLoop.ts` (`sendUserData`). 

> TO RUN THE PROJECT: docker compose up (for Linux in needed `sudo docker compose up or sudo docker compose --build`)



---

## 0. Setup & Test Data

- Brief explanation of the existing project structure
    - Manually add **one test user** to the database ( direct insert) to make sure the `GET all` endpoint returns something.
  - Then:
    - Create the `POST` endpoint and use it to create the first user live.
    - This will be tested with Postman and then made to work from the frontend

---

## 1. Backend Part 1 – First DB Schema

**Objective:** Create the database structure for a `User` collection.

Steps:
1. Define the schema fields:
   - `name` (string, required)
   - `score` (number, required)
2. Export the model for use in controllers.

---

## 2. Backend Part 2 – "Get All" Controller

**Objective:** Implement a controller function that returns all users.

Steps:
1. Implement `getAllUsers`:
   - Query the DB.
   - Handle success: return JSON array.
   - Handle errors: return proper status + error message.

---

## 3. Backend Part 3 – Router for "Get All"

**Objective:** Expose the controller via an API route.

Steps:
1. Add a route:
   - for `getAllUsers` controller

---

## 4. Test "Get All" with Postman

**Objective:** Validate that the backend is working.

Steps:
1. Open Postman.
2. Create a new request.
3. Send the request and verify:
   - 200 OK response.
   - Response body: list of users.


---

## 5. Backend Part 4 – "Post" Router + Controller

**Objective:** Allow clients to add new users to the database.

Steps:
1. In `userController`:
   - Implement `createUser`:
     - Read data from `req.body` ( `name`, `score`).
     - Validate required fields.
     - Create and save new user in DB.
     - Return created user with proper HTTP status 200.
2. In `userRoutes`:
   - Add route `set-user`

---

## 6. Test "Post" with Postman

**Objective:** Confirm that creation works and integrates with the `GET` endpoint.

Steps:
1. In Postman, create a new request:
2. Send the request and verify:
   - 201 Created (or 200 OK) response.
   - Response body: created user object.
3. Re-run `GET /api/users`:
   - Verify the new user appears in the list.

---

## 7. Frontend Integration – `useGameLoop.ts` (`sendUserData`)

**Objective:** Connect the frontend to the backend API.

Context:
- There is a custom hook `useGameLoop.ts` with a function `sendUserData`.
- This function should send the user data from the game to the backend `POST` endpoint.

Steps:
1. Open `useGameLoop.ts` and locate or create `sendUserData`.
2. Live-code with the group:
   - Implement the request using `fetch`:
     - URL: 
     - Method: 
     - Headers: `Content-Type: application/json`
     - Body: JSON with the user’s data.
3. Code together

---

## 8. Recap and Q&A

- Summarize what was built:
  - DB model.
  - `GET all` controller + route.
  - `POST` controller + route.
  - Postman tests.
  - Frontend `sendUserData` integration.
