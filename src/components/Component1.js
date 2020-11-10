import React, { useEffect, useState } from 'react';
import { addItemTable } from '../redux/Actions/userAction'
import { useSelector, useDispatch } from 'react-redux';

import './css/Component1.css'

const Component1 = () => {


    const dispatch = useDispatch();

    //made use of useState for component level state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [active, setActive] = useState('Active');

    const [stateInfo, setStateInfo] = useState('Delhi');
    const [country, setCountry] = useState('India');
    const [phone, setPhone] = useState('');

    const [statesValue, setState] = useState([]);
    const [result, setResult] = useState([]);
    const [stateShow, setStateShow] = useState(true);
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');

    //use selector for accessing the redux state
    var id = useSelector(state => state.id)

    //function used to upload image
    const createPost = () => {

        if (image == '') {
            return alert('Please add an Image!!')
        }
        const data = new FormData();  //as we are uploading a file
        data.append("file", image);
        data.append("upload_preset", "Spericorn");
        data.append("cloud_name", "dqkkq9abg");

        fetch("https://api.cloudinary.com/v1_1/dqkkq9abg/image/upload", {

            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url);

            })
            .catch(err => {
                console.log(err);
            })



    }

    //it is used to perform sideeffects, fetches the data from the github link and puts it inside country combo box
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
    }, [])

    //handles the functionality when a user clicks submit button
    const handleSubmit = () => {

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
        id = id + 1;
        var photo = '';
        if (url != '') {
            photo = url;
        }

        else {
            photo = 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png'
        }


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

        //dispatch is used to fire an action
        dispatch(addItemTable(userInfo));

        setFirstName('');
        setLastName('');
        setAge('');
        setPhone('');
        setEmail('');
        setCountry('');
        setStateInfo('');
        setStateShow(true);
        setState([]);
        setUrl('');
        setImage('')
        alert('Records Added Successfully!!')
    }

    return (
        <>
            <h1>Add Details <i className="fa fa-plus" aria-hidden="true" style={{ color: "mediumblue" }}></i></h1>
            <div className="component1">
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

                    <select id="state" value={stateInfo} onChange={(e) => setStateInfo(e.target.value)} disabled={stateShow}>
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

                    <button className="submit_button" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    )
}

export default Component1;