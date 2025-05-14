import { useState } from "react";
import shortenner from "./services/shortennerUrl";

export default function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [expirationTime, setExpirationTime] = useState("1d");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Show error message
    if (!originalUrl) {
      alert("Please enter a URL to shorten");
      return;
    }

    // Validate URL format
    try {
      new URL(originalUrl);
    } catch (e) {
      return;
    }

    setIsLoading(true);

    try {
      const data = await shortenner(originalUrl, expirationTime);

      setShortenedUrl(data);
      console.log(shortenedUrl);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  const resetForm = () => {
    setOriginalUrl("");
    setExpirationTime("1d");
    setShortenedUrl("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-md rounded-lg border bg-white shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            URL Shortener
          </h3>
          <p className="text-sm text-gray-500">
            Shorten your long URLs into memorable, short links.
          </p>
        </div>
        <div className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="original-url"
                className="text-sm font-medium leading-none"
              >
                Original URL
              </label>
              <input
                id="original-url"
                type="url"
                placeholder="https://example.com/very/long/url/that/needs/shortening"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="expiration-time"
                className="text-sm font-medium leading-none"
              >
                Expiration Time
              </label>
              <select
                id="expiration-time"
                value={expirationTime}
                onChange={(e) => setExpirationTime(e.target.value)}
                className="flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="1h">1 hour</option>
                <option value="1d">1 day</option>
                <option value="7d">7 days</option>
                <option value="30d">30 days</option>
              </select>
            </div>

            <button
              type="submit"
              className="inline-flex h-10 w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Shortening..." : "Shorten URL"}
            </button>
          </form>

          {shortenedUrl && (
            <div className="mt-6 space-y-2">
              <label className="text-sm font-medium leading-none">
                Your Shortened URL
              </label>
              <div className="flex items-center relative">
                <input
                  value={shortenedUrl}
                  readOnly
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 p-1 rounded-md hover:bg-gray-100"
                  onClick={copyToClipboard}
                >
                  {isCopied ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                  <span className="sr-only">Copy</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Expires:{" "}
                {expirationTime === "never" ? "Never" : `In ${expirationTime}`}
              </p>
            </div>
          )}
        </div>
        {shortenedUrl && (
          <div className="flex items-center p-6 pt-0">
            <button
              className="inline-flex h-10 w-full items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={resetForm}
            >
              Create Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
