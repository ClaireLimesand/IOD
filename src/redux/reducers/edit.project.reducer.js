const projectToEdit = (state = {}, action) => {
    switch (action.type) {
        case 'SET_EDITED_PROJECT':
            return {
                id: action.payload.id,
                title: action.payload.project_name,
                description: action.payload.description,
                image: action.payload.image,
                internship_id: action.payload.internship_id,
                user_id: action.payload.user_id
            };
        case 'CHANGE_TITLE':
            return {...state, title: action.payload};
        case 'CHANGE_DESCRIPTION':
            return {...state, description: action.payload};
        case 'CHANGE_IMAGE':
            return {...state, image: action.payload};
        default:
            return state;
    }
};

export default projectToEdit;