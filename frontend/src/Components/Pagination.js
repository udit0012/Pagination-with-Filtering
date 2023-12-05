import React from 'react'

const Pagination = ({ page, setPage, totalEntries }) => {

    const [currentPage, setCuurrentPage] = React.useState(5);
    const totalPages = Math.ceil(totalEntries/20)
    const navigateBefore = () => {
        if (page > 1) {
            setPage(page - 1)
            if (page > 5 && page <= totalPages - 4) setCuurrentPage(currentPage - 1)
        }
    }
    const navigateNext = () => {
        if (page < totalPages) {
            setPage(page + 1)
            if (page >= 5 && page < (totalPages - 4)) setCuurrentPage(currentPage + 1)
        }
    }
    return (
        <div className='bg-gray-700 rounded-b-lg text-sm lg:text-base flex flex-col xl:flex-row justify-between items-center text-gray-300 mt-1 p-3 lg:p-6'>
            <div className='mb-2 mx-4 lg:mx-0'>Showing <span className="py-1 px-3 lg:py-2 lg:px-4 mx-2 bg-neutral-900 rounded-full">{(page - 1) * 20 + 1}</span> to <span className='py-1 px-3 lg:py-2 lg:px-4 mx-2 bg-neutral-900 rounded-full'>{totalEntries>((page) * 20)?page*20:totalEntries}</span> of {totalEntries} entries</div>
            <div className='flex justify-start lg:justify-center items-center'>
                <button onClick={navigateBefore} className='flex mx-2 justify-center items-center p-1 lg:p-2 rounded-full hover:bg-neutral-900 cursor-pointer disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-default' disabled={page === 1}><span className='material-symbols-outlined'>navigate_before</span></button>
                {totalPages>=4 &&<button onClick={() => { setCuurrentPage(5); setPage(1) }} className={`flex justify-center items-center py-1 px-3 lg:py-2 lg:px-4 rounded-full ${page === 1 ? "bg-neutral-900" : ""} hover:bg-gray-800 cursor-pointer`}><span>1</span></button>}
                {totalPages>=5 && <button onClick={() => { setPage(2); setCuurrentPage(5) }} className={`flex justify-center items-center py-1 px-3 lg:py-2 lg:px-4 rounded-full ${page === 2 ? "bg-neutral-900" : ""} hover:bg-gray-800 cursor-pointer`}><span>2</span></button>}
                {totalPages>=6 && <button onClick={() => { setPage(3); setCuurrentPage(5) }} className={`flex justify-center items-center py-1 px-3 lg:py-2 lg:px-4 rounded-full ${page === 3 ? "bg-neutral-900" : ""} hover:bg-gray-800 cursor-pointer`}><span>3</span></button>}
                {totalPages>=6 && currentPage != 5 && <><button className='flex justify-center items-center py-2 px-2'><span>.</span></button>
                    <button className='flex justify-center items-center py-2 px-2'><span>.</span></button>
                    <button className='flex justify-center items-center py-2 px-2'><span>.</span></button></>}
                {totalPages>=7 && <button onClick={() => { if (currentPage != 5) { setCuurrentPage(currentPage - 1) }; setPage(currentPage - 1) }} className={`flex justify-center items-center py-1 px-3 lg:py-2 lg:px-4 rounded-full ${page === currentPage - 1 ? "bg-neutral-900" : ""} hover:bg-gray-800 cursor-pointer`}><span>{currentPage - 1}</span></button>}
                {totalPages>=8 && <button onClick={() => { if (currentPage != 5 && currentPage != totalPages - 4) { setCuurrentPage(currentPage) }; setPage(currentPage) }} className={`flex justify-center items-center py-1 px-3 lg:py-2 lg:px-4 rounded-full ${page === currentPage ? "bg-neutral-900" : ""} hover:bg-gray-800 cursor-pointer`}><span>{currentPage}</span></button>}
                {totalPages>=9 && <button onClick={() => { if (currentPage != totalPages - 4) { setCuurrentPage(currentPage + 1) }; setPage(currentPage + 1) }} className={`flex justify-center items-center py-1 px-3 lg:py-2 lg:px-4 rounded-full ${page === currentPage + 1 ? "bg-neutral-900" : ""} hover:bg-gray-800 cursor-pointer`}><span>{currentPage + 1}</span></button>}
                {totalPages>=9 && currentPage != totalPages - 4 && <><button className='flex justify-center items-center py-2 px-2'><span>.</span></button>
                    <button className='flex justify-center items-center py-2 px-2'><span>.</span></button>
                    <button className='flex justify-center items-center py-2 px-2'><span>.</span></button></>}
                {totalPages>=3 && <button onClick={() => { setCuurrentPage(totalPages - 4); setPage(totalPages - 2) }} className={`flex justify-center items-center py-1 px-3 lg:py-2 lg:px-4 rounded-full ${page === totalPages - 2 ? "bg-neutral-900" : ""} hover:bg-gray-800 cursor-pointer`}><span>{totalPages - 2}</span></button>}
                {totalPages>=2 && <button onClick={() => { setPage(totalPages - 1); setCuurrentPage(totalPages - 4) }} className={`flex justify-center items-center py-1 px-3 lg:py-2 lg:px-4 rounded-full ${page === totalPages - 1 ? "bg-neutral-900" : ""} hover:bg-gray-800 cursor-pointer`}><span>{totalPages - 1}</span></button>}
                {totalPages>=1 && <button onClick={() => { setPage(totalPages); setCuurrentPage(totalPages - 4) }} className={`flex justify-center items-center py-1 px-3 lg:py-2 lg:px-4 rounded-full ${page === totalPages ? "bg-neutral-900" : ""} hover:bg-gray-800 cursor-pointer`}><span>{totalPages}</span></button>}
                <button onClick={navigateNext} className='flex justify-center items-center p-1 lg:p-2 mx-2 rounded-full hover:bg-neutral-900 cursor-pointer disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-default' disabled={page === totalPages}><span className='material-symbols-outlined'>navigate_next</span></button>
            </div>
        </div>
    )
}

export default Pagination