import pluralToSingular from "../utils/pluralToSingular";

export default function LoadingScreen({
  item,
  singleArticleLoad,
  topicArticleLoad,
  topicItem,
}) {
  topicItem = pluralToSingular(topicItem);
  let message = `${item} being spewed expeditiously`;

  if (singleArticleLoad) {
    message = "Please wait while we spew out this article for you...";
  }
  if (topicArticleLoad) {
    if (topicItem === "puppy") {
      message = "PUPPIES OMGFAASAFAA";
    } else {
      message = `Please wait while we spew out some ${topicItem} articles for you...`;
    }
  }
  if (item === "articles") {
    message = `Hold up while I spew all these articles`;
  }

  return (
    <>
      <img
        className="spewing-mascot"
        src="./src/assets/logo/daily-spews-alt-logo-cropped.png"
        alt="Daily Spews Mascot Spewing"
      />
      <p className="loading-message">{message}</p>
    </>
  );
}
