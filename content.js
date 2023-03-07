function __summarize(api_key) {
    var selection = window.getSelection().toString();
    if (selection.length == 0) return;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.openai.com/v1/chat/completions");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + api_key);
    document.body.innerHTML = 'asking...'
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    document.body.style.fontFamily = 'monospace'
    document.body.style.fontSize = "16px"
    document.body.style.margin = "auto"
    document.body.style.padding = "1rem"
    document.body.style.maxWidth = "60rem"

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                var summary = response.choices[0].message.content;
                document.body.innerHTML = summary
                window.scrollTo({top: 0})
            } else {
                try {
                    var e = JSON.parse(xhr.responseText);
                    document.body.innerHTML = e.error.message
                } catch(e) {
                    document.body.innerHTML = 'error asking.. check the console'
                    console.log(xhr)
                }
            }
        }
    }

    var data = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "Summarize the following text as if you are Richard Feynman"},
            {"role": "user", "content": selection}
        ]
    });
    xhr.send(data);
}
