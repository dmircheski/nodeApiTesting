import peopleApi from "../src/client/PeopleApi"
import PostNewPersonResponse from "../src/model/responses/PostNewPersonResponse"
import  endpointConfig from '../src/client/EndpointConfig'
import PostNewPersonPayload from "../src/payloads/PostNewPersonPayload"
import DefaultPeopleResponse from "../src/model/responses/DefaultPeopleResponse";
let postNewpersonPayload = new PostNewPersonPayload();
import PostNewPersonRequest from "../src/model/requests/PostNewPersonRequest"
import { StatusCodes } from 'http-status-codes'
import { ResponseStatus, ResponseMessages } from '../src/utils/TestDataEnums/ResponseTestData'
import { assert } from "chai";


let newPerson: PostNewPersonRequest = postNewpersonPayload.createNewPersonPayload();
let newPersonId: string;

describe('Testing the Delete Person endpoint', () => {

    it('Successfully deleting a person by ID', async ()  => {
        await peopleApi.post<PostNewPersonResponse>(endpointConfig.POST_SINGLE_ENDPOINT, newPerson).then((response) => {

            newPersonId = response.data.personData.id;
            assert.equal(response.status, 201)
        })

         await peopleApi.delete<DefaultPeopleResponse>(endpointConfig.DELETE_SINGLE_ENDPOINT + newPersonId).then((response) => {
            assert.equal(response.status, StatusCodes.OK)
            assert.equal(response.data.code, ResponseStatus.P200)
            assert.equal(response.data.message, 'Person with id=' + newPersonId + ' has been succesfully deleted')
         })
    })

    it('Unable to delete person with non existing ID', async ()  => {
         await peopleApi.delete<DefaultPeopleResponse>(endpointConfig.DELETE_SINGLE_ENDPOINT + '641774e39102bf0002bb0000').then((response) => {
            assert.equal(response.status, StatusCodes.NOT_FOUND)
            assert.equal(response.data.code, ResponseStatus.P404)
            assert.equal(response.data.message, 'Cannot delete Person because Id ' + '641774e39102bf0002bb0000'+'is not existant')
         })
    })
})