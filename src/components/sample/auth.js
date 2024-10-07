import * as microsoftTeams from "@microsoft/teams-js";

export async function getAccessToken() {
    return new Promise((resolve, reject) => {
      microsoftTeams.authentication.getAuthToken({
        succesCallback: (token) => {
          resolve(token);
        },
        failureCallback: (error) => {
          console.error("Error fetching token", error);
          reject(error);
        }
      });
    });
  }
