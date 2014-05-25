// Rig some famo.us deps
require("famous-polyfills"); // Add polyfills
require("famous/core/famous"); // Add the default css file

// Basic deps
var Engine           = require("famous/core/Engine");
var Modifier         = require("famous/core/Modifier");
var RenderController = require("famous/views/RenderController");
var Transform = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');
var Easing = require('famous/transitions/Easing');

var mainContext = Engine.createContext();

var registerSurface=new ReactiveSurface({
    size: [true, true],
    origin: [.5, .5],
    align: [.5, .5],
    properties: {
        backgroundColor: "black",
        margin: 'auto',
        padding: '50px'
    },
    template: Template.loginButtons
});


var _showLoginForm=function(){

    var centerSpinModifier = new Modifier({
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
    });
    mainContext.add(centerSpinModifier).add(registerSurface);
};

var _moveLoginForm=function(){

    var removeModifier = new Modifier({
        //origin: [1,0],
        //align: [1,0]
    });
    removeModifier.setTransform(
        Transform.rotateZ(100),
        { duration : 30000, curve: 'easeInOut' }
    );
    mainContext.add(removeModifier).add(registerSurface);
};


// Make sure dom got a body...
Meteor.startup(function() {

    Meteor.subscribe("appointments");

    Deps.autorun(function () {
        if (Meteor.userId()){
            _moveLoginForm();
        }
        else{
            _showLoginForm();
        }
    });


});
