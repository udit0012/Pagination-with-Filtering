import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, fetchValues } from '../ReduxStore/Actions'
import Pagination from './Pagination'
import Loading from './Loading'

const Dashboard = () => {
    const dispatch = useDispatch()
    const { users, loading, domain, gender, error } = useSelector((state) => state)
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [filterOpen, setFilterOpen] = React.useState(false);
    const [filters, setFilters] = React.useState({ domain: [], gender: [], available: "" })
    const totalPages = Math.ceil(users.totalUsers / 20)

    React.useEffect(() => {
        dispatch(fetchUsers(page, filters))
        dispatch(fetchValues())
    }, [dispatch, page, filters])
    const handleDomainCheckBox = (option) => {
        if (filters.domain.includes(option)) {
            setFilters({ ...filters, domain: filters.domain.filter((i) => i != option) })
        }
        else {
            setFilters({ ...filters, domain: [...filters.domain, option] })
        }
    }
    const handleGenderCheckBox = (option) => {
        if (filters.gender.includes(option)) {
            setFilters({ ...filters, gender: filters.gender.filter((i) => i != option) })
        }
        else {
            setFilters({ ...filters, gender: [...filters.gender, option] })
        }
    }
    return (
        <div className='p-4 xl:p-8'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex justify-between items-center pb-4 bg-white dark:bg-gray-900">
                    <div className="flex justify-start items-center border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <div className="flex items-center ps-3 pointer-events-none">
                            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                                search
                            </span>
                        </div>
                        <input type="text" id="table-search" className="block py-2 px-2 text-gray-300 bg-transparent focus:ring-0 border-0 outline-none" placeholder="Search User by name" />
                    </div>
                    <div onClick={() => setFilterOpen(!filterOpen)} className='text-gray-400 bg-gray-800 hover:bg-gray-700 cursor-pointer px-2 flex justify-center items-center rounded-lg font-medium'><span className='material-symbols-outlined text-4xl me-2'>{filterOpen ? "menu_open" : "list"}</span> Filters</div>
                </div>
                <div className="w-full grid grid-cols-4 lg:gap-x-4 justify-center items-start">
                    <div className={`${filterOpen ? "col-span-0 lg:col-span-3" : "col-span-4"} duration-200`}>
                        {loading?<div className={`${filterOpen?"hidden lg:block":"block"}`}>
                            <Loading />
                        </div>:<>
                            <div className={`${filterOpen ? "hidden lg:block" : "block"} max-h-[74vh] lg:max-h-[72vh] xl:max-h-[70vh] overflow-y-scroll w-full scrollbar-none`}>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className='border-b-10 border-gray-900'>
                                            <th scope="col" className="px-3 lg:px-6 py-6 rounded-s-lg">
                                                User id
                                            </th>
                                            <th scope="col" className="px-3 lg:px-6 py-3">
                                                Username
                                            </th>
                                            <th scope="col" className="px-3 lg:px-6 py-3">
                                                Domain
                                            </th>
                                            <th scope="col" className="px-3 lg:px-6 py-3">
                                                Gender
                                            </th>
                                            <th scope="col" className="px-3 lg:px-6 py-3 rounded-e-lg">
                                                Available
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-transparent'>
                                        {users?.data?.map((user) => {
                                            return <tr key={user._id} className="border-y-8 border-gray-900 bg-gray-800 hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-6 rounded-s-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {user.id}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {user.first_name} {user.last_name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.domain}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.gender}
                                                </td>
                                                <td className="px-6 py-4 rounded-e-lg">
                                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className={`${filterOpen ? "hidden lg:block" : "block"}`}>
                                <Pagination
                                    page={page}
                                    setPage={setPage}
                                    totalEntries={users.totalUsers}
                                />
                            </div>
                        </>}
                    </div>
                    <div className={`${filterOpen ? "col-span-4 lg:col-span-1" : "col-span-0"} rounded-lg duration-200 bg-gray-800  text-gray-400`}>
                        <div className={`${filterOpen ? "block m-3" : "hidden"}`}>
                            <div>
                                <div className='text-gray-300 py-1 border-b-[1px] border-gray-300 font-medium'>Domain</div>
                                <ul className='py-2'>
                                    {domain?.map((d) => {
                                        return <li key={d} className="flex items-center py-1">
                                            <input id={d} type="checkbox" value={d} onChange={() => handleDomainCheckBox(d)}
                                                className="w-4 h-4 bg-gray-600 border-gray-300 accent-gray-500 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

                                            <label htmlFor={d} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
                                                className="w-4 h-4 bg-gray-600 border-gray-300 accent-gray-500 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

                                            <label htmlFor={d} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
                                        <input id="available" type="checkbox" value={true}
                                            className="w-4 h-4 bg-gray-600 border-gray-300 accent-gray-500 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

                                        <label htmlFor="available" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Available
                                        </label>
                                    </li>
                                    <li className="flex items-center py-1">
                                        <input id="notAvailable" type="checkbox" value={false}
                                            className="w-4 h-4 bg-gray-600 border-gray-300 accent-gray-500 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />

                                        <label htmlFor="notAvailable" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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