EEngine
==============

###### Underconstruction
3D JS engine build upon THREE.JS, Cannon.js, Electron

# Quick start
```
git clone https://github.com/lanskey/EEngine.git
cd eengine
npm install
npm start
```

# Quick use
Only basic interaction are curretly available:
- You can simply hit A to change the force of square 
- You can simply hit D to change the force of cylinder 

# File Structure of app folder.
#### Highlighting most interesting parts in this repository 
```
│   app.js - Base application file
│           
├───game
│   ├───core - Engine files
│   │   │   core.js - Main Engine / Scene (for now) file, it's used to Configure & Compose objects.
│   │   │   
│   │   ├───core
│   │   │       main.js - Contains methods which are used to support ***Game Enviroment*** creation process.
│   │   │       
│   │   └───makers
│   │       │   maker.js - Huge reducing file to compote API for our main.js file
│   │       │   
│   │       ├───camera
│   │       │       camera.js - Sets up camera
│   │       │       
│   │       ├───collectors
│   │       │       collector.js - Not used yet
│   │       │       helpers.js - Helper functions used across all maker files.
│   │       │       
│   │       ├───interactions
│   │       │   │   interaction.js - It allows build better interaction for UI. 
│   │       │   │   
│   │       │   └───recipes
│   │       │           click.js
│   │       │           
│   │       ├───lights
│   │       │   │   light.js - This maker help us to build up light object
│   │       │   │   
│   │       │   └───recipes
│   │       │           LightRecipe.js - General light recipe
│   │       │           recipe.js
│   │       │           
│   │       ├───objects
│   │       │   │   objects.js 
│   │       │   │   
│   │       │   ├───geometries 
│   │       │   │   │   geometry.js - Build geometry shape for our THREE.JS mesh
│   │       │   │   │   
│   │       │   │   └───recipes
│   │       │   │           Box.js 
│   │       │   │           Cylinder.js
│   │       │   │           Plane.js
│   │       │   │           recipe.js
│   │       │   │           Shape.js - Main shape recipe, it is used by each subRecipe
│   │       │   │           
│   │       │   ├───materials
│   │       │   │   │   material.js - Sets up materials
│   │       │   │   │   
│   │       │   │   └───recipes
│   │       │   │           Material.js
│   │       │   │           recipe.js
│   │       │   │           
│   │       │   └───mesh
│   │       │       │   mesh.js - Build fully working THREE.JS and Cannon.js objects are build in this file
│   │       │       │   
│   │       │       └───recipes
│   │       │               AABBmesh.js - Compote AABB phyx border
│   │       │               Mesh.js - Contain helpers to build our scene objects
│   │       │               recipe.js
│   │       │               
│   │       ├───render
│   │       │       render.js - Renders three.js scene
│   │       │       
│   │       └───scene
│   │               scene.js - Sets up three.js Scene
│   │               
│   └───levels - Premade levels folder, not even used in application at this moment
│       └───0_mainmenu
│               mainmenu.js
│               
        
```
