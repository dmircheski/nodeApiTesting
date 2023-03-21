 export const enum ResponseStatus {
    P200 = 'P200',
    P201 = 'P201',
    P400 = 'P400',
    P404 = 'P404'
}


export const enum ResponseMessages {
    PERSON_SUCCESSFULLY_INSERTED = 'Person succesfully inserted',
    PEOPLE_SUCCESSFULLY_FETCHED = 'List of people successfully fetched',
    PERSON_SUCCESSFULLY_FETCHED = 'Person succesfully fetched',
    PERSONS_LOCATION_SUCCESSFULLY_UPDATED = 'Person\'s location succesfully updated !',
    PERSONS_LOCATION_MISSING_IN_PAYLOAD = 'Person\'s location must be provided to be updated !',
    REQUEST_BODY_CANNOT_BE_EMPTY = 'Request body cannot be empty'

}