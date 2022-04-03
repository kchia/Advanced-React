import { useLazyQuery } from "@apollo/client"; // execute queries in response to events besides component rendering
import { resetIdCounter, useCombobox } from "downshift";
import gql from "graphql-tag";
import debounce from "lodash.debounce"; // only include the one function you need for the project, rather than the entire lodash library
import { useRouter } from "next/dist/client/router";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

// where name or description contains the searchTerm
const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: "no-cache", // bypass apollo cache and go directly to network, if we pull from cache it'd just show what's already displayed on the page
    }
  );
  const items = data?.searchTerms || [];
  const findItemsButChill = debounce(findItems, 350); // dont DDOS your own API!
  resetIdCounter();
  const {
    isOpen, // whether or not to show the dropdown
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      findItemsButChill({
        // this function won't run more than once every 350 ms
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      // go to the selected item page
      router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || "", // otherwise you get [object Object]
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search for an Item",
            id: "search",
            className: loading ? "loading" : "",
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              {...getItemProps({ item, index })}
              key={item.id}
              highlighted={index === highlightedIndex} // highlight the matched text in the dropdown menu
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
