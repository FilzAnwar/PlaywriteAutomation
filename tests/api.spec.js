
import { test, expect } from "@playwright/test";

const BASE_URL = "https://api-testing-postman.vercel.app/api/v1";

// =====================================================
// TEST USER
// =====================================================

const TEST_USER = {
  fullname: "FILZA",
  username: "filzaeisha2026",
  email: "filzaeisha2026@test.com",
  password: "FILZA11",
};

// Current credentials used throughout the test flow
let credentials = {
  username: TEST_USER.username,
  email: TEST_USER.email,
  password: TEST_USER.password,
};

let authToken = null;

// =====================================================
// REUSABLE LOGIN FUNCTION
// =====================================================

async function login(request) {
  console.log("======================================");
  console.log("LOGIN");
  console.log("USERNAME:", credentials.username);
  console.log("EMAIL:", credentials.email);
  console.log("PASSWORD:", credentials.password);
  console.log("======================================");

  const loginResponse = await request.post(`${BASE_URL}/users/login`, {
    data: {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    },
  });

  const responseBody = await loginResponse.json();

  console.log("LOGIN RESPONSE:", responseBody);
  console.log("LOGIN STATUS:", loginResponse.status());

  expect(
    loginResponse.status(),
    `Login failed: ${JSON.stringify(responseBody)}`
  ).toBe(200);

  authToken = responseBody.data.accessToken;

  return authToken;
}

// =====================================================
// TESTS MUST RUN IN SEQUENCE
// =====================================================

test.describe.configure({ mode: "serial" });

// =====================================================
// 1. GET API TEST
// =====================================================

