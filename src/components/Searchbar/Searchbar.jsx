import { useState } from 'react';
import { Button, Input, SearchbarStyled, SearchForm } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const onInputChange = e => {
    setInput(e.target.value);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    if (input.trim() === '')
      return alert('Please enter the some text in input');
    onSubmit(input.trim().toLowerCase());
  };

  return (
    <SearchbarStyled className="searchbar">
      <SearchForm onSubmit={onFormSubmit} className="form">
        <Button type="submit" className="button">
          <span className="button-label">Search</span>
        </Button>

        <Input
          onChange={onInputChange}
          className="input"
          value={input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarStyled>
  );
};

export default Searchbar;
