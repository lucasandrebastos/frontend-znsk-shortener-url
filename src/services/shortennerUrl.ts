async function shortenner(url: string, expires: string) {
  try {
    const response = await fetch(
      "https://znsk-shortener-url-production.up.railway.app/shorten",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl: url,
          expires: expires,
        }),
      }
    );

    const data = await response.text();
    return data;
  } catch (error) {
    console.error("não foi possível encurtar o link", error);
    return "";
  }
}

export default shortenner;
