import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, fetchValues } from '../ReduxStore/Actions'
import Pagination from './Pagination'
import Loading from './Loading'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const dispatch = useDispatch()
    const { users, loading, domain, gender } = useSelector((state) => state)
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [filterOpen, setFilterOpen] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [filters, setFilters] = React.useState({ domain: [], gender: [], available: [] })
    let timeoutID

    React.useEffect(() => {
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => {
            dispatch(fetchUsers(page, filters, search))
            dispatch(fetchValues())
        }, 500);
        return () => {
            clearTimeout(timeoutID)
        }
    }, [dispatch, page, filters, search])
    const handleDomainCheckBox = (option) => {
        setPage(1)
        if (filters.domain.includes(option)) {
            setFilters({ ...filters, domain: filters.domain.filter((i) => i !== option) })
        }
        else {
            setFilters({ ...filters, domain: [...filters.domain, option] })
        }
    }
    const handleGenderCheckBox = (option) => {
        setPage(1)
        if (filters.gender.includes(option)) {
            setFilters({ ...filters, gender: filters.gender.filter((i) => i !== option) })
        }
        else {
            setFilters({ ...filters, gender: [...filters.gender, option] })
        }
    }
    const handleAvailableCheckBox = (option) => {
        setPage(1)
        if (filters.available.includes(option)) {
            setFilters({ ...filters, available: filters.available.filter((i) => i !== option) })
        }
        else {
            setFilters({ ...filters, available: [...filters.available, option] })
        }
    }
    const handleSearch = (e) => {
        setPage(1)
        setSearch(e.target.value)
    }
    return (
        <div className='p-2 xl:p-8'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex justify-between items-center pb-2 md:pb-4 bg-gray-900">
                    <div className={`flex justify-start items-center border ${searchOpen || search ? "rounded-lg" : "rounded-full"} py-1 cursor-pointer px-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500`}>
                        <div onClick={() => setSearchOpen(!searchOpen)} className="flex items-center md:ps-3">
                            <span className="material-symbols-outlined text-xl font-bold text-gray-400">
                                search
                            </span>
                        </div>
                        <input onBlur={() => setSearchOpen(false)} type="text" id="table-search" name='search' value={search} onChange={handleSearch} className={`${searchOpen || search ? "w-40 px-2" : "w-0 md:w-60 md:px-2"} duration-200 text-sm md:text-base lg:text-base block text-gray-300 bg-transparent focus:ring-0 border-0 outline-none`} placeholder="Search User by name" />
                    </div>
                    <div onClick={() => setFilterOpen(!filterOpen)} className='text-gray-400 bg-gray-800 hover:bg-gray-700 cursor-pointer px-2 flex justify-center items-center rounded-lg font-medium'><span className='material-symbols-outlined text-4xl me-2'>{filterOpen ? "menu_open" : "list"}</span> Filters</div>
                </div>
                <div className="w-full grid grid-cols-4 lg:gap-x-4 justify-center items-start">
                    <div className={`${filterOpen ? "col-span-0 lg:col-span-3" : "col-span-4"} duration-200`}>

                        <div className={`${filterOpen ? "hidden lg:block" : "block"} max-h-[74vh] lg:max-h-[72vh] xl:max-h-[70vh] overflow-y-scroll w-full scrollbar-none`}>
                            {loading ? <div className={`${filterOpen ? "hidden lg:block" : "block"}`}>
                                <Loading />
                            </div> : <table className="w-full text-sm text-left rtl:text-right  text-gray-400">
                                <thead className="text-xs uppercase  bg-gray-700 text-gray-400">
                                    <tr className='border-b-10 border-gray-900'>
                                        <th scope="col" className="px-2 text-left lg:px-6 py-6 rounded-s-lg">
                                            User id
                                        </th>
                                        <th scope="col" className="px-2 text-left lg:px-6 py-3">
                                            Username
                                        </th>
                                        <th scope="col" className="px-2 text-left lg:px-6 py-3">
                                            Domain
                                        </th>
                                        <th scope="col" className="px-2 text-left lg:px-6 py-3">
                                            Gender
                                        </th>
                                        <th scope="col" className="px-2 text-left lg:px-6 py-3 rounded-e-lg">
                                            Available
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-transparent'>
                                    {users?.data?.map((user) => {
                                        return <tr key={user._id} className="border-y-8 border-gray-900 bg-gray-800 hover:bg-gray-600">
                                            <th scope="row" className="px-6 md:px-6 text-left py-6 rounded-s-lg font-medium  whitespace-nowrap text-white">
                                                {user.id}
                                            </th>
                                            <td className="px-2 md:px-6 text-left py-4">
                                                {user.first_name} {user.last_name}
                                            </td>
                                            <td className="px-2 md:px-6 text-left py-4">
                                                {user.domain}
                                            </td>
                                            <td className="px-2 md:px-6 text-left py-4">
                                                {user.gender}
                                            </td>
                                            <td className="px-2 md:px-6 text-left py-4 rounded-e-lg">
                                                <Link to="/" className="font-medium text-blue-500 hover:underline">Edit</Link>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>}
                        </div>
                        <div className={`${filterOpen ? "hidden lg:block" : "block"}`}>
                            {!loading && <Pagination
                                page={page}
                                setPage={setPage}
                                totalEntries={users.totalUsers}
                            />}
                        </div>
                    </div>
                    <div className={`${filterOpen ? "col-span-4 lg:col-span-1" : "col-span-0"} rounded-lg duration-200 bg-gray-800  text-gray-400`}>
                        <div className={`${filterOpen ? "block m-3" : "hidden"}`}>
                            <div>
                                <div className='text-gray-300 py-1 border-b-[1px] border-gray-300 font-medium'>Domain</div>
                                <ul className='py-2'>
                                    {domain?.map((d) => {
                                        return <li key={d} className="flex items-center py-1">
                                            <input id={d} type="checkbox" value={d} onChange={() => handleDomainCheckBox(d)}
                                                className="w-4 h-4   accent-gray-500 rounded text-primary-600 focus:ring-primary-500 focus:ring-primary-600 ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500" />

                                            <label htmlFor={d} className="ml-2 text-sm font-medium  text-gray-300">
                                                {d}
                                            </label>
                                        </li>
                                    })}
                                </ul>
                            </div>
                            <div>
                                <div className='text-gray-300 py-1 border-b-[1px] border-gray-300 font-medium'>Gender</div>
                                <ul className='py-2'>
                                    {gender?.map((d) => {
                                        return <li key={d} className="flex items-center py-1">
                                            <input id={d} type="checkbox" value={d} onChange={() => { handleGenderCheckBox(d) }}
                                                className="w-4 h-4  accent-gray-500 rounded text-primary-600 focus:ring-primary-500 focus:ring-primary-600 ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500" />

                                            <label htmlFor={d} className="ml-2 text-sm font-medium  text-gray-300">
                                                {d}
                                            </label>
                                        </li>
                                    })}
                                </ul>
                            </div>
                            <div>
                                <div className='text-gray-300 py-1 border-b-[1px] border-gray-300 font-medium'>Available</div>
                                <ul className='py-2'>
                                    <li className="flex items-center py-1">
                                        <input id="available" type="checkbox" value={true} onChange={handleAvailableCheckBox}
                                            className="w-4 h-4  accent-gray-500 rounded text-primary-600 focus:ring-primary-500 focus:ring-primary-600 ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500" />

                                        <label htmlFor="available" className="ml-2 text-sm font-medium text-gray-300">
                                            Available
                                        </label>
                                    </li>
                                    <li className="flex items-center py-1">
                                        <input id="notAvailable" type="checkbox" value={false} onChange={handleAvailableCheckBox}
                                            className="w-4 h-4  accent-gray-500 rounded text-primary-600 focus:ring-primary-500 focus:ring-primary-600 ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500" />

                                        <label htmlFor="notAvailable" className="ml-2 text-sm font-medium  text-gray-300">
                                            Not available
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Dashboard