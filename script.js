const span = document.querySelector('[data-js="span"]');
const list = document.querySelector('[data-js="list"]');
const buttons = document.querySelectorAll('[data-js="button"]');

async function peopleInSpace() {
  const response = await fetch("http://api.open-notify.org/astros.json");
  const data = await response.json();
  span.textContent = data.number;

  const people = data.people;
  console.log(people);

  people.forEach((person) => {
    const listItem = document.createElement("li");
    listItem.textContent = person.name;
    list.append(listItem);

    const peopleISS = people.filter((person) => person.craft === "ISS");
    const peopleTiangong = people.filter(
      (person) => person.craft === "Tiangong"
    );

    buttons.forEach((button) =>
      button.addEventListener("click", () => {
        listItem.innerHTML = "";
        if (button.textContent === "All") {
          listItem.textContent = person.name;
        } else if (button.textContent === "ISS") {
          peopleISS.forEach(
            (personISS) =>
              (listItem.textContent = `${person.name} - ${personISS.craft}`)
          );
        } else if (button.textContent === "Tiangong") {
          peopleTiangong.forEach(
            (personTiangong) =>
              (listItem.textContent = `${person.name} - ${personTiangong.craft}`)
          );
        }
      })
    );
  });
}

peopleInSpace();
