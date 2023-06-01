export const getWeather = async (city) => {
	const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + city;

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '1592e28623msha1546bdbbb37bf4p1bec8djsn65cf0e56a3df',
			'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		// console.log(result);
		return result;
	} catch (error) {
		console.error(error);
	}
};