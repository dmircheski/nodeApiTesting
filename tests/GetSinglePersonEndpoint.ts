import peopleApi from "../src/client/PeopleApi"
import PostNewPersonPayload from "../src/payloads/PostNewPersonPayload"
import PostNewPersonRequest from "../src/model/requests/PostNewPersonRequest"
import PostNewPersonResponse from "../src/model/responses/PostNewPersonResponse"
import GetPersonResponse from "../src/model/responses/GetPersonResponse"
import endpointConfig from '../src/client/EndpointConfig'
import { assert } from "chai";
import { StatusCodes } from 'http-status-codes'
import { ResponseStatus, ResponseMessages } from '../src/utils/TestDataEnums/ResponseTestData'
import EndpointConfig from "../src/client/EndpointConfig"

let postNewpersonPayload = new PostNewPersonPayload();
let newPerson: PostNewPersonRequest = postNewpersonPayload.createNewPersonPayload();
let newPersonId: string;

describe('Testing the Get Single Person endpoint', () => {

    before(async () => {
        await peopleApi.post<PostNewPersonResponse>(endpointConfig.POST_SINGLE_ENDPOINT, newPerson).then((response) => {

            newPersonId = response.data.personData.id;
            assert.equal(response.status, 201)
        })
    })

    it('Successfully fetching a single person by ID', async () => {
        await peopleApi.get<GetPersonResponse>(endpointConfig.GET_SINGLE_ENDPOINT + newPersonId).then((response) => {

            assert.equal(response.status, StatusCodes.OK)
            assert.equal(response.data.code, ResponseStatus.P200)
            assert.equal(response.data.message, ResponseMessages.PERSON_SUCCESSFULLY_FETCHED)

            assert.equal(response.data.person.name, newPerson.name)
            assert.equal(response.data.person.surname, newPerson.surname)
            assert.equal(response.data.person.age, newPerson.age)
            assert.equal(response.data.person.isEmployed, newPerson.isEmployed)
            assert.equal(response.data.person.location, newPerson.location)
            assert.isNotNull(response.data.person.createdAt)
            assert.isNotNull(response.data.person.updatedAt)
            assert.isNotNull(response.data.person.id)
        })
    })

    it('Failed to fetch a person with NON existing ID', async () => {
        await peopleApi.get(EndpointConfig.GET_SINGLE_ENDPOINT + '641774e39102bf0002bb0000').then((response) => {
            assert.equal(response.status, StatusCodes.NOT_FOUND)
            assert.equal(response.data.code, ResponseStatus.P404)
            assert.equal(response.data.message, 'Person with id 641774e39102bf0002bb0000 not found')

        })
    })

    after(async () => {
        await peopleApi.delete(endpointConfig.DELETE_SINGLE_ENDPOINT + newPersonId);
    })
})