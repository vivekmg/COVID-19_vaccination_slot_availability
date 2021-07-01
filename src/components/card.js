import React from 'react';
import './card.css';
import Image from '../Vaccine.png';

function Card(props) {

    if (props.errorFlag) {

        return (

            // Alert message 
            <div className="alert-div">
                <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </symbol>
                </svg>

                <div className="alert alert-danger col-md-4 col-10" role="alert">
                    <div className="text-center">
                        <svg className="bi flex-shrink-0 me-2" width="20" height="18" role="img" aria-label="Danger:">
                            <use xlinkHref="#exclamation-triangle-fill" />
                        </svg>
                        No Vaccination center is available for booking.
                    </div>
                </div>
            </div>
        )
    }
    
    else {
        return (
            <>
                <div className="container" style={{ margin: "60px 0px" }}>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {
                            props.Data.map((curElem) => {

                                const { session_id, name, address, fee_type, fee, vaccine, min_age_limit, available_capacity_dose1, available_capacity_dose2, available_capacity } = curElem;

                                return (

                                    <div className="col" key={session_id}>
                                        <div className="card">
                                            <img src={Image} className="card-img mx-auto" alt="" />
                                            <div className="card-body d-flex flex-column card-img-overlay">
                                                <div className="card-header sticky-top rounded" style={{ backgroundColor: available_capacity ? '#198754' : '#dc3545' }}>
                                                    <div className="text-center text-white">
                                                        {available_capacity ? 'Available' : 'Booked'}
                                                    </div>
                                                </div>

                                                <div className="scrollable-card">
                                                    <div className="card-title">
                                                        {name}
                                                    </div>
                                                    <div className="card-subtitle md-2 text-muted" style={{ fontSize: "15px" }}>
                                                        {address.toLowerCase()}
                                                    </div>
                                                    <div className="card-text">
                                                        <ul className="list-group">
                                                            {(() => {
                                                                if (fee_type === 'Free') {
                                                                    return (
                                                                        <li>Fee Type : {fee_type} </li>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <li>Fee Type : {fee_type} (₹{fee}) </li>
                                                                    )
                                                                }
                                                            })()}
                                                            <li>Name : {vaccine} </li>
                                                            <li>Age : {min_age_limit}+ </li>
                                                            <li>Available Dose 1 : {available_capacity_dose1} </li>
                                                            <li>Available Dose 2 : {available_capacity_dose2} </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="d-grid gap-2 col-8 mt-auto mx-auto sticky-bottom">
                                                    <a target="_blank" {...available_capacity !== 0 ? { href: "https://selfregistration.cowin.gov.in/" } : {}} className="btn btn-primary rounded-pill" style={{ pointerEvents: available_capacity ? 'initial' : 'none' }} rel="noreferrer" id="book-btn">
                                                        Book Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default Card;
