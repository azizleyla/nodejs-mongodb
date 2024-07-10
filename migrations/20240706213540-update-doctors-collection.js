module.exports = {
  async up(db, client) {
    await db.collection('doctors').updateMany({}, {
      $set: {
        firstname: null,         // Default value for name
        lastname: null,
        position: null,
        email: null,
        gender: null,
        img_path: null,
        phone: null,
        bio: null,
        social_media: {
          insta_link: null,
          fb_link: null
        }
        // Default value for specialization
      }
    });
  },

  async down(db, client) {
    await db.collection('doctors').updateMany({}, {
      $unset: {
        firstname: "",
        lastname: "",
        position: "",
        email: "",
        gender: "",
        img_path: "",
        phone: "",
        bio: "",
        social_media: ""
      }
    });
  }
};
