const spectrum = (state = [], action) => {
    switch (action.type) {
        case 'SET_SPECTRUMPORT':
            console.log('Reducer portfolio data', action.payload);
            return action.payload;
        default:
            return state;
    }
};

export default spectrum;