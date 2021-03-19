var camera, scene, light, light_ambient, renderer;
var geometry, material, mesh;

init();

function init() {
	
	//table of scene objects:
	//[0]: light point;
	//[1]: light ambient;
	//[2]: obj sky;	
	
	//scene
	scene = new THREE.Scene();
	//camera
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.set(0, 0, 5);
		
	//light
	//point
	light = new THREE.PointLight( 0xffffff, 1, 8 );
	light.position.set( 0, 0, 0 );
	scene.children[0] = light;
	//ambient
	light_ambient = new THREE.AmbientLight( 0x404040 );
	scene.children[1] = light_ambient;
	
		
	/*test_obj
	geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
	material = new THREE.MeshPhongMaterial({color: 0xffffff}); 
    	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	*/

	//load .obj objects
	const loader = new OBJLoader();
	//sky
	loader.load('obj/sky.obj', (obj) => {
		scene.children[2] = obj;
		scene.children[2].scale.set(5.25,5.25,5.25);
	});
	//back
	loader.load('obj/back.obj', (obj) => {
		scene.children[3] = obj;
		scene.children[3].rotation.x = 0.4;
		//scene.children[3].scale.set(5.25,5.25,5.25);
		//scene.children[3].position.set(0,-2.5,0);
	});
	
		
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
