export default class CreateNewUserPayload {
    createNewUserPayload() {
        const newUser = { 
            username: 'TestUsername',
            password: '123456',
            adminRole: true
        }
        return newUser;
    }
}