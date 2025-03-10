import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../styles/animations';
import { PageContainer, PageTitle, Grid } from '../styles/layout';
import MovieCard from '../components/MovieCard';
import { FaSearch, FaFilter, FaTimes, FaChevronDown, FaSlidersH } from 'react-icons/fa';

const FiltersPanel = styled.div`
  background-color: #16213e;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 2px solid #2a3a68;
  border-radius: 4px;
  background-color: #1f2b4d;
  color: white;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #ff4c29;
    outline: none;
  }
`;

const FilterGroup = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  cursor: pointer;
  padding: 0.8rem;
  background-color: #1f2b4d;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2a3a68;
  }
  
  svg {
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const FilterContent = styled.div`
  display: ${props => props.isOpen ? 'grid' : 'none'};
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
  padding: 1rem;
  background-color: #1f2b4d;
  border-radius: 4px;
  margin-top: 0.5rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? '#ff4c29' : '#1f2b4d'};
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background-color: ${props => props.active ? '#e63e00' : '#2a3a68'};
  }
`;

const ActiveFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FilterTag = styled.div`
  background-color: #ff4c29;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  
  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
  }
`;

const SortSelect = styled.select`
  padding: 0.8rem;
  border: 2px solid #2a3a68;
  border-radius: 4px;
  background-color: #1f2b4d;
  color: white;
  cursor: pointer;
  
  &:focus {
    border-color: #ff4c29;
    outline: none;
  }
`;

const MoviesGrid = styled(Grid)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 270px);
    gap: 2rem;
    justify-content: space-between;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: white;
  margin-bottom: 1rem;
  
  span {
    color: #ff4c29;
  }
`;

const ResultsInfo = styled.div`
  color: #ccc;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  position: relative;
`;

const FiltersAside = styled.aside`
  background-color: #16213e;
  border-radius: 8px;
  height: fit-content;
  position: sticky;
  top: 100px;
  padding: 1.25rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 250px;
`;

const MainContent = styled.main`
  flex: 1;
  min-width: 0;
  
  @media (min-width: 1200px) {
    padding-right: 1rem;
  }
`;

const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const SearchButton = styled.button`
  background-color: #ff4c29;
  color: white;
  border: none;
  padding: 0 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #e63e00;
  }
`;

const FiltersSummary = styled.div`
  margin-bottom: 1.5rem;
  color: #ccc;
  font-size: 0.9rem;
  
  span {
    color: #ff4c29;
  }
