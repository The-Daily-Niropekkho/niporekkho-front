"use client";

import React, { useState } from 'react';
import { useGetAllDivisionsQuery, useGetAllDistrictsQuery, useGetAllUpazillasQuery } from "@/redux/features/zone/districtsApi";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from 'next/navigation';
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const geoUrl = "/bangladesh_geojson_adm2_64_districts_zillas.json";

const divisionColors: Record<string, string> = {
  "Dhaka": "#f44336",
  "Chattogram": "#3ac993", // Correct color for Chattogram
  "Khulna": "#ff9800",
  "Rajshahi": "#009688",
  "Barisal": "#00bcd4",
  "Sylhet": "#8bc34a",
  "Rangpur": "#ffc107",
  "Mymensingh": "#9c27b0",
};

const divisions = [
  { id: "BDC", bengali: "ঢাকা", color: "#f44336" },
  { id: "BCH", bengali: "চট্টগ্রাম", color: "#3ac993" }, // Matching color
  { id: "BKH", bengali: "খুলনা", color: "#ff9800" },
  { id: "BRJ", bengali: "রাজশাহী", color: "#009688" },
  { id: "BBR", bengali: "বরিশাল", color: "#00bcd4" },
  { id: "BSL", bengali: "সিলেট", color: "#8bc34a" },
  { id: "BRP", bengali: "রংপুর", color: "#ffc107" },
  { id: "BMY", bengali: "ময়মনসিংহ", color: "#9c27b0" },
];

const DropdownForm = () => {
  const router = useRouter();
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<number>();
  const [selectedUpazilla, setSelectedUpazilla] = useState("");
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  const { data: divisionData } = useGetAllDivisionsQuery({});
  const { data: districtData } = useGetAllDistrictsQuery(
    { division_id: selectedDivision },
    { skip: !selectedDivision }
  );
  const { data: upazillaData } = useGetAllUpazillasQuery(
    { district_id: selectedDistrict ? String(selectedDistrict) : undefined },
    { skip: !selectedDistrict }
  );

  const handleDistrictClick = (geo: any) => {
    const districtName = geo?.properties?.NAME_2;
    if (!districtName) return;

    // Find matching district in Bengali
    const matchedDistrict = districtData?.data?.find(
      (d: any) => d.name.toLowerCase() === districtName.toLowerCase()
    );
    
    if (matchedDistrict) {
      router.push(`/?district=${encodeURIComponent(matchedDistrict.bn_name)}`);
    }
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(e.target.value);
    setSelectedDistrict(undefined);
    setSelectedUpazilla("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(Number(e.target.value) || undefined);
    setSelectedUpazilla("");
  };

  const handleUpazillaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUpazilla(e.target.value);
  };

  const handleSearch = () => {
    if (!selectedDivision && !selectedDistrict && !selectedUpazilla) return;
    const queryParams = new URLSearchParams();
    if (selectedDivision) queryParams.append('division_id', selectedDivision);
    if (selectedDistrict) queryParams.append('district_id', String(selectedDistrict));
    if (selectedUpazilla) queryParams.append('upazilla_id', selectedUpazilla);
    router.push(`/news?${queryParams.toString()}`);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="text-center  mb-3">
        <h1 className="text-2xl font-bold text-gray-800">জেলার খবর</h1>
      </div>
<div className="grid ml-[215px] justify-center items-center w-[65%] grid-cols-1 md:grid-cols-4 gap-4 mb-6">
  {/* Division Dropdown */}
  <div className="relative">
    <select
      id="division"
      className="w-full p-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
      value={selectedDivision}
      onChange={handleDivisionChange}
    >
      <option value="">বিভাগ</option>
      {divisionData?.data?.map((division: any) => (
        <option key={division.id} value={division.id}>{division.bn_name}</option>
      ))}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  {/* District Dropdown */}
  <div className="relative">
    <select
      id="district"
      className="w-full p-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none disabled:opacity-50"
      value={selectedDistrict}
      onChange={handleDistrictChange}
      disabled={!selectedDivision}
    >
      <option value="">জেলা</option>
      {districtData?.data?.map((district: any) => (
        <option key={district.id} value={district.id}>{district.bn_name}</option>
      ))}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  {/* Upazilla Dropdown */}
  <div className="relative">
    <select
      id="upazilla"
      className="w-full p-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none disabled:opacity-50"
      value={selectedUpazilla}
      onChange={handleUpazillaChange}
      disabled={!selectedDistrict}
    >
      <option value="">উপজেলা</option>
      {upazillaData?.data?.map((upazilla: any) => (
        <option key={upazilla.id} value={upazilla.id}>{upazilla.bn_name}</option>
      ))}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  {/* Search Button */}
  <div className="flex items-end">
    <button
      onClick={handleSearch}
      disabled={!selectedDivision && !selectedDistrict && !selectedUpazilla}
      className={`w-full flex items-center justify-center p-3 rounded-lg text-white transition-colors ${
        (!selectedDivision && !selectedDistrict && !selectedUpazilla) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      <IoIosSearch className="mr-2 text-lg" /> খুঁজুন
    </button>
  </div>
</div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[100%] rounded-lg">
          <div className="relative" style={{ height: "800px" }}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 5500,
                center: [90.3, 23.7]
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) => 
                  geographies.map((geo) => {
                    const districtName = geo.properties.NAME_2;
                    const divisionName = geo.properties.ADM1_EN;
                    const fillColor = divisionColors[divisionName] || "#ccc";

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => handleDistrictClick(geo)}
                        onMouseEnter={() => setHoveredDistrict(districtName)}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        style={{
                          default: {
                            fill: fillColor,
                            stroke: "#fff",
                            strokeWidth: 0.5,
                            outline: "none",
                            opacity: 0.8
                          },
                          hover: {
                            fill: "#555",
                            stroke: "#fff",
                            strokeWidth: 1,
                            outline: "none"
                          },
                          pressed: {
                            fill: "#222",
                            outline: "none"
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>
        </div>
        <div className="w-full lg:w-1/4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">বিভাগ সমূহ</h3>
          <div className="space-y-2">
            {divisions.map((division) => (
              <div
                key={division.id}
                className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  const div = divisionData?.data?.find((d: any) => d.bn_name === division.bengali);
                  if (div) setSelectedDivision(String(div.id));
                }}
              >
                <div className="w-4 h-4 mr-3 rounded-sm" style={{ backgroundColor: division.color }}></div>
                <span className="text-gray-700">{division.bengali}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownForm;