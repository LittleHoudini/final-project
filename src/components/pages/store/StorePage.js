import React from 'react'
import CreateSquare from '../../createSquare/CreateSquare'
import {store_page_squares} from '../../../data/products';
export const StorePage = () => {
  return (
    <div className='wrapper'>
        <CreateSquare data={store_page_squares} type="productsquare"/>
    </div>
  )
}
