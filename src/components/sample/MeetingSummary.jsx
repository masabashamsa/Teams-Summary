import { useEffect, useState } from "react";
import axios from "axios";
import "./meetingsummary.css"
import { meeting } from "@microsoft/teams-js";

const MeetingSummaryDashboard = () => {
    const [summaries, setSummaries] =useState([]);
    const [loading, setLoading] =useState(true);
    const [error, setError] = useState(null);
   
    useEffect(() => {
        const fetchSummaries = async () => {
            try{
                const response = await axios.get("/api/meeting-summaries");
               setSummaries(response.data);
            } catch (err) {
               setError(err);
            } finally {
               setLoading(false);
            }
        };
       fetchSummaries();
    }, []);

    if(loading) return <div>Loading..</div>;
    if(error) return <div> Error fetching summaries: {error.message}</div>
    
    return (
        <div>
           <h2>Your Meeting Summaries</h2>
        <div className="summaries-list">
                {summaries.map((summary) => (
                    <div key={summary.id} className="summary-card">
                        <h3>{summary.title}</h3>
                        <p>{summary.details}</p>
                        <p><strong>Action Items:</strong> {summary.actionItems.join('')}</p>
                        </div>
                ))}
            </div>
        </div>
    );
};

export default MeetingSummaryDashboard;