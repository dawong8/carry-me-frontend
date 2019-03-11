const initialState = {
    loggedIn: false,
    currentUser: {
        'id': '',
        'username': '', 
        'email': '', 
        'description': '',
        'fortnite': '',
        'fortnite_platform': '',
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
                'fortnite': '',
                'fortnite_platform': '',
            }
          }

        default:
            return state;
    }
}
export default authReducer;