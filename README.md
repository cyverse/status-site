# CyVerse Status Site

This is currently running here: <http://status.cyverse.org/>

The intention of this web-app is to determine which services are currently operational.  One can subscribe to downtime notifications for each respective service.  This App is currently hosted via Heroku, as it is completely outside of our infrastructure and can accurately determine operability of our services.

## Maintenance Status

For instructions on how to set the `status.io` status for each product, see instructions [here.](docs/Maintenance.md)

## This Repository (status-site)
This App is configured to work directly with Heroku and thus requires specific package definitions and dependencies to "deploy" with Heroku.  One of these dependencies is [Sails](http://sailsjs.org).  All packages are controlled/installed via [NPM] (https://www.npmjs.com/).  The original repository for `status-site` can be found here: <https://github.com/iPlantCollaborativeOpenSource/status-site> and is hosted here: <http://status.iplantcollaborative.org/>

In order to update the branding on this particular application, all packages had to be updated/upgraded to the latest version, and re-branded to suite our new organization's branding standards.

Please note that the `master` branch is automatically re-built based on any commits to `master`.  Therefore the `master` branch should be treated as **PRODUCTION**.  If beta testing is required, it is recommended that one make changes to this fork: <https://github.com/mgwall17/status-site> and manually re-deployed, or fork this repository and re-host via a separate Heroku App.  Please note that one should **NOT** configure DNS for that App, as it can only be bound to one application at a time.  To see how to bind DNS, see the section on DNS below. 

## Heroku/AWS Credentials
The login credentials to iPlant/CyVerse Heroku account can be found in the `secrets` file.  AWS credentials can be found in that same file.  The repository is accessible via GitHub under the iPlantcollaborative and CyVerse Organizations for the respective status-sites.

## Configure DNS for Heroku
### To add DNS CNAME to Heroku App
1. Download and install the Heroku Toolbelt: <https://toolbelt.heroku.com/>
2. Configure DNS via AWS Route 53 for the Heroku App name: <https://console.aws.amazon.com/route53>
3. Clone the `status-site` repository (this repo): <https://github.com/cyverse/status-site>
3. Use Heroku Toolbelt to add domain and host to the App: <https://devcenter.heroku.com/articles/route-53>
	
	```
	heroku login
	heroku domains:add cyverse.org --app cyverse-status
	heroku domains:add status.cyverse.org --app cyverse-status
	```
### To remove DNS CNAME from Heroku App
1. Perform steps 1-3 in the Add instructions.
2. Remove associated domain with the hosted App: <https://devcenter.heroku.com/articles/custom-domains#remove-a-custom-domain>
	
	```
	heroku domains:remove cyverse.org --app cyverse-the-movie
	heroku domains:remove status.cyverse.org --app cyverse-the-movie
	```
	
3. Then re-add the App's new DNS CNAME domain and hostname as shown in step 4. of adding DNS.
4. Give DNS a full 24 hours (perhaps less) to propagate to the outside world.  The changes may show up faster if your host has AWS Route 53's domain in your DNS configuration.
5. Done!

## Branding
All images contained within this status site are located locally within this repository.  Image references to our main site caused SSL errors, so a solution was to have them referenced locally since those services may not be reference-able from a downed service.

All banners, icons and images can be found within this repository under: `assets/images/`