import React, { useState } from 'react';
import { Train, Map, Clock, CreditCard, Info, X, ChevronLeft } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const MetroGuide = React.memo(({ pandals }) => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [activeLineFilter, setActiveLineFilter] = useState('Blue Line'); // Default to Blue Line
  const { t } = useTranslation();

  // Metro lines data for Kolkata
  const metroLines = [
    {
      name: "Blue Line",
      color: "#0066CC",
      stations: [
        "Dum Dum", "Belgachia", "Shyambazar", "Shobhabazar", "Girish Park", 
        "Central", "Chandni Chowk", "Esplanade", "Park Street", "Maidan", 
        "Rabindra Sadan", "Netaji Bhavan", "Jatin Das Park", "Kalighat", 
        "Rabindra Sarobar", "Mahanayak Uttam Kumar", "Netaji", "Masterda Surya Sen", 
        "Gitanjali", "Kavi Nazrul", "Shahid Khudiram", "Kavi Subhash", "Hemanta Mukherjee", 
        "Gitanjali", "Kavi Nazrul", "Shahid Khudiram", "Kavi Subhash", "Hemanta Mukherjee"
      ]
    },
    {
      name: "Green Line", 
      color: "#00AA44",
      stations: [
        "Salt Lake Stadium", "Bengal Chemical", "City Centre", "Central Park", 
        "Karunamoyee", "Salt Lake Sector-V", "Sealdah", "Phoolbagan", "Shyambazar", 
        "Shobhabazar", "Girish Park", "Central", "Chandni Chowk", "Esplanade"
      ]
    },
    {
      name: "Orange Line",
      color: "#FF6600", 
      stations: [
        "New Garia", "Garia Bazar", "Narendrapur", "Sonarpur", "Baghajatin", 
        "Jadavpur", "Tollygunge", "Rabindra Sarobar", "Mahanayak Uttam Kumar", 
        "Netaji", "Masterda Surya Sen", "Gitanjali", "Kavi Nazrul", "Shahid Khudiram"
      ]
    },
    {
      name: "Yellow Line",
      color: "#FFD700", 
      stations: [
        "Noapara", "Dum Dum Cantonment", "Jessore Road", "Jai Hind (Airport)"
      ]
    },
    {
      name: "Purple Line",
      color: "#800080", 
      stations: [
        "Joka", "Thakurpukur", "Sakherbazar", "Behala Chowrasta", "Behala Bazar", "Taratala", "Majerhat"
      ]
    }
  ];

  // Get pandals with metro station info
  const pandalsWithMetro = pandals.filter(pandal => pandal.metroStation);

  // Get pandals for a specific station
  const getPandalsForStation = (stationName) => {
    return pandalsWithMetro.filter(pandal => 
      pandal.metroStation?.name === stationName
    );
  };

  // Handle station click
  const handleStationClick = (stationName, lineName) => {
    const stationPandals = getPandalsForStation(stationName);
    if (stationPandals.length > 0) {
      setSelectedStation(stationName);
      setSelectedLine(lineName);
    }
  };

  // Close station details
  const closeStationDetails = () => {
    setSelectedStation(null);
    setSelectedLine(null);
  };

  // Handle line filter selection
  const handleLineFilter = (lineName) => {
    setActiveLineFilter(lineName);
  };

  // Get filtered lines to display
  const getFilteredLines = () => {
    if (activeLineFilter === 'all') {
      return metroLines;
    }
    return metroLines.filter(line => line.name === activeLineFilter);
  };

  return (
    <div className="space-y-4">
      {/* Metro Map Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        {/* Line Selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-baloo font-bold text-text-primary">Select Metro Line</h4>
              <p className="text-gray-600 font-poppins text-sm mt-1">
                
                  Choose a metro line to view its stations and nearby pandals.
                 
              
              </p>
            </div>
            
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
           

            {/* Individual Line Buttons */}
            {metroLines.map((line, index) => {
              const stationsWithPandals = line.stations.filter(station => getPandalsForStation(station).length > 0).length;
              return (
                <button
                  key={index}
                  onClick={() => handleLineFilter(line.name)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    activeLineFilter === line.name
                      ? 'border-primary bg-primary/10 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="text-center">
                    <div 
                      className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center"
                      style={{ backgroundColor: line.color }}
                    >
                      <Train className="w-4 h-4 text-white" />
                    </div>
                    
                    
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Metro Map */}
        <div className="space-y-4">
          <h4 className="text-lg font-baloo font-bold text-text-primary">
            {activeLineFilter === 'all' ? 'All Metro Lines' : `${activeLineFilter} Metro Map`}
          </h4>
        
          
          {getFilteredLines().map((line, lineIndex) => (
            <div key={lineIndex} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: line.color }}
                ></div>
                <h5 className="font-poppins font-semibold text-text-primary text-lg">{line.name}</h5>
                <div className="ml-auto">
                  <span className="text-sm text-gray-500 font-poppins">
                    {line.stations.filter(station => getPandalsForStation(station).length > 0).length} stations with pandals
                  </span>
                </div>
              </div>
              
              {/* Metro Line Visualization */}
              <div className="relative">
                <div 
                  className="h-2 rounded-full mb-4"
                  style={{ backgroundColor: line.color }}
                ></div>
                
                {/* Stations */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {line.stations.map((station, stationIndex) => {
                    const pandalsAtStation = getPandalsForStation(station);
                    const hasPandals = pandalsAtStation.length > 0;
                    
                    return (
                      <button
                        key={stationIndex}
                        onClick={() => handleStationClick(station, line.name)}
                        disabled={!hasPandals}
                        className={`relative p-3 rounded-lg border-2 transition-all duration-200 ${
                          hasPandals 
                            ? 'border-gray-300 bg-white hover:border-gray-400 hover:shadow-md cursor-pointer' 
                            : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                        }`}
                        title={hasPandals ? `Click to see ${pandalsAtStation.length} pandal(s) near ${station}` : `No pandals near ${station}`}
                      >
                        <div className="text-center">
                          <div className="font-poppins text-sm font-medium text-text-primary mb-1">
                            {station}
                          </div>
                          {hasPandals && (
                            <div className="flex items-center justify-center">
                              <span 
                                className="text-xs px-2 py-1 rounded-full text-white font-semibold"
                                style={{ backgroundColor: line.color }}
                              >
                                {pandalsAtStation.length}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Station indicator dot */}
                        <div 
                          className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
                          style={{ backgroundColor: line.color }}
                        ></div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Metro Tips */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-baloo font-bold text-text-primary mb-4 flex items-center">
          <Info className="w-5 h-5 text-gray-600 mr-3" />
          Metro Travel Tips
        </h3>
        <div className="space-y-3">
          <div className="flex items-start p-3 bg-gray-50 rounded-lg">
            <Train className="w-5 h-5 text-gray-600 mr-3 mt-1" />
            <div>
              <p className="font-poppins font-semibold text-text-primary text-sm">Peak Hours</p>
              <p className="font-poppins text-gray-600 text-sm">Avoid 8-10 AM and 6-8 PM for less crowded travel</p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-gray-50 rounded-lg">
            <CreditCard className="w-5 h-5 text-gray-600 mr-3 mt-1" />
            <div>
              <p className="font-poppins font-semibold text-text-primary text-sm">Smart Card</p>
              <p className="font-poppins text-gray-600 text-sm">Use smart cards for faster entry and discounts</p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-gray-50 rounded-lg">
            <Clock className="w-5 h-5 text-gray-600 mr-3 mt-1" />
            <div>
              <p className="font-poppins font-semibold text-text-primary text-sm">Timings</p>
              <p className="font-poppins text-gray-600 text-sm">Metro runs from 6:45 AM to 9:45 PM daily</p>
            </div>
          </div>
        </div>
      </div>

      {/* Station Details Modal */}
      {selectedStation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: metroLines.find(line => line.name === selectedLine)?.color }}
                  ></div>
                  <div>
                    <h3 className="text-xl font-baloo font-bold text-text-primary">
                      {selectedStation}
                    </h3>
                    <p className="text-gray-600 font-poppins text-sm">
                      {selectedLine} • {getPandalsForStation(selectedStation).length} pandal(s)
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeStationDetails}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {getPandalsForStation(selectedStation).map((pandal, index) => (
                  <div key={pandal.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-baloo font-bold text-text-primary text-lg mb-1">
                          {pandal.name}
                        </h4>
                        <p className="text-gray-600 font-poppins text-sm mb-2">
                          {pandal.location}
                        </p>
                        {pandal.metroStation && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Train className="w-4 h-4 mr-1" />
                            <span className="font-poppins">
                              {pandal.metroStation.distance || 'Near'} • {pandal.metroStation.walkTime || 'Walking distance'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <div className="flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                          <span className="text-sm font-semibold">❤️ {pandal.votes}</span>
                        </div>
                        {pandal.crowdStatus && (
                          <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            pandal.crowdStatus === 'Low' ? 'bg-green-100 text-green-800' :
                            pandal.crowdStatus === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {pandal.crowdStatus} Crowd
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3">
                      <a
                        href={pandal.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-center transition-colors duration-200 flex items-center justify-center font-poppins font-semibold text-sm"
                      >
                        <Map className="w-4 h-4 mr-2" />
                        View on Maps
                      </a>
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: `${pandal.name} - Durga Puja 2025`,
                              text: `Check out ${pandal.name} near ${selectedStation} metro station!`,
                              url: pandal.mapsLink,
                            });
                          } else {
                            navigator.clipboard.writeText(`${pandal.name} - ${pandal.location} - ${pandal.mapsLink}`);
                            alert('Pandal details copied to clipboard!');
                          }
                        }}
                        className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-center transition-colors duration-200 flex items-center justify-center font-poppins font-semibold text-sm"
                      >
                        Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <button
                onClick={closeStationDetails}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-poppins font-semibold transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default MetroGuide;
