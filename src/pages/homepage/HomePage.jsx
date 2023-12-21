import './../homepage/_homepage.scss';
import ProductCard                          from '../../components/util/productCard/ProductCard';
import { Link }                             from 'react-router-dom';
import { useNavigate }                      from 'react-router-dom';
import { useDispatch, useSelector }         from 'react-redux';
import { selectUserInfo }                   from '../../app/slices/usersSlice/AuthSlice';
import { useEffect }                        from 'react';
import { useGetProductsMutation }           from '../../app/slices/productsSlice/productsApiSlice';
import { setProducts, selectProductsData  } from '../../app/slices/productsSlice/ProductSlice';
import { ThreeDots  }                       from  'react-loader-spinner';

const HomePage = () => {
  const dispatch      = useDispatch();
  const navigate      = useNavigate();

  const userInfo      = useSelector(selectUserInfo);
  const productsData  = useSelector(selectProductsData);

  const [getProducts, { isLoading }] = useGetProductsMutation(); 

  useEffect(() => {
      if(userInfo === null) {
        navigate('/login');
      } else {
        sumbitHandlerSetProducts();
      }
  }, [navigate, userInfo]);

  const sumbitHandlerSetProducts = async() => {
    const response = await getProducts().unwrap();
    dispatch(setProducts(response));
  };

  return (
    <div>
      <div className='container home-page'>
          <Link to="/create" className='home-button create-button'>
              Create a Product
          </Link> 
          
          <div className={`flex justify-center flex-col ${(isLoading) ? "items-center h-screen" : ""}`}>
            <ThreeDots 
                height="150" 
                width="150" 
                radius="9"
                color="#FFA500" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={isLoading}
            />
            <div className='products'>
                {productsData?.map((product , id) => {
                      return (
                        <ProductCard
                            key = {id}
                            product = {product}
                            sumbitHandlerSetProducts = {sumbitHandlerSetProducts}
                        />
                      )
                })}
            </div>
          </div>
      </div>
    </div>
  )
}

export default HomePage