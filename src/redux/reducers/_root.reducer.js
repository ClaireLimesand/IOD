import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import skills from './skills.reducer';
import internshipReducer from './internship.reducer';
import profile from './profile.reducer';
import editSkill from './edit.skill.reducer';
import announcements from './announcements.reducer';
import students from './students.reducer';
import portfolio from './portfolio.reducer';
import editInternship from './edit.internship.reducer';
import applicationsReducer from './applications.reducer';
import categories from './categories.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  skills,
  internshipReducer,
  profile,
  editSkill,
  announcements,
  students,
  portfolio,
  editInternship,
  applicationsReducer,
  categories
});

export default rootReducer;
