import React from 'react'
import CreateSquare from '../../createSquare/CreateSquare'
import { drinks_page_squares } from '../../../data/products'

export const DrinksPage = () => {
  return (
    <div className='wrapper'>
        <CreateSquare data={drinks_page_squares} type="productsquare"/>
    </div>
  )
}
