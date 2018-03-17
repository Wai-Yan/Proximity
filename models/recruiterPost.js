module.exports = function(sequelize, DataTypes) {
  var RecruiterPosts = sequelize.define("Post", {
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,50]
      }
    },
    jobDescription: {
      type: DataTypes.STRING(10000),
      allowNull: false,
      validate: {
        len: [15,10000]
      }
    },
    // jobQualification: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    //   validate: {
    //     len: [15,10000]
    //   }
    // },
    // additionalInfo: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    //   validate: {
    //     len: [15,10000]
    //   }
    // },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,255]
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
    // postLink: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [10,50]
    //   }
    // },
    // companyLink: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [10,50]
    //   }
    // },
    placeID: {
      type: DataTypes.STRING,
      allowNull: true
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
