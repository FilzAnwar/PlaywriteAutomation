
import { test, expect } from '@playwright/test'

const data = {
    email: "filzaeisha",
    username: "filzaeisha",
    password: "filzaeisha"
}

// 1. GET API TEST
test('GET API Test', async ({ request }) => {

    const response = await request.post(
        'https://api-testing-postman.vercel.app/api/v1/users/login',
        {
            data: data
        }
    )

    const tokenData = await response.json()

    console.log(tokenData)

    expect(response.status()).toBe(200)

    const token = tokenData.data.accessToken

    const GetResponse = await request.get(
        'https://api-testing-postman.vercel.app/api/v1/users/current-user',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    console.log(await GetResponse.json())
    console.log(GetResponse.status())

    expect(GetResponse.status()).toBe(200)
})


// 2. POST REGISTER API TEST
// test('POST API Test', async ({ request }) => {

//     const response = await request.post(
//         'https://api-testing-postman.vercel.app/api/v1/users/login',
//         {
//             data: data
//         }
//     )

//     const tokenData = await response.json()

//     console.log(tokenData)

//     expect(response.status()).toBe(200)

//     const token = tokenData.data.accessToken

//     const uniqueId = Date.now()

//     const POSTResponse = await request.post(
//         'https://api-testing-postman.vercel.app/api/v1/users/register',
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             },

//             data: {
//                 fullname: "FILZA",
//                 email: `filza_${uniqueId}@test.com`,
//                 username: `filza_${uniqueId}`,
//                 password: "FILZA11"
//             }
//         }
//     )

//     console.log(await POSTResponse.json())
//     console.log(POSTResponse.status())

//     expect(POSTResponse.status()).toBe(201)
// })




// // 3. PUT API TEST
// test('PUT API Test', async ({ request }) => {

//     const response = await request.post(
//         'https://api-testing-postman.vercel.app/api/v1/users/login',
//         {
//             data: data
//         }
//     )

//     const tokenData = await response.json()

//     console.log(tokenData)

//     expect(response.status()).toBe(200)

//     const token = tokenData.data.accessToken

//     const uniqueId = Date.now()

//     const PUTResponse = await request.put(
//         'https://api-testing-postman.vercel.app/api/v1/users/replace-account',
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             },

//             data: {
//                 fullname: "FILZA UPDATED",
//                 email: `filza_updated_${uniqueId}@test.com`,
//                 username: `filza_updated_${uniqueId}`,
//                 password: "FILZA11NEW"
//             }
//         }
//     )

//     console.log(await PUTResponse.json())
//     console.log(PUTResponse.status())

//     expect(PUTResponse.status()).toBe(200)
// })


// 4. POST CHNAGE PASSWORD API TEST
// test('POST Password  API Test', async ({ request }) => {

//     const response = await request.post(
//         'https://api-testing-postman.vercel.app/api/v1/users/login',
//         {
//             data: data
//         }
//     )

//     const tokenData = await response.json()

//     console.log(tokenData)

//     expect(response.status()).toBe(200)

//     const token = tokenData.data.accessToken

//     const uniqueId = Date.now()

//     const POSTPasswordResponse = await request.post(
//         'https://api-testing-postman.vercel.app/api/v1/users/change-password',
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             },

//             data: {
//                 oldPassword: "string",
//                 newPassword: "string"
//             }
//         }
//     )

//     console.log(await POSTPasswordResponse.json())
//     console.log(POSTPasswordResponse.status())

//     expect(POSTPasswordResponse.status()).toBe(200)
// })

// 5. PATCH CHNAGE PASSWORD API TEST
// test('PATCH Account Details API Test', async ({ request }) => {
//     // 1. Authenticate and retrieve token
//     const loginResponse = await request.post(
//         'https://api-testing-postman.vercel.app/api/v1/users/login',
//         {
//             data: {
//                 username: "filzaeisha",
//                 password: "filzaeisha"
//             }
//         }
//     )

//     expect(loginResponse.status()).toBe(200)
//     const tokenData = await loginResponse.json()
//     const token = tokenData.data.accessToken

//     // 2. Update account details via PATCH (requires both fullname and email)
//     const patchAccountResponse = await request.patch(
//         'https://api-testing-postman.vercel.app/api/v1/users/update-account',
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             },
//             data: {
//                 fullname: "filzaeisha",
//                 email: "filzaeisha@gmail.com" // Must provide a valid email format
//             }
//         }
//     )

//     const responseBody = await patchAccountResponse.json()
//     console.log('Response Body:', responseBody)
//     console.log('Status Code:', patchAccountResponse.status())

//     expect(patchAccountResponse.status()).toBe(200)
// })



// 5. POST LOGOUT

// test('LOGOUT est', async ({ request }) => {

//     const response = await request.post(
//         'https://api-testing-postman.vercel.app/api/v1/users/login',
//         {
//             data: data
//         }
//     )

//     const tokenData = await response.json()

//     console.log(tokenData)

//     expect(response.status()).toBe(200)

//     const token = tokenData.data.accessToken



//     const PostLogoutResponse = await request.post(
//         'https://api-testing-postman.vercel.app/api/v1/users/logout',

//         {

//             headers: {
//                 Authorization: `Bearer ${token}`,

//             },

//         }
//     )

//     console.log(await PostLogoutResponse.json())
//     console.log(PostLogoutResponse.status())

//     expect(PostLogoutResponse.status()).toBe(200)
// })



// // 6.. DELETE API TEST
// test('DELETE API Test', async ({ request }) => {

//     const response = await request.post(
//         'https://api-testing-postman.vercel.app/api/v1/users/login',
//         {
//             data: data
//         }
//     )

//     const tokenData = await response.json()

//     console.log(tokenData)

//     expect(response.status()).toBe(200)

//     const token = tokenData.data.accessToken

//     const DELETEResponse = await request.delete(
//         'https://api-testing-postman.vercel.app/api/v1/users/delete-account',
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }
//     )

//     console.log(await DELETEResponse.json())
//     console.log(DELETEResponse.status())

//     expect(DELETEResponse.status()).toBe(200)
// })

