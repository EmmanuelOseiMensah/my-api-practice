function CityInput({ city, setCity, onSearch }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "8px", marginRight: "8px" }}
      />

      <button onClick={onSearch}>
        Get Weather
      </button>
    </div>
  );
}

export default CityInput;
