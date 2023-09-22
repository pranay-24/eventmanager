

const initialState = {
isOpen : false

}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'openModal':
        return {
          ...state,
          isOpen: true, // Use a colon (:) instead of an equal sign (=) to assign a value
        };
      case 'closeModal':
        return {
          ...state,
          isOpen: false, // Use a colon (:) instead of an equal sign (=) to assign a value
        };
      default:
        return state;
    }
  };