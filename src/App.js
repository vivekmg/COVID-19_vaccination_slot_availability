import React, { useState } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Card from './components/card';
import moment from 'moment';

function App() {

	const [pincode, setPincode] = useState("");
	const [date, setDate] = useState(Date.now());
	const [session, setSession] = useState([]);
	const [errorFlag, setErrorFlag] = useState(false);


	const checkPincode = (e) => {
		const pin = e.target.value;
		const matchPattern = /^[0-9\b]+$/;
		if (pin === '' || matchPattern.test(pin)) {
			setPincode(pin);
		}
	}

	const getData = async () => {
		try {

			setErrorFlag(false);

			// Check validation of PIN
			if (pincode === "" || pincode.length <= 5 || moment(date).isBefore(Date.now(), 'day')) {
				setErrorFlag(true);
				return;
			}

			// Fetch data from API 
			const response = await fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pincode + "&date=" + moment(date).format("DD-MM-YYYY"));
			const data = await response.json();
			setSession(data.sessions);
			
			if (data.sessions.length === 0) {
				setErrorFlag(true);
				return;
			}

			// Filter data based on checked checkbox
			if (document.getElementById('checkbox_45').checked && document.getElementById('checkbox_18').checked && document.getElementById('checkbox_free').checked && document.getElementById('checkbox_paid').checked) {
				// console.log('45 18 free paid');
				setSession(data.sessions);
				return;
			}
			else if (document.getElementById('checkbox_18').checked && document.getElementById('checkbox_free').checked && document.getElementById('checkbox_paid').checked) {
				// console.log('18 free paid');
				setSession(data.sessions.filter(res => res.min_age_limit === 18));
				return;
			}
			else if (document.getElementById('checkbox_45').checked && document.getElementById('checkbox_free').checked && document.getElementById('checkbox_paid').checked) {
				// console.log('45 free paid');
				setSession(data.sessions.filter(res => res.min_age_limit === 45));
				return;
			}
			else if (document.getElementById('checkbox_free').checked && document.getElementById('checkbox_45').checked && document.getElementById('checkbox_18').checked) {
				// console.log('18 45 free');
				setSession(data.sessions.filter(res => res.fee_type === 'Free'));
				return;
			}
			else if (document.getElementById('checkbox_paid').checked && document.getElementById('checkbox_45').checked && document.getElementById('checkbox_18').checked) {
				// console.log('18 45 paid');
				setSession(data.sessions.filter(res => res.fee_type === 'Paid'));
				return;
			}
			else if ((document.getElementById('checkbox_45').checked && document.getElementById('checkbox_18').checked) || (document.getElementById('checkbox_free').checked && document.getElementById('checkbox_paid').checked)) {
				// console.log('45 18 or free paid');
				setSession(data.sessions);
				return;
			}
			else if (document.getElementById('checkbox_45').checked && document.getElementById('checkbox_paid').checked) {
				// console.log('45 paid');
				setSession(data.sessions.filter(res => res.fee_type === 'Paid' && res.min_age_limit === 45));
				return;
			}
			else if (document.getElementById('checkbox_paid').checked && document.getElementById('checkbox_18').checked) {
				// console.log('18 paid');
				setSession(data.sessions.filter(res => res.fee_type === 'Paid' && res.min_age_limit === 18));
				return;
			}
			else if (document.getElementById('checkbox_45').checked && document.getElementById('checkbox_free').checked) {
				// console.log('45 free');
				setSession(data.sessions.filter(res => res.fee_type === 'Free' && res.min_age_limit === 45));
				return;
			}
			else if (document.getElementById('checkbox_free').checked && document.getElementById('checkbox_18').checked) {
				// console.log('18 free');
				setSession(data.sessions.filter(res => res.fee_type === 'Free' && res.min_age_limit === 18));
				return;
			}
			else if (document.getElementById('checkbox_free').checked) {
				// console.log('free');
				setSession(data.sessions.filter(res => res.fee_type === 'Free'));
				return;
			}
			else if (document.getElementById('checkbox_paid').checked) {
				// console.log('paid');
				setSession(data.sessions.filter(res => res.fee_type === 'Paid'));
				return;
			}
			else if (document.getElementById('checkbox_18').checked) {
				// console.log('18');
				setSession(data.sessions.filter(res => res.min_age_limit === 18));
				return;
			}
			else if (document.getElementById('checkbox_45').checked) {
				// console.log('45');
				setSession(data.sessions.filter(res => res.min_age_limit === 45));
				return;
			}

		} catch (err) {
			setErrorFlag(true);
		}
	}

	return (
		<>
			<header className="text-center fs-1">
				Book Appoinment For Covid-19 Vaccine
			</header>

			<div className="container main-container">
				<div className="text-center fs-5">
					Check your nearest vaccination center and slots availability
				</div>
				<div className="pin-container">
					<div className="pin-text fs-4">
						Search by PIN
					</div>
				</div>

				{/* Input labels */}
				<div className="container">
					<div className="row justify-content-md-center row-cols-1 row-cols-sm-2 row-cols-md-4 ">
						<div className="col">
							<div className="form-floating">
								<input
									type="text"
									className="form-control"
									maxLength="6"
									placeholder="123456"
									value={pincode}
									onChange={e => checkPincode(e)}
									required
								/>
								<label htmlFor="input-pin">Enter your PIN</label>
							</div>
						</div>
						<div className="col">
							<div className="form-floating ">
								<input
									type="date"
									className="form-control"
									id="date-input"
									value={moment(date).format("YYYY-MM-DD")}
									onChange={e => setDate(e.target.value)}
									required
								/>
								<label htmlFor="input-date" id="input-date">Select date</label>
							</div>
						</div>
					</div>
				</div>

				{/* Search button  */}
				<div className="d-grid col-3 mx-auto">
					<button className="btn btn-primary" type="button" onClick={getData} id="search-btn">
						<span className="text fs-5">Search</span>
					</button>
				</div>

				{/* All Checkboxes */}
				<div className="text-center">
					<div className="form-check form-check-inline">
						<input className="form-check-input" type="checkbox" onChange={getData} id="checkbox_18" hidden />
						<label className="form-check-label" htmlFor="checkbox_18">18+</label>
					</div>
					<div className="form-check form-check-inline">
						<input className="form-check-input" type="checkbox" onChange={getData} id="checkbox_45" hidden />
						<label className="form-check-label" htmlFor="checkbox_45">45+</label>
					</div>
					<div className="form-check form-check-inline">
						<input className="form-check-input" type="checkbox" onChange={getData} id="checkbox_free" hidden />
						<label className="form-check-label" htmlFor="checkbox_free">Free</label>
					</div>
					<div className="form-check form-check-inline">
						<input className="form-check-input" type="checkbox" onChange={getData} id="checkbox_paid" hidden />
						<label className="form-check-label" htmlFor="checkbox_paid">Paid</label>
					</div>
				</div>

				<Card Data={session} errorFlag={errorFlag} />
				
			</div>
		</>
	);
}

export default App;
