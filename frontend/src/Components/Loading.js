import React from 'react'

const Loading = () => {
    return (
        <div className='w-full h-full'>
            <div className='flex h-[80vh] justify-center items-center'>
                <div className='w-10 h-10 absolute bg-blue-400 b1'></div>
                <div className='w-10 h-10 absolute bg-white b2'></div>
            </div>
        </div>
    )
}

export default Loading