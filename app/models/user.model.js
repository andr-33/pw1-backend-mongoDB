const userModel = (Moongose, Schema) => {
    const UserShema = new Schema({
        username: String,
        email: String,
        password: String,
        roles: [{
            type: Schema.Types.ObjectId,
            ref: 'Role'
        }]
    });

    const User = Moongose.model('User', UserShema);

    return User;
};

module.exports = userModel;