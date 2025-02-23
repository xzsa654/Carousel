const dots = [...document.querySelectorAll(".dot a ")];
const imgArr = [...document.querySelectorAll(".img-list li")];
// 點擊點點控制輪播張數
document.addEventListener("click", (event) => {
  const index = dots.indexOf(event.target);
  if (index !== -1) {
    changeMode(index);
  }
});
// 控制自動輪播
let timer = null;
const toggleChange = () => {
  if (timer == null) {
    timer = setTimeout(function auto() {
      changeMode("next");
      timer = setTimeout(auto, 3000);
    }, 3000);
  } else {
    clearTimeout(timer);
    timer = null;
  }
};
toggleChange();
// 如果移入 banner 則停止自動播放
imgWindow = document.querySelector(".outer ul ");
imgWindow.addEventListener("mouseenter", () => {
  toggleChange();
});
imgWindow.addEventListener("mouseleave", () => {
  toggleChange();
});
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

nextBtn.addEventListener("click", () => {
  changeMode("next");
});
prevBtn.addEventListener("click", () => {
  changeMode("prev");
});

function changeMode(rev) {
  const current = document.querySelector(".current");
  let next;
  if (rev === "next") {
    next = current.nextElementSibling || imgArr[0];
  } else if (rev === "prev") {
    next = current.previousElementSibling || imgArr.at(-1);
  } else {
    next = imgArr[rev];
  }
  // 當前圖片添加curren移至最上層
  current.classList.remove("current");
  next.classList.add("current");
  // 控制目前的點點樣式
  const index = imgArr.indexOf(next);
  const active = document.querySelector(".active");
  active.classList.remove("active");
  dots[index].classList.add("active");
}
