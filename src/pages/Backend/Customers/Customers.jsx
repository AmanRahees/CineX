import React, {useState, useEffect, useContext} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../../../contexts/AuthContext'
import axiosInstance from '../../../services/axios'
import Panel from '../../../components/Backend/Panel/Panel'
import Table from '../../../components/Backend/Table/Table'
import Modal from '../../../components/Backend/Modal/Modal'
import Pagination from '../../../components/Backend/Pagination/Pagination'
import "./customer.css"

function Customers() {
    const {authTokens, UserLogout, setLoading} = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState();
    const [blockDv, setBlockDv] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 20;
    const activeUser = users.filter(user => user.is_active === true).length;
    useEffect(()=>{
        setLoading(true)
        axiosInstance.get("admin/customers", {
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            }
        }).then((response)=>{
            setUsers(response.data);
        }).catch((error)=>{
            console.log(error);
            if (error.response.status === 401){
                UserLogout();
            }
        })
        setLoading(false);
    }, [])
    const userStatusHandler = () => {
        axiosInstance.post("admin/customers", {
            userId: userId
        },{
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            }
        }).then((response)=>{
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                user.id === userId ? { ...user, is_active: !user.is_active } : user
                )
            );
            setBlockDv(false);
        }).catch((error)=>{
            console.log(error);
        })
    }
    const blockDvHandler = (id) => {
        setBlockDv(!blockDv);
        setUserId(id);
    }
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const filteredUsers = users.filter((user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredUsers.slice(startIndex, endIndex);    
  return (
    <Panel>
        <h1 className='text-xl font-poppins'>Customers</h1>
        <span className='font-poppins text-xs'>{activeUser} Actives<i className='text-green-400'>*</i></span>

        <div className="search-wrapper">
            <button type='submit'>
                <FontAwesomeIcon icon={faSearch}/>
            </button>
            <input type="text" placeholder='Search...' name="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <Pagination data={filteredUsers} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={handlePageChange} />  
        <Table>
            <thead>
                <tr className='text-sm'>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                </tr>
            </thead>
            {currentData.length > 0 ? (
            <tbody>
                {currentData.map((user, index)=>(
                    <tr className='text-sm' key={index}>
                        <td>#{user.id}</td>
                        <td className='capitalize'>{user.username}</td>
                        <td>{user.email}</td>
                        {
                        <td>{user.is_active === true ? 
                        <button onClick={()=>blockDvHandler(user.id)} className='py-0 md:py-1 px-2 bg-green-500 text-white rounded-2xl'>
                            Active
                        </button> 
                        :<button onClick={()=>blockDvHandler(user.id)} className='py-0 md:py-1 px-2 bg-red-600 text-white rounded-2xl'>
                            Blocked
                        </button>}</td>
                        }
                    </tr>
                ))}
            </tbody>):
            (
                <tfoot>
                    <tr>
                        <td className='md:text-3xl absolute font-poppins' style={{left:"50%"}}>No Results!</td>
                    </tr>
                </tfoot>
            )}
        </Table>

        {blockDv &&
        <Modal>
            <h3 className='text-lg font-poppins md:text-lg py-2 ps-2'>Change Status</h3>
            <hr />
            <p className='p-2 md:pe-20 md:text-base text-sm'>Are you sure change customer status?</p>
            <hr />
            <button onClick={()=>userStatusHandler()} className='px-3 py-1 bg-red-600 mt-2 float-right ms-3 text-sm md:text-base rounded-lg'>Yes</button>
            <button onClick={()=>setBlockDv(!blockDv)} className='px-3 py-1 bg-gray-600 mt-2 float-right text-sm md:text-base rounded-lg'>No</button>
        </Modal>}

    </Panel>
  )
}

export default Customers;