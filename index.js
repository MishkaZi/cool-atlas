const init = async () => {
  try {
    const countries = await getAll();
    updatePage(countries);
  } catch (error) {
    console.log(error);
  }
};

const search = async () => {
  try {
    const searchInput = $("#search-input").val();
    const countries = await getAll();
    const filteredCountries = countries.filter((country) => {
      return country.name.toLowerCase().includes(searchInput);
    });
    if (filteredCountries.length === 0) {
      $(".ats-list>*").remove();
      $(".ats-list").append(`
        <div>
          <h1>There is no countries matching your search!</h1>
        </div>
    `);
    } else {
      updatePage(filteredCountries);
    }
  } catch (error) {
    console.log(error);
  }
};

const updatePage = (countries) => {
  try {
    $(".ats-list>*").remove();
    for (let i = 0; i < countries.length; i++) {
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

const getOne = (countryName) => {
  return $.ajax({
    method: "GET",
    url: `https://restcountries.eu/rest/v2/name/${countryName}`,
  });
};

init();
