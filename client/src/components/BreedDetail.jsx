import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getById, clearBreedDetail } from "../actions";
import Temp from "./Temp";
import style from "./BreedDetail.module.css";
import Spinner from "./Spinner";

export default function Card({
	match: {
		params: { id },
	},
}) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getById(id));
		return () => {
			dispatch(clearBreedDetail());
		};
	}, [dispatch, id]);

	const breed = useSelector(
		(state) => state.breedDetail
	);

	return (
		<div className={style.container}>
			{breed ? (
				<div className={style.breedContainer}>
					<div>
						<img
							src={breed.image}
							alt="Not found"
							width="200px"
							height="190px"
						/>
					</div>
					<div className={style.info}>
						<h3>{breed.name}</h3>
						<div className={style.content}>
							<div>
								<ul className={style.caracteristics}>
									<li>
										<span>Weight:</span> {breed.weight}{" "}
										kg
									</li>
									<li>
										<span>Height:</span> {breed.height}{" "}
										cm
									</li>
									<li>
										<span>Life Span:</span>{" "}
										{breed.life_span}
									</li>
								</ul>
							</div>
							<div>
								<h4>Temperaments:</h4>
								<ul className={style.contentTemp}>
									{breed.temperaments?.map((t) => {
										return <Temp key={t} temp={t} />;
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			) : (
				<Spinner />
			)}
		</div>
	);
}
