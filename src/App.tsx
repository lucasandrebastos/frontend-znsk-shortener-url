import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent } from "./components/ui/card";
import { ToastContainer, toast } from "react-toastify";
import shortenner from "./services/shortennerUrl";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = await shortenner(originalUrl);

    setShortenedUrl(data);
    setOriginalUrl("");
    toast.success("Link encurtado com sucesso!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  async function copyToClip() {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      toast.success("Link copiado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.error("erro ao copiar", err);
    }
  }

  return (
    <Card className="flex m-auto ">
      <CardContent>
        <form
          onSubmit={handleSubmit}
          id="Encurtador de links"
          className="flex flex-col gap-2"
        >
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="Url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />

            <Button
              className="hover:bg-green-100 hover:cursor-pointer active:bg-green-300 "
              variant={"outline"}
              type="submit"
            >
              Encurtar link
            </Button>
          </div>
          <div className="flex gap-2">
            <Input readOnly type="text" value={shortenedUrl} />
            <Button
              className="hover:bg-blue-100 hover:cursor-pointer active:bg-blue-300 "
              onClick={copyToClip}
              variant={"outline"}
              type="button"
            >
              Copiar
            </Button>
            <ToastContainer />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default App;
