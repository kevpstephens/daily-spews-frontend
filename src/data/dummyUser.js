//  Our backend doesn’t support authentication, so you should hardcode a logged-in user.
// A good starting point is to assume all new articles/comments are posted by that user.

import defaultUserImage from "/assets/users/default-user-image.jpg";

export const dummyUser = {
  username: "dummyUser",
  name: "SirDummy TheUser",
  avatar_url: defaultUserImage,
};
