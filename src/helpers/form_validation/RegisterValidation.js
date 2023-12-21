export const RegisterValidation = (values) => {
    let error = {
        full_name         : "",
        phone_number      : "",
        password          : "",
        confirm_password  : "",
    };

    /*  
        Password must be 8 characters which contain atleast 
        - one numeric digit
        - one uppercase letter
        - one lowercase letter
        ex: Kean@22
    */
    const letters = /^[A-Za-z]+$/;
    if(!values.full_name.replace(" ", "").match(letters)) {
        error.full_name = "*Full name is not valid";
    }

    const numbers = /^[0-9]+$/;
    if(!values.phone_number.match(numbers) || values.phone_number.length != 11) {
        error.phone_number = "*Phone number is not valid and phone number must be 11 numbers";
    }

    const password_pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,8}$/;
    if(!password_pattern.test(values.password)) {
        error.password = "*Password is not valid";
    }

    if(values.password != values.confirm_password) {
        error.confirm_password = "*Password not match";
    }
    return error;
}