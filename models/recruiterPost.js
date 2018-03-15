module.exports = function(sequelize, DataTypes) {
  var RecruiterPosts = sequelize.define("Post", {
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,30]
      }
    },
    jobDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [15,255]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10,50]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,20]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,2]
      }
    },
    zipCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [5,5]
      }
    },
    latitude: {
      type: DataTypes.DECIMAL(20,15),
      allowNull: true,
      validate: {
        min: -90,
        max: 90,
        len: [2,20]
      }
    },
    longitude: {
      type: DataTypes.DECIMAL(20,15),
      allowNull: true,
      validate: {
        min: -180,
        max: 180,
        len: [3,20]
      }
    }
  });
  return RecruiterPosts;
}
