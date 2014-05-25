Appointments = new Meteor.Collection("appointments");


Meteor.methods({
    // options should include: title, description, x, y, public
    requestAppointment: function (options) {
        check(options, {
            problem: NonEmptyString,
            symptoms: NonEmptyString,
            public: Match.Optional(Boolean),
            doctorId: NonEmptyString,
            _id: Match.Optional(NonEmptyString)
        });

        if (! this.userId)
            throw new Meteor.Error(403, "You must be logged in");

        var id = Random.id();
        Appointments.insert({
            _id: id,
            patient: this.userId,
            problem: options.title,
            symptoms: options.symptoms,
            doctor: options.doctorId,
            confirmed: false,
            date: options.date,
            phone: options.phone,
            apple_id: options.phone,
            contactMethod: options.phone
        });
        return id;
    },

    confirmAppointment: function(appointment){
        Appointments.update(appointment._id,
            {$set: {
                confirmed: true,
                date: appointment.date
            }}
        )
    },

    cancelAppointment: function(appointment){
        Appointments.update(appointment._id,
            {$set: {
                cancelled: true,
            },
            $unset: {
                date: ""
            }}
        )
    }

});