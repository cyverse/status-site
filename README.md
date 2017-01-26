# CyVerse Status Site

This is currently running here: <http://status.cyverse.org/>

The intention of this web-app is to determine which services are currently operational.  One can subscribe to downtime notifications for each respective service.  This App is currently hosted via Heroku, as it is completely outside of our infrastructure and can accurately determine operability of our services.

## Maintenance Status

For instructions on how to set the `status.io` status for each product, see instructions [here.](docs/Maintenance.md)

## Development

First create a fork of this repo (fork button in upper right corner).

Clone your fork.
```
git clone git@github.com:<username>/status-site.git
```

Navigate into the project and install dependencies.
```
cd status-site;
npm i
```

Start web app.
```
npm run start
```

## Deployment with Heroku
This App is configured to work directly with Heroku and thus requires specific package definitions and dependencies to "deploy" with Heroku.  One of these dependencies is [Sails](http://sailsjs.org). 

### Configure DNS for Heroku
#### Add DNS CNAME to Heroku App
1. Download and install the Heroku Toolbelt: <https://toolbelt.heroku.com/>
2. Configure DNS via AWS Route 53 for the Heroku App name: <https://console.aws.amazon.com/route53>
3. Clone the `status-site` repository (this repo): <https://github.com/cyverse/status-site>
3. Use Heroku Toolbelt to add domain and host to the App: <https://devcenter.heroku.com/articles/route-53>
	
	```
	heroku login
	heroku domains:add cyverse.org --app cyverse-status
	heroku domains:add status.cyverse.org --app cyverse-status
	```
#### Remove DNS CNAME from Heroku App
1. Perform steps 1-3 in the Add instructions.
2. Remove associated domain with the hosted App: <https://devcenter.heroku.com/articles/custom-domains#remove-a-custom-domain>
	
	```
	heroku domains:remove cyverse.org --app cyverse-the-movie
	heroku domains:remove status.cyverse.org --app cyverse-the-movie
	```
	
3. Then re-add the App's new DNS CNAME domain and hostname as shown in step 4. of adding DNS.
4. Give DNS a full 24 hours (perhaps less) to propagate to the outside world.  The changes may show up faster if your host has AWS Route 53's domain in your DNS configuration.
5. Done!