test("GET API Test", async ({ request }) => {
  const token = await login(request);

  const getResponse = await request.get(
    `${BASE_URL}/users/current-user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const responseBody = await getResponse.json();

  console.log("GET RESPONSE:", responseBody);
  console.log("GET STATUS:", getResponse.status());

  expect(getResponse.status()).toBe(200);
});

// =====================================================
// 2. POST REGISTER API TEST
// =====================================================

test("POST Register API Test", async ({ request }) => {
  /*
   * Create a completely unique user.
   *
   * This test does NOT modify our main login credentials.
   */

  const uniqueId = Date.now();

  const registerData = {
    fullname: "FILZA",
    email: `filza_${uniqueId}@test.com`,
    username: `filza_${uniqueId}`,
    password: "FILZA11",
  };

  console.log("======================================");
  console.log("REGISTER");
  console.log("REGISTER DATA:", registerData);
  console.log("======================================");

  /*
   * Registration endpoint in this API may require
   * authentication. Therefore we first login using
   * the main test account.
   */

  const token = await login(request);

  const registerResponse = await request.post(
    `${BASE_URL}/users/register`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      data: registerData,
    }
  );

  const responseBody = await registerResponse.json();

  console.log("REGISTER RESPONSE:", responseBody);
  console.log("REGISTER STATUS:", registerResponse.status());

  expect(
    registerResponse.status(),
    `Registration failed: ${JSON.stringify(responseBody)}`
  ).toBe(201);
});

// =====================================================
// 3. PUT API TEST
// =====================================================

test("PUT API Test", async ({ request }) => {
  const token = await login(request);

  const uniqueId = Date.now();

  const newUsername = `filza_updated_${uniqueId}`;
  const newEmail = `filza_updated_${uniqueId}@test.com`;

  console.log("======================================");
  console.log("PUT ACCOUNT");
  console.log("NEW USERNAME:", newUsername);
  console.log("NEW EMAIL:", newEmail);
  console.log("======================================");

  const putResponse = await request.put(
    `${BASE_URL}/users/replace-account`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      data: {
        fullname: "FILZA UPDATED",
        email: newEmail,
        username: newUsername,
      },
    }
  );

  const responseBody = await putResponse.json();

  console.log("PUT RESPONSE:", responseBody);
  console.log("PUT STATUS:", putResponse.status());

  expect(
    putResponse.status(),
    `PUT failed: ${JSON.stringify(responseBody)}`
  ).toBe(200);

  /*
   * PUT changes username + email.
   *
   * Password is NOT changed by PUT.
   */

  credentials.username = newUsername;
  credentials.email = newEmail;

  console.log("UPDATED USERNAME:", credentials.username);
  console.log("UPDATED EMAIL:", credentials.email);
  console.log("PASSWORD REMAINS:", credentials.password);
});

// =====================================================
// 4. PATCH ACCOUNT DETAILS API TEST
// =====================================================

test("PATCH Account Details API Test", async ({ request }) => {
  const token = await login(request);

  const patchEmail = `filza_patch_${Date.now()}@test.com`;

  console.log("======================================");
  console.log("PATCH ACCOUNT");
  console.log("NEW EMAIL:", patchEmail);
  console.log("======================================");

  const patchResponse = await request.patch(
    `${BASE_URL}/users/update-account`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      data: {
        fullname: "FILZA UPDATED AGAIN",
        email: patchEmail,
      },
    }
  );

  const responseBody = await patchResponse.json();

  console.log("PATCH RESPONSE:", responseBody);
  console.log("PATCH STATUS:", patchResponse.status());

  expect(
    patchResponse.status(),
    `PATCH failed: ${JSON.stringify(responseBody)}`
  ).toBe(200);

  /*
   * PATCH changes email only.
   */

  credentials.email = patchEmail;

  console.log("PATCH EMAIL SAVED:", credentials.email);
});

// =====================================================
// 5. POST CHANGE PASSWORD API TEST
// =====================================================

test("POST Change Password API Test", async ({ request }) => {
  const token = await login(request);

  const oldPassword = credentials.password;
  const newPassword = `FILZA${Date.now()}NEW`;

  console.log("======================================");
  console.log("CHANGE PASSWORD");
  console.log("OLD PASSWORD:", oldPassword);
  console.log("NEW PASSWORD:", newPassword);
  console.log("======================================");

  const changePasswordResponse = await request.post(
    `${BASE_URL}/users/change-password`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      data: {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
    }
  );

  const responseBody = await changePasswordResponse.json();

  console.log(
    "CHANGE PASSWORD RESPONSE:",
    responseBody
  );

  console.log(
    "CHANGE PASSWORD STATUS:",
    changePasswordResponse.status()
  );

  expect(
    changePasswordResponse.status(),
    `Change password failed: ${JSON.stringify(responseBody)}`
  ).toBe(200);

  /*
   * Save the new password so the next login
   * uses the correct password.
   */

  credentials.password = newPassword;

  console.log(
    "NEW PASSWORD SAVED:",
    credentials.password
  );
});

// =====================================================
// 6. LOGOUT API TEST
// =====================================================

test("LOGOUT API Test", async ({ request }) => {
  const token = await login(request);

  console.log("======================================");
  console.log("LOGOUT");
  console.log("======================================");

  const logoutResponse = await request.post(
    `${BASE_URL}/users/logout`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const responseBody = await logoutResponse.json();

  console.log("LOGOUT RESPONSE:", responseBody);
  console.log("LOGOUT STATUS:", logoutResponse.status());

  expect(
    logoutResponse.status(),
    `Logout failed: ${JSON.stringify(responseBody)}`
  ).toBe(200);
});

// =====================================================
// 7. DELETE API TEST
// =====================================================

test("DELETE API Test", async ({ request }) => {
  const token = await login(request);

  console.log("======================================");
  console.log("DELETE ACCOUNT");
  console.log("USERNAME:", credentials.username);
  console.log("EMAIL:", credentials.email);
  console.log("======================================");

  const deleteResponse = await request.delete(
    `${BASE_URL}/users/delete-account`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const responseBody = await deleteResponse.json();

  console.log("DELETE RESPONSE:", responseBody);
  console.log("DELETE STATUS:", deleteResponse.status());

  expect(
    deleteResponse.status(),
    `Delete failed: ${JSON.stringify(responseBody)}`
  ).toBe(200);

  console.log("ACCOUNT DELETED SUCCESSFULLY");
});

