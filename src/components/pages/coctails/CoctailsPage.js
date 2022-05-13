import React from 'react'
import CreateSquare from '../../createSquare/CreateSquare'
import { cocktails_page_squares } from '../../../data/products'
import './coctails.css'

export const CoctailsPage = () => {
  return (
    <div className='wrappercoctails'>
        <CreateSquare data={cocktails_page_squares} type="productsquare"/>
    </div>
  )
}
