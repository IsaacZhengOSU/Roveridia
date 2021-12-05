let downloadButton = document.querySelector("#download");

downloadButton.addEventListener("click", () => {
    console.log("download pressed");
    downloadApiRequest();
});
//An asynchronous function to fetch data from the API.
async function downloadApiRequest() {
    try {
        const response = await axios.get(
            `http://localhost:5300/getAsteroidData`
        );
        for (property in response.data) {
            datacpy = response.data[property]
        }
        for (property in datacpy) {
            var lastDate = datacpy[property];
        }
        console.log( lastDate.length + " objects on near earth orbit on " + property);
    } catch (error) {
        // console.log(error.response.body);
    }
    return lastDate
}