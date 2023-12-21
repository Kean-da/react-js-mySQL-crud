import './../productCard/_productCard.scss';
import { Link }                     from 'react-router-dom';
import Swal                         from 'sweetalert2';
import { useDeleteProductMutation } from '../../../app/slices/productsSlice/productsApiSlice';

const ProductCard = ({
  sumbitHandlerSetProducts, 
  product: { id, user_id, name, quantity, price, created_at, updated_at } 
}) => {
  
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const deleteButton = async () => {
    const swalWithButtons = await Swal.mixin({
        customClass: {
          confirmButton: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3",
          cancelButton: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-3"
        },
        buttonsStyling: false
    });
    swalWithButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteProduct(id);
          sumbitHandlerSetProducts();

          swalWithButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } catch(error) {

        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    })
  }

  return (
    <div>
        <div className="card">
          <div>
              <img 
                src="https://images.pexels.com/photos/347926/pexels-photo-347926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="product/id" 
                className="product-img"
                />
          </div>
          <div className='card-description'>
              <div>
                  <p className='card-title'>{name}</p>
                  <p className=''>Quantity: {quantity}</p>
                  <p>Price: ${price}</p>
              </div>
              <div className='card-buttons'>
                  <Link to={`/edit/${id}`} className='edit-btn'>
                    Edit
                  </Link>
                  <button className='delete-btn' onClick={deleteButton} >Delete</button>
              </div>
          </div>
        </div>
    </div>
  )
}

export default ProductCard