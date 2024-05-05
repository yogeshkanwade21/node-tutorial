const {ROLE} = require('../data');

function canViewProject(user, project) {
    console.log('User:', user);
    console.log('Project:', project);

    const isAdmin = user.role === ROLE.ADMIN;
    const isProjectOwner = project.userId === user.id;

    console.log('isAdmin:', isAdmin);
    console.log('isProjectOwner:', isProjectOwner);

    return isAdmin || isProjectOwner;
}

module.exports = canViewProject;