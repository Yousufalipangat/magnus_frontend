import { useEffect, useState } from "react";
import "../../css/employeeCreate.css";
import axios from "axios";
import BASE_URL from "../../assets/supportFile";

function EmployeeCreate() {
    const [profile, setProfile] = useState({
        firstName: "", 
        lastName: "",
        email: "" ,
        mobileNumber: "",
        dob: "" ,
        gender: "",
        address: "",
        country: "",
        city: "",
        otherCity: ""
});
    const [otherCity, setOtherCity] = useState(false);

    useEffect(() => {

    }, [])


    function addEmployee(e) {

        axios.post(`${BASE_URL}/record/`, { ...profile }).then((res) => {

            if (res.status === 200) {
                setProfile({
                    firstName: "", 
                    lastName: "",
                    email: "" ,
                    mobileNumber: "",
                    dob: "" ,
                    gender: "",
                    address: "",
                    country: "",
                    city: "",
                    otherCity: ""
            });
                alert("record added");

            } else {
                setProfile({
                    firstName: "", 
                    lastName: "",
                    email: "" ,
                    mobileNumber: "",
                    dob: "" ,
                    gender: "",
                    address: "",
                    country: "",
                    city: "",
                    otherCity: ""
            });
                alert("Sorry something went wrong , record not added");
            }


        })
        e.preventDefault();
    }

    const country = [

        {
            country: 'india',
            city: ['ind_c1', 'ind_c2', 'ind_c3']
        },
        {
            country: 'france',
            city: ['fra_c1', 'fra_c2', 'fra_c3']
        },
        {
            country: 'german',
            city: ['ger_c1', 'ger_c2', 'ger_c3']
        },
        {
            country: 'poland',
            city: ['pol_c1', 'pol_c2', 'pol_c3']
        },
        {
            country: 'USA',
            city: ['usa_c1', 'usa_c2', 'usa_c3']
        }
    ]

    function addOtherCity(e) {
        setOtherCity((e) => !e)
    }

    function updateProfile(e) {



        switch (e.target.name) {
            case 'firstName':
                setProfile((prev) => ({ ...prev, firstName: e.target.value }));
                break;
            case 'lastName':
                setProfile((prev) => ({ ...prev, lastName: e.target.value }));
                break;
            case 'email':
                setProfile((prev) => ({ ...prev, email: e.target.value }));
                break;
            case 'mobileNumber':
                setProfile((prev) => ({ ...prev, mobileNumber: e.target.value }));
                break;
            case 'dob':
                setProfile((prev) => ({ ...prev, dob: e.target.value }));
                break;
            case 'gender':
                setProfile((prev) => ({ ...prev, gender: e.target.value }));
                break;
            case 'address':
                setProfile((prev) => ({ ...prev, address: e.target.value }));
                break;
            case 'country':
                setProfile((prev) => ({ ...prev, country: e.target.value }));
                break;
            case 'city':
                setProfile((prev) => ({ ...prev, city: e.target.value }));
                break;
            case 'otherCity':
                setProfile((prev) => ({ ...prev, otherCity: e.target.value }));
                break;
            case 'skills':
                if (e.target.checked) {
                    setProfile((prev) => {
                        return { ...prev, skills: (prev.skills ? [...(prev.skills), e.target.value] : [e.target.value]) }
                    })
                } else {

                    setProfile((prev) => ({ ...prev, skills: prev.skills.filter((item) => (item !== e.target.value && item)) }));
                }
                break;
            default:
                break;

        }

    }

    return (
        <div className="contentArea">

            <div>
                <h3>Employee</h3>
                <h5>create</h5>
            </div>
            <form method="post" onSubmit={e => addEmployee(e)}>
                <table>
                    <tbody>
                        <tr className="section">
                            <td>
                                <label htmlFor="firstName"> First Name</label>
                                <br />
                                <input
                                    placeholder="First Name"
                                    name="firstName"
                                    value={profile.firstName}
                                    className="box1"
                                    type="text"
                                    onChange={(e) => { updateProfile(e) }}
                                    required
                                />
                            </td>
                            <td>
                                <label htmlFor="lastName">Last Name</label>
                                <br />
                                <input
                                    placeholder=" Last Name"
                                    value={profile.lastName}
                                    name="lastName"
                                    className="box1"
                                    type="text"
                                    onChange={(e) => { updateProfile(e) }}
                                    required

                                />
                            </td>
                            <td>
                                <label htmlFor="email">Email</label>
                                <br />
                                <input placeholder="email" name="email" className="box1" type="email"
                                value={profile.email}
                                    onChange={(e) => { updateProfile(e) }}
                                    required
                                />
                            </td>
                        </tr>
                        <tr className="section">
                            <td >
                                <label htmlFor="mobileNumber">Mobile Number</label>
                                <br />
                                <input
                                    placeholder="mobile number"
                                    value={profile.mobileNumber}
                                    name="mobileNumber"
                                    className="box1"
                                    type="number"
                                    maxLength={10}
                                    onChange={(e) => { updateProfile(e) }}
                                    required
                                    minLength={10}
                                />
                            </td>
                            <td>
                                <label htmlFor="dob">Date of Birth</label>
                                <br />
                                <input name="dob" className="box1" type="date"
                                value={profile.dob}
                                    onChange={(e) => { updateProfile(e) }}
                                    required />
                            </td>
                            <td>
                                <label htmlFor="gender">Gender</label>
                                <br />
                                <label htmlFor="gender">Male</label>
                                <input name="gender" value="male" type="radio" checked={profile.gender==='male' }
                                    required onChange={(e) => { updateProfile(e) }}
                                />
                                <label htmlFor="gender">Female</label>
                                <input name="gender" value="female" type="radio" checked={profile.gender==='female'}
                                    required onChange={(e) => { updateProfile(e) }}
                                />
                            </td>
                        </tr>
                        <tr>

                            <td colSpan={3}>
                                <label htmlFor="address">Address</label>
                                <br />
                                <textarea name="address"
                                value={profile.address}
                                    required
                                    onChange={(e) => { updateProfile(e) }}
                                />
                            </td>


                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="country" >Country</label><br />
                                <select name="country" className="box1" placeholder="select country" id="country"
                                    onChange={(e) => { updateProfile(e) }} required>
                                    <option value="NA" >select country</option>
                                    {country.map((item, index) => <option key={index} value={item.country}>{item.country}</option>)}
                                </select>

                            </td>
                            <td>
                                <label htmlFor="city" >City</label><br />
                                <select name="city" className="box1" placeholder="select city" id="city" required
                                    disabled={otherCity}
                                    onChange={(e) => { updateProfile(e) }}>
                                    <option value="NA" >select city</option>
                                    {
                                        profile.country && (country.filter((item) => item.country === profile.country && item.city)[0].city)
                                            .map((item, index) => {
                                                return <option key={index} value={item}>{item}</option>
                                            }
                                            )
                                    }
                                </select>

                            </td>
                            <td>
                                <label htmlFor="otherCity">Other City</label>
                                <input name="otherCity" type="checkbox"
                                    onChange={(e) => { addOtherCity(e) }}
                                />
                            </td>
                        </tr>
                        {otherCity &&
                            <tr>
                                <td>

                                    <label htmlFor="otherCity">Other City</label>
                                    <br />
                                    <input name="otherCity" className="box1" type="text" required
                                        onChange={(e) => { updateProfile(e) }} />
                                </td>
                            </tr>
                        }
                        <tr>
                            <td>
                                <label htmlFor='skills'>Skills</label>
                            </td>
                            <td colSpan={2} >
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <input name="skills" type="checkbox" value="AWS" onChange={(e) => { updateProfile(e) }} />
                                        <label htmlFor="skills" >AWS</label><br />
                                        <input name="skills" type="checkbox" value="DevOps" onChange={(e) => { updateProfile(e) }} />
                                        <label htmlFor="skills" >DevOps</label>
                                    </div>
                                    <div>
                                        <input name="skills" type="checkbox" value="Full Stack Developer" onChange={(e) => { updateProfile(e) }} />
                                        <label htmlFor="skills" >Full Stack Developer</label><br />
                                        <input name="skills" type="checkbox" value="Middleware" onChange={(e) => { updateProfile(e) }} />
                                        <label htmlFor="skills" >Middleware</label>
                                    </div>
                                    <div>
                                        <input name="skills" type="checkbox" value="QA-Automation" onChange={(e) => { updateProfile(e) }} />
                                        <label htmlFor="skills" >QA-Automation</label><br />
                                        <input name="skills" type="checkbox" value="WebServices" onChange={(e) => { updateProfile(e) }} />
                                        <label htmlFor="skills" >WebServices</label>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" className="btn btn-success ">Save</button>
                                <button type="button" className="btn btn-danger mx-3">Cancel</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default EmployeeCreate;
