export const ProductValidation = (values) => {
    let error = {
        quantity    : "",
        price       : "",
    };
    
    const numbers = /^[0-9]+$/;
    if(!values.quantity.match(numbers)) {
        error.quantity = "Quantity is invalid.";
    }

    const priceRegex =/^\d+(?:[.,]\d+)*$/gm;
    if(!priceRegex.exec(values.price)) {
        error.price = "Price is invalid.";
    }

    return error;
}