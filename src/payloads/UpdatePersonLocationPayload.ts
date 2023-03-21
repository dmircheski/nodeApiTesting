export default class UpdatePersonLocationPayload {

    createUpdatePersonLocationPayload() {
        const newLocation = {
            location: 'Barcelona'
        } 
        return newLocation;
    }

    createUpdatePersonLocationWithNoValuePayload() {
        const newLocationEmpty = {
            location: ''
        }
        return newLocationEmpty;
    }
    
}