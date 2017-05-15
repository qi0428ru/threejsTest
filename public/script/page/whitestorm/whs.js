var WHS = require('whs');
const app = new WHS.App([
  new WHS.app.ElementModule(), // attach to DOM
  new WHS.app.SceneModule(), // creates THREE.Scene instance
  new WHS.app.CameraModule(), // creates PerspectiveCamera instance
  new WHS.app.RenderingModule() // creates WebGLRenderer instance
]);

app.start(); 