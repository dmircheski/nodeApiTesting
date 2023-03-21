import PeopleData from "../PeopleData";
import DefaultPeopleResponse from "./DefaultPeopleResponse";

export default interface PutUpdateLocationResponse extends DefaultPeopleResponse {
    person: PeopleData
}