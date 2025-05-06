async function shortenner(url: string) {
  try {
    const response = await fetch("http://localhost:8080/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalUrl: url,
      }),
    });

    const data = await response.text();
    return data;
  } catch (error) {
    console.error("não foi possível encurtar o link", error);
    return "";
  }
}

export default shortenner;
