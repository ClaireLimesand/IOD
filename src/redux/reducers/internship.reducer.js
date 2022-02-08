  const internshipReducer = (state = [], action) => {
    switch (action.type) {
            case 'SET_INTERNSHIPS':
                    return action.payload;
            default:
                    return state;
            }
    };

  
export default internshipReducer;
  