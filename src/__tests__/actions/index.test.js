import * as actions from './../../actions';
import * as c from './../../actions/ActionTypes';

describe('Help Queue Actions', () => {

  test('deleteTicket should create DELETE_TICKET action', () => {
    expect(actions.deleteTicket(1)).toEqual({
      type: c.DELETE_TICKET,
      id: 1
    });
  });

  test('toggleForm should create TOGGLE_FORM action', () => {
    expect(actions.toggleForm()).toEqual({
      type: c.TOGGLE_FORM
    });
  });

  test('addTicket should create ADD_TICKET action', () => {
    expect(actions.addTicket({
      names: 'Jo & Jasmine',
      location: '3E',
      issue: 'Redux is not working because we did not use RTK.',
      id: 1
    })).toEqual({
      type: c.ADD_TICKET,
      names: 'Jo & Jasmine',
      location: '3E',
      issue: 'Redux is not working because we did not use RTK.',
      id: 1
    });
  });

});