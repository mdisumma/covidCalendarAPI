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
    const dateResult = results.data[0].date
    // console.log(`data from luxton:${DateTime.fromISO(dateResult).toFormat('DD')}`);


    for (const value of results.data) {
        const day = DateTime.fromISO(value.date).toFormat('d')
        const months = DateTime.fromISO(value.date).toFormat('LLLL')
        const year = DateTime.fromISO(value.date).toFormat('y')

        const printHTML = document.querySelector('#coronadata');

        printHTML.innerHTML += `
        <ul>
        <li class="day">${day}</li>
        <li class="months">${months}</li>
        <li class="year">${year}</li><hr>
        <li class="cases">Cases: ${value.newCases} </li>
        </ul>`;
    }
    document.querySelector('#button').addEventListener('click', function (event) {
        event.preventDefault()
        const dateInput = document.querySelector('#search').value;
        console.log(`date input: ${dateInput}`)
        for (i = 0; i < results.data.length; i++) {
            if (results.data[i].date == dateInput) {
                const caseResult = results.data[i].newCases
                const printDataSearch = document.querySelector('#result');
                printDataSearch.innerHTML = `<p>Result: Date: ${dateInput} Cases: ${caseResult}</p>`
            }
        }
    });
});


