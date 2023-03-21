
export default class PostNewPersonPayload {
    createNewPersonPayload() {
        const newPerson = { 
            name: 'Zlatan',
            surname: 'Ibrahimovic',
            age: 41,
            isEmployed: true,
            location: 'Milano'
        }
        return newPerson;
    }

    createNewPersonPayloadInvalidTypeIsEmployed() {
        const newPersonInvalidTypeIsEmployed = { 
            name: 'Zlatan',
            surname: 'Ibrahimovic',
            age: 41,
            isEmployed: 'this is a string',
            location: 'Milano'
        }
        return newPersonInvalidTypeIsEmployed;
    }
}