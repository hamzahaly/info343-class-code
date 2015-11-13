/* Test script for the Tasks List app */
describe('the tasks app', function() { // Descriptive name in first param, function second param
    var taskTitleInp = element(by.model("newTask.title"));
    var addTaskBtn = element(by.buttonText('Add Task'));  // THe name of the button
    var tasksList = element.all(by.repeater('task in tasks')); // String in an ng-repeat, .all gets all the li elements
    var requiredMsg = $('.title-required-error'); // Refers to element by style class.


    function addTask(title) {
        taskTitleInp.sendKeys(title); // Send strings as if user was inputting things into the input control
        addTaskBtn.click(); // Simulates Clicking
    }

    function addMultipleTasks(num) {
        var idx;
        for (idx = 0; idx < num; ++idx) {
            addTask('Task ' + idx)
        }
    }

    beforeEach(function() {
        browser.get('http://localhost:8000/');
    });
    //define a single test
    it('must have the proper page title', function() {
        expect(browser.getTitle()).toEqual('My Tasks');

    });

    it('must add a task', function() {
        var title = 'Learn Protractor';
        addTask(title);
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(title);
    });

    it('must add a task hitting enter', function() {
        var title = 'Learn Protractor';
        taskTitleInp.sendKeys(title);
        taskTitleInp.sendKeys(protractor.Key.ENTER);

        expect(tasksList.count()).toEqual(1); // Still don't understand why 1 is inside toEqual
        expect(tasksList.get(0).getText()).toEqual(title);
    });

    it('must clear the title after adding', function() {
        addTask('box should get cleared');
        expect(taskTitleInp.getAttribute('value')).toEqual('');
    });

    it('must add multiple tasks', function(){
        var num = 20;
       addMultipleTasks(num);
        expect(tasksList.count()).toEqual(num);
    });

    it('must show required validation error', function(){
        expect(requiredMsg.isPresent()).toEqual(false);
        taskTitleInp.sendKeys('ABC'); //Simulate user typing things into the field
        taskTitleInp.clear();
        expect(requiredMsg.isPresent()).toEqual(true);
        taskTitleInp.sendKeys('ac');

    });

    it('must disable add task button with blank title', function(){
        expect(addTaskBtn.getAttribute('disabled')).toEqual('true');
        taskTitleInp.sendKeys('asdf');
        expect(addTaskBtn.getAttribute('disabled')).toBe(null);
        taskTitleInp.clear();
        taskTitleInp.sendKeys('        ');
        expect(addTaskBtn.getAttribute('disabled')).toEqual('true');
    });

    it('must toggle done with click', function() {
        addTask('test style class');
        addTask('not marked as done');
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        expect(tasksList.get(0).getAttribute('class')).toContain('completed-task');
        expect(tasksList.get(1).getAttribute('class')).not.toContain('completed-task');// To contain because there are other style classes.
    });

    it('must purge completed tasks', function() {
        addTask('Something');
        addTask('Something else');

        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        element(by.buttonText('Purge Completed Tasks')).click();

        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual('Something else');
    });
});

//webdriver-manager start
//python -m SimpleHTTPServer
//protractor test/(Thing to test) to test