const initialState = {
    events: [],
    selectedEvent: null,
  };
  
  const eventReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_EVENT':
        return {
          ...state,
          events: [...state.events, action.payload],
        };
      case 'SELECT_EVENT':
        return {
          ...state,
          selectedEvent: action.payload,
        };
      case 'UPDATE_EVENT':
        // Implement logic to update an event
        return state;
      case 'DELETE_EVENT':
        // Implement logic to delete an event
        return state;
      default:
        return state;
    }
  };
  
  export default eventReducer;