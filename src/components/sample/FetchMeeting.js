const { Client } = require("@microsoft/microsoft-graph-client");

const fetchMeetings = async () => {
    try {
        const response = await axios.get('/api/meetings');
        setMeetings(response.data);
    } catch (error) {
        console.error("Error fetching meetings: ", error);
    }
};