import React from 'react'
import CreateSquare from '../../createSquare/CreateSquare'
import { starters_page_squares } from '../../../data/products'
import './starters.css'

export const StartersPage = () => {
  return (
    <div className='wrapperstarters'>
        <CreateSquare data={starters_page_squares} type="productsquare"/>
    </div>
  )
}
