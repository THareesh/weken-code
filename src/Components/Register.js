import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { authenticated, unAuthorised , resetEdit } from '../ReduxStore/Action'
import Axios from 'axios';

const Register = (props) => {
    const [state, setState] = useState({
        horse_name: "",
        horse_number: "",
        age_verified: false,
        dob: "",
        color: "",
        ushja_registered: false
    });

    const { horse_name, horse_number, age_verified, dob, color, ushja_registered } = state;

    useEffect(() => {
        if (props.editable) {
            // console.log(props.editData);
            const { horse_name, horse_number, age_verified, dob, color, ushja_registered } = props.editData;
            setState({
                ...state,
                horse_name,
                horse_number,
                age_verified: age_verified === 1 ? "yes" : "no",
                dob,
                color,
                ushja_registered: ushja_registered === 1 ? true : false
            });
        }
    },[]);

    const setInput = event => {
        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;
        setState({ ...state, [input.name]: value });
    }

    const handleSubmitForm = async event => {
        event.preventDefault();
        const { userData } = props;
        const data = {
            horse_name,
            horse_number,
            age_verified: age_verified === 'yes' ? true : false,
            dob, color,
            ushja_registered
        }
        const config = { headers: { "Authorization": `Bearer ${userData ? userData.data.access_token : ''}` } }
        if (!props.editable) {
            try {
                const response = await Axios.post("/horses", data, config);
                console.log(response.data)
                props.history.push("/dashboard");
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const response = await Axios.put(`/horses/${props.editData.id}`, data, config);
                console.log(response.data)
                props.resetEdit();
                props.history.push("/dashboard");
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <Fragment>
            <div className="container my-5">
                <div className="col-lg-6 m-auto">
                    <div className="card card-body">
                        <h3 className="text-center text-primary">Horses Registration Form</h3>
                        <form onSubmit={handleSubmitForm}>
                            <div className="form-group">
                                <label htmlFor="horse_name">horse_name :</label>
                                <input
                                    value={horse_name}
                                    onChange={setInput}
                                    type="text"
                                     id="horse_name"
                                    name="horse_name"
                                    className="form-control" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="horse_number">horse_number:</label>
                                <input
                                    value={horse_number}
                                    onChange={setInput}
                                    type="number"
                                    id="horse_number"
                                    name="horse_number"
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        value={age_verified}
                                        onChange={setInput}
                                        type="radio"
                                        className="custom-control-input"
                                        id="yes"
                                        name="age_verified"
                                        checked={age_verified === 'yes'}
                                        value="yes" />
                                    <label className="custom-control-label" htmlFor="yes">Yes</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        value={age_verified}
                                        checked={age_verified === 'no'}
                                        onChange={setInput}
                                        type="radio"
                                        className="custom-control-input"
                                        id="no"
                                        name="age_verified"
                                        value="no" />
                                    <label className="custom-control-label" htmlFor="no">no</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob">Dob :</label>
                                <input
                                    value={dob}
                                    onChange={setInput}
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob">color :</label>
                                <select name="color" defaultValue={color} className="custom-select" onChange={setInput} >
                                    <option value="">select an color</option>
                                    <option value="red">red</option>
                                    <option value="blue">blue</option>
                                    <option value="green">green</option>
                                </select>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input
                                    value={ushja_registered}
                                    checked={ushja_registered}
                                    onChange={setInput}
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="ushja_registered"
                                    name="ushja_registered" />
                                <label className="custom-control-label" htmlFor="ushja_registered">ushja_registered?</label>
                            </div>
                            <button className="btn btn-primary mt-3 " type="submit">
                                {props.editable ? 'Update' : 'Submit'}
                            </button>
                            <button type="reset" className="btn btn-danger ml-2 mt-3">RESET</button>
                        </form>

                    </div>
                </div>
            </div>


        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth,
    userData: state.data,
    editable: state.edit,
    editData: state.editHorse
});

export default connect(mapStateToProps, { authenticated, unAuthorised ,resetEdit })(Register);