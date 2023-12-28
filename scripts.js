async function analyzeSentiment() {
    const textInput = document.getElementById("textInput").value;

    if (textInput.trim() === "") {
        alert("Please enter text before analyzing.");
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/analyze-sentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: textInput,
            }),
        });

        // Ensure that the response status is OK (200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Use text() to get the response as a string
        const dataString = await response.text();

        // Parse the string as JSON if applicable
        let data;
        try {
            data = JSON.parse(dataString);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            document.getElementById("result").innerHTML = "<p>An error occurred while analyzing sentiment.</p>";
            return;
        }

        document.getElementById("result").innerHTML = `<p>Sentiment: ${data.sentiment}</p>`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("result").innerHTML = "<p>An error occurred while analyzing sentiment.</p>";
    }
}

function clearText() {
    document.getElementById("textInput").value = "";
    document.getElementById("result").innerHTML = "";
}
