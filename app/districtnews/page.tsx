"use client";

import React, { useState } from "react";
import { useGetAllDivisionsQuery, useGetAllDistrictsQuery, useGetAllUpazillasQuery } from "@/redux/features/zone/districtsApi";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Annotation, ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/bangladesh_geojson_adm2_64_districts_zillas.json";

const divisionColors: Record<string, string> = {
  Dhaka: "#f44336",
  Chattogram: "#3ac993",
  Khulna: "#32cd32",
  Rajshahi: "#ffa954",
  Barisal: "#00bcd4",
  Sylhet: "#00a3a3",
  Rangpur: "#eac918",
  Mymensingh: "#66bb6a",
};

const divisions = [
  { id: "BDC", bengali: "ঢাকা", color: "#f44336" },
  { id: "BCH", bengali: "চট্টগ্রাম", color: "#3ac993" },
  { id: "BKH", bengali: "খুলনা", color: "#32cd32" },
  { id: "BRJ", bengali: "রাজশাহী", color: "#ffa954" },
  { id: "BBR", bengali: "বরিশাল", color: "#00bcd4" },
  { id: "BSL", bengali: "সিলেট", color: "#00a3a3" },
  { id: "BRP", bengali: "রংপুর", color: "#eac918" },
  { id: "BMY", bengali: "ময়মনসিংহ", color: "#66bb6a" },
];

// Manual coordinates for all districts
const districtCoordinates: Record<string, [number, number]> = {
  Dhaka: [90.4125, 23.8103], // ঢাকা
  Faridpur: [89.8333, 23.6000], // ফরিদপুর
  Gazipur: [90.4000, 24.0000], // গাজীপুর
  Gopalganj: [89.9167, 23.0000], // গোপালগঞ্জ
  Kishoreganj: [90.7667, 24.4333], // কিশোরগঞ্জ
  Madaripur: [90.2000, 23.1667], // মাদারীপুর
  Manikganj: [90.0000, 23.8667], // মানিকগঞ্জ
  Munshiganj: [90.5500, 23.5500], // মুন্সীগঞ্জ
  Narayanganj: [90.5000, 23.6167], // নারায়ণগঞ্জ
  Narsingdi: [90.6833, 23.9167], // নরসিংদী
  Rajbari: [89.6500, 23.7500], // রাজবাড়ী
  Shariatpur: [90.3667, 23.2000], // শরীয়তপুর
  Tangail: [89.9167, 24.2500], // টাঙ্গাইল
  Chittagong: [91.8123, 22.3569], // চট্টগ্রাম
  Bandarban: [92.2000, 22.2000], // বান্দরবান
  Brahmanbaria: [91.1119286, 23.9570904], // ব্রাহ্মণবাড়িয়া
  Chandpur: [90.7000, 23.2333], // চাঁদপুর
  Comilla: [91.1850, 23.4683], // কুমিল্লা
  CoxsBazar: [92.0058, 21.4272], // কক্সবাজার
  Feni: [91.3966, 22.9393], // ফেনী
  Khagrachhari: [91.9667, 23.1000], // খাগড়াছড়ি
  Lakshmipur: [90.8333, 22.9500], // লক্ষ্মীপুর
  Noakhali: [91.0995, 22.8696], // নোয়াখালী
  Rangamati: [92.1833, 22.6333], // রাঙ্গামাটি
  Sylhet: [91.8716, 24.8949], // সিলেট
  Habiganj: [91.4167, 24.3833], // হবিগঞ্জ
  Maulvibazar: [91.777417, 24.482934], // মৌলভীবাজার
  Sunamganj: [91.4167, 25.0667], // সুনামগঞ্জ
  Rajshahi: [88.6042, 24.3642], // রাজশাহী
  Bogra: [89.3714, 24.8515], // বগুড়া
  ChapaiNawabganj: [88.2667, 24.6000], // চাঁপাইনবাবগঞ্জ
  Joypurhat: [89.0167, 25.1000], // জয়পুরহাট
  Naogaon: [88.7500, 24.8000], // নওগাঁ
  Natore: [89.0000, 24.4167], // নাটোর
  Pabna: [89.2500, 24.0000], // পাবনা
  Sirajganj: [89.7167, 24.4500], // সিরাজগঞ্জ
  Khulna: [89.5642, 22.8456], // খুলনা
  Bagerhat: [89.8000, 22.6500], // বাগেরহাট
  Chuadanga: [88.8500, 23.6500], // চুয়াডাঙ্গা
  Jessore: [89.2137, 23.1668], // যশোর
  Jhenaidah: [89.1000, 23.5500], // ঝিনাইদহ
  Kushtia: [89.0352, 23.9013], // কুষ্টিয়া
  Magura: [89.4333, 23.4833], // মাগুরা
  Meherpur: [88.7000, 23.7667], // মেহেরপুর
  Narail: [89.5000, 23.1667], // নড়াইল
  Satkhira: [89.0705, 22.7185], // সাতক্ষীরা
  Barisal: [90.3686, 22.7026], // বরিশাল
  Barguna: [90.1167, 22.1333], // বরগুনা
  Bhola: [90.6500, 22.6833], // ভোলা
  Jhalokati: [90.2000, 22.6333], // ঝালকাঠি
  Patuakhali: [90.3167, 22.3500], // পটুয়াখালী
  Pirojpur: [90.0000, 22.5833], // পিরোজপুর
  Rangpur: [89.2517, 25.7557], // রংপুর
  Dinajpur: [88.6333, 25.6333], // দিনাজপুর
  Gaibandha: [89.5333, 25.3333], // গাইবান্ধা
  Kurigram: [89.6667, 25.8000], // কুড়িগ্রাম
  Lalmonirhat: [89.4333, 25.9167], // লালমনিরহাট
  Nilphamari: [88.9500, 25.9333], // নীলফামারী
  Panchagarh: [88.5500, 26.3333], // পঞ্চগড়
  Thakurgaon: [88.4667, 26.0333], // ঠাকুরগাঁও
  Mymensingh: [90.4071, 24.7571], // ময়মনসিংহ
  Jamalpur: [89.9333, 24.9000], // জামালপুর
  Netrokona: [90.7167, 24.8833], // নেত্রকোণা
  Sherpur: [90.0167, 25.0167], // শেরপুর
};

