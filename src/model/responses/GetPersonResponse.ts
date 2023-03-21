import PeopleData from "../PeopleData";
import DefaultPeopleResponse from './DefaultPeopleResponse';

export default interface GetPersonResponse extends DefaultPeopleResponse {
    person: PeopleData
}