import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { unAuthorised, setHorsesData } from '../ReduxStore/Action';
import Axios from 'axios';


//Staller123#
const Dashboard = (props) => {
    const logoutUser = () => {
        props.unAuthorised();
        localStorage.removeItem("user");
    }
    useEffect(() => {
        const getHorese = async () => {
            const { userData } = props;
            const config = { headers: { "Authorization": `Bearer ${userData ? userData.data.access_token : ''}` } }
            try {
                const horses = await Axios.get("/horses", config);
                props.setHorsesData(horses.data)
            } catch (err) {
                console.log(err)
            }
        }
        getHorese();
    }, []);
    
    console.log(props.horses)
    return (
        <Fragment>
            <h1 style={{ textAlign: 'center' }}>
                <button className="btn-danger" onClick={logoutUser}>Logout</button>
                {props.horses.data && props.horses.data.map(horse => {
                    console.log(horse);
                })}
            </h1>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    userData: state.data,
    horses: state.horses
})
export default connect(mapStateToProps, { unAuthorised, setHorsesData })(Dashboard);
