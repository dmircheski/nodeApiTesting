import PeopleData from "../PeopleData";
import DefaultPeopleResponse from './DefaultPeopleResponse';

export default interface PostNewPersonResponse extends DefaultPeopleResponse {
    personData: PeopleData
}