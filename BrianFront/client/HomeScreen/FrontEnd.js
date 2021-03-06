// counter starts at 0
color = "red";
Session.set("valid", false);
Session.set("activateWarningText", false);
Session.set("input", false);
inputText = "";

Meteor.subscribe("grocerylist");


Template.main.helpers(
    {
        counter: function ()
        {
            return Session.get('counter');
        },

        color: function ()
        {
            return color;
        },
        activateWarningTextFunc: function() {
            return Session.get("activateWarningText");
        },
        validFunc: function() {
            return Session.get("valid");
        }
    }
);

Template.main.events(
    {
        'keyup #emailInput': function(event) {
            var splitArray = $(event.target).val().split(',');
            for (var num in splitArray) {
                if (Meteor.myFunctions.validateEmail(splitArray[num]) === true) {
                    Session.set("valid",true);
                }
                else {
                    Session.set("valid",false);
                    break;
                }
            }
        },

        'submit #addNewList': function(event, template)
        {
            if (Session.get("valid") == false) {
                //event.preventDefault();
                Session.set("activateWarningText",true);
            }
            else {
                Meteor.call("nList", template.find("#listName").value); //EXPERIMENTAL
                //Meteor.call("sendInvitations", emailsarray);
                //Route to next page
                // Close the window if input is correct
                $('#modal1').closeModal();

                // David, implement your submissions here

            }
            event.preventDefault();
            return 0;

        },

        "click #addButtonBottomRight" : function()
        {
            $('#modal1').openModal();
            return 0;
        }
    }
);

Template.mainHead.helpers(
    {
        color: function () {
            return color;
        }
    }
);

Template.mainHead.events(
    {
        'click #searchBarClose': function ()
        {
            var frm = document.getElementById("searchForm");
            frm.reset();  // Reset
            Session.set("input", false);
            return false;
        },

        'keypress #search': function(event, template) {
            Session.set("input",false); // Must stay! Allows search to operate still after user changes their mind
        },

        'click #searchButton': function(event, template) {
            performSearch(event, template);
        },

        'submit form': function(event, template) {
            performSearch(event, template);
        }
    }
);

Template.mainListCards.events(
    {
        "click .card": function(event) {
            Session.set("ListID", this._id);
        }
    }
);

Template.mainListCards.helpers(
    {
        color: function ()
        {
            return color;
        },
        /*listTitle: function ()
        {
            return this.title;
        },
        listInfo: function ()
        {
            return this.info;
        }*/
    }
);

Template.HomeScreen.helpers({
    DisplayList: function () {
        if (Session.get("input") == false) {
            return GroceryList.find({}, {sort: {name: 1}});
        }
        else {
            return GroceryList.find({name: inputText}, {sort: {name: 1}});
        }
    }
});

function performSearch (event, template) {
    Session.set("input", true);
    inputText = template.find("#search").value;
    console.log(inputText);
    event.preventDefault();
}
