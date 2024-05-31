import PeopleData from "../PeopleData";
import DefaultPeopleResponse from './DefaultPeopleResponse';
import UserData from '../UserData'

export default interface CreateNewUserResponse extends DefaultPeopleResponse {
    userData: UserData
}