export default function DropdownForm() {
  const router = useRouter();
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<number | undefined>();
  const [selectedUpazilla, setSelectedUpazilla] = useState("");
  type HoveredDistrictType = {
    district: string;
    division: string;
    districtId: string | number;
    divisionId: string | number;
  } | null;

  const [hoveredDistrict, setHoveredDistrict] = useState<HoveredDistrictType>(null);

  const { data: divisionData } = useGetAllDivisionsQuery({});
  const { data: districtData } = useGetAllDistrictsQuery(
    { division_id: selectedDivision },
    { skip: !selectedDivision }
  );
  const { data: alldistrictData } = useGetAllDistrictsQuery({});
  const { data: upazillaData } = useGetAllUpazillasQuery(
    { district_id: selectedDistrict ? String(selectedDistrict) : undefined },
    { skip: !selectedDistrict }
  );

  const handleDistrictClick = (geo: any) => {
    const districtName = geo?.properties?.NAME_2;
    if (!districtName) return;

    // Find matching district in Bengali
    const matchedDistrict = alldistrictData?.data?.find(
      (d: any) => d.name.toLowerCase() === districtName.toLowerCase()
    );

    if (matchedDistrict) {
      // Find the division by id from divisionData
      const division = divisionData?.data?.find((div: any) => div.id === matchedDistrict.division_id);
      if (division) {
        router.push(
          `/zonenews/${encodeURIComponent(division.bn_name)}/${encodeURIComponent(matchedDistrict.bn_name)}?division_id=${matchedDistrict.division_id}&district_id=${matchedDistrict.id}`
        );
      }
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

    const division = divisionData?.data?.find((d: any) => d.id === selectedDivision);
    const district = districtData?.data?.find((d: any) => d.id === selectedDistrict);
    const upazilla = upazillaData?.data?.find((u: any) => u.id === selectedUpazilla);

    let path = "/zonenews";
    const queryParams = new URLSearchParams();

    if (division) {
      path += `/${encodeURIComponent(division.bn_name)}`;
      queryParams.append("division_id", selectedDivision);
    }
    if (district) {
      path += `/${encodeURIComponent(district.bn_name)}`;
      queryParams.append("district_id", String(selectedDistrict));
    }
    if (upazilla) {
      path += `/${encodeURIComponent(upazilla.bn_name)}`;
      queryParams.append("upazilla_id", selectedUpazilla);
    }

    router.push(`${path}?${queryParams.toString()}`);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className=" mb-3">
        <h1 className="text-[23px] font-medium ml-[200px] mr-[160px] text-gray-800 border-b-[1.5px] border-gray-300 pb-2">জেলার খবর</h1>
      </div>
      <div className="grid justify-center ml-[200px] items-center w-[850px] grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
              <option key={division.id} value={division.id}>
                {division.bn_name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* District Dropdown */}
        <div className="relative">
          <select
            id="district"
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none disabled:opacity-50"
            value={selectedDistrict || ""}
            onChange={handleDistrictChange}
            disabled={!selectedDivision}
          >
            <option value="">জেলা</option>
            {districtData?.data?.map((district: any) => (
              <option key={district.id} value={district.id}>
                {district.bn_name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
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
              <option key={upazilla.id} value={upazilla.id}>
                {upazilla.bn_name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
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
              !selectedDivision && !selectedDistrict && !selectedUpazilla
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <IoIosSearch className="mr-2 text-lg" /> খুঁজুন
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full rounded-lg">
          <div className="relative" style={{ height: "800px" }}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 6000,
                center: [90.3, 23.7],
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const districtName = geo.properties.ADM2_EN;
                    const divisionName = geo.properties.ADM1_EN;
                    const fillColor = divisionColors[divisionName] || "#3ac993";

                    // Ensure Bengali name from alldistrictData
                    const matchedDistrict = alldistrictData?.data?.find(
                      (d: any) => d.name.toLowerCase() === districtName.toLowerCase()
                    );
                    const displayName = matchedDistrict?.bn_name || districtName;

                    // Use manual coordinates
                    const centroid = districtCoordinates[districtName] || [0, 0];

                    return (
                      <React.Fragment key={geo.rsmKey}>
                        <Geography
                          geography={geo}
                          onClick={() => handleDistrictClick(geo)}
                          onMouseEnter={() => {
                            setHoveredDistrict({
                              district: displayName,
                              division: divisionName,
                              districtId: matchedDistrict?.id || "",
                              divisionId: matchedDistrict?.division_id || "",
                            });
                          }}
                          onMouseLeave={() => setHoveredDistrict(null)}
                          style={{
                            default: {
                              fill: fillColor,
                              stroke: "#fff",
                              strokeWidth: 0.5,
                              outline: "none",
                              opacity: 0.8,
                            },
                            hover: {
                              fill: "#555",
                              stroke: "#fff",
                              strokeWidth: 1,
                              outline: "none",
                            },
                            pressed: {
                              fill: "#222",
                              outline: "none",
                            },
                          }}
                        />
                        {centroid[0] !== 0 && centroid[1] !== 0 && (
                          <Annotation
                            subject={centroid}
                            dx={0}
                            dy={0} // Move label above the district
                            connectorProps={{}}
                          >
                            <text
                              x="0"
                              y="0"
                              fontSize="9"
                              textAnchor="middle"
                              fill="#333"
                              fontWeight="bold"
                              style={{
                                fontFamily: "SolaimanLipi",
                                backgroundColor: "rgba(255, 255, 255, 0.85)",
                                padding: "3px 6px",
                                borderRadius: "3px",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                              }}
                            >
                              {displayName}
                            </text>
                          </Annotation>
                        )}
                      </React.Fragment>
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
            {hoveredDistrict && (
              <div className="absolute top-4 left-4 bg-white p-4 rounded shadow-lg max-w-xs">
                <h4 className="text-sm font-bold text-gray-800">জেলার তথ্য</h4>
                <p className="text-sm text-gray-700">জেলা: {hoveredDistrict.district}</p>
                <p className="text-sm text-gray-700">বিভাগ: {hoveredDistrict.division}</p>
              </div>
            )}
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
                  if (div) {
                    setSelectedDivision(String(div.id));
                    router.push(
                      `/zonenews/${encodeURIComponent(div.bn_name)}?division_id=${div.id}`
                    );
                  }
                }}
              >
                <div
                  className="w-4 h-4 mr-3 rounded-sm"
                  style={{ backgroundColor: division.color }}
                ></div>
                <span className="text-gray-700">{division.bengali}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}