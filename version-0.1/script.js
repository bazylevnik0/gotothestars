//init variables
var camera, scene, light, light_ambient, renderer;

//set loaders

//возможно без них?
const loader = new OBJLoader();
const loader_texture = new THREE.TextureLoader();
	
init();

function init() {
	//camera
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.set(0, 0, 5);
	
	//scene
	scene = new THREE.Scene();
	//table of scene children objects:
	//[0]: light point;
	//[1]: light ambient;
	//[2]: obj sky;
	//[3]: obj back;	
	//[4]: obj earth;

		
	//point light
	light = new THREE.PointLight( 0xffffff, 1, 8 );
	light.position.set( 0, 0, 0 );
	//add point light in scene
	scene.children[0] = light;
	
	//ambient light
	light_ambient = new THREE.AmbientLight( 0x404040 );
	//add ambient light in scene
	scene.children[1] = light_ambient;
	
		
	/*test_obj
	let geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
	let material = new THREE.MeshPhongMaterial({color: 0xffffff}); 
    	let mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	*/
	
	//load .obj objects
	//sky
	loader.load('obj/sky.obj', (obj) => {
		let texture = loader_texture.load('img/back_texture.jpg')
	
		obj.children[0].material.map = texture;
		
		//add obj in scene
		scene.children[2] = obj;
		//set start position & scale
		scene.children[2].position.set(0,0,0);
		scene.children[2].scale.set( 5.25, 5.25, 5.25);
	});
	//back
	loader.load('obj/back.obj', (obj) => {
		scene.children[3] = obj;
	
	


		/*temp version1
		let texture = loader_texture.load('img/back_texture.jpg')
		obj.children[0].material.map = texture;
		scene.children[3] = obj;
		*/

		/*temp version3
		let texture = loader_texture.load('img/back_texture.jpg')
			obj.children[0].material = new THREE.MeshStandardMaterial();
		let temp_mesh = new THREE.Mesh( obj.children[0].geometry,  obj.children[0].material );
		//temp_mesh.material.map = texture;
		temp_mesh.traverse(function (child) {   // aka setTexture
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                }
           	 });
		scene.children[3] = temp_mesh;
		*/

		/*temp version2
		obj.children[0].material = new THREE.MeshStandardMaterial();
		obj.children[0].material.map = texture; 

		obj.children[0].geometry.computeVertexNormals();
		let temp_mesh = new THREE.Mesh( obj.children[0].geometry,  obj.children[0].material );
		scene.children[3] = temp_mesh;	
		*/

		//add obj in scene
		//set start position & scale
		scene.children[3].scale.set( 7, 7, 7);
		scene.children[3].position.set(0,-2.5,0);
	});
	//earth
	loader.load('obj/earth/earth.obj', (obj) => {
		//add obj in scene
		scene.children[5] = obj;
		//set start position & scale
		scene.children[5].scale.set( 5, 5, 5);
		scene.children[5].position.set(0,-4.5,0);
	});
	
	//exp: add obj with mtl
	const manager = new THREE.LoadingManager();
				manager.addHandler( /\.dds$/i, new DDSLoader() );

				// comment in the following line and import TGALoader if your asset uses TGA textures
				// manager.addHandler( /\.tga$/i, new TGALoader() );

				new MTLLoader( manager )
					.setPath( 'obj/temp/' )
					.load( 'test_uv.mtl', function ( materials ) {

						materials.preload();

						new OBJLoader( manager )
							.setMaterials( materials )
							.setPath( 'obj/temp/' )
							.load( 'test_uv.obj', function ( object ) {

								scene.children[4] = object;
							} );

					} );

				//





	//const manager = new THREE.LoadingManager();
	
	/*
	var mat, obj;
	const load_mat = new MTLLoader();
	//const load_obj = new OBJLoader();
	/*
	load_mat.load('obj/temp/test_uv.mtl', ( material ) => {
							      console.log(".load mat");
							      material.preload();
	loader.load('obj/temp/test_uv.obj', (object) => {
		//add obj in scene
		load_mat.load('obj/temp/test_uv.mtl', (material) => {
						      material.preload();
						      object.material = material;
						      }
		);
	});
	*/

	
	/*
	new MTLLoader( manager )
				.load('obj/temp/test_uv.mtl', ( material ) => {
							      console.log(".load mat");
							      material.preload();
								
							      new OBJLoader( manager )
							       			     .load('obj/temp/test_uv.obj', ( object ) => {
														   console.log(".load obj");
														   scene.add( object );
														   //scene.children[5] = object;
														     );
							      }
				);
	*/			 
	//
	
		
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
		
	renderer.setAnimationLoop( animation );
}

function animation( time ) {
	/*test_obj
	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;
	*/

  	renderer.render(scene, camera);
}
