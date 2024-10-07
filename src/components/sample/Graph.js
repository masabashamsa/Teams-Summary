import axios from 'axios';
import { getAccessToken } from './auth';

export  async function getMeetings() {
    try {
      const token = await getAccessToken();

      const currentDate = new Date().toISOString();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 10);
      const endDateIso = endDate.toISOString();

      const graphUrl = 'https://graph.microsoft.com/v1.0/me/calendarView?startDateTime=${currentDate}&endDateTime=${endDateISO}';

      //Make request to Graph API
      const response = await axios.get(graphUrl, {
        headers: {
          Authorization: 'Bearer ${token}'
        }
      });

      //Process the response
      return response.data.value; //Contains list of meetings
    } catch (error) {
      console.error("Failed to retrieve meetings", error);
      throw error;
    }
  }