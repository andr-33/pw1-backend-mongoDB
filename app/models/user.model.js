const userModel = (Moongose, Schema) => {
    const UserShema = new Schema({
        username: String,
        email: String,
        password: String,
        roles: [String]
    });

    const User = Moongose.model('User', UserShema);

    return User;
};

module.exports = userModel;