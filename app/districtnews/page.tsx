"use client";

import React, { useState, useMemo } from "react";
import { useGetAllDivisionsQuery, useGetAllDistrictsQuery, useGetAllUpazillasQuery } from "@/redux/features/zone/districtsApi";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/navigation";
import { ComposableMap, Geographies, Geography, Annotation } from "react-simple-maps";

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
  Dhaka: [90.4125, 23.8103],
  Faridpur: [89.8333, 23.6000],
  Gazipur: [90.4000, 24.0000],
  Gopalganj: [89.9167, 23.0000],
  Kishoreganj: [90.7667, 24.4333],
  Madaripur: [90.2000, 23.1667],
  Manikganj: [90.0000, 23.8667],
  Munshiganj: [90.5500, 23.5500],
  Narayanganj: [90.5000, 23.6167],
  Narsingdi: [90.6833, 23.9167],
  Rajbari: [89.6500, 23.7500],
  Shariatpur: [90.3667, 23.2000],
  Tangail: [89.9167, 24.2500],
  Chittagong: [91.8123, 22.3569],
  Bandarban: [92.2000, 22.2000],
  Brahmanbaria: [91.1119286, 23.9570904],
  Chandpur: [90.7000, 23.2333],
  Comilla: [91.1850, 23.4683],
  "Cox's Bazar": [92.0058, 21.4272],
  Feni: [91.3966, 22.9393],
  Khagrachhari: [91.9667, 23.1000],
  Lakshmipur: [90.8333, 22.9500],
  Noakhali: [91.0995, 22.8696],
  Rangamati: [92.1833, 22.6333],
  Sylhet: [91.8716, 24.8949],
  Habiganj: [91.4167, 24.3833],
  Maulvibazar: [91.777417, 24.482934],
  Sunamganj: [91.4167, 25.0667],
  Rajshahi: [88.6042, 24.3642],
  Bogra: [89.3714, 24.8515],
  "Chapai Nawabganj": [88.2667, 24.6000],
  Joypurhat: [89.0167, 25.1000],
  Naogaon: [88.7500, 24.8000],
  Natore: [89.0000, 24.4167],
  Pabna: [89.2500, 24.0000],
  Sirajganj: [89.7167, 24.4500],
  Khulna: [89.5642, 22.8456],
  Bagerhat: [89.8000, 22.6500],
  Chuadanga: [88.8500, 23.6500],
  Jessore: [89.2137, 23.1668],
  Jhenaidah: [89.1000, 23.5500],
  Kushtia: [89.0352, 23.9013],
  Magura: [89.4333, 23.4833],
  Meherpur: [88.7000, 23.7667],
  Narail: [89.5000, 23.1667],
  Satkhira: [89.0705, 22.7185],
  Barisal: [90.3686, 22.7026],
  Barguna: [90.1167, 22.1333],
  Bhola: [90.6500, 22.6833],
  Jhalokati: [90.2000, 22.6333],
  Patuakhali: [90.3167, 22.3500],
  Pirojpur: [90.0000, 22.5833],
  Rangpur: [89.2517, 25.7557],
  Dinajpur: [88.6333, 25.6333],
  Gaibandha: [89.5333, 25.3333],
  Kurigram: [89.6667, 25.8000],
  Lalmonirhat: [89.4333, 25.9167],
  Nilphamari: [88.9500, 25.9333],
  Panchagarh: [88.5500, 26.3333],
  Thakurgaon: [88.4667, 26.0333],
  Mymensingh: [90.4071, 24.7571],
  Jamalpur: [89.9333, 24.9000],
  Netrokona: [90.7167, 24.8833],
  Sherpur: [90.0167, 25.0167],
};

interface HoveredDistrict {
  district: string;
  division: string;
  districtId: string | number;
  divisionId: string | number;
}

