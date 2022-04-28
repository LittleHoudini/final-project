import React from 'react'
import CreateSquare from '../../createSquare/CreateSquare'
import { extras_page_squares } from '../../../data/products'

export const ExtrasPage = () => {
  return (
    <div className='wrapper'>
        <CreateSquare data={extras_page_squares} type="productsquare"/>
    </div>
  )
}
