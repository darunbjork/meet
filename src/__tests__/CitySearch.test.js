import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import App from "../App";

import { extractLocations, getEvents } from "../api";

const setupCitySearch = (props = {}) => {
  return render(
    <CitySearch
      allLocations={props.allLocations || []}
      setCurrentCity={props.setCurrentCity || (() => {})}
      setInfoAlert={props.setInfoAlert || (() => {})}
    />
  );
};

describe("<CitySearch/> component", () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = setupCitySearch();
  });

  test("renders text input", () => {
    const cityTextBox = CitySearchComponent.getByRole("textbox");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("suggestions list is hidden by default", () => {
    const suggestionList = CitySearchComponent.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

 
  
  test("updates list of suggestions correctly when user types in city textbox", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(
      <CitySearch allLocations={allLocations} setInfoAlert={() => {}} />
    );

    const cityTextBox = CitySearchComponent.getByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    const suggestions = allLocations.filter((location) =>
      location.toUpperCase().includes("Berlin".toUpperCase())
    );

    const suggestionListItems = CitySearchComponent.queryAllByRole("listitem");
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i++) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={() => {}}
        setInfoAlert={() => {}}
      />
    );

    const cityTextBox = CitySearchComponent.getByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    const BerlinGermanySuggestion =
      CitySearchComponent.queryAllByRole("listitem")[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe("<CitySearch /> integration", () => {
  test("renders suggestions list when the app is rendered.", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const cityTextBox = within(CitySearchDOM).getByRole("textbox");
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    await waitFor(() => {
      const suggestionListItems = within(CitySearchDOM).queryAllByRole(
        "listitem"
      );
      expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
  });
});
