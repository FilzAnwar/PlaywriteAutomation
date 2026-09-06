import { test, expect } from '../fixtures/testSetup.js';
import UserPage from '../pages/UserPage.js';
import userData from '../testdata/userdata.json';
test.describe.configure({ mode: "serial" });

test.describe("User API Integration Tests", () => {
  let userPage;

  // Active state maintained in memory across sequential tests
  const dynamicCredentials = {
    username: userData.initialUser.username,
    email: userData.initialUser.email,
    password: userData.initialUser.password,
  };

  async function getAuthToken() {
    const { response, responseBody } = await userPage.login(dynamicCredentials);
    expect(
      response.status(),
      `Login failed: ${JSON.stringify(responseBody)}`
    ).toBe(200);
    return responseBody.data.accessToken;
  }

  test.beforeEach(async ({ request }) => {
    userPage = new UserPage(request, userData.baseUrl);
  });

  // 1. GET API TEST
  test("GET API Test", async () => {
    const token = await getAuthToken();
    const { response } = await userPage.getCurrentUser(token);
    expect(response.status()).toBe(200);
  });

  // 2. POST REGISTER API TEST
  test("POST Register API Test", async () => {
    const uniqueId = Date.now();
    const registerData = {
      fullname: userData.initialUser.fullname,
      email: `filza_${uniqueId}@test.com`,
      username: `filza_${uniqueId}`,
      password: userData.initialUser.password,
    };

    const token = await getAuthToken();
    const { response, responseBody } = await userPage.registerUser(token, registerData);

    expect(
      response.status(),
      `Registration failed: ${JSON.stringify(responseBody)}`
    ).toBe(201);
  });

  // 3. PUT API TEST
  test("PUT API Test", async () => {
    const token = await getAuthToken();
    const uniqueId = Date.now();

    const newUsername = `filza_updated_${uniqueId}`;
    const newEmail = `filza_updated_${uniqueId}@test.com`;

    const updateData = {
      fullname: userData.updateProfiles.putUpdate.fullname,
      email: newEmail,
      username: newUsername,
    };

    const { response, responseBody } = await userPage.replaceAccount(token, updateData);

    expect(
      response.status(),
      `PUT failed: ${JSON.stringify(responseBody)}`
    ).toBe(200);

    // Maintain updated dynamic state
    dynamicCredentials.username = newUsername;
    dynamicCredentials.email = newEmail;
  });

  // 4. PATCH ACCOUNT DETAILS API TEST
  test("PATCH Account Details API Test", async () => {
    const token = await getAuthToken();
    const patchEmail = `filza_patch_${Date.now()}@test.com`;

    const patchData = {
      fullname: userData.updateProfiles.patchUpdate.fullname,
      email: patchEmail,
    };

    const { response, responseBody } = await userPage.updateAccountDetails(token, patchData);

    expect(
      response.status(),
      `PATCH failed: ${JSON.stringify(responseBody)}`
    ).toBe(200);

    // Maintain updated dynamic state
    dynamicCredentials.email = patchEmail;
  });

  // 5. POST CHANGE PASSWORD API TEST
  test("POST Change Password API Test", async () => {
    const token = await getAuthToken();
    const oldPassword = dynamicCredentials.password;
    const newPassword = `FILZA${Date.now()}NEW`;

    const { response, responseBody } = await userPage.changePassword(token, {
      oldPassword,
      newPassword,
    });

    expect(
      response.status(),
      `Change password failed: ${JSON.stringify(responseBody)}`
    ).toBe(200);

    // Maintain updated dynamic state for next login
    dynamicCredentials.password = newPassword;
  });

  // 6. LOGOUT API TEST
  test("LOGOUT API Test", async () => {
    const token = await getAuthToken();
    const { response, responseBody } = await userPage.logout(token);

    expect(
      response.status(),
      `Logout failed: ${JSON.stringify(responseBody)}`
    ).toBe(200);
  });

  // 7. DELETE API TEST
  test("DELETE API Test", async () => {
    const token = await getAuthToken();
    const { response, responseBody } = await userPage.deleteAccount(token);

    expect(
      response.status(),
      `Delete failed: ${JSON.stringify(responseBody)}`
    ).toBe(200);

    console.log("ACCOUNT DELETED SUCCESSFULLY");
  });
});