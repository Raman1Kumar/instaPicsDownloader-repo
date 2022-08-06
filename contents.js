(() => {
  let id = 1;
  let pos;

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    //For screen size greater than 720px
    if (obj.type === "BIG") {
      if (obj.canbe && window.innerWidth > 720) {
        pos = obj.canbe;
        id = 0;
      }
    }

    //Download Profile Pic message from popupjs
    if (obj.type === "profilepic") {
      // prof = document
      //   .getElementsByClassName("_aa8h")[0]
      //   .getElementsByTagName("img")[0].src;
      prof = document
        .getElementsByClassName("_aa_j")[0]
        .getElementsByTagName("img")[0].src;

      download(prof);
    }
  });

  //if page is refreshed on activated eventlistener will not work
  //to handle that
  if (
    window.location.href.includes("www.instagram.com/p/") &&
    window.innerWidth > 720
  ) {
    pos = 1;
    id = 0;
  }

  //COde to download a image if url is given

  function download(source) {
    if (source.includes("instagram")) {
      fetch(source)
        .then((response) => {
          return response.blob();
        })
        .then((blob) => {
          const fileName = "instagram";
          var el = document.createElement("a");
          el.setAttribute("href", source);
          el.setAttribute("download", fileName);
          document.body.appendChild(el);
          const blob1 = new Blob([blob], { type: "image/jpeg" });
          el.href = URL.createObjectURL(blob1);

          el.click();
          el.remove();
        });
    }
    id = 1;
  }

  let instagramstaus;
  let j = 0;
  //ADD download button near like comment share
  window.addEventListener("scroll", function () {
    instagramstaus = document.getElementsByClassName("_aamu");

    for (let i = 0; i < instagramstaus.length; i++) {
      if (instagramstaus[i].childElementCount <= 4) {
        let downloadBtn = document.createElement("img");
        downloadBtn.src = chrome.runtime.getURL("assets/1.png");
        downloadBtn.id = "inst-but " + j.toString();
        j++;
        currentid = downloadBtn.id;
        downloadBtn.title = "CLick to download this image";
        downloadBtn.addEventListener("click", function clickhandle() {
          let i = document.getElementById(downloadBtn.id);
          let test;
          let u =
            i.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByTagName(
              "ul"
            )[0];

          //       For more than 1 photo pics are in ul
          if (u && u.children.length == 4) {
            id = 2;
            if (pos && window.innerWidth > 720) {
              id = 1;
            }
          } else if (
            u &&
            u.children.length == 3 &&
            i.parentElement.parentElement.parentElement.parentElement.parentElement
              .getElementsByTagName("ul")[0]
              .parentElement.parentElement.parentElement.getElementsByClassName(
                " _9zm0"
              )[0]
          ) {
            id = 2;
            if (pos && window.innerWidth > 720) {
              id = 1;
            }
          } else if (
            u &&
            u.children.length == 3 &&
            !i.parentElement.parentElement.parentElement.parentElement.parentElement
              .getElementsByTagName("ul")[0]
              .parentElement.parentElement.parentElement.getElementsByClassName(
                " _9zm0"
              )[0]
          ) {
            if (pos && window.innerWidth > 720) {
              id = 0;
            }
          }

          // FOr 1
          if (id == 1) {
            test =
              i.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByTagName(
                "img"
              )[1].src;
          }
          //For 0
          else if (id == 0) {
            test =
              i.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByTagName(
                "img"
              )[0].src;
          }
          //For 2
          else if (id == 2) {
            test =
              i.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByTagName(
                "img"
              )[2].src;
          }
          //Finally 0/1/2 downlaod
          download(test);
          id = 1;
        });

        //Style donwload button

        instagramstaus[i].appendChild(downloadBtn);
        downloadBtn.style.cursor = "pointer";
        downloadBtn.style.marginLeft = "10px";
        downloadBtn.onmouseenter = function () {
          downloadBtn.style.opacity = "0.5";
        };
        downloadBtn.onmouseleave = function () {
          downloadBtn.style.opacity = "1";
        };
      }
    }
  });
  let gridpost;

  window.addEventListener("scroll", function () {
    gridpost = document.getElementsByClassName("_abpo");
    // gridpost = document.getElementsByClassName("_aagu")[0].children[0];s
    for (let i = 0; i < gridpost.length; i++) {
      console.log("worked");
      if (gridpost[i].childElementCount <= 2) {
        console.log("worked inside");
        let downloadBtn = document.createElement("img");
        downloadBtn.src = chrome.runtime.getURL("assets/1.png");
        downloadBtn.id = "inst-but " + j.toString();
        j++;
        currentid = downloadBtn.id;
        downloadBtn.title = "CLick to download this image";
        // i.parentElement.parentElement.parentElement.href = "javascript:;";

        downloadBtn.addEventListener("click", (event) => {
          console.log("clicked");
          event.stopPropagation();
          let i = document.getElementById(downloadBtn.id);

          let v = i.parentElement.parentElement.parentElement.parentElement
            .getElementsByTagName("img")[0]
            .srcset.split(",");
          console.log(v);
          let w = v[v.length - 1].split(" ");
          let u = w[0];
          console.log(u);
          download(u);
        });
        console.log("worked");
        //Style donwload button
        if (gridpost[i].parentElement.parentElement.childElementCount <= 2) {
          gridpost[i].parentElement.parentElement.href = "javascript:;";
        }

        const lis = this.document.createElement("li");
        lis.appendChild(downloadBtn);
        gridpost[i].appendChild(lis);
        // gridview[i].appendChild(downloadBtn);
        // downloadBtn.style.cursor = "pointer";
        downloadBtn.style.marginLeft = "10px";
        downloadBtn.onmouseenter = function () {
          downloadBtn.style.opacity = "0.5";
        };
        downloadBtn.onmouseleave = function () {
          downloadBtn.style.opacity = "1";
        };
        downloadBtn.style.zIndex = "-1";
        downloadBtn.style.border = "10px";
      }
    }
  });
})();
