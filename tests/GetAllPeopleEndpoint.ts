import { assert } from 'chai';
import peopleApi from '../src/client/PeopleApi';
import GetAllPeopleResponse from '../src/model/responses/GetAllPeopleResponse';
import  endpointConfig from '../src/client/EndpointConfig'
import { StatusCodes } from 'http-status-codes'
import { ResponseStatus, ResponseMessages } from '../src/utils/TestDataEnums/ResponseTestData'


    describe('Testing Get All People endpoint', () => {
        
        it('Get all people succesfull fetch', async () => {
            await peopleApi.get<GetAllPeopleResponse>(endpointConfig.GET_ALL_ENDPOINT).then((response) => {
                
                assert.equal(response.status, StatusCodes.OK)
                assert.equal(response.data.code, ResponseStatus.P200)
                assert.equal(response.data.message, ResponseMessages.PEOPLE_SUCCESSFULLY_FETCHED)
                assert.isNotNull(response.data.numberOfPeople)
                assert.isNotNull(response.data.peopleData?.length)
            })
        })

        it('Test if number of people field is counting correctly', async () => {
            await peopleApi.get<GetAllPeopleResponse>(endpointConfig.GET_ALL_ENDPOINT).then((response) => {

                assert.equal(response.status, 200)
                assert.equal(response.data.peopleData?.length, response.data.numberOfPeople)
            })
        })
    })