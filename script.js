document.addEventListener("DOMContentLoaded", () => {
  let generate = document.getElementById("generate");
  let story = document.querySelector(".story");
  let storyBlock = document.querySelector(".story-itself");
  let btnText = document.getElementById("generate");
  let storyImg = document.getElementById("img-story");
  generate.addEventListener("click", () => {
    const currentDisplay = window.getComputedStyle(story).display;

    console.log(currentDisplay);

    if (currentDisplay === "none") {
      story.style.display = "block";
      storyBlock.style.display = "block";
      btnText.innerText = "Generate another story";
      storyImg.style.display = 'block';
      storyImg.src = '/img/fog-people.jpg';
    }
  });
});
