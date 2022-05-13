import React from 'react'
import CreateSquare from '../../createSquare/CreateSquare'
import { extras_page_squares } from '../../../data/products'
import './extra.css'

export const ExtrasPage = () => {
  return (
    <div className='wrapperextras'>
        <CreateSquare data={extras_page_squares} type="productsquare"/>
    </div>
  )
}
