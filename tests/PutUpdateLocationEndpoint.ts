
import { assert } from "chai"
import peopleApi from "../src/client/PeopleApi"
import PostNewPersonRequest from "../src/model/requests/PostNewPersonRequest"
import PostNewPersonResponse from "../src/model/responses/PostNewPersonResponse"
import PutUpdateLocationResponse from "../src/model/responses/PutUpdateLocationResponse"
import PostNewPersonPayload from "../src/payloads/PostNewPersonPayload"
import UpdatePersonLocationPayload from "../src/payloads/UpdatePersonLocationPayload"
import  endpointConfig from '../src/client/PeopleApiEndpointConfig'
import { ResponseMessages, ResponseStatus } from "../src/utils/TestDataEnums/ResponseTestData"
import { StatusCodes } from "http-status-codes"

let postNewPersonPayload = new PostNewPersonPayload()
let updatePersonLocationPayload = new UpdatePersonLocationPayload()
let newPerson: PostNewPersonRequest = postNewPersonPayload.createNewPersonPayload()
let newLocationForPerson: PostNewPersonRequest = updatePersonLocationPayload.createUpdatePersonLocationPayload();
let newLocationWithoutValue: PostNewPersonRequest = updatePersonLocationPayload.createUpdatePersonLocationWithNoValuePayload();

let newPersonId: string;

describe('Testing the PUT Update person`s location endpoint', () => {

    before ( async () => {
        await peopleApi.post<PostNewPersonResponse>(endpointConfig.POST_SINGLE_ENDPOINT, newPerson).then((response) => {

            newPersonId = response.data.personData.id;
            assert.equal(response.status, 201)

            console.log(newLocationForPerson)
        })
    })

    it('Update person`s location', async () => {
        await peopleApi.put<PutUpdateLocationResponse>(endpointConfig.PUT_SINGLE_ENDPOINT + newPersonId, newLocationForPerson).then((response) => {

            assert.equal(response.status, StatusCodes.OK)
            assert.equal(response.data.code, ResponseStatus.P200)
            assert.equal(response.data.message, ResponseMessages.PERSONS_LOCATION_SUCCESSFULLY_UPDATED)
            assert.notEqual(response.data.person.location, newPerson.location)
        })
    })

    it('Failed to update person with not existend ID', async () => {
        await peopleApi.put<PutUpdateLocationResponse>(endpointConfig.PUT_SINGLE_ENDPOINT + newPersonId, newLocationForPerson).then((response) => {

            assert.equal(response.status, StatusCodes.OK)
            assert.equal(response.data.code, ResponseStatus.P200)
            assert.equal(response.data.message, ResponseMessages.PERSONS_LOCATION_SUCCESSFULLY_UPDATED)
            assert.notEqual(response.data.person.location, newPerson.location)
        })
    })

    it('Failed to update person when location field is missing or set to null', async () => {
        await peopleApi.put<PutUpdateLocationResponse>(endpointConfig.PUT_SINGLE_ENDPOINT + '641774e39102bf0002bb0000', newLocationWithoutValue).then((response) => {
            
            assert.equal(response.status, StatusCodes.BAD_REQUEST)
            assert.equal(response.data.code, ResponseStatus.P400)
            assert.equal(response.data.message, ResponseMessages.PERSONS_LOCATION_MISSING_IN_PAYLOAD)
        })
    })

    it('Failed to update person when payload is empty', async () => {
        await peopleApi.put<PutUpdateLocationResponse>(endpointConfig.PUT_SINGLE_ENDPOINT + '641774e39102bf0002bb0000', ).then((response) => {

            assert.equal(response.status, StatusCodes.BAD_REQUEST)
            assert.equal(response.data.code, ResponseStatus.P400)
            assert.equal(response.data.message, ResponseMessages.REQUEST_BODY_CANNOT_BE_EMPTY)
        })
    })

    after( async () => {
        await peopleApi.delete(endpointConfig.DELETE_SINGLE_ENDPOINT+ newPersonId);
    })
})