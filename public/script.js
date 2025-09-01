document.addEventListener("DOMContentLoaded", async () => {
  let generate = document.getElementById("generate");
  let story = document.querySelector(".story");
  let storyBlock = document.querySelector(".story-itself");
  let btnText = document.getElementById("generate");
  // let storyImg = document.getElementById("img-story");
  const storyImg = document.getElementById("story-img");
  generate.addEventListener("click", async () => {
    const currentDisplay = window.getComputedStyle(story).display;

    console.log(currentDisplay);

    if (currentDisplay === "none") {
      story.style.display = "block";
      storyBlock.style.display = "block";
      btnText.innerText = "Generate another story";
      // storyImg.style.display = 'block';
      // storyImg.src = '/img/fog-people.jpg';
    }
    const res = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    console.log(data, res);

    document.getElementById("story").innerText = data.text;

    // fetch("/images")
    //   .then((res) => res.json())
    //   .then((images) => {
    //     const randomImage = images[Math.floor(Math.random() * images.length)];
    //     storyImg.src = `/img/${randomImage}`; 
    //   });
    // console.log(randomImage);
  });
});
