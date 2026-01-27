import React from 'react'

const Title = ({heading, text}) => {
  return (
    <div className='font-[inter]'>
        <h1 className='text-3xl text-gray-900 mb-2 font-semibold'>{heading}</h1>
        <p className='text-gray-600'>{text}</p>
    </div>
  )
}

export default Title