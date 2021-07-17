import React from 'react';
import { Link } from 'react-router-dom';

/*"foodId": 32,
        "name": "15",
        "price": 3333.3,
        "quantity": 100,
        "status": "AVAILABLE",
        "description": "description",
        "categoryId": 31,
        "images": [],
        "rate": 0.0 */

const Food = ({
  images,
  name,
  foodId,
  description,
  categoryId,
  rate,
  status,
  quantity,
  price,
}) => {
  return (
    <article className='cocktail'>
      <div className='img-container'>
        <img src={{ ...images[0] }.url} alt={name} />
      </div>

      <div className='cocktail-footer'>
        <h3>{name}</h3>
        <h4>{price}</h4>
        <p>{description}</p>

        <Link to={`/products/${foodId}`} className='btn btn-primary'>
          details
        </Link>
      </div>
    </article>
  );
};

export default Food;
