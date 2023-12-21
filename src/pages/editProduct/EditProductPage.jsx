import '../editProduct/_editproductpage.scss';
import { useState, useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { useSelector }                    from 'react-redux';
import { selectUserInfo }                 from '../../app/slices/usersSlice/AuthSlice';
import { ProductValidation } from '../../helpers/product_form_validation/ProductValidation.js';
import { useUpdateProductMutation }          from '../../app/slices/productsSlice/productsApiSlice.js';
import { toast }                          from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setFormValues] = useState({
      name      : "",
      quantity  : "",
      price     : ""
  });

  const [errors, setErrors] = useState({});
  const handleInput = (e) => {
      setFormValues((prev) => ({...prev, [e.target.name] : e.target.value}));
  }

  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
      if(userInfo === null) {
          navigate('/login');
      } 
  }, [navigate, userInfo]);

  const [updateProduct, { isLoading }] = useUpdateProductMutation(id);

  const sumbitHandler = async (e) => {
      e.preventDefault();
      setErrors(ProductValidation(values));

      try {
        if(errors.quantity === "" && errors.price === "") {
            const response = await updateProduct({ ...values, id: id });
            navigate('/');
            toast.info(response.data, {
              position: "top-right",
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
              position: "top-right",
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
        <div className="edit-product">
            <div className="edit-form">
                <div>
                    <h1 className='form-title-text'>Edit product</h1>
                </div>
                <form className='flex flex-col gap-2' onSubmit={sumbitHandler}>
                    <div>
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          name="name"
                          type="name"
                          autoComplete="name"
                          required
                          className="form-input"
                          onChange={handleInput}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="quantity" className="form-label">
                        Quantity
                      </label>
                      <div className="mt-2">
                        <input
                          name="quantity"
                          type="quantity"
                          autoComplete="quantity"
                          required
                          className="form-input"
                          onChange={handleInput}
                        />
                        { errors.quantity && <span className='form_validation'>{errors.quantity}</span> }
                      </div>
                    </div>
                    <div>
                      <label htmlFor="price" className="form-label">
                        Price
                      </label>
                      <div className="mt-2">
                        <input
                          name="price"
                          type="price"
                          autoComplete="price"
                          required
                          className="form-input"
                          onChange={handleInput}
                        />
                        { errors.price && <span className='form_validation'>{errors.price}</span> }
                      </div>
                    </div>
                    <div>
                      <button type="submit" className='edit-button button my-5'>Update product</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditProductPage