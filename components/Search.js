import { useMemo, useRef, useState } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import Link from 'next/link';
import Image from 'next/image';

const AutocompleteItem = ({ id, name, pair, symbol, img }) => {
  return (
    <li>
      <Link href={`/pair/${name}`}>
        <a className="hover:bg-blue-300 flex gap-4 p-4">
          <Image
            width={'40px'}
            height={'40px'}
            src={`/${img}.png`}
            alt={name}
            className="w-12 h-12 object-contain"
          />
          <div>
            <h3 className="text-sm font-semibold">{name}</h3>
            <p className="text-xs text-gray-600">{symbol}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default function Search(props) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: 'Token Search',
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: 'offers-next-api',
            getItems: ({ query }) => {
              if (!!query) {
                return fetch(`/api/search?q=${query}`).then((res) => res.json());
              }
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <form ref={formRef} className="flex justify-center align-baseline mb-20" {...formProps}>
      <label className="text-2xl px-2">🔎</label>
      <div className="flex relative p-1 border-gray-600 rounded-full w-6/6">
        <input ref={inputRef} className="flex-1 p-2 pl-4 rounded-full w-full" {...inputProps} />
        {autocompleteState.isOpen && (
          <div
            className="absolute mt-16 top-0 left-0 border border-gray-100 bg-white overflow-hidden rounded-lg shadow-lg z-10"
            ref={panelRef}
            {...autocomplete.getPanelProps()}
          >
            {autocompleteState.collections.map((collection, index) => {
              const { items } = collection;
              return (
                <section key={`section-${index}`}>
                  {items.length > 0 && (
                    <ul {...autocomplete.getListProps()}>
                      {items.map((item) => (
                        <AutocompleteItem key={item.id} {...item} />
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </form>
  );
}
