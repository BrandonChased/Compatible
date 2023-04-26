import React, { useState } from 'react'
import '../App.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function OnBoarding() {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [user, setUser] = useState({
        _id: cookies.UserId,
        name: "",
        birthdate: "",
        gender: "Man",
        genderPreference: "Men",
        images: []
    });
    const [genderSelected, setGenderSelected] = useState(true);
    const [genderPreferenceSelected, setGenderPreferenceSelected] = useState(true);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleGenderSelected = (e) => {
        const { name, value } = e.target;
        if (value === "Man") {
            setGenderSelected(true)
        } else if (value === "Woman") {
            setGenderSelected(false)
        }
        setUser(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleGenderPreferenceSelected = (e) => {
        const { name, value } = e.target;
        console.log(value)
        if (value === "Men") {
            setGenderPreferenceSelected(true)
        } else if (value === "Women") {
            setGenderPreferenceSelected(false)
        }
        setUser(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const [images, setImages] = useState([]);

    const handleImageUpload = (event, index) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const newImages = [...images];
            newImages[index] = reader.result;
            setImages(newImages);
            setUser(prev => {
                return {
                    ...prev,

                }
            })
        };
    };

    const handleDelete = (index) => {
        const newImages = [...images];
        newImages[index] = null
        setImages(newImages);
    };

    const validateForm = (values) => {
        let errors = {};
        if (!values.name) {
            errors.name = "Name is required";
        }
        return errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(user);
        if (Object.keys(validationErrors).length === 0) {
            axios.put("http://localhost:8000/api/users", {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:8000'
                },
                id: user._id,
                name: user.name,
                age: user.birthdate,
                gender: user.gender,
                genderPreference: user.genderPreference,
                images: images
            })
                .then(res => {
                    console.log(res.data)
                    setCookie("UserId", res.data._id)
                    setCookie("genderPreference", res.data.genderPreference)
                    setUser({})
                    navigate("/dashboard")
                })
                .catch(err => {
                    console.error(err)
                })
        } else {
            setErrors(validationErrors);
            console.log(validationErrors)
        }
    };

    return (
        <div className='container'>
            <div className='container d-flex flex-column justify-content-around'>
                <i className='fa-solid fa-handshake fa-3x' style={{ color: "#2fa4e7" }}></i>
                <p className='h4 text-dark'>Tell us a little more about yourself</p>
                <p className='text-grey'>
                    We need a little more information about you to help you connect with others
                </p>
                <form className='d-flex flex-column' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <div className='d-flex justify-content-between align-items-center' style={{ maxWidth: "100%", flexWrap: "wrap" }}>
                            {[0, 1, 2, 3, 4, 5].map((index) => {
                                return (images[index] ?
                                    <div className={index > 2 && window.screen.width < 459 ? "mb-0" : "mb-2"} key={index} style={{ overflow: "hidden", position: "relative" }}>
                                        <img className=' border border-dark' style={{ borderRadius: "4px", height: "100px", width: "100px" }} alt="images" src={images[index]} />
                                        <i className="fa-solid fa-circle-xmark" style={{ position: "absolute", bottom: 0, right: 0, color: "black", cursor: "pointer" }} onClick={() => handleDelete(index)}></i>
                                    </div>
                                    :
                                    <div className={`input-wrapper d-flex justify-content-center ${index > 2 && window.screen.width < 459 ? "mb-0" : "mb-4"}`} style={{ width: "100px" }} key={index}>
                                        <div>
                                            <input type="file" id={`fileInput${index}`} name={`myFile${index}`} onChange={(event) => { handleImageUpload(event, index) }} />
                                            <label htmlFor={`myFile${index}`} className="file-label btn btn-light d-flex justify-content-center align-items-center">
                                                <i className="fa-solid fa-photo-film border-dark"></i>
                                                <i className="fa-solid fa-circle-plus mt-3"></i>
                                            </label>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='name' className='text-left d-flex w-100 m-0'>First Name</label>
                        <input onChange={handleChange} type="text" className='form-control' name='name' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='birthdate' className='text-left d-flex w-100 m-0'>Birthdate</label>
                        <input onChange={handleChange} type="date" className='form-control px-4' name='birthdate' />
                    </div>
                    <div className='form-group'>
                        <label className='text-left d-flex'>I am a...</label>
                        <div className='d-flex justify-content-around'>
                            <input readOnly onClick={handleGenderSelected} className={`btn form-control text-center ${genderSelected ? "btn-primary" : "btn-light"}`} style={{ width: "35%" }} name="gender" value="Man" />
                            <input readOnly onClick={handleGenderSelected} className={`btn form-control text-center ${genderSelected ? "btn-light" : "btn-primary"}`} style={{ width: "35%" }} name="gender" value="Woman" />
                        </div>
                    </div>
                    <div className='form-group'>
                        <label className='text-left d-flex'>I interested in ...</label>
                        <div className='d-flex justify-content-around'>
                            <input readOnly onClick={handleGenderPreferenceSelected} className={`btn form-control text-center ${genderPreferenceSelected ? "btn-primary" : "btn-light"}`} style={{ width: "35%" }} name="genderPreference" value="Men" />
                            <input readOnly onClick={handleGenderPreferenceSelected} className={`btn form-control text-center ${genderPreferenceSelected ? "btn-light" : "btn-primary"}`} style={{ width: "35%" }} name="genderPreference" value="Women" />
                        </div>
                    </div>
                    <button className='btn btn-primary w-50' style={{ margin: "0 auto" }}>Create my profile</button>
                </form>
            </div>
        </div>
    )
}

export default OnBoarding