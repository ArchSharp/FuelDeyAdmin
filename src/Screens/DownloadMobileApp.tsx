export const DownloadMobileApp = () => {
  const handleDownload = () => {
    // Replace with the actual path to your APK file
    const apkUrl = "/FuelDey.apk";
    const link = document.createElement("a");
    link.href = apkUrl;
    link.download = "FuelDey.apk"; // Optional: Set default download file name
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="" alt="" />
      <div>Download and install FuelDey Mobile Application</div>
      <button
        className="py-2 px-4 mt-3 bg-home text-white rounded-md"
        onClick={handleDownload}
      >
        Download
      </button>
    </div>
  );
};
