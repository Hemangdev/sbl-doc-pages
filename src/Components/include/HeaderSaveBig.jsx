import React, { memo, useState } from "react";
import { Carousel, Container, Navbar } from "react-bootstrap"
import { useEffect } from "react";

const HeaderSaveBig = () => {
	const [timeRemaining, setTimeRemaining] = useState(null);

	useEffect(() => {
		const setCountdown = () => {
			const currentTime = new Date();
			let targetTime = new Date();
			let countdownMessage = "Today’s Divine Hour ends in";

			if (currentTime.getHours() >= 18 && currentTime.getHours() <= 21 && !(currentTime.getHours() === 21 && currentTime.getMinutes() >= 1)) {
				targetTime.setHours(21, 1, 0)
			} else if (currentTime.getHours() >= 21 || currentTime.getHours() <= 18) {
				if (currentTime.getHours() >= 21 && currentTime.getHours() <= 24) {
					targetTime.setDate(targetTime.getDate() + 1)
				}
				targetTime.setHours(18, 1, 0)
				countdownMessage = "Today’s Divine Hour starts in";
			}
			const timeDifference = targetTime - currentTime;

			const hours = String(Math.floor(timeDifference / 3600000)).padStart(2, '0');
			const minutes = String(Math.floor((timeDifference % 3600000) / 60000)).padStart(2, '0');
			const seconds = String(Math.floor((timeDifference % 60000) / 1000)).padStart(2, '0');

			const countdown = {
				text: countdownMessage,
				hours: hours,
				minutes: minutes,
				seconds: seconds
			}

			setTimeRemaining(countdown);
		};

		const timer = setInterval(setCountdown, 1000);
		setCountdown(); // Initial call to set the countdown
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<>
			<Navbar bg=" top-header flex-wrap" expand="lg" >

				<Container fluid className="get-discount">
					<Container className="get-discount-wrap">
						<Carousel autoPlay={true}>
							<Carousel.Item >
								<h6>🌟 Divine Hour Deal: Get 20% OFF on Every Purchase! Daily 6 PM - 9 PM. Don't Miss Out! Valid from 15th-25th Oct.</h6>
							</Carousel.Item>

							<Carousel.Item >
								<h6>🎉 Navratri Exclusive: Celebrate with FLAT 15% OFF on Every Order! Hurry, offer valid from 15th to 25th October. Shop Now!</h6>
							</Carousel.Item>

							<Carousel.Item >
								<h6>🎉 Navratri Special! Flat 20% OFF on Your First Order. Shop Now! Valid from 15th-25th Oct.</h6>
							</Carousel.Item>

							<Carousel.Item >
								<h6>✨ Choose Your #SavingsKiJodi! Extra 5% OFF. Hurry! Offer from 15th-25th Oct.</h6>
							</Carousel.Item>
						</Carousel>
					</Container>
				</Container>

				<Container className="justify-content-center align-items-center top-header-wrap">
					<h3 className="mb-0">{timeRemaining?.text || ''}</h3>

					<ul class="list-inline mb-0">
						<li class="list-inline-item"><span>{timeRemaining?.hours[0] || ''}</span></li>
						<li class="list-inline-item"><span>{timeRemaining?.hours[1] || ''}</span></li>
						{/* <li class="list-inline-item"><span>0</span></li>
						<li class="list-inline-item"><span>0</span></li> */}
						<li class="list-inline-item dot">:</li>
						<li class="list-inline-item"><span>{timeRemaining?.minutes[0] || ''}</span></li>
						<li class="list-inline-item"><span>{timeRemaining?.minutes[1] || ''}</span></li>

						{/* <li class="list-inline-item"><span>0</span></li>
						<li class="list-inline-item"><span>0</span></li> */}
						<li class="list-inline-item dot">:</li>
						<li class="list-inline-item"><span>{timeRemaining?.seconds[0] || ''}</span></li>
						<li class="list-inline-item"><span>{timeRemaining?.seconds[1] || ''}</span></li>

						{/* <li class="list-inline-item"><span>0</span></li>
						<li class="list-inline-item"><span>0</span></li> */}
					</ul>

					<h3 className="get-ready mb-0">Get Ready to Save Big!</h3>
				</Container>
			</Navbar >
		</>
	);
};

export default memo(HeaderSaveBig);