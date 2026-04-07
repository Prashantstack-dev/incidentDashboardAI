
const GeoCards = ({geojsonData, error, loading,selectedCategory }) => {

{/* Using optional chaining to safely access features and starting with the full array */}
const filtered = geojsonData?.features
        //  remove unwanted items
        ?.filter(feature => selectedCategory ? feature.properties.category === selectedCategory : false );
  return (
    <div className="geo-cards-container">
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : (
      <div>
        {/*  */}
        <p>Showing {filtered?.length || 0} incidents</p>
        
        {/* {geojsonData?.features
        //  remove unwanted items
        ?.filter(feature => selectedCategory ? feature.properties.category === selectedCategory : false ) */}
        {/* // turn remaining items into JSX */}
        {  filtered?.map((feature) => (
            <div className="card" key={feature.properties?.guid || feature.id}>{feature.properties?.title || "No title"}, Category: {feature.properties?.category}, PubDate: {feature.properties?.pubDate} 
            </div>
          ))}
      </div>
    )}
   
  </div>
);
  }

export default GeoCards;
