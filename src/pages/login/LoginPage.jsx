import './../login/_login.scss';
import { useEffect, useState }       from 'react';
import { LoginValidation }           from '../../helpers/form_validation/LoginValidation';
import { useNavigate }               from 'react-router-dom';
import { useDispatch, useSelector }  from 'react-redux';
import {
  selectUserInfo, 
  setCredentials, }                   from '../../app/slices/usersSlice/AuthSlice';

import { useLoginMutation }           from '../../app/slices/usersSlice/usersApiSlice';
import { toast }                      from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector(selectUserInfo);

  const [values, setFormValues] = useState({
      email     : "",
      password  : ""
  });

  const [errors, setErrors] = useState({});
  const handleInput = (e) => {
      setFormValues((prev) => ({...prev, [e.target.name] : e.target.value}));
  }

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
      if(userInfo) {
        navigate('/');
      }
  }, [navigate, userInfo]);

  const sumbitHandler = async (e) => {
    e.preventDefault();
    setErrors(LoginValidation(values));

    try {
      if(errors.password == "") {
        const response = await login(values).unwrap();
        dispatch(setCredentials({...response}));
        navigate('/');

        toast.success(`Welcome to the dashboard, ${response.full_name}`, {
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
        <div className="login">
            <div className="login-form">
                <div>
                  <h1 className='form-title-text'>Login</h1>
                </div>
                <form className='flex flex-col gap-2' onSubmit={sumbitHandler}>
                  <div>
                      <label htmlFor="email" className="form-label">
                        Email address
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
                        { errors.password && <span className='form_validation'>{errors.password}</span> }
                      </div>
                  </div>
                  <div className='flex justify-center my-5'>
                      <button type="submit" className="button login-button" disabled={isLoading}>LOGIN</button>
                  </div>
                  
                </form>
            </div>
        </div>
    </div>
  )
}

export default LoginPage