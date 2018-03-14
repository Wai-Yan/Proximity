module.exports = function(sequelize, DataTypes) {
  var RecruiterPosts = sequelize.define("Post", {
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return RecruiterPosts;
}
