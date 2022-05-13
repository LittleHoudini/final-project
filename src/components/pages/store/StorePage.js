import React from 'react'
import CreateSquare from '../../createSquare/CreateSquare'
import {store_page_squares} from '../../../data/products';
import './store.css';
export const StorePage = () => {
  return (
    <div className='wrapperstore'>
        <CreateSquare data={store_page_squares} type="productsquare"/>
    </div>
  )
}
