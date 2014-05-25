Meteor.publish("appointments", function () {
    return Appointments.find(
        {patient: this.userId});
});
