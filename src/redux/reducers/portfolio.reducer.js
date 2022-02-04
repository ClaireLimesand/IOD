const portfolio = (state = [], action) => {
    switch (action.type) {
        case 'SET_PORTFOLIO':
            console.log('Reducer portfolio data', action.payload);
            return action.payload;
        default:
            return state;
    }
};

export default portfolio;