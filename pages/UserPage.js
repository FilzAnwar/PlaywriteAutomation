export class UserPage {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   * @param {string} baseUrl
   */
  constructor(request, baseUrl) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async login(credentials) {
    console.log("======================================");
    console.log("LOGIN");
    console.log("USERNAME:", credentials.username);
    console.log("EMAIL:", credentials.email);
    console.log("======================================");

    const response = await this.request.post(`${this.baseUrl}/users/login`, {
      data: {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      },
    });

    const responseBody = await response.json();
    console.log("LOGIN RESPONSE:", responseBody);
    console.log("LOGIN STATUS:", response.status());

    return { response, responseBody };
  }

  async getCurrentUser(token) {
    const response = await this.request.get(`${this.baseUrl}/users/current-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseBody = await response.json();
    console.log("GET RESPONSE:", responseBody);
    console.log("GET STATUS:", response.status());

    return { response, responseBody };
  }

  async registerUser(token, registerData) {
    console.log("======================================");
    console.log("REGISTER");
    console.log("REGISTER DATA:", registerData);
    console.log("======================================");

    const response = await this.request.post(`${this.baseUrl}/users/register`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: registerData,
    });

    const responseBody = await response.json();
    console.log("REGISTER RESPONSE:", responseBody);
    console.log("REGISTER STATUS:", response.status());

    return { response, responseBody };
  }

  async replaceAccount(token, updateData) {
    console.log("======================================");
    console.log("PUT ACCOUNT");
    console.log("NEW USERNAME:", updateData.username);
    console.log("NEW EMAIL:", updateData.email);
    console.log("======================================");

    const response = await this.request.put(`${this.baseUrl}/users/replace-account`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: updateData,
    });

    const responseBody = await response.json();
    console.log("PUT RESPONSE:", responseBody);
    console.log("PUT STATUS:", response.status());

    return { response, responseBody };
  }

  async updateAccountDetails(token, patchData) {
    console.log("======================================");
    console.log("PATCH ACCOUNT");
    console.log("NEW EMAIL:", patchData.email);
    console.log("======================================");

    const response = await this.request.patch(`${this.baseUrl}/users/update-account`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: patchData,
    });

    const responseBody = await response.json();
    console.log("PATCH RESPONSE:", responseBody);
    console.log("PATCH STATUS:", response.status());

    return { response, responseBody };
  }

  async changePassword(token, passwordData) {
    console.log("======================================");
    console.log("CHANGE PASSWORD");
    console.log("OLD PASSWORD:", passwordData.oldPassword);
    console.log("NEW PASSWORD:", passwordData.newPassword);
    console.log("======================================");

    const response = await this.request.post(`${this.baseUrl}/users/change-password`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: passwordData,
    });

    const responseBody = await response.json();
    console.log("CHANGE PASSWORD RESPONSE:", responseBody);
    console.log("CHANGE PASSWORD STATUS:", response.status());

    return { response, responseBody };
  }

  async logout(token) {
    console.log("======================================");
    console.log("LOGOUT");
    console.log("======================================");

    const response = await this.request.post(`${this.baseUrl}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseBody = await response.json();
    console.log("LOGOUT RESPONSE:", responseBody);
    console.log("LOGOUT STATUS:", response.status());

    return { response, responseBody };
  }

  async deleteAccount(token) {
    console.log("======================================");
    console.log("DELETE ACCOUNT");
    console.log("======================================");

    const response = await this.request.delete(`${this.baseUrl}/users/delete-account`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseBody = await response.json();
    console.log("DELETE RESPONSE:", responseBody);
    console.log("DELETE STATUS:", response.status());

    return { response, responseBody };
  }
}