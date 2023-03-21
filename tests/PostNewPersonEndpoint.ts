import { assert } from "chai"
import peopleApi from "../src/client/PeopleApi"
import PostNewPersonRequest from "../src/model/requests/PostNewPersonRequest"
import PostNewPersonResponse from "../src/model/responses/PostNewPersonResponse"
import PostNewPersonPayload from "../src/payloads/PostNewPersonPayload"
import  endpointConfig from '../src/client/EndpointConfig'

let postNewPersonPayload = new PostNewPersonPayload()
let newPerson: PostNewPersonRequest = postNewPersonPayload.createNewPersonPayload();
let newPersonOneId: string;
let newPersonTwoId: string;
let newPersonThreeId: string;

describe('Testing the Post New Person endpoint', () => {

    it('Successfully posting a new person', async () => {

        await peopleApi.post<PostNewPersonResponse>('/person', newPerson).then((response) => {
            newPersonOneId = response.data.personData.id;
            assert.equal(response.status, 201)
            assert.equal(response.data.code, 'P201')
            assert.equal(response.data.message, 'Person succesfully inserted')

            assert.equal(response.data.personData.name, newPerson.name)
            assert.equal(response.data.personData.surname, newPerson.surname)
            assert.equal(response.data.personData.age, newPerson.age)
            assert.equal(response.data.personData.isEmployed, newPerson.isEmployed)
            assert.equal(response.data.personData.location, newPerson.location)
            assert.isNotNull(response.data.personData.createdAt)
            assert.isNotNull(response.data.personData.updatedAt)
            assert.isNotNull(response.data.personData.id)
        })
    })

    it('Succesfully post a new person without optional field age', async () => {
        delete newPerson['age']

        await peopleApi.post<PostNewPersonResponse>('/person', newPerson).then((response) => {
            newPersonTwoId = response.data.personData.id;
            assert.equal(response.status, 201)
            assert.equal(response.data.code, 'P201')
            assert.equal(response.data.message, 'Person succesfully inserted')
        })

    })


    it('Succesfully post a new person without optional field location', async () => {
        newPerson = postNewPersonPayload.createNewPersonPayload()
        delete newPerson['location']

        await peopleApi.post<PostNewPersonResponse>('/person', newPerson).then((response) => {
            newPersonThreeId = response.data.personData.id;
            assert.equal(response.status, 201)
            assert.equal(response.data.code, 'P201')
            assert.equal(response.data.message, 'Person succesfully inserted')
        })

    })

    it('Failed to post a new person when name field is not provided', async () => {
        newPerson = postNewPersonPayload.createNewPersonPayload()
        delete newPerson['name']

        await peopleApi.post<PostNewPersonResponse>('/person', newPerson).then((response) => {
            
            assert.equal(response.status, 400)
            assert.equal(response.data.code, 'P400')
            assert.equal(response.data.message, "Person's name cannot be empty")
        })

    })

    it('Failed to post a new person when surname field is not provided', async () => {
        newPerson = postNewPersonPayload.createNewPersonPayload()
        delete newPerson['surname']

        await peopleApi.post<PostNewPersonResponse>('/person', newPerson).then((response) => {
            
            assert.equal(response.status, 400)
            assert.equal(response.data.code, 'P400')
            assert.equal(response.data.message, "Person's surname cannot be empty")
        })

    })

    it('Failed to post a new person when isEmployed field is not provided', async () => {
        newPerson = postNewPersonPayload.createNewPersonPayload()
        delete newPerson['isEmployed']

        await peopleApi.post<PostNewPersonResponse>('/person', newPerson).then((response) => {
            
            assert.equal(response.status, 400)
            assert.equal(response.data.code, 'P400')
            assert.equal(response.data.message, "Person must provide if he is employed or not")
        })

    })

    it('Failed to post a new person when isEmployed field is an invalid type (string)', async () => {
        let newPersonInvalidPayload = postNewPersonPayload.createNewPersonPayloadInvalidTypeIsEmployed()
        

        await peopleApi.post<PostNewPersonResponse>('/person', newPersonInvalidPayload).then((response) => {
            
            assert.equal(response.status, 400)
            assert.equal(response.data.code, 'P400')
            assert.equal(response.data.message, "Person must provide if he is employed or not")
        })

    })

    it('Failed to post new person if isEmployed field is a string', async () => {
        newPerson = postNewPersonPayload.createNewPersonPayload()
        delete newPerson['isEmployed']

        await peopleApi.post<PostNewPersonResponse>('/person', newPerson).then((response) => {
            
            assert.equal(response.status, 400)
            assert.equal(response.data.code, 'P400')
            assert.equal(response.data.message, "Person must provide if he is employed or not")
        })

    })

    after( async () => {
        await peopleApi.delete(endpointConfig.DELETE_SINGLE_ENDPOINT+ newPersonOneId);
        await peopleApi.delete(endpointConfig.DELETE_SINGLE_ENDPOINT+ newPersonTwoId);
        await peopleApi.delete(endpointConfig.DELETE_SINGLE_ENDPOINT+ newPersonThreeId);
    })
})