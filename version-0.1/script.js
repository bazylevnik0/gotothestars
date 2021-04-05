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
										//!!!напиши функцию для пересчета цветов и ввода через человеческий вид
										//и функцию смены цвета материала
	//sky
	loader.load('obj/sky.obj', (object) => {
					//set color
					object.children[0].material.color.r = 0.1;
					object.children[0].material.color.g = 0.1;
					object.children[0].material.color.b = 0.1;
					//add obj in scene
					scene.children[2] = object;
					//set start position & scale
					scene.children[2].position.set(0,0,0);
					scene.children[2].scale.set( 5.25, 5.25, 5.25);							
				   }
	);

	//back
	loader_material.load('obj/back.mtl', function( material ) {
						     	material.preload();
						     	loader.setMaterials( material );
						     	loader.load('obj/back.obj', (object) => {
						     					//set color
											object.children[0].material.color.r = 1;
											object.children[0].material.color.g = 1;
											object.children[0].material.color.b = 1;
											//add obj in scene
											scene.children[3] = object;
											//set start position & scale
											scene.children[3].scale.set( 7, 12, 7);
											scene.children[3].position.set(0,-2.5,0);
										    	scene.children[3].rotation.y = 2;
										    }
						     	);
						     }
	);
	
	//earth
	loader.load('obj/earth/earth.obj', (object) => {
						//set color
						object.children[0].material.color.r = 0.336;
						object.children[0].material.color.g = 0.277;
						object.children[0].material.color.b = 0.262;
						//add obj in scene
						scene.children[4] = object;
						//set start position & scale
						scene.children[4].scale.set( 6, 4.5, 6);
						scene.children[4].position.set(0,-7,0);
						scene.children[4].rotation.y = -2.5;
					   }
	);
	
	//water
	loader.load('obj/earth/water.obj', (object) => {
						//set color
						object.children[0].material.color.r = 0.247;
						object.children[0].material.color.g = 0.629;
						object.children[0].material.color.b = 0.606;
						//add obj in scene
						scene.children[5] = object;
						//set start position & scale
						scene.children[5].scale.set( 6, 4.5, 6);
						scene.children[5].position.set(0,-7,0);
						scene.children[5].rotation.y = -2.5;
					    }
	);

		//water-step-1
		loader.load('obj/earth/water-step-1.obj', (object) => {
								//set color
								object.children[0].material.color.r = 1;
								object.children[0].material.color.g = 1;
								object.children[0].material.color.b = 1;
								//add obj in scene
								scene.children[6] = object;
								//set start position & scale
								scene.children[6].scale.set( 6, 4.5, 6);
								scene.children[6].position.set(0,-7.15,0);
								scene.children[6].rotation.y = -2.5;
							  }
		);
		//water-step-2
		loader.load('obj/earth/water-step-2.obj', (object) => {
							  	//set color
								object.children[0].material.color.r = 1;
								object.children[0].material.color.g = 1;
								object.children[0].material.color.b = 1;
							  	//add obj in scene
								scene.children[7] = object;
								//set start position & scale
								scene.children[7].scale.set( 6, 4.5, 6);
								scene.children[7].position.set(0,-7,0);
								scene.children[7].rotation.y = -2.5;
						          }
		);
		
	//green
	//left
		//base
		loader.load('obj/earth/green/left/base.obj', (object) => {
						  		  //set color
								  object.children[0].material.color.r = 0.351;
								  object.children[0].material.color.g = 0.196;
								  object.children[0].material.color.b = 0.163
								  //add obj in scene
								  scene.children[8] = object;
								  //set start position & scale
								  scene.children[8].scale.set( 6, 4.5, 6);
								  scene.children[8].position.set( 0, -7, 0);
								  scene.children[8].rotation.y = -2.5;
							     }
		);
		//green-1
		loader.load('obj/earth/green/left/green-1.obj', (object) => {
						  		    //set color
								    for ( let i = 0; i < object.children[0].material.length; i++ ) {
									object.children[0].material[i].color.r = 0.175;
								    	object.children[0].material[i].color.g = 0.484;
								    	object.children[0].material[i].color.b = 0.127;
					  			    }
								    //add obj in scene
								    scene.children[9] = object;
								    //set start position & scale
								    scene.children[9].scale.set( 6, 4.5, 6);
								    scene.children[9].position.set( 0, -7, 0);
								    scene.children[9].rotation.y = -2.5;
								 }
		);
		//green-2
		loader.load('obj/earth/green/left/green-2.obj', (object) => {
						  		    //set color
								    for ( let i = 0; i < object.children[0].material.length; i++ ) {
									object.children[0].material[i].color.r = 0.175;
								    	object.children[0].material[i].color.g = 0.484;
								    	object.children[0].material[i].color.b = 0.127;
					  			    }
								    //add obj in scene
								    scene.children[10] = object;
								    //set start position & scale
								    scene.children[10].scale.set( 6, 4.5, 6);
								    scene.children[10].position.set( 0, -7, 0);
								    scene.children[10].rotation.y = -2.5;
								 }
		);
	//right-1
		//base
		loader.load('obj/earth/green/right-1/base.obj', (object) => {
						  		  //set color
								  object.children[0].material.color.r = 0.351;
								  object.children[0].material.color.g = 0.196;
								  object.children[0].material.color.b = 0.163;
					  			  //add obj in scene
								  scene.children[11] = object;
								  //set start position & scale
								  scene.children[11].scale.set( 6, 4.5, 6);
								  scene.children[11].position.set( 0, -7, 0);
								  scene.children[11].rotation.y = -2.5;
							     }
		);
		//green-1
		loader.load('obj/earth/green/right-1/green-1.obj', (object) => {
						  		    //set color
								    object.children[0].material.color.r = 0.175;
								    object.children[0].material.color.g = 0.484;
								    object.children[0].material.color.b = 0.127;
					  			    //add obj in scene
								    scene.children[12] = object;
								    //set start position & scale
								    scene.children[12].scale.set( 6, 4.5, 6);
								    scene.children[12].position.set( 0, -7, 0);
								    scene.children[12].rotation.y = -2.5;
								 }
		);
		
		//green-2
		loader.load('obj/earth/green/right-1/green-2.obj', (object) => {
						  		    //set color
								    object.children[0].material.color.r = 0.175;
								    object.children[0].material.color.g = 0.484;
								    object.children[0].material.color.b = 0.127
								    //add obj in scene
								    scene.children[13] = object;
								    //set start position & scale
								    scene.children[13].scale.set( 6, 4.5, 6);
								    scene.children[13].position.set( 0, -7, 0);
								    scene.children[13].rotation.y = -2.5;
								 }
		);
		
	//right-2
		//base
		loader.load('obj/earth/green/right-2/base.obj', (object) => {
						  		  //set color
								  object.children[0].material.color.r = 0.351;
								  object.children[0].material.color.g = 0.196;
								  object.children[0].material.color.b = 0.163;
					  			  //add obj in scene
								  scene.children[14] = object;
								  //set start position & scale
								  scene.children[14].scale.set( 6, 4.5, 6);
								  scene.children[14].position.set( 0, -7, 0);
								  scene.children[14].rotation.y = -2.5;
							     }
		);
		//green-1
		loader.load('obj/earth/green/right-2/green-1.obj', (object) => {
						  		  //set color
								  object.children[0].material.color.r = 0.175;
								  object.children[0].material.color.g = 0.484;
								  object.children[0].material.color.b = 0.127
								  //add obj in scene
								  scene.children[15] = object;
								  //set start position & scale
								  scene.children[15].scale.set( 6, 4.5, 6);
								  scene.children[15].position.set( 0, -7, 0);
								  scene.children[15].rotation.y = -2.5;
							     }
		);
		//green-2
		loader.load('obj/earth/green/right-2/green-2.obj', (object) => {
						  		  //set color
								  object.children[0].material.color.r = 0.175;
								  object.children[0].material.color.g = 0.484;
								  object.children[0].material.color.b = 0.127
								   //add obj in scene
								  scene.children[16] = object;
								  //set start position & scale
								  scene.children[16].scale.set( 6, 4.5, 6);
								  scene.children[16].position.set( 0, -7, 0);
								  scene.children[16].rotation.y = -2.5;
							     }
		);
		//green-3
		loader.load('obj/earth/green/right-2/green-3.obj', (object) => {
						  		  //set color
								  object.children[0].material.color.r = 0.175;
								  object.children[0].material.color.g = 0.484;
								  object.children[0].material.color.b = 0.127
								  //add obj in scene
								  scene.children[17] = object;
								  //set start position & scale
								  scene.children[17].scale.set( 6, 4.5, 6);
								  scene.children[17].position.set( 0, -7, 0);
								  scene.children[17].rotation.y = -2.5;
							     }
		
		);
	
	//air
	//cloud
	//left-1
	loader.load('obj/air/cloud/left-1/cloud.obj', (object) => {
							  // ^_^
							  object.children[0].material = new THREE.MeshPhongMaterial();
							  //set color
							  for ( let i = 0; i < object.children[0].material.length; i++ ) {
								object.children[0].material[i].color.r = 1;
							    	object.children[0].material[i].color.g = 1;
							    	object.children[0].material[i].color.b = 1;
					  		  }	
							  //add obj in scene
							  scene.children[18] = object;
							  //set start position & scale
							  scene.children[18].scale.set( 6, 4.5, 6);
							  scene.children[18].position.set( 0, -9, 2);
							  scene.children[18].rotation.y = -2.5;
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

var inhale = true, exhale = false, size = 1;
function animation( time ) {
	 //life animation
	 if (inhale === true) {
			size -= 0.01;
			if (size > -0.5) {
				//!!!добавь комментарии не красиво
				scene.children[5].position.y -= 0.001;
				scene.children[6].position.y += 0.001;
				scene.children[7].position.y += 0.001;
				scene.children[9].rotation.x -= 0.0005;
				scene.children[10].rotation.x -= 0.0005;  
				scene.children[10].rotation.z -= 0.0005;
				//green
					//right
						
						//1
							//green-1
							scene.children[12].rotation.x -= 0.00025;
							//green-2
							scene.children[13].rotation.x -= 0.00025;
						//2
							//green-1
							scene.children[15].rotation.x -= 0.00025;
							//green-2
							scene.children[16].rotation.x -= 0.00025;
							//green-3
							scene.children[17].rotation.x -= 0.00025;
				
			} else { inhale = false; exhale =  true; }
		
		 }
	 if (exhale === true) {
			size += 0.01; 
			if (size < 0.5) {
				scene.children[5].position.y += 0.001;
				scene.children[6].position.y -= 0.001;
				scene.children[7].position.y -= 0.001;
				scene.children[9].rotation.x += 0.0005;
				scene.children[10].rotation.x += 0.0005;  
				scene.children[10].rotation.z += 0.0005;
				//green
					//right
						//1
							//green-1
							scene.children[12].rotation.x += 0.00025;
							//green-2
							scene.children[13].rotation.x += 0.00025;
						//2
							//green-1
							scene.children[15].rotation.x += 0.00025;
							//green-2
							scene.children[16].rotation.x += 0.00025;
							//green-3
							scene.children[17].rotation.x += 0.00025;
			} else { inhale = true; exhale =  false; }
		
	}
	 scene.children[3].rotation.y += 0.0005;
										    
	 //render	
	 renderer.render(scene, camera); 
}
