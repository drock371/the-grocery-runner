/**
 * Created by darryl on 2015-11-14.
 */

Meteor.startup(function () {
    // code to run on server at startup
});

Meteor.publish("lists", function() {
    return Lists.find({user: this.userId});
});