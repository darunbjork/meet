import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import App from "../App";
import { extractLocations, getEvents } from "../api";

describe("<CitySearch/> component", () => {
  let CitySearchComponent;

  beforeEach(() => {
    CitySearchComponent = render(
      <CitySearch
        allLocations={[]}
        setCurrentCity={() => {}}
        setInfoAlert={() => {}}
      />
    );
  });

  // Test 1
  test("renders text input", () => {
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  // Test 2
  test("suggestions list is hidden by default", () => {
    const suggestionList = CitySearchComponent.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  // Test 3
  test("renders a list of suggestions when city textbox gains focus", async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole("textbox");

    await user.click(cityTextBox);

    await waitFor(() => {
      const suggestionList = CitySearchComponent.queryByRole("list");
      expect(suggestionList).toBeInTheDocument();
      expect(suggestionList).toHaveClass("suggestions");
    });
  });

  // Test 4
  test("updates list of suggestions correctly when user types in city textbox", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(
      <CitySearch allLocations={allLocations} setInfoAlert={() => {}} />
    );

    // User types "Berlin" in city textbox
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // Filter allLocations to locations matching "Berlin"
    const suggestions = allLocations
      ? allLocations.filter((location) =>
          location.toUpperCase().includes(cityTextBox.value.toUpperCase())
        )
      : [];

    // Get all <li> elements inside the suggestion list
    const suggestionListItems = CitySearchComponent.queryAllByRole("listitem");
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);

    for (let i = 0; i < suggestions.length; i++) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  // Test 5
  test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(
      <CitySearch allLocations={allLocations} setCurrentCity={() => {}} />
    );

    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // The suggestion's textContent looks like this: "Berlin, Germany"
    const BerlinGermanySuggestion =
      CitySearchComponent.queryAllByRole("listitem")[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe("<CitySearch /> integration", () => {
  test("renders suggestions list when the app is rendered", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const cityTextBox = within(CitySearchDOM).queryByRole("textbox");

    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    await waitFor(() => {
      const suggestionListItems =
        within(CitySearchDOM).queryAllByRole("listitem");
      expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
  });
});
