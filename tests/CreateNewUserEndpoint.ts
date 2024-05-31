import { assert } from "chai"
import authApi  from "../src/client/AuthApi"
import CreateNewUserResponse from "../src/model/responses/CreateNewUserResponse"
import authApiEndpointConfig from '../src/client/AuthApiEndpointConfig'
import CreateNewUserPayload from "../src/payloads/CreateNewUserPayload"
import CreateNewPersonRequest from "../src/model/requests/CreateNewUserRequest"

let newUserPayload = new CreateNewUserPayload();
let newUser: CreateNewPersonRequest = newUserPayload.createNewUserPayload();

describe('Testing the Create New User eendpoint', () => {

    it('Succesfully creating a new user', async () => {
        await authApi.post<CreateNewUserResponse>(authApiEndpointConfig.SIGN_IN_ENDPOINT, newUser).then((response) =>  {
            assert.equal(response.status, 201)
            assert.equal(response.data.code, 'A201')
            assert.equal(response.data.message, 'User succesfully created and stored in database !')
        })
    })
})