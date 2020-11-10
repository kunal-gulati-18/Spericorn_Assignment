import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { updateItemTable } from '../redux/Actions/userAction';
import { useSelector, useDispatch } from 'react-redux';
import './css/Component1.css';
import './css/Component3.css';
const Component3 = () => {


    const dispatch = useDispatch();
    const history = useHistory();
    //id value is obtained from the params.
    var { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [active, setActive] = useState('');

    const [stateInfo, setStateInfo] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const [url, setUrl] = useState('');
    const [image, setImage] = useState('');
    const [statesValue, setState] = useState([]);
    const [result, setResult] = useState([]);
    const [stateShow, setStateShow] = useState(true);

    const data = useSelector(state => state.userDetails)

    //fetches the data from the github link and puts it inside country combo box
    useEffect(() => {

        fetch('https://gist.githubusercontent.com/ebaranov/41bf38fdb1a2cb19a781/raw/fb097a60427717b262d5058633590749f366bd80/gistfile1.json', {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                setResult(data.countries);
            })

            .catch(err => {
                console.log(err);
            })


        if (data.length > 0) {
            data.find(item => {
                if (item.id == id) {
                    setFirstName(item.firstName);
                    setLastName(item.lastName);
                    setAge(item.age);
                    setEmail(item.email);
                    setActive(item.active);
                    setStateInfo(item.stateInfo);
                    setCountry(item.country);
                    setPhone(item.phone);
                    setUrl(item.photo)
                }
            })
        }
    }, [data, dispatch])

    //used to handle upload image functionality
    const createPost = () => {

        if (image == '') {
            return alert('Please add an Image!!')
        }

        const dataval = new FormData();  //as we are uploading a file
        dataval.append("file", image);
        dataval.append("upload_preset", "Spericorn");
        dataval.append("cloud_name", "dqkkq9abg");

        fetch("https://api.cloudinary.com/v1_1/dqkkq9abg/image/upload", {

            method: "POST",
            body: dataval
        })
            .then(res => res.json())
            .then(dataval => {
                setUrl(dataval.url);

            })
            .catch(err => {
                console.log(err);
            })



    }
    const handleUpdate = () => {
        if (firstName == '' || lastName == '' || age == '' || email == '' || active == '' || phone == '' || stateInfo == '' || country == '') {
            return alert('Please add all the fields!!')
        }

        else {
            var numbers = /^[0-9]+$/;
            var letters = /^[A-Za-z]+$/;
            if (!age.match(numbers)) {
                return alert('Age should be a number!!')
            }

            if (!firstName.match(letters) || !lastName.match(letters)) {
                return alert('Firstname/Lastname should be a string!!')
            }

            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                return alert('Invalid Email!!')
            }

        }

        var photo = '';
        if (url != '') {
            photo = url;
        }

        else {
            photo = 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png'
        }
        id = Number(id);
        var userInfo = {
            id,
            firstName,
            lastName,
            age,
            email,
            active,
            stateInfo,
            country,
            phone,
            photo
        }

        dispatch(updateItemTable(userInfo));

        alert('Data Updated Successfully!!')

        history.push('/');
    }

    return (
        <>
            <h1>Update Details <i className="fa fa-plus" aria-hidden="true" style={{ color: "mediumblue" }}></i></h1>
            <div className="component3">

                <div>
                    <img src={url ? url : "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png"} alt="Profile Image" height="150" width="150" />
                    <div className="file-field input-field">
                        <div className="btn blue">
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                        </div>

                    </div>


                    <button className="upload_button" type="submit" name="action" onClick={createPost}>Upload
            <i className="material-icons"></i>
                    </button>
                </div>
                <div className="component1_fields">

                    <label>FirstName</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name.." />
                    <label>LastName</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name.." />
                    <label>Age</label>
                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter Age.." />
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email.." />
                    <label>Active</label>
                    <select id="active_id" value={active} onChange={(e) => setActive(e.target.value)}>
                        <option value="Active">Yes</option>
                        <option value="Inactive">No</option>
                    </select>

                    <label>State</label>

                    <select id="state" value={stateInfo} onChange={(e) => setStateInfo(e.target.value)}>
                        {
                            statesValue.map(item => (
                                <option>{item}</option>
                            ))
                        }



                    </select>

                    <label>Country</label>
                    <select id="country" value={country} onChange={(e) => {
                        setCountry(e.target.value);
                        setStateShow(false);
                        result.find((itemval) => {
                            if (itemval.country == document.getElementById('country').value) {
                                setState(itemval.states);
                            }
                        })
                    }}>
                        {
                            result.map(item => (
                                <option>{item.country}</option>
                            ))
                        }

                    </select>

                    <label>Phone Number</label>
                    <input type="text" placeholder="Enter Phone Number.." value={phone} onChange={(e) => setPhone(e.target.value)} />

                    <button className="update-button_style" onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </>
    )
}

export default Component3;