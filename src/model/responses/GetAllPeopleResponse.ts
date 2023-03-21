import PeopleData from '../PeopleData'
import DefaultPeopleResponse from './DefaultPeopleResponse';

export default class GetAllPeopleResponse extends DefaultPeopleResponse {
    numberOfPeople?: number;
    peopleData?: Array<PeopleData>;

}