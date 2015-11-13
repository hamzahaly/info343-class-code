exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['*-spec.js'], // WILD CARD *-
    rootElement: 'body' // finds the ng-app attribute on whatever element name you put
    // (this is where ng-app lives). What goes here is the selector on which where ng-app happens to be
};

// Why do we write automated tests?
// Full coverage over app. makes sure that the application still works, every feature still works even though
// you aren't actively working on that particular feature.
// Behavior Driven Development
//
