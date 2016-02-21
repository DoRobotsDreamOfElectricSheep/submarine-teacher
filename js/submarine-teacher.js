function Submarine() {
    return submarineFactory.createSubmarine();
}

var Teacher = (function () {

    var errConsole = $('#lesson');
    var originalExecute = execute;
    var originalSub = Submarine;
    var currentLesson = 0;
    var lessonOutput;

    /*
    var dash = {
        speedGaugeOn: ,
        radarOn: ,
        radarOff: ,
    }
    */

    var lessons = [
        {
            description:
            '//   Are you ready to explore the mysteries of the sea?'
            + '\n\n//   Create a submarine and store it in a variable.  The variable name can be anything you want ex: mySub, yellowSub, etc, but it can not be named Submarine'
            + '\n//   #Note: Javascript is case-sensitive'
            + '\n\n   var mySub = new Submarine();'
            + '\n\n//   Type the line of code above into the editor below...then click run.',

            lesson: function(){
                Submarine = function () {
                    nextLesson();
                };
            }
        },
        {
            description:
            '//   Good Job. Now create a submarine and turn left'
            + '\n\n//   Create a submarine and store it in a variable.  The variable name can be anything you want ex: mySub, yellowSub, etc, but it can not be named Submarine'
            + '\n//   #Note: Javascript is case-sensitive and statements end with a semicolon'
            + '\n\n   var mySub = new Submarine();'
            + '\n\n//   Then move the submarine left'
            + '\n\n   mySub.moveLeft();'
            + '\n\n//   Type the two lines of code above into the editor below...then click run.',

            lesson: function(){
                Submarine = function() {
                    var sub = submarineFactory.createSubmarine();
                    var originalLeft = sub.moveLeft;
                    sub.moveLeft = function(){
                        originalLeft();
                        setTimeout(function(){ sub.stop(); nextLesson();}, 3000);
                    };

                    return sub;
                };
            }
        },
        {
            description:
            '//   Good Job. This time turn right.'
            + '\n\n//   You know the drill:'
            + '\n\n   var mySub = new Submarine();'
            + '\n   mySub.moveRight();'
            + '\n\n//   Type the two lines of code above into the editor below...then click run.',

            lesson: function(){
                Submarine = function() {
                    var sub = submarineFactory.createSubmarine();
                    var originalForward = sub.moveForward;
                    sub.moveForward = function(){
                        originalForward();
                        setTimeout(function(){ sub.stop(); nextLesson();}, 3000);
                    };

                    return sub;
                };
            }
        },
        {
            description:
            '//   Alright the crew is getting dizzy.  Lets try going forward'
            + '\n\n   var mySub = new Submarine();'
            + '\n\n   mySub.moveForward();'
            + '\n\n//   Type the two lines of code above into the editor below...then click run.',

            lesson: function(){
                Submarine = function() {
                    var sub = submarineFactory.createSubmarine();
                    var originalForward = sub.moveForward;
                    sub.moveForward = function(){
                        originalForward();
                        setTimeout(function(){ sub.stop(); nextLesson();}, 3000);
                    };

                    return sub;
                };
            }
        },
        {
            description:
            "//   If we just went forward, guess which way we're going next"
            + '\n\n   mySub.moveBackward();'
            + '\n\n   Did you forget to create a submarine first?',

            lesson: function(){
                Submarine = function() {
                    var sub = submarineFactory.createSubmarine();
                    var originalBack = sub.moveBackward;
                    sub.moveBackward = function(){
                        originalBack();
                        setTimeout(function(){ sub.stop(); nextLesson();}, 3000);
                    };

                    return sub;
                };
            }
        },
        {
            description:
            "//   Time to swim with the fishes.  Dive by filling the ballast tanks"
            + '\n\n   mySub.moveDown();'
            + '\n\n   Did you forget to create a submarine first?',

            lesson: function(){
                Submarine = function() {
                    var sub = submarineFactory.createSubmarine();
                    var originalDown = sub.moveDown;
                    sub.moveDown = function(){
                        originalDown();
                        setTimeout(function(){ sub.stop(); nextLesson();}, 3000);
                    };

                    return sub;
                };
            }
        },
        {
            description:
            "//   Now that we're alone...under the sea...it's time to learn about functions.  A function is a way to encapsulate tasks in a reusable block of code."
            + '\n//   Lets look at a definition of a function named "makeCoffee":'
            + '\n\n   function dashboardOn(submarine){'
            + '\n       submarine.radarOn();'
            + '\n       submarine.speedGaugeOn();'
            + '\n       submarine.depthGaugeOn();'
            + '\n     }'
            + '\n\n//   Notice the keyword "function" was written before the function name.  The parentheses following the function are used to pass parameters to the function and are empty if the function takes no parameters.'
            + '  Following the parentheses is an opening bracket that marks the beginning of the code that will be executed by this function.  Remember to use the closing bracket after '
            + 'end your function with a closing bracket.'
            + '\n//   To execute the function simply call it like so:'
            + '\n\n   dashboardOn(mySubmarine);'
            + '\n\n//   Declare a function name "dashboardOn" that turns on all the submarine electronics and then call the function'
            + '\n\n'
            + '\n\n   Did you forget to create a submarine first?',

            lesson: function(){
                Submarine = function() {
                    var sub = submarineFactory.createSubmarine();

                    dashboardOn = function(){
                        return "not overriden";
                    }

                    var radarOn = false;
                    var originalRadar = dash.radarOn;
                    sub.radarOn = function(){
                        originalRadar();
                        radarOn = true;
                        finishLesson();
                    };

                    var speedOn = false;
                    var originalSpeed = dash.speedGaugeOn;
                    sub.speedGaugeOn = function(){
                        originalSpeed();
                        speedOn = true;
                        finishLesson();
                    };

                    var depthOn = false;
                    var originalDepth = dash.depthGaugeOn;
                    sub.depthGaugeOn = function(){
                        originalDepth();
                        depthOn = true;
                        finishLesson();
                    };

                    var finishLesson = function(){
                        if(speedOn && depthOn && radarOn){
                            if(dashboardOn() != "not overriden") {
                                setTimeout(function () {
                                    sub.radarOff();
                                    sub.speedGaugeOff();
                                    sub.depthGaugeOff();
                                    nextLesson();
                                }, 9000);
                            }
                        }
                    }

                    return sub;
                };
            }
        }
    ]

    function CreateTeacher(lessonEditor) {
        //override the console so that students see output in the interface
        console.log = function (message) { errConsole.insert(lessons[currentLesson].description); }
        lessonOutput = lessonEditor
        return {
            getLessonNumber: currentLesson,
            nextLesson: nextLesson,
            execute: execute
        }
    }

    function execute(studentWork){
        try {
            eval(studentWork);
        }catch(err){
            errConsole.insert(err);
        }

    }

    function resetOverrides() {
        execute = originalExecute;
        Submarine = originalSub;
    }

    function nextLesson(){
        resetOverrides();
        if(currentLesson < lessons.length) {
            lessonOutput.setValue("");
            lessonOutput.insert(lessons[currentLesson].description);
            lessons[currentLesson].lesson();
            currentLesson++;
        }
    }

    return {
        Create: CreateTeacher
    };
})();
