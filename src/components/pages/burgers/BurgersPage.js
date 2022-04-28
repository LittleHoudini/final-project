import React from 'react'
import CreateSquare from '../../createSquare/CreateSquare'
import { burgers_page_squares } from '../../../data/products'

export const BurgersPage = () => {
  return (
    <div className='wrapper'>
        <CreateSquare data={burgers_page_squares} type="productsquare"/>
    </div>
  )
}
