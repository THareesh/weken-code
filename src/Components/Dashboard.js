import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { unAuthorised } from '../ReduxStore/Action';
import Axios from 'axios';

const Dashboard = (props) => {
    const logoutUser = () => {
        props.unAuthorised();
        localStorage.removeItem("user");
    }
    useEffect(() => {
        const getHorese = async () => {
            const { userData } = props;
            const config = { headers: { "Authorization": `Bearer ${userData ? userData.data.access_token : ''}` } }
            const horses = await Axios.get("/horses", config);
            console.log(horses.data);
        }
        getHorese();
    })
    return (
        <Fragment>
            <h1 style={{ textAlign: 'center' }}>
                Welcome to the dashboard
                <button className="btn-danger" onClick={logoutUser}>Logout</button>
            </h1>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    userData: state.data
})
export default connect(mapStateToProps, { unAuthorised })(Dashboard);
