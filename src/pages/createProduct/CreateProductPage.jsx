import '../createProduct/_createproductpage.scss';
import { ProductValidation }              from '../../helpers/product_form_validation/ProductValidation.js';
import { useState, useEffect }            from 'react';
import { useSelector }                    from 'react-redux';
import { selectUserInfo }                 from '../../app/slices/usersSlice/AuthSlice';
import { useNavigate }                    from 'react-router-dom';
import { useAddProductMutation }          from '../../app/slices/productsSlice/productsApiSlice.js';
import { toast }                          from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProductPage = () => {
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
          navigate('/');
      } 
  }, [navigate, userInfo]);

  const [addProduct, { isLoading }] = useAddProductMutation();

  const sumbitHandler = async (e) => {
      e.preventDefault();
      setErrors(ProductValidation(values));

      try {
        if(errors.quantity === "" && errors.price === "") {
            const response = await addProduct(values).unwrap();
            navigate('/');
            toast.info(response, {
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
          console.log(error.data.message);
      }
  }

  return (
    <div>
        <div className="create-product">
            <div className="create-form">
                <div>
                    <h1 className='form-title-text'>Add product</h1>
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
                      <button type="submit" className='create-button button my-5' disabled={isLoading}>Add product</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CreateProductPage