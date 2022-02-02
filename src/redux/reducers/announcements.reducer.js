const announcements = (state = [], action) => {
    switch (action.type) {
        case 'SET_ANNOUNCEMENTS':
            return action.payload;
        default:
            return state;
    }
};

export default announcements;