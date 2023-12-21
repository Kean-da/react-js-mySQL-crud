export const LoginValidation = (values) => {
    let error = {
        password: ""
    };

    /*  
        Password must be 8 characters which contain atleast 
        - one numeric digit
        - one uppercase letter
        - one lowercase letter
        ex-email:       test@gmail.com
        ex-password:    Kean@123
    */
    const password_pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,8}$/;

    
    if(!password_pattern.test(values.password)) {
        error.password = "*Password is not invalid";
    }
    return error;
}