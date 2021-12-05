export const validateSubmit = (data) => {
	let errors = {};
	if (!data.name) errors.name = "Name is required.";
	if (!data.weightMin) {
		errors.weightMin = "Weight min is required.";
	} else if (Number(data.weightMin) <= 0) {
		errors.weightMin = "Weight min must be greater than 0.";
	}
	if (!data.weightMax) {
		errors.weightMax = "Weight max is required.";
	} else if (Number(data.weightMax) <= Number(data.weightMin)) {
		errors.weightMax = "Weight max must be greater than weight min.";
	}
	if (!data.heightMin) {
		errors.heightMin = "Height min is required.";
	} else if (Number(data.heightMin <= 0)) {
		errors.heightMin = "Height min must be greater than 0.";
	}
	if (!data.heightMax) {
		errors.heightMax = "Height max is required.";
	} else if (Number(data.heightMax) <= Number(data.heightMin)) {
		errors.heightMax = "Height max must be greater than height min.";
	}
	if (!data.life_spanMin) {
		errors.life_spanMin = "Life span min is required.";
	} else if (Number(data.life_spanMin) <= 0) {
		errors.life_spanMin = "Life span min must be greater than 0.";
	}
	if (!data.life_spanMax) {
		errors.life_spanMax = "Life span max is required.";
	} else if (Number(data.life_spanMax) <= Number(data.life_spanMin)) {
		errors.life_spanMax = "Life span max must be greater than  min.";
	}
	if (!data.image) {
		errors.image = "Image url is required";
	} else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(data.image)) {
		errors.image = "Image url is invalid.";
	}

	return errors;
};

export const validateOnChange = (target, errors) => {
	console.log("VALIDATE", target.value);
	switch (target.name) {
		case "name":
			if (target.value !== "") errors.name = "";
			break;
		case "weightMin":
			if (target.value !== "" && Number(target.value) > 0) {
				errors.weightMin = "";
			}
			break;
		case "weightMax":
			if (
				target.value !== "" &&
				Number(target.value) >= Number(errors.weightMin)
			) {
				errors.weightMax = "";
			}
			break;
		case "heightMin":
			if (target.value !== "" && Number(target.value) > 0) {
				errors.heightMin = "";
			}
			break;
		case "heightMax":
			if (
				target.value !== "" &&
				Number(target.value) >= Number(errors.heightMin)
			) {
				errors.heightMax = "";
			}
			break;
		case "life_spanMin":
			if (target.value !== "" && Number(target.value) > 0) {
				errors.life_spanMin = "";
			}
			break;
		case "life_spanMax":
			if (
				target.value !== "" &&
				Number(target.value) >= Number(errors.life_spanMin)
			) {
				errors.life_spanMax = "";
			}
			break;
		case "image":
			if (/^(ftp|http|https):\/\/[^ "]+$/.test(target.value)) {
				errors.image = "";
			}
			break;
		default:
			break;
	}

	return errors;
};
