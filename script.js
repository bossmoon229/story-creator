document.addEventListener("DOMContentLoaded", () => {
  let generate = document.getElementById("generate");
  let story = document.querySelector(".story");
  generate.addEventListener("click", () => {
    const currentDisplay = window.getComputedStyle(story).display;

    console.log(currentDisplay);

    if (currentDisplay === "none") {
      story.style.display = "block";
    } else {
      story.style.display = "none";
    }
  });
});
