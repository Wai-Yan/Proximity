module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,30]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,30]
      }
    },
    isRecruiter: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    wantsRemote: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    preferredLocation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,255]
      }
    },
    radius: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1,2]
      }
    },
    associatedJobs: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,255]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,255]
      }
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,12]
      }
    },
    profilePicLink: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,255]
      }
    },
    oktaNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,255]
      }
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1,255]
      }
    },
    companySiteLink: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1,255]
      }
    }
  });

  return Users;
};
