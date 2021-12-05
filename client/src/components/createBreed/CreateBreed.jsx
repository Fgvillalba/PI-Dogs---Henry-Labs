import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTemperaments, postBreed } from "../../actions";
import style from "./CreateBreed.module.css";
import { validateSubmit, validateOnChange } from "./helpers";

const initialDataForm = {
	name: "",
	weightMin: "",
	weightMax: "",
	heightMin: "",
	heightMax: "",
	life_spanMin: "",
	life_spanMax: "",
	image: "",
	temperaments: [],
};

export default function CreateBreed() {
	const dispatch = useDispatch();
	const history = useHistory();
	const temperaments = useSelector((state) => state.temperaments);
	const [errors, setErrors] = useState({});
	const [data, setData] = useState(initialDataForm);

	useEffect(() => {
		dispatch(getTemperaments());
	}, [dispatch]);

	function handleInput(e) {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});

		setErrors(validateOnChange(e.target, errors));
	}

	function handleSelect(e) {
		if (e.target.value !== " ") {
			if (!data.temperaments.includes(e.target.value)) {
				setData({
					...data,
					temperaments: [...data.temperaments, e.target.value],
				});
			}
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		setErrors(validateSubmit(data));
		if (Object.keys(validateSubmit(data)).length === 0) {
			dispatch(
				postBreed({
					...data,
					weight: data.weightMin + " - " + data.weightMax,
					height: data.heightMin + " - " + data.heightMax,
					life_span:
						data.life_spanMin + " - " + data.life_spanMax + " years",
				})
			);
			setData(initialDataForm);
			alert("Breed created sucesfully");
			history.push("/home");
		} else {
			alert("complete inputs");
		}
	}

	function onClick(e) {
		e.preventDefault();
		setData({
			...data,
			temperaments: data.temperaments.filter(
				(t) => t !== e.target.name
			),
		});
	}

	return (
		<div className={style.container}>
			<div className={style.title}>
				<h2>Create your own breed</h2>
			</div>
			<form className={style.formContainer} onSubmit={handleSubmit}>
				<div className={style.divInput}>
					<input
						type="text"
						name="name"
						value={data.name}
						onChange={handleInput}
						placeholder="Name"
						autoComplete="off"
					/>
					{errors.name ? (
						<p className={style.errorMessage}>{errors.name}</p>
					) : (
						<div className={style.noError}></div>
					)}
				</div>
				<div className={style.inputsContainer}>
					<div>
						<input
							type="number"
							name="weightMin"
							value={data.weightMin}
							onChange={handleInput}
							placeholder="Weight min"
							autoComplete="off"
						/>
						{errors.weightMin ? (
							<p className={style.errorMessage}>{errors.weightMin}</p>
						) : (
							<div className={style.noError}></div>
						)}
					</div>
					<div className={style.divRight}>
						<input
							type="number"
							name="weightMax"
							value={data.weightMax}
							onChange={handleInput}
							placeholder="Weight max"
							autoComplete="off"
						/>
						{errors.weightMax ? (
							<p className={style.errorMessage}>{errors.weightMax}</p>
						) : (
							<div className={style.noError}></div>
						)}
					</div>
				</div>
				<div className={style.inputsContainer}>
					<div>
						<input
							type="number"
							name="heightMin"
							value={data.heightMin}
							onChange={handleInput}
							placeholder="Height min"
							autoComplete="off"
						/>
						{errors.heightMin ? (
							<p className={style.errorMessage}>{errors.heightMin}</p>
						) : (
							<div className={style.noError}></div>
						)}
					</div>
					<div className={style.divRight}>
						<input
							type="number"
							name="heightMax"
							value={data.heightMax}
							onChange={handleInput}
							placeholder="Height max"
							autoComplete="off"
						/>
						{errors.heightMax ? (
							<p className={style.errorMessage}>{errors.heightMax}</p>
						) : (
							<div className={style.noError}></div>
						)}
					</div>
				</div>
				<div className={style.inputsContainer}>
					<div>
						<input
							type="number"
							name="life_spanMin"
							value={data.life_spanMin}
							onChange={handleInput}
							placeholder="Life span min"
							autoComplete="off"
						/>
						{errors.life_spanMin ? (
							<p className={style.errorMessage}>
								{errors.life_spanMin}
							</p>
						) : (
							<div className={style.noError}></div>
						)}
					</div>
					<div className={style.divRight}>
						<input
							type="number"
							name="life_spanMax"
							value={data.life_spanMax}
							onChange={handleInput}
							placeholder="Life span max"
							autoComplete="off"
						/>
						{errors.life_spanMax ? (
							<p className={style.errorMessage}>
								{errors.life_spanMax}
							</p>
						) : (
							<div className={style.noError}></div>
						)}
					</div>
				</div>
				<div className={style.divInput}>
					<input
						type="text"
						name="image"
						value={data.image}
						onChange={handleInput}
						placeholder="Image url"
						autoComplete="off"
					/>
					{errors.image ? (
						<p className={style.errorMessage}>{errors.image}</p>
					) : (
						<div className={style.noError}></div>
					)}
				</div>
				<div className={style.divSelectTems}>
					<label>
						Select <span>temperaments</span>
					</label>
					<select
						className={style.selectTemps}
						onChange={handleSelect}
					>
						{[{ id: " ", name: " " }, ...temperaments].map((t) => (
							<option key={t.id} value={t.name}>
								{t.name}
							</option>
						))}
					</select>
					<div className={style.divContainerTempsSelected}>
						{data.temperaments?.map((t) => (
							<div key={t} className={style.tempsContainer}>
								<button
									className={style.tempsContainerButton}
									name={t}
									onClick={onClick}
								>
									x
								</button>
								{t}
							</div>
						))}
					</div>
				</div>
				<div className={style.divCreate}>
					<button type="submit">CREATE</button>
				</div>
			</form>
		</div>
	);
}
