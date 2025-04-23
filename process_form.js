// 1) Validation rules
const validationRules = {
  firstName: {
    hint: "Letters only, start with capital",
    regex: /^[A-Z][a-zA-Z]*$/,
    error: "Invalid first name",
  },
  lastName: {
    hint: "Letters/spaces/apostrophes, start capital",
    regex: /^[A-Z][a-zA-Z\s']*$/,
    error: "Invalid last name",
  },
  phone: {
    hint: "XXX XXX-XXXX",
    regex: /^\d{3} \d{3}-\d{4}$/,
    error: "Invalid phone",
  },
  email: {
    hint: "user@domain.com/.edu",
    regex: /^[^\s@]+@[^\s@]+\.(com|edu)$/,
    error: "Invalid email",
  },
  website: {
    hint: "https://…~/…/",
    regex: /^https:\/\/.+~.+\//,
    error: "Invalid URL",
  },
};

// 2) Show hint when field is focused
function showHint(input) {
  const cfg = validationRules[input.id];
  const span = document.getElementById(input.id + "Hint");
  span.textContent = cfg.hint;
  span.className = "hint";
}

// 3) Validate on blur
function validateData(input) {
  const { regex, error } = validationRules[input.id];
  const span = document.getElementById(input.id + "Hint");
  if (regex.test(input.value.trim())) {
    span.textContent = "✔";
    span.className = "success";
  } else {
    span.textContent = "✖ " + error;
    span.className = "error";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("quizForm").addEventListener("submit", handleSubmit);
});

function handleSubmit(evt) {
  evt.preventDefault();
  const badgeArea = document.getElementById("badgeArea");

  const fields = ["firstName", "lastName", "phone", "email", "website"];
  let allValid = true;
  fields.forEach((id) => {
    validateData(document.getElementById(id));
    if (!document.getElementById(id + "Hint").classList.contains("success")) {
      allValid = false;
    }
  });

  const q1 = document.querySelector('input[name="q1"]:checked');
  const q2 = document.querySelector('input[name="q2"]:checked');
  if (!allValid || !q1 || !q2) {
    alert("Please fix errors and answer all questions.");
    return;
  }

  while (badgeArea.firstChild) {
    badgeArea.removeChild(badgeArea.firstChild);
  }

  const infoList = document.createElement("ul");
  fields.forEach((id) => {
    const labelText = document.querySelector(`label[for="${id}"]`).textContent;
    const li = document.createElement("li");
    li.textContent = `${labelText}: ${document
      .getElementById(id)
      .value.trim()}`;
    infoList.appendChild(li);
  });
  badgeArea.appendChild(infoList);

  const ansList = document.createElement("ul");
  ansList.style.marginTop = "0.5rem";
  [
    { q: q1, txt: "Q1" },
    { q: q2, txt: "Q2" },
  ].forEach((o) => {
    const li = document.createElement("li");
    li.textContent = `${o.txt} Answer: ${o.q.parentNode.textContent.trim()}`;
    ansList.appendChild(li);
  });
  badgeArea.appendChild(ansList);

  let badgeKey;
  if (q1.value === "kim" || q2.value === "kim") badgeKey = "kim";
  else if (q1.value === "khloe" || q2.value === "khloe") badgeKey = "khloe";
  else if (q1.value === "rob" || q2.value === "rob") badgeKey = "rob";
  else badgeKey = "kourtney";

  const title = document.createElement("h2");
  title.textContent = `You're ${
    badgeKey.charAt(0).toUpperCase() + badgeKey.slice(1)
  }!`;
  badgeArea.appendChild(title);

  const fig = document.createElement("figure");
  fig.className = "badge-figure";
  const fileMap = {
    kim: "kim.png",
    khloe: "Khloe.png",
    rob: "Rob.png",
    kourtney: "Kourt.png",
  };

  // now build the image tag
  const img = document.createElement("img");
  img.src = `img/${fileMap[badgeKey]}`;
  img.alt = `${badgeKey} badge`;
  const cap = document.createElement("figcaption");
  cap.textContent = `Badge URL: ${window.location.origin}/img/${fileMap[badgeKey]}`;
  fig.appendChild(img);
  fig.appendChild(cap);

  badgeArea.appendChild(fig);
}
