const favoriteProject = (state = {}, action) => {
    switch (action.type) {
        case 'SET_FAVORITE_PROJECT':
            console.log('Reducer favProject data', action.payload);
            return action.payload;
        default:
            return state;
    }
};

export default favoriteProject;