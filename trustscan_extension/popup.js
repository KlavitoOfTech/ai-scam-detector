const scanBtn = document.getElementById("scanBtn");

const resultDiv = document.getElementById("result");

scanBtn.addEventListener("click", async () => {

  resultDiv.innerHTML = "Scanning website...";

  // GET CURRENT TAB URL
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },

    async (tabs) => {

      const currentURL = tabs[0].url;

      console.log(currentURL);

      try {

        // SEND URL TO FLASK API
        const response = await fetch(
          "http://127.0.0.1:5000/predict",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({
              message: currentURL
            })
          }
        );

        const data = await response.json();

        // SHOW RESULT
        if (data.result === "spam") {

          resultDiv.innerHTML =
            "🚨 Dangerous Website Detected";

        } else {

          resultDiv.innerHTML =
            "✅ Website Appears Safe";

        }

      } catch (error) {

        console.error(error);

        resultDiv.innerHTML =
          "Server Error";

      }

    }
  );

});