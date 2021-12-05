import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	useLocation,
	useHistory,
} from "react-router-dom";
import { getByName, setActualPage } from "../actions";
import style from "./SearchBar.module.css";
import searchIcon from "../images/search2.png";

export default function SearchBar() {
	const { pathname } = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const [input, setInput] = useState("");
	const searchedBreeds = useSelector(
		(state) => state.searchedBreeds
	);

	function handleInputChange(e) {
		setInput(e.target.value);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		await dispatch(getByName(input));
		setInput("");
		dispatch(setActualPage(1));
		if (pathname !== "/home") history.push("/home");
	}

	return (
		<div className={style.container}>
			<input
				className={style.inputSearch}
				value={input}
				type="text"
				placeholder="By breed..."
				autoComplete="off"
				onChange={handleInputChange}
			/>
			<button
				className={style.button}
				type="submit"
				onClick={handleSubmit}
			>
				<img src={searchIcon} alt="search icon" />
			</button>
		</div>
	);
}
