const editSkill = ( state = {}, action) => {
    if (action.type === 'SET_SKILL_TO_EDIT'){
        return {
            id: action.payload.id,
            skill: action.payload.skill,
            user_id: action.payload.user_id
        }
    } else if (action.type === 'EDIT_SKILL_NAME') {
        return { ...state, skill: action.payload }
    }
    return state;
}

export default editSkill;