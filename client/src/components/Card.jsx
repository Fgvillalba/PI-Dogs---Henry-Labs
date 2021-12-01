import React from "react";
import Temp from "./Temp";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ dog }) {
	return (
		<Link className="link" to={`/dog/${dog.id}`}>
			<div className="cardContainer">
				<div>
					<img
						src={dog.image}
						alt="Not found"
						width="200px"
						height="190px"
					/>
				</div>
				<div>
					{/* <Link to={`/dog/${dog.id}`}> */}
					<h3>
						<span>#</span> {dog.name}
					</h3>
					{/* </Link> */}
					<h4>
						<span>Weight:</span> {dog.weight} kg
					</h4>
					<div>
						<h4 style={{ color: "black" }}>
							Temperaments:
						</h4>
						<ul className="contentTemp">
							{dog.temperaments?.map((t) => {
								return <Temp key={t} temp={t} />;
							})}
						</ul>
					</div>
				</div>
			</div>
		</Link>
	);
}
