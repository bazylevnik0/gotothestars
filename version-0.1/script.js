//init variables
var camera, scene, light, light_ambient, renderer;

//set loaders
const loader = new OBJLoader();
const loader_texture = new THREE.TextureLoader();
const loader_material = new MTLLoader();
	
init();

function init() {
	//camera
	//camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );
	camera.position.set(0, -4, 6.75)	
	camera.rotation.set(-0.3,0,0)
	//scene
	scene = new THREE.Scene();
	
	/*
	//test objects
	//test three object 
	let geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
	let material = new THREE.MeshPhongMaterial( {color: 0xffffff} ); 
    	let mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	
	//test .obj with .jpeg texture
	loader.load('obj/test.obj', ( object ) => {
					let texture = loader_texture.load( 'obj/test.jpeg' );
					object.children[0].material.map = texture;
				    	scene.add( object );
				    }
	);
	
	//test .obj with .mtl material .png uv
	loader_material.load('obj/test.mtl', function( material ) {
						     	material.preload();
						     	loader.setMaterials( material );
						     	loader.load('obj/test.obj', (object) => {
						     					   	object.children[0].material.color.r = 1;
												object.children[0].material.color.g = 1;
												object.children[0].material.color.b = 1;
												scene.add( object );
											    }
						     	);
						     }
	);
	*/

	//table of scene children objects:
	//[0]: light point;
	//[1]: light ambient;
	//[2]: obj sky;
	//[3]: obj back;	
	//[4]: obj earth;

		
	//point light
	light = new THREE.PointLight( 0xffffff, 1, 25 );
	light.position.set( 0, -2.5, 0 );
	//add point light in scene
	scene.children[0] = light;
	
	//ambient light
	light_ambient = new THREE.AmbientLight( 0x404040 );
	//add ambient light in scene
	scene.children[1] = light_ambient;

	//sky
	loader.load('obj/sky.obj', (object) => {
					//add obj in scene
					scene.children[2] = object;
					//set start position & scale
					scene.children[2].position.set(0,0,0);
					scene.children[2].scale.set( 5.25, 5.25, 5.25);
				  	//set color
					object.children[0].material.color.r = 0.1;
					object.children[0].material.color.g = 0.1;
					object.children[0].material.color.b = 0.1;
											
				   }
	);

	//back
	loader_material.load('obj/back.mtl', function( material ) {
						     	material.preload();
						     	loader.setMaterials( material );
						     	loader.load('obj/back.obj', (object) => {
						     					//add obj in scene
											scene.children[3] = object;
											//set start position & scale
											scene.children[3].scale.set( 7, 12, 7);
											scene.children[3].position.set(0,-2.5,0);
											scene.children[3].rotation.y = 2
										    	//set color
											object.children[0].material.color.r = 1;
											object.children[0].material.color.g = 1;
											object.children[0].material.color.b = 1;
										    }
						     	);
						     }
	);
	
	//earth
	loader.load('obj/earth/earth.obj', (object) => {
						//add obj in scene
						scene.children[4] = object;
						//set start position & scale
						scene.children[4].scale.set( 6, 4.5, 6);
						scene.children[4].position.set(0,-7,0);
						scene.children[4].rotation.y = -2.5;
						//set color
						object.children[0].material.color.r = 0.545;
						object.children[0].material.color.g = 0.344;
						object.children[0].material.color.b = 0.303;
					   }
	);
	
	//water
	loader.load('obj/earth/water.obj', (object) => {
						//add obj in scene
						scene.children[5] = object;
						//set start position & scale
						scene.children[5].scale.set( 6, 4.5, 6);
						scene.children[5].position.set(0,-7,0);
						scene.children[5].rotation.y = -2.5;
						//set color
						object.children[0].material.color.r = 0.247;
						object.children[0].material.color.g = 0.629;
						object.children[0].material.color.b = 0.606;
					   }
	);

		//water-step-1
		loader.load('obj/earth/water-step-1.obj', (object) => {
							//add obj in scene
							scene.children[6] = object;
							//set start position & scale
							scene.children[6].scale.set( 6, 4.5, 6);
							scene.children[6].position.set(0,-7.15,0);
							scene.children[6].rotation.y = -2.5;
							//set color
							object.children[0].material.color.r = 1;
							object.children[0].material.color.g = 1;
							object.children[0].material.color.b = 1;
						   }
		);
		//water-step-2
		loader.load('obj/earth/water-step-2.obj', (object) => {
							//add obj in scene
							scene.children[7] = object;
							//set start position & scale
							scene.children[7].scale.set( 6, 4.5, 6);
							scene.children[7].position.set(0,-7,0);
							scene.children[7].rotation.y = -2.5;
							//set color
							object.children[0].material.color.r = 1;
							object.children[0].material.color.g = 1;
							object.children[0].material.color.b = 1;
						   }
		);
		
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	let loading = setInterval( function() { 
				 	if (scene.children[scene.children.length-1] !== undefined) { 
						clearInterval(loading); 
						renderer.setAnimationLoop( animation ); 
					} 
		      } , 1000 );

}

var inhale = true, exhale = false;
function animation( time ) {
	 //life animation
	 if (inhale === true) {
		//water
		if (scene.children[5].position.y >= -7.15) scene.children[5].position.y -= 0.001;
		else { inhale = false; exhale =  true; }
		//water-step-1
		if (scene.children[6].position.y <= -7.1) scene.children[6].position.y += 0.001;
		else { inhale = false; exhale =  true; }
		//water-step-2
		if (scene.children[7].position.y <= -7.1) scene.children[7].position.y += 0.001;
		else { inhale = false; exhale =  true; }
	 }
	 if (exhale === true) {
		//water
		if (scene.children[5].position.y <= -7.05) scene.children[5].position.y += 0.001;
		else { inhale =  true; exhale = false; }
		//water-step-1
		if (scene.children[6].position.y >= -7.15) scene.children[6].position.y -= 0.001;
		else { inhale =  true; exhale = false; }
		//water-step-2
		if (scene.children[7].position.y >= -7.15) scene.children[7].position.y -= 0.001;
		else { inhale =  true; exhale = false; }
	 }
	 scene.children[3].rotation.y += 0.0005;
										    
	 //render	
	 renderer.render(scene, camera); 
}