`;

const Movies = () => {
  const [filters, setFilters] = useState({
    genres: [],
    years: [],
    rating: null,
    price: null
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [totalMovies, setTotalMovies] = useState(0);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [openFilter, setOpenFilter] = useState('genres');

  const genres = ['Боевик', 'Комедия', 'Драма', 'Ужасы', 'Фантастика', 'Триллер', 'Мелодрама', 'Приключения'];
  const years = ['2024', '2023', '2022', '2021', '2020'];
  const ratings = ['4+', '6+', '8+'];

  const isSearchActive = searchQuery || 
    Object.keys(filters).some(key => 
      Array.isArray(filters[key]) ? filters[key].length > 0 : filters[key]
    );

  const handleGenreFilter = (genre) => {
    setFilters(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleYearFilter = (year) => {
    setFilters(prev => ({
      ...prev,
      years: prev.years.includes(year)
        ? prev.years.filter(y => y !== year)
        : [...prev.years, year]
    }));
  };

  const handleRatingFilter = (rating) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating === rating ? null : rating
    }));
  };

  const removeFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: Array.isArray(prev[type])
        ? prev[type].filter(item => item !== value)
        : null
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    // Здесь будет логика поиска
  };

  const activeFiltersCount = filters.genres.length + 
    filters.years.length + 
    (filters.rating ? 1 : 0);

  const toggleFilter = (type) => {
    setOpenFilter(openFilter === type ? null : type);
  };

  useEffect(() => {
    // Здесь будет логика получения фильмов с сервера
    setTotalMovies(6); // Временное значение
    setFilteredMovies(Array(6).fill({})); // Временные данные
  }, []);

  return (
    <PageContainer>
      <PageTitle>Фильмы</PageTitle>

      <SearchBar>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Поиск фильмов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Сначала новые</option>
            <option value="rating">По рейтингу</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
          </SortSelect>
          <SearchButton type="submit">
            <FaSearch />
            Найти
          </SearchButton>
        </SearchForm>
      </SearchBar>

      <ContentWrapper>
        <FiltersAside>
          <SectionTitle>
            <FaSlidersH /> Фильтры
          </SectionTitle>

          <FiltersSummary>
            Выбрано фильтров: <span>{activeFiltersCount}</span>
          </FiltersSummary>

          {activeFiltersCount > 0 && (
            <ActiveFilters>
              {filters.genres.map(genre => (
                <FilterTag key={genre}>
                  {genre}
                  <button onClick={() => removeFilter('genres', genre)}>
                    <FaTimes />
                  </button>
                </FilterTag>
              ))}
              {filters.years.map(year => (
                <FilterTag key={year}>
                  {year}
                  <button onClick={() => removeFilter('years', year)}>
                    <FaTimes />
                  </button>
                </FilterTag>
              ))}
              {filters.rating && (
                <FilterTag>
                  {filters.rating}
                  <button onClick={() => removeFilter('rating', filters.rating)}>
                    <FaTimes />
                  </button>
                </FilterTag>
              )}
            </ActiveFilters>
          )}

          <FilterGroup>
            <FilterHeader onClick={() => toggleFilter('genres')} isOpen={openFilter === 'genres'}>
              <span>Жанры</span>
              <FaChevronDown />
            </FilterHeader>
            <FilterContent isOpen={openFilter === 'genres'}>
              {genres.map(genre => (
                <FilterButton
                  key={genre}
                  active={filters.genres.includes(genre)}
                  onClick={() => handleGenreFilter(genre)}
                >
                  {genre}
                </FilterButton>
              ))}
            </FilterContent>
          </FilterGroup>

          <FilterGroup>
            <FilterHeader onClick={() => toggleFilter('years')} isOpen={openFilter === 'years'}>
              <span>Год выпуска</span>
              <FaChevronDown />
            </FilterHeader>
            <FilterContent isOpen={openFilter === 'years'}>
              {years.map(year => (
                <FilterButton
                  key={year}
                  active={filters.years.includes(year)}
                  onClick={() => handleYearFilter(year)}
                >
                  {year}
                </FilterButton>
              ))}
            </FilterContent>
          </FilterGroup>

          <FilterGroup>
            <FilterHeader onClick={() => toggleFilter('rating')} isOpen={openFilter === 'rating'}>
              <span>Возрастной рейтинг</span>
              <FaChevronDown />
            </FilterHeader>
            <FilterContent isOpen={openFilter === 'rating'}>
              {ratings.map(rating => (
                <FilterButton
                  key={rating}
                  active={filters.rating === rating}
                  onClick={() => handleRatingFilter(rating)}
                >
                  {rating}
                </FilterButton>
              ))}
            </FilterContent>
          </FilterGroup>
        </FiltersAside>

        <MainContent>
          <SectionTitle>
            {isSearchActive ? (
              <>Найденные <span>фильмы</span></>
            ) : (
              <>Все <span>фильмы</span></>
            )}
          </SectionTitle>
          
          <ResultsInfo>
            {isSearchActive ? (
              `Найдено: ${filteredMovies.length} фильмов`
            ) : (
              `Всего фильмов: ${totalMovies}`
            )}
          </ResultsInfo>

          <MoviesGrid>
            {[1,2,3,4,5,6].map(movie => (
              <MovieCard 
                key={movie}
                movie={{
                  title: "Название фильма",
                  genre: ["Боевик", "Фантастика"],
                  duration: 120,
                  poster: "https://via.placeholder.com/300x450"
                }}
              />
            ))}
          </MoviesGrid>
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Movies; 