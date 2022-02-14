const editInternship = ( state = {}, action) => {
    if (action.type === 'SET_INTERNSHIP_TO_EDIT'){
        return {
            id: action.payload.id,
            name: action.payload.company_name,
            subtitle: action.payload.company_subtitle,
            description: action.payload.company_description,
            start_date: action.payload.start_date,
            end_date: action.payload.end_date,
        }
    } else if (action.type === 'EDIT_INTERNSHIP_NAME') {
        return { ...state, name: action.payload }
    } else if (action.type === 'EDIT_INTERNSHIP_SUBTITLE') {
        return { ...state, subtitle: action.payload }
    } else if (action.type === 'EDIT_INTERNSHIP_DESCRIPTION') {
        return { ...state, description: action.payload }
    } else if (action.type === 'EDIT_INTERNSHIP_START_DATE') {
        return { ...state, start_date: action.payload }
    } else if (action.type === 'EDIT_INTERNSHIP_END_DATE') {
        return { ...state, end_date: action.payload }
    } 
    return state;
}

export default editInternship;