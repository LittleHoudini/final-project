import React from 'react'
import CreateSquare from '../../createSquare/CreateSquare'
import { cocktails_page_squares } from '../../../data/products'

export const CoctailsPage = () => {
  return (
    <div className='wrapper'>
        <CreateSquare data={cocktails_page_squares} type="productsquare"/>
    </div>
  )
}