export default function DropdownForm() {
  const router = useRouter();
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<number | undefined>();
  const [selectedUpazilla, setSelectedUpazilla] = useState<string>("");
  const [hoveredDistrict, setHoveredDistrict] = useState<HoveredDistrict | null>(null);

  const { data: divisionData, isLoading: isDivisionLoading } = useGetAllDivisionsQuery({});
  const { data: districtData, isLoading: isDistrictLoading } = useGetAllDistrictsQuery(
    { division_id: selectedDivision },
    { skip: !selectedDivision }
  );
  const { data: allDistrictData, isLoading: isAllDistrictLoading } = useGetAllDistrictsQuery({});
  const { data: upazillaData, isLoading: isUpazillaLoading } = useGetAllUpazillasQuery(
    { district_id: selectedDistrict ? String(selectedDistrict) : undefined },
    { skip: !selectedDistrict }
  );

  const handleDistrictClick = (geo: any) => {
    const districtName = geo?.properties?.ADM2_EN;
    if (!districtName || !allDistrictData?.data) return;

    const matchedDistrict = allDistrictData.data.find(
      (d: any) => d.name.toLowerCase() === districtName.toLowerCase()
    );

    if (matchedDistrict) {
      const division = divisionData?.data?.find((div: any) => div.id === matchedDistrict.division_id);
      if (division) {
        setSelectedDivision(String(matchedDistrict.division_id));
        setSelectedDistrict(matchedDistrict.id);
        setSelectedUpazilla("");

        const path = `/zonenews/${encodeURIComponent(division.bn_name)}/${encodeURIComponent(matchedDistrict.bn_name)}`;
        const queryParams = new URLSearchParams({
          division_id: String(matchedDistrict.division_id),
          district_id: String(matchedDistrict.id),
        });
        router.push(`${path}?${queryParams.toString()}`);
      }
    }
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedDivision(value);
    setSelectedDistrict(undefined);
    setSelectedUpazilla("");
    if (value) {
      const division = divisionData?.data?.find((d: any) => d.id === value);
      if (division) {
        router.push(`/zonenews/${encodeURIComponent(division.bn_name)}?division_id=${value}`);
      }
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value) || undefined;
    setSelectedDistrict(value);
    setSelectedUpazilla("");
    if (value && selectedDivision) {
      const division = divisionData?.data?.find((d: any) => d.id === selectedDivision);
      const district = districtData?.data?.find((d: any) => d.id === value);
      if (division && district) {
        const path = `/zonenews/${encodeURIComponent(district.bn_name)}`;
        const queryParams = new URLSearchParams({
          division_id: selectedDivision,
          district_id: String(value),
        });
        router.push(`${path}?${queryParams.toString()}`);
      }
    }
  };

  const handleUpazillaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedUpazilla(value);
    if (value && selectedDivision && selectedDistrict) {
      const division = divisionData?.data?.find((d: any) => d.id === selectedDivision);
      const district = districtData?.data?.find((d: any) => d.id === selectedDistrict);
      const upazilla = upazillaData?.data?.find((u: any) => u.id === value);
      if (division && district && upazilla) {
        const path = `/zonenews/${encodeURIComponent(district.bn_name)}/${encodeURIComponent(upazilla.bn_name)}`;
        const queryParams = new URLSearchParams({
          district_id: String(selectedDistrict)
        });
        router.push(`${path}?${queryParams.toString()}`);
      }
    }
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

  // Memoize the district map to improve performance
  const districtMap = useMemo(() => {
    const map: Record<string, any> = {};
    allDistrictData?.data?.forEach((d: any) => {
      map[d.name.toLowerCase()] = d;
    });
    return map;
  }, [allDistrictData]);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-3">
        <h1 className="text-[23px] font-medium text-center text-gray-800 border-b-[1.5px] border-gray-300 pb-2">
          জেলার খবর
        </h1>
      </div>
      <div className="grid justify-center items-center w-full max-w-[850px] mx-auto grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <select
            id="division"
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={selectedDivision}
            onChange={handleDivisionChange}
            disabled={isDivisionLoading}
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

        <div className="relative">
          <select
            id="district"
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none disabled:opacity-50"
            value={selectedDistrict || ""}
            onChange={handleDistrictChange}
            disabled={!selectedDivision || isDistrictLoading}
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

        <div className="relative">
          <select
            id="upazilla"
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none disabled:opacity-50"
            value={selectedUpazilla}
            onChange={handleUpazillaChange}
            disabled={!selectedDistrict || isUpazillaLoading}
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
          <div className="relative" style={{ height: "1000px" }}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 7000,
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

                    const matchedDistrict = districtMap[districtName.toLowerCase()];
                    const displayName = matchedDistrict?.bn_name || districtName;
                    const centroid = districtCoordinates[districtName] || [0, 0];

                    return (
                      <React.Fragment key={geo.rsmKey}>
                        <Geography
                          geography={geo}
                          onClick={() => handleDistrictClick(geo)}
                          onMouseEnter={() => {
                            const division = divisionData?.data?.find(
                              (div: any) => div.id === matchedDistrict?.division_id
                            );
                            setHoveredDistrict({
                              district: displayName,
                              division: division?.bn_name || divisionName,
                              districtId: matchedDistrict?.id || "",
                              divisionId: matchedDistrict?.division_id || "",
                            });
                          }}
                          onMouseLeave={() => setHoveredDistrict(null)}
                          style={{
                            default: {
                              fill: fillColor,
                              stroke: "#fff",
                              strokeWidth: 0.75,
                              outline: "none",
                            },
                            hover: {
                              fill: "#e1ffff",
                              stroke: "#fff",
                              outline: "none",
                            },
                            pressed: {
                              fill: "#222",
                              outline: "none",
                            },
                          }}
                        />
                        <Annotation
                          subject={centroid}
                          dx={0}
                          dy={0}
                          connectorProps={{}}
                        >
                          <text
                            fontSize="10px"
                            alignmentBaseline="middle"
                            textAnchor="middle"
                            style={{
                              fontFamily: "SolaimanLipi",

                              pointerEvents: "none",
                            }}
                          >
                            {displayName}
                          </text>
                        </Annotation>
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
                    setSelectedDistrict(undefined);
                    setSelectedUpazilla("");
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