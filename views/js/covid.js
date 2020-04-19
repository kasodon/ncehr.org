
function covid () {

fetch("https://covid-19-statistics.p.rapidapi.com/reports/total", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
		"x-rapidapi-key": "243e3d0b22msh7c7aa54240380fcp19de5bjsndd53f1ad8c4c"
	}
})
.then(response => {
	return response.json();
})
.then((data) => {
    console.log(data);
    let confirmed = (data.data.confirmed);
    let recovered = (data.data.recovered);
    let critical = (data.data.active);
    let deaths = (data.data.deaths);

    document.getElementById('confirmed').innerHTML = confirmed;
    document.getElementById('recovered').innerHTML = recovered;
    document.getElementById('activee').innerHTML = critical;
    document.getElementById('deaths').innerHTML = deaths;

    setTimeout(covid, 2 * 60 * 1000);
  })
.catch(err => {
  console.log(err);
  setTimeout(covid, 2 * 60 * 1000);
});

}

covid();