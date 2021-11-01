import TestService from '../services/TestService';
import controller from '../shared/controller';

export default controller(TestService.getOne);
