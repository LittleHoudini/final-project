import React from 'react'
import CreateSquare from '../../createSquare/CreateSquare'
import { starters_page_squares } from '../../../data/products'

export const StartersPage = () => {
  return (
    <div className='wrapper'>
        <CreateSquare data={starters_page_squares} type="productsquare"/>
    </div>
  )
}
