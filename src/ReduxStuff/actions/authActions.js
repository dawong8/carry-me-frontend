

export const register = async(dispatch, formData) => {
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users`, {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const parsedResponse = await response.json();


    console.log('register fetch here', parsedResponse);


    if(parsedResponse !== "This email is already taken."){
        console.log('200 hHERE!!')
        dispatch({
            type: "REGISTER",
            payload: parsedResponse
        });



    }else{
        //TODO: REGISTER_FAILURE
        console.log('not 200')
        dispatch({
            type: "ERROR",
            payload: parsedResponse
        })
        // alert(parsedResponse)
    }
}


export const login = async(dispatch, formData) => {
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/login`, {
        credentials: 'include',
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const parsedResponse = await response.json();

    if(parsedResponse !== "Email/Password Incorrect"){
        console.log('login Successful', parsedResponse)
        dispatch({
          type: "LOGIN",
          payload: parsedResponse
        })
    } else {
        dispatch({
            type: "ERROR",
            payload: parsedResponse
        })
    }
}


export const logout = async(dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/login`, {
        credentials: 'include',
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    localStorage.removeItem('user')


    const parsedResponse = await response.json();
    console.log(parsedResponse)
    if (parsedResponse === "Logout Successful"){
        dispatch({
            type:"LOGOUT"
        })
    }

}




export const edit = async(dispatch, formData, id) => {
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/${id}`, {
        credentials: 'include',
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const parsedResponse = await response.json();
    console.log('success!', parsedResponse)
    dispatch({
        type:"EDIT",
        payload: parsedResponse

    })
}
