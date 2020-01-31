import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { unAuthorised, setHorsesData, deleteHorse, editHorse, resetEdit } from '../ReduxStore/Action';
import Axios from 'axios';


//Staller123#
const Dashboard = (props) => {

    const { userData } = props;
    const config = { headers: { "Authorization": `Bearer ${userData ? userData.data.access_token : ''}` } }

    const logoutUser = () => {
        props.unAuthorised();
        localStorage.removeItem("user");
    }
    useEffect(() => {
        const getHorese = async () => {
            try {
                const horses = await Axios.get("/horses", config);
                props.setHorsesData(horses.data.data)
            } catch (err) {
                console.log(err)
            }
        }
        getHorese();
        props.resetEdit();
    }, []);

    const deleteHorse = async id => {
        try {
            await Axios.delete(`/horses/${id}`, config);
            props.deleteHorse(id);
        } catch (err) {
            console.log(err);
        }
    }

    const editHorse = (horse) => {
        props.editHorse(horse);
        props.history.push('/register');
    }

    return (
        <Fragment>
            <h1 style={{ textAlign: 'center' }}>
                <button className="btn-danger" onClick={logoutUser}>Logout</button>
            </h1>
            <button
                className="btn btn-primary ml-3"
                onClick={() => props.history.push('register')}>
                Add New Horse
                </button>
            <div className="container">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Horse Number</th>
                            <th>Horse Name</th>
                            <th>Horse color</th>
                            <th>Date of Birth</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.horses !== null && props.horses && props.horses.map(horse => (
                            <tr key={horse.id}>
                                <td>{horse.horse_number}</td>
                                <td>{horse.horse_name}</td>
                                <td>{horse.color}</td>
                                <td>{horse.dob}</td>
                                <td>
                                    <button onClick={() => editHorse(horse)} className="btn btn-sm btn-info">Edit</button>
                                    <button onClick={() => deleteHorse(horse.id)} className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    userData: state.data,
    horses: state.horses
})
export default connect(mapStateToProps,
    {
        unAuthorised,
        setHorsesData,
        deleteHorse,
        editHorse,
        resetEdit
    })(Dashboard);
