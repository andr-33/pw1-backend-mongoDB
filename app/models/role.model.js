const roleModel = (Moongose, Schema) => {
    const RoleSchema = new Schema({
        name: String,
    });

    const Role = Moongose.model('Role', RoleSchema);

    return Role;
};

module.exports = roleModel;