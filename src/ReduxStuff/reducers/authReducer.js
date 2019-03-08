const initialState = {
    loggedIn: false,
    currentUser: {
        'id': '',
        'username': '', 
        'email': '', 
        'description': '',
        'apex': '',
        'apex_platform': '',
        'overwatch': '',
        'overwatch_platform': '',
        'fortnite': '',
        'fortnite_overwatch': '',
    }, 
    fromWhere: '',
    error: ''

}


const authReducer = (state = initialState, action) => {
    switch(action.type){
        case "ERROR": 
            return{
                error: action.payload
            }
        case "REGISTER":
            return{
                ...state,
                loggedIn: true,
                currentUser: action.payload,
                fromWhere: 'register',
                error: '',
            }
        case "LOGIN":
          return{
                ...state,
                loggedIn: true,
                currentUser: action.payload,
                fromWhere: 'login',
                error: '',
          }
        case "EDIT": 
            return{
                ...state, 
                currentUser: action.payload,
                error: '',
            }
        case "LOGOUT":
          return {
            loggedIn: false,
            error: '',
            currentUser: {
                'id': '',
                'username': '', 
                'email': '', 
                'description': '',
                'apex': '',
                'apex_platform': '',
                'overwatch': '',
                'overwatch_platform': '',
                'fortnite': '',
                'fortnite_overwatch': '',
            }
          }

        default:
            return state
    }
}
export default authReducer;