import React from 'react'
import CreateSquare from '../../createSquare/CreateSquare'
import { combos_page_squares } from '../../../data/products'

export const CombosPage = () => {
  return (
    <div className='wrapper'>
        <CreateSquare data={combos_page_squares} type="productsquare"/>
    </div>
  )
}
