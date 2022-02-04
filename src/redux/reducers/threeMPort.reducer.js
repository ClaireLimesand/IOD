const threeM = (state = [], action) => {
    switch (action.type) {
        case 'SET_THREEMPORT':
            console.log('Reducer portfolio data', action.payload);
            return action.payload;
        default:
            return state;
    }
};

export default threeM;