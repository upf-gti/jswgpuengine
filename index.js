var Module = {
    preRun: [],
    postRun: [],
    onRuntimeInitialized: () => {

    },
    canvas: null,
    totalDependencies: 0
};

async function onEnginePreInitialized() {

    await Promise.resolve( Module.Engine.getInstance() ).then( result => {

        if ( !result ) {
            console.error( "Module Instance is null" );
        }

        Module.Engine.instance = result;

    } ).catch( error => {
        console.log( error );
    });

    Promise.resolve( Module.Engine.instance.setWasmModuleInitialized(true) ).then().catch( error => {
        console.log( error );
    });
}

async function onglTFLoaded( ptr )
{
    if( Module.Engine.instance.onglTFLoaded )
    {
        Module.Engine.instance.onglTFLoaded( ptr );
    }
}

Module.runEngine = function( callback ) {

    if (!navigator.gpu) {
        const msg = document.createElement("div");
        Object.assign( msg.style, {
            width: "50%",
            fontSize: "36px",
            fontWeight: "500",
            textAlign: "center",
            margin: "0 auto",
            marginTop: "25%"
        } );
        msg.innerText = "Sorry, WebGPU is not supported by your browser.";
        document.body.appendChild(msg);
        console.error(msg.innerText);
        return;
    }

    console.warn("Running WGPUEngine!");

    let canvas = document.createElement('canvas');
    canvas.className = "emscripten";
    canvas.id = "canvas";
    canvas.tabIndex = -1;
    Object.assign(canvas.style, {
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0%",
        left: "0%",
        resize: "both"
    });
    canvas.addEventListener("oncontextmenu", (e) => { e.preventDefault() });
    document.body.appendChild(canvas);
    this.canvas = canvas;

    window.addEventListener('resize', () => {
        canvas.clientWidth = window.innerWidth;
        canvas.clientHeight = window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, false);

    var script = document.createElement( 'script' );
    script.id = "main-script";
    script.src = "node_modules/@upf-gti/jswgpuengine/engine.js";
    // script.src = "digital_locations.js";
    script.async = true;
    document.getElementsByTagName( 'head' )[ 0 ].appendChild( script );

    window.onEngineInitialized = callback;
}

Module._fileStore = function( filename, buffer ) {
    let data = buffer.constructor != Uint8Array ? new Uint8Array( buffer ) : buffer;
    let stream = FS.open( filename, 'w+' );
    FS.write( stream, data, 0, data.length, 0 );
    FS.close( stream );
}

window.Module = Module;
window.onEnginePreInitialized = onEnginePreInitialized;
window.onglTFLoaded = onglTFLoaded;

export { Module };