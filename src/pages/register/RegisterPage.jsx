import './../register/_register.scss';
import { useEffect, useState } from 'react';
import { RegisterValidation } from '../../helpers/form_validation/RegisterValidation';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector }  from 'react-redux';
import { selectUserInfo }                   from '../../app/slices/usersSlice/AuthSlice';
import { useRegisterMutation } from '../../app/slices/usersSlice/usersApiSlice';
import { toast }                      from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const navigate = useNavigate();

  const userInfo = useSelector(selectUserInfo);

  const [values, setFormValues] = useState({
    full_name         : "",
    email             : "",
    phone_number      : "",
    password          : "",
    confirm_password  : "",
  });

  const [errors, setErrors] = useState({});
  const handleInput = (e) => {
    setFormValues((prev) => ({...prev, [e.target.name] : e.target.value}));
  }

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
      if(userInfo) {
        navigate('/');
      }
  }, [navigate, userInfo]);

  const sumbitHandler = async (e) => {
      e.preventDefault();
      setErrors(RegisterValidation(values));

      try {
        if(errors.full_name === "" && errors.phone_number === "" && errors.password === "" && errors.confirm_password === "") {
          const response = await register(values).unwrap();
          navigate('/login');

          console.log(response);

          toast.success("Your account is successfully registered!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (error) {
        toast.error(error.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
      
  }
  return (
    <div>
        <div className="register">
            <div className="register-form">
                <div>
                  <h1 className='form-title-text'>Register</h1>
                </div>
                <form className='flex flex-col gap-2' onSubmit={sumbitHandler}>
                  <div>
                      <label htmlFor="full_name" className="form-label">
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          name="full_name"
                          type="full_name"
                          autoComplete="full_name"
                          required
                          className="form-input"
                          onChange={handleInput}
                        />
                      </div>
                      { errors.full_name && <span className='form_validation'>{errors.full_name}</span> }
                  </div>

                  <div>
                      <label htmlFor="email" className="form-label">
                        E-mail
                      </label>
                      <div className="mt-2">
                        <input
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="form-input"
                          onChange={handleInput}
                        />
                      </div>
                  </div>

                  <div>
                      <label htmlFor="phone_number" className="form-label">
                        Phone number
                      </label>
                      <div className="mt-2">
                        <input
                          name="phone_number"
                          type="phone_number"
                          autoComplete="phone_number"
                          required
                          className="form-input"
                          onChange={handleInput}
                        />
                      </div>
                      { errors.phone_number && <span className='form_validation'>{errors.phone_number}</span> }
                  </div>

                  <div>
                      <label htmlFor="password" className="form-label">
                        Password
                        <p className='form_validation'>**must contain 8 characters, atleast one numeric digit and a special character.</p>
                      </label>
                      <div className="mt-2">
                        <input 
                          type="password" 
                          name="password" 
                          autoComplete="current-password" 
                          required 
                          className="form-input"
                          onChange={handleInput}
                        />
                      </div>
                      { errors.password && <span className='form_validation'>{errors.password}</span> }
                  </div>

                  <div>
                      <label htmlFor="confirm_password" className="form-label">
                        Confirm Password
                      </label>
                      <div className="mt-2">
                        <input 
                          type="password" 
                          name="confirm_password" 
                          autoComplete="confirm_password" 
                          required 
                          className="form-input"
                          onChange={handleInput}
                        />
                      </div>
                      { errors.confirm_password && <span className='form_validation'>{errors.confirm_password}</span> }
                  </div>
                  <div className='flex flex-col justify-center my-5 gap-3'>
                      <button type="submit" className='button register-button' disabled={isLoading}>Register</button>
                      <Link to="/login" className='button register-button'>
                          Have a account? Sign in
                      </Link>
                  </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage
