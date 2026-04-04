
const GeoCards = ({geojsonData, error, loading,selectedCategory }) => {

  return (
    <div className="geo-cards-container">
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : (
      <div>
        {/* Using optional chaining to safely access features */}
        {/* // Step 1 — start with the full array */}
        {geojsonData?.features
        //  Step 2 — remove unwanted items
        ?.filter(feature => selectedCategory ? feature.properties.category === selectedCategory : false )
        // turn remaining items into JSX
        ?.map((feature) => (
          <div className="card" key={feature.properties?.guid || feature.id}>{feature.properties?.title || "No title"}, Category: {feature.properties?.category}, PubDate: {feature.properties?.pubDate} 
          </div>
        ))}
      </div>
    )}
   
  </div>
);
  }

export default GeoCards
