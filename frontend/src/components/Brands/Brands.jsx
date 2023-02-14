import React from 'react'

import Brand1 from '../../assets/brand1.png'
import Brand2 from '../../assets/brand2.png'
import Brand3 from '../../assets/brand3.png'
import Brand4 from '../../assets/brand4.png'
import Brand5 from '../../assets/brand5.png'

import './brands.scss'

function Brands() {
  return (
    <div className='container'>
      <div className="brands">
        <div className="brands__item">
          <img src={Brand1} alt="" />
        </div>
        <div className="brands__item">
          <img src={Brand2} alt="" />
        </div>
        <div className="brands__item">
          <img src={Brand3} alt="" />
        </div>
        <div className="brands__item">
          <img src={Brand4} alt="" />
        </div>
        <div className="brands__item">
          <img src={Brand5} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Brands