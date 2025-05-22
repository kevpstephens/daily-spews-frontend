export default function LoadingScreen({item}) {
  return (
    <>
      <img
        className="spewing-mascot"
        src="../src/assets/daily-spews-alt-logo-cropped.png"
        alt="Daily Spews Mascot Spewing"
      />
      <p className="loading-message">
        {`Please wait while we spew out some ${item} for you...`}
      </p>
    </>
  );
}
