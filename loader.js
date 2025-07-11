var roomsIDX = getQueryParam("roomsID");
const UrlMainButton =
  "https://routers.dummytech.my.id:2020/DummyChat/Endpoint/";
const variable =
  ' <div class="chatbutton " >' +
  '  <a href="javascript:void(0);" class="click-show" id="chatToggleBtn">' +
  '    <span id="jmlhchat" style="position:absolute;top:-15px;right:-5px;font-size:12px;display:none;" class="translate-middle badge rounded-pill text-dark bg-info">' +
  "      0" +
  "    </span>" +
  '    <img src="https://cdn-icons-png.flaticon.com/128/1041/1041916.png" id="gambar_widget" style="width:80px;"  alt="Chat-Button">' +
  "  </a>" +
  " </div>";

// Pastikan variabel `variable`, `UrlMainButton`, dan `roomsIDX sudah tersedia secara global

TampilViewChat();

function TampilViewChat() {
  var elemnt = document.createElement("div");
  var body = document.getElementById("DummyChatId");
  elemnt.innerHTML = "";
  elemnt.innerHTML = variable;
  document.body.appendChild(elemnt);
}

AturStyle();
function AturStyle() {
  var urls = UrlMainButton + "Admin/api/get_config.php?rooms=" + roomsIDX;
  fetch(urls)
    .then((res) => res.json())
    .then((obj) => {
      console.log(obj.whatsapp);

      if (obj.url_gambar != "") {
        document
          .getElementById("gambar_widget")
          .setAttribute("src", obj.url_gambar);
      } else {
        document
          .getElementById("gambar_widget")
          .setAttribute(
            "src",
            "https://sofwareshop.com/appstore/widget_enc/live-chat.png"
          );
      }

      if (obj.posisi_widget === "right") {
        setCSS("#chatIframe", { right: "0", left: "auto" });
        setCSS(".chatbutton", { right: "20px", left: "auto" });
      } else if (obj.posisi_widget === "left") {
        setCSS("#chatIframe", { left: "0", right: "auto" });
        setCSS(".chatbutton", { left: "20px", right: "auto" });
      }
    });
}

function setCSS(selector, styles) {
  document.querySelectorAll(selector).forEach((el) => {
    for (let prop in styles) {
      el.style[prop] = styles[prop];
    }
  });
}

const iframe = document.createElement("iframe");
iframe.id = "chatIframe";
iframe.src = "https://routers.dummytech.my.id:2020/chatembed/bodychat.html";
iframe.style.display = "none";
iframe.style.position = "fixed";
iframe.style.bottom = 0;
iframe.style.right = 1;
iframe.style.width = "100%";
iframe.style.height = "100%";
iframe.style.border = "none";
iframe.style.borderRadius = "12px";
iframe.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.3);";
iframe.style.zIndex = 9998;
document.body.appendChild(iframe);
const toggleBtn = document.getElementById("chatToggleBtn");
//   const iframe = document.getElementById("chatIframe");

let isOpen = false;

toggleBtn.addEventListener("click", () => {
  isOpen = !isOpen;
  iframe.style.display = isOpen ? "block" : "none";
  toggleBtn.style.display = "none";
});

window.addEventListener("message", (event) => {
  console.log(event);
  console.log("Tinggi:", event.data.height);
  console.log("Lebar:", event.data.width);
  console.log("Left:", event.data.left);
  console.log("Right:", event.data.right);
  console.log("Bottom:", event.data.bottom);
  if (event.data.type === "resize-iframe") {
    console.log(event.data.computedLeft);
    if (event.data.height) iframe.style.height = event.data.height + "px";
    if (event.data.width) iframe.style.width = event.data.width - 20 + "px";
    if (event.data.left) iframe.style.left = left !== "auto" ? left : "auto";
    if (event.data.right)
      iframe.style.right = right !== "auto" ? right : "auto";
  }

  if (event.data === "close-widget") {
    isOpen = false;
    iframe.style.display = "none";
    toggleBtn.style.display = "block";
  }
});
