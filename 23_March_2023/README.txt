dependencies and it's types


local dependency 
> default installation
> they are local to folder
> only used for specific folder

global dependencies
> installed in the laptop
> can be used for any npm project
> only used before app start as after app get start then app start to use local dependency instead of global dependency
> use to generate app / run the app.
> will not add in package.json
> need admin permission to install 

dev dependency
> they are local to folder
> only dependencies used at a time of development.
> npm install packagename --save-dev