module.exports = {
  async up(db, client) {
    await db.collection('doctors').updateMany({}, {
      $set: {
        'social_media': {
          insta_link: null,
          fb_link: null
        }
      }
    });
  },

  async down(db, client) {
    await db.collection('doctors').updateMany({}, {
      $unset: {
        'social_media': ""
      }
    });
  }
};
