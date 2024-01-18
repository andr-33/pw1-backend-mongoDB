const roleModel = (Moongose, Schema) => {
    const RoleSchema = new Schema({
        name: String,
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    });

    const Role = Moongose.model('Role', RoleSchema);

    return Role;
};

module.exports = roleModel;