import axios from "axios";
import { useEffect, useRef, useState } from "react";
import BASE_URL from '../../assets/supportFile';

function EmployeeSearch() {

    const filter = useRef({ firstName: '', mobileNumber: '' });
    const [employeeSheet, setEmployeeSheet] = useState([]);
    const [sortIcon, setSortIcon] = useState({ name: 'firstName', desc: false });
   
    const [editProfile, setEditProfile] = useState({});

    useEffect(() => {

        fetchAllData();
    }, [])



    function fetchAllData() {

        axios.get(`${BASE_URL}/record`, { params: { firstName: filter.current.firstName, mobileNumber: filter.current.mobileNumber }, withCredentials:true }).then((result) => {
            
            console.log('get /record',result)
            
            if(result.data && result.status === 200)
           {
              setEmployeeSheet(result.data);
           }
        })

    }

    function fetchSortedData(e, element) {

        let profile = employeeSheet;
        console.log(sortIcon);
        if (sortIcon.name === element) {
            setSortIcon((pre) => ({ ...pre, desc: !pre.desc }))

            profile.sort((a, b) => {
                let x = a[element];
                let y = b[element];
                if (x > y) {
                    return !sortIcon.desc ? -1 : 1;
                }
                if (y > x) {
                    return !sortIcon.desc ? 1 : -1;
                }
                return 0;
            })

        } else {
            setSortIcon({ name: element, desc: true })
            profile.sort((a, b) => {
                let x = a[element];
                let y = b[element];
                if (x > y) {
                    return -1;
                }
                if (y > x) {
                    return 1;
                }
                return 0;
            })
        }



        setEmployeeSheet(profile);


    }
    function editDetails(e,element) {

        setEditProfile((pre)=>({...pre,[element]:e.target.value}));
        

    }

   async function syncEditedData (){

        axios.patch(`${BASE_URL}/record/${editProfile._id}`,editProfile,{withCredentials:true}).then(res=>{

            console.log(res)
            if (res.status === 200)
            {
                alert("successfully data edited")
                fetchAllData()
            }else(
                alert("Sorry, edit didn't work")
            )
        })
        setEditProfile({});
    

    }


    function clearFiter() {
        filter.current = { firstName: '', mobileNumber: '' }
    }

    function deleteRecords(e, id) {

        axios.delete(`${BASE_URL}/record/${id}`,{withCredentials:true}).then((response) => {

        console.log(response);
        if(response.status === 200)
        {
            alert("Record successfully deleted");

        }else{
            alert("something went wrong")
        }
        fetchAllData();
        })
    }


    return (
        <div className="contentArea">
            <div>
                <h3>Search Employee</h3>
            </div>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'end' }}>
                <div >
                    <label  htmlFor="name">Name</label>
                    <br />
                    <input
                    id="name"
                        placeholder="Employee Name"
                        name="name"
                        className="box1"
                        type="search"
                        onChange={(e) => { filter.current.firstName = e.target.value }}
                    //    value={filter.current.firstName}
                    />
                </div>
                <div >
                    <label htmlFor="mobile">mobile Number</label>
                    <br />
                    <input
                    id="mobile"
                        placeholder="Mobile Number"
                        name="mobile"
                        className="box1"
                        type="search"
                        onChange={(e) => { filter.current.mobileNumber = e.target.value }}
                    // value={filter.current.mobileNumber}
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-success " onClick={fetchAllData}>Search </button>
                    <button type="button" className="btn btn-danger mx-3" onClick={() => {

                        clearFiter();

                        fetchAllData();

                    }}>Clear</button>
                </div>
               
            </div>

             { editProfile._id &&<div className="popArea">
                <form className="popBox" onSubmit={syncEditedData} >
                    

                    <label htmlFor="firstName" >First name</label>
                    <input  type='text' name='firstName' defaultValue={editProfile.firstName}  onChange={(e) => { editDetails(e,'firstName') }} />
                    <label htmlFor="lastName" >Last Name</label>
                    <input type='text' name="lastName" defaultValue={editProfile.lastName} onChange={(e) => { editDetails(e,'lastName') }} />
                    <label htmlFor="mobileNumber" >Mobile Number</label>
                    <input type='tel' minLength={10} maxLength={10} name="mobileNumber" defaultValue={editProfile.mobileNumber} onChange={(e) => { editDetails(e,'mobileNumber') }} />
                    <label htmlFor="email" >Email</label>
                    <input type='email' defaultValue={editProfile.email} onChange={(e) => { editDetails(e,'email') }} />
                    <label htmlFor="gender" >Gender</label>
                    <input type='text' name="gender" defaultValue={editProfile.gender} onChange={(e) => { editDetails(e,'gender') }} />
                    <label htmlFor="dob" >Date of Birth</label>
                    <input type='date' name="dob" defaultValue={editProfile.dob} onChange={(e) => { editDetails(e,'dob') }} />
                    <label htmlFor="country" >Country</label>
                    <input type='text' name="country" defaultValue={editProfile.country} onChange={(e) => { editDetails(e,'country') }} />
                    <label htmlFor="city" >City</label>
                    <input type='text' name='city' defaultValue={editProfile.city} onChange={(e) => { editDetails(e,'city') }} />
                    <div>
                    <button type="submit" className="btn btn-success ">Save</button>
                    <button type="button" className="btn btn-danger mx-3 " onClick={()=>{setEditProfile({})}}>Close</button>
                    </div>

                </form>

            </div> 

            }


            <div>

                <table className="showTable">
                    <thead>
                        <tr>
                            <th onClick={(e) => fetchSortedData(e, 'firstName')}>
                                First Name
                                <div className={sortIcon.name === 'firstName' ? 'sortIcon selected' : 'sortIcon'} >{sortIcon.name === 'firstName' && sortIcon.desc ? 'desc' : 'asc'}</div>
                            </th>
                            <th name='lastName' onClick={(e) => fetchSortedData(e, 'lastName')}>
                                Last Name
                                <div className={sortIcon.name === 'lastName' ? 'sortIcon selected' : 'sortIcon'}>{sortIcon.name === 'lastName' && sortIcon.desc ? 'desc' : 'asc'}</div>
                            </th>
                            <th onClick={(e) => fetchSortedData(e, 'mobileNumber')} >
                                Mobile No
                                <div className={sortIcon.name === 'mobileNumber' ? 'sortIcon selected' : 'sortIcon'}>{sortIcon.name === 'mobileNumber' && sortIcon.desc ? 'desc' : 'asc'}</div>
                            </th>
                            <th onClick={(e) => fetchSortedData(e, 'email')}>
                                Email ID
                                <div className={sortIcon.name === 'email' ? 'sortIcon selected' : 'sortIcon'}>{sortIcon.name === 'email' && sortIcon.desc ? 'desc' : 'asc'}</div>
                            </th>
                            <th onClick={(e) => fetchSortedData(e, 'gender')}>
                                Gender
                                <div className={sortIcon.name === 'gender' ? 'sortIcon selected' : 'sortIcon'}>{sortIcon.name === 'gender' && sortIcon.desc ? 'desc' : 'asc'}</div>
                            </th>
                            <th onClick={(e) => fetchSortedData(e, 'dob')}>
                                Birth Date
                                <div className={sortIcon.name === 'dob' ? 'sortIcon selected' : 'sortIcon'}>{sortIcon.name === 'dob' && sortIcon.desc ? 'desc' : 'asc'}</div>
                            </th>
                            <th onClick={(e) => fetchSortedData(e, 'country')}>
                                Country
                                <div className={sortIcon.name === 'country' ? 'sortIcon selected' : 'sortIcon'}>{sortIcon.name === 'country' && sortIcon.desc ? 'desc' : 'asc'}</div>
                            </th>
                            <th onClick={(e) => fetchSortedData(e, 'city')}>
                                City
                                <div className={sortIcon.name === 'city' ? 'sortIcon selected' : 'sortIcon'}>{sortIcon.name === 'city' && sortIcon.desc ? 'desc' : 'asc'}</div>
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employeeSheet.map((e, index) => {

                                return (
                                    <tr key={index}>
                                        <td>
                                            {e.firstName}
                                        </td>
                                        <td>
                                            {e.lastName}
                                        </td>
                                        <td>
                                            {e.mobileNumber}
                                        </td>
                                        <td>
                                            {e.email}
                                        </td>
                                        <td>
                                            {e.gender}
                                        </td>
                                        <td>
                                            {e.dob}
                                        </td>
                                        <td>
                                            {e.country}
                                        </td>
                                        <td>
                                            {e.city}
                                        </td>
                                        <td>
                                            <button type="button" style={{ padding: '0' }} className="btn btn-success btn-sm p" onClick={() => { setEditProfile(e) }}>Edit</button>
                                            <button type="button" style={{ padding: '0' }} className="btn btn-danger btn-sm mx-2" onClick={(event) => { deleteRecords(event, e._id) }}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>

            </div>
        </div>
    );
}

export default EmployeeSearch;
