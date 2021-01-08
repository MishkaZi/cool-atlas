const init = async () => {
  try {
    const countries = await getAll();
    updatePage(countries);
  } catch (error) {
    console.log(error);
  }
};

const updatePage = (countries) => {
  try {
    $(".ats-list>*").remove();
    for (let i = 0; i < countries.length; i++) {
      const id = countries[i].name;
      $(".ats-list")
        .append(`<div class="ats-country" id="${countries[i].name}" onClick="selectOne(id)">${countries[i].name}<img src="${countries[i].flag}"/> </div>
      `).onclick = (e) => {
        selectOne(e.target.id);
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const selectOne = async (countryName) => {
  try {
    const country = await getOne(countryName);
    updatePage(country);
  } catch (error) {
    console.log(error);
  }
};

const getAll = () => {
  return $.ajax({
    method: "GET",
    url: "https://restcountries.eu/rest/v2/all",
  });
};

const getOne = async (countryName) => {
  return $.ajax({
    method: "GET",
    url: `https://restcountries.eu/rest/v2/name/${countryName}`,
  });
};

init();
