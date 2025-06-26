import "./LoadingScreen.css";
import pluralToSingular from "../../utils/pluralToSingular";

function getLoadingMessage({
  item,
  topicItem,
  singleArticleLoad,
  topicArticleLoad,
  userProfileLoad,
}) {
  const singularTopicItem = pluralToSingular(topicItem);

  if (singleArticleLoad) {
    return "Please wait while we spew out this article for you...";
  }

  if (topicArticleLoad) {
    return singularTopicItem === "puppy"
      ? "PUPPIES OMGFAASAFAA"
      : `Please wait while we spew out some ${singularTopicItem} articles for you...`;
  }

  if (userProfileLoad) {
    return "Please wait while we spew out your profile for you...";
  }

  if (item === "articles") {
    return "Hold up while I spew all these articles...";
  }

  if (item) {
    return `${item} being spewed expeditiously...`;
  }

  return "Loading spews...";
}

export default function LoadingScreen(props) {
  const message = getLoadingMessage(props);

  return (
    <>
      <img
        className="spewing-mascot"
        src="/assets/mascot/mascot-spewing-loading.png"
        alt="Daily Spews Mascot Spewing"
      />
      <p className="loading-message">{message}</p>
    </>
  );
}
