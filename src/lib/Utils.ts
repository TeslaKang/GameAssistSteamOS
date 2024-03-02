import { LifetimeNotification } from "decky-frontend-lib";  

export class SteamController {
	static registerForAllAppLifetimeNotifications(callback: (appId: number, data: LifetimeNotification) => void): Unregisterer {
    		return SteamClient.GameSessions.RegisterForAppLifetimeNotifications((data: LifetimeNotification) => {
      		callback(data.unAppID, data);
    	});
  	}
}
