import React from 'react'
import CreateSquare from '../../createSquare/CreateSquare'
import { drinks_page_squares } from '../../../data/products'
import './drinks.css'

export const DrinksPage = () => {
  return (
    <div className='wrapperdrinks'>
        <CreateSquare data={drinks_page_squares} type="productsquare"/>
    </div>
  )
}
