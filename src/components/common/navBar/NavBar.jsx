import "./_navbar.scss";
import { Link }                           from 'react-router-dom';
import { Menu }                           from '@headlessui/react';
import { 
  FaRegFaceGrinBeam, 
  FaNewspaper, 
  FaCircleUser  }                         from "react-icons/fa6";
import { RiLogoutBoxLine }                from "react-icons/ri";
import { dropDownMenu }                   from '../../../data/headerData';
import { useDispatch, useSelector }       from "react-redux";
import { useNavigate }                    from "react-router-dom";
import { selectUserInfo, logoutAuth }     from '../../../app/slices/usersSlice/AuthSlice';
import { useLogoutMutation }              from '../../../app/slices/usersSlice/usersApiSlice';
import { toast }                          from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector(selectUserInfo);

  const [logout, { isLoading }] = useLogoutMutation();

  const sumbitHandler = async (e) => {
      e.preventDefault();
      
      try {
          const response = await logout();
          dispatch(logoutAuth());
          navigate('/login');

          toast.info(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
      } catch (error) {
          console.log(error.message);
      }
  }

  return (
    <div>
      <div className="navBar"> 
        <div className="navLogo">
            <h1 className="hover">Logo</h1>
        </div>
        <div className="navIcons">
            {
              (userInfo) 
              ?
                <div className="icon hover">
                  <button type="submit" onClick={sumbitHandler}>
                    <RiLogoutBoxLine />
                  </button>
                  <div className="tooltip">Logout</div>
                </div>
              :
                <>
                  <div className="icon hover">
                    <Link to={'/login'}>
                      <span>
                        <FaRegFaceGrinBeam />
                      </span>
                    </Link>
                    <div className="tooltip">Login</div>
                  </div>
              
                  <div className="icon hover">
                    <Link to={'/register'}>
                      <span>
                        <FaNewspaper />
                      </span>
                    </Link>
                      <div className="tooltip">Register</div>
                  </div>
                </>
            }

            <Menu as="div" className="relative inline-block text-left">
              <div className="user_action">
                  <Menu.Button>
                    <FaCircleUser />
                  </Menu.Button>
              </div>

              <Menu.Items className="menu_items">
                <div className="py-1">
                  <p className="title">Hello!</p>
                  <p>Access account and manage orders</p>
                  <ul className="drop-menu">
                    {
                      dropDownMenu?.map((item) => {
                          const {id, link, path} = item;
                          return (
                              <Menu.Item key={id} className="link">
                                  {({ active }) => (
                                      <li>
                                        <Link to={path}>{link}</Link>
                                      </li>
                                  )}
                              </Menu.Item>
                          );
                      })
                    }
                  </ul>
                </div>
              </Menu.Items>    
            </Menu>
        </div>
      </div>
    </div>
  )
}

export default NavBar