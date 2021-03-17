var DateTime = luxon.DateTime;


//GET CALL
const getData = async () => {
    let { data } = await axios.get('https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","newCases":"newCasesByPublishDate"}')
    return data
}


//PARCE DATA
document.addEventListener('DOMContentLoaded', async () => {
    const results = await getData()
    console.log(results);

    //LABEL
    const casesResult = results.data[0].newCases
    console.log(`case result: ${casesResult}`);
    const dateResult = results.data[0].date
    console.log(`data from luxton:${DateTime.fromISO(dateResult).toFormat('DD')}`);


    for (const value of results.data) {
        const humanData = DateTime.fromISO(value.date).toFormat('DDDD')

        // console.log(value.date)
        // console.log(humanData);

        const printHTML = document.querySelector('#coronadata');
        printHTML.innerHTML += `
    <ul class="calendarDay">
    <li>${humanData}</li>
    <li>Cases: ${value.newCases} </li>
    </ul>`;
    }

});

// document.querySelector('LI').classList.add('lowRate')